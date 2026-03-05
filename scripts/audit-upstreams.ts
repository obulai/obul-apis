import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import matter from "gray-matter";
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { ExactEvmScheme, toClientEvmSigner } from "@x402/evm";
import { ExactEvmSchemeV1 } from "@x402/evm/v1";

// ── Types ──────────────────────────────────────────────────────────────────

interface TestEndpoint {
  method: string;
  url: string;
  query?: Record<string, string>;
  body?: Record<string, unknown>;
}

interface SkillEntry {
  skill: string;
  upstreamHost: string;
  baseUrl: string;
  testEndpoints: TestEndpoint[];
  preferredEndpointIndex?: number;
}

interface ResolvedSkillEntry extends SkillEntry {
  selectedEndpointIndex: number;
  testEndpoint: TestEndpoint;
}

interface AuditResult {
  skill: string;
  upstreamHost: string;
  status: "PASS" | "FAIL" | "SKIP" | "TIMEOUT";
  request: {
    method: string;
    url: string;
  };
  response: {
    statusCode?: number;
    bodyPreview?: string;
  };
  timing: {
    totalMs?: number;
  };
  error?: {
    message: string;
  };
  x402: {
    paymentRequired: boolean | null;
    paymentTxHash: string | null;
    paymentRequirements: unknown | null;
  };
}

interface AuditRunOutput {
  runId: string;
  generatedAt: string;
  summary: {
    total: number;
    pass: number;
    fail: number;
    timeout: number;
    skip: number;
  };
  results: AuditResult[];
}

interface CliOptions {
  skill?: string;
  resultsJsonPath?: string;
  overridesPath?: string;
  outputJsonPath?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const PROXY_PREFIX = "https://proxy.obul.ai/proxy/https/";
const SKIP_SKILLS = new Set(["obul-proxy", "obul-api-finder"]);
const REQUEST_TIMEOUT_MS = 15_000;
const CONCURRENCY = 5;
const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const AUDIT_OUT_DIR = path.join(REPO_ROOT, "scripts", "audit-results");
const MAX_PREVIEW_CHARS = 2_000;
const X402_TX_HASH_HEADERS = ["x-payment-tx-hash", "x-x402-tx-hash", "payment-tx-hash"];
const ENDPOINT_PROBE_TIMEOUT_MS = 8_000;

// ── CLI Options ────────────────────────────────────────────────────────────

function parseCliOptions(): CliOptions {
  const args = process.argv.slice(2);
  const opts: CliOptions = {};
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--skill" || arg === "--skil") {
      opts.skill = args[i + 1];
      i++;
      continue;
    }
    if (arg === "--results-json") {
      opts.resultsJsonPath = args[i + 1];
      i++;
      continue;
    }
    if (arg === "--overrides") {
      opts.overridesPath = args[i + 1];
      i++;
      continue;
    }
    if (arg === "--output-json") {
      opts.outputJsonPath = args[i + 1];
      i++;
      continue;
    }
    if (arg.startsWith("--")) continue;
    positional.push(arg);
  }

  // Backward-compatible positional form:
  // tsx scripts/audit-upstreams.ts <skill> [results-json-path]
  if (!opts.skill && positional.length > 0) {
    opts.skill = positional[0];
  }
  if (!opts.resultsJsonPath && positional.length > 1) {
    opts.resultsJsonPath = positional[1];
  }

  return opts;
}

// ── Skill Parsing ──────────────────────────────────────────────────────────

function extractBaseUrl(content: string): string | null {
  // Matches both `Base URL: \`...\`` and `**Base URL:** \`...\``
  const match = content.match(
    /\*?\*?Base URL:?\*?\*?\s*`(https:\/\/proxy\.obul\.ai\/proxy\/https\/[^`]+)`/
  );
  return match?.[1] ?? null;
}

function extractEndpoints(content: string): TestEndpoint[] {
  // Find JSON code blocks under Common Operations
  const opsIdx = content.indexOf("## Common Operations");
  if (opsIdx === -1) return [];

  const afterOps = content.slice(opsIdx);
  const regex = /```json\s*\n([\s\S]*?)\n```/g;
  const out: TestEndpoint[] = [];
  const seen = new Set<string>();
  for (const match of afterOps.matchAll(regex)) {
    const raw = match[1];
    try {
      const obj = JSON.parse(raw);
      if (!obj.method || !obj.url) continue;
      const ep: TestEndpoint = { method: obj.method, url: obj.url };

      // Support both `query` and `params` from skill examples.
      // If a param key appears as a URL placeholder (`{key}`), fill path first,
      // otherwise keep it as query string input.
      const paramSource = obj.query ?? obj.params;
      if (paramSource && typeof paramSource === "object" && !Array.isArray(paramSource)) {
        const query: Record<string, string> = {};
        let url = ep.url;
        for (const [k, v] of Object.entries(paramSource as Record<string, unknown>)) {
          if (v == null) continue;
          const value = String(v);
          const placeholder = `{${k}}`;
          if (url.includes(placeholder)) {
            url = url.replaceAll(placeholder, encodeURIComponent(value));
          } else {
            query[k] = value;
          }
        }
        ep.url = url;
        if (Object.keys(query).length > 0) ep.query = query;
      }

      if (obj.body) ep.body = obj.body;
      const key = JSON.stringify(ep);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(ep);
    } catch {
      continue;
    }
  }
  return out;
}

function proxyUrlToUpstream(proxyUrl: string): string {
  if (proxyUrl.startsWith(PROXY_PREFIX)) {
    return "https://" + proxyUrl.slice(PROXY_PREFIX.length);
  }
  return proxyUrl;
}

function hostFromProxyUrl(proxyUrl: string): string {
  if (proxyUrl.startsWith(PROXY_PREFIX)) {
    const rest = proxyUrl.slice(PROXY_PREFIX.length);
    // host is everything up to the first / (or end of string)
    return rest.split("/")[0];
  }
  return new URL(proxyUrl).host;
}

function parseSkills(): SkillEntry[] {
  const entries: SkillEntry[] = [];
  const skillsDir = path.join(REPO_ROOT, "skills");
  const skillDirs = readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(skillsDir, d.name, "SKILL.md"))
    .filter((p) => existsSync(p))
    .sort();

  for (const filePath of skillDirs) {
    const raw = readFileSync(filePath, "utf-8");
    const { data: frontmatter } = matter(raw);
    const skillName: string = frontmatter.name ?? path.basename(path.dirname(filePath));

    if (SKIP_SKILLS.has(skillName)) continue;

    const baseUrl = extractBaseUrl(raw);
    if (!baseUrl) {
      console.warn(`⚠ ${skillName}: could not extract Base URL, skipping`);
      continue;
    }

    const endpoints = extractEndpoints(raw);
    if (endpoints.length === 0) {
      console.warn(`⚠ ${skillName}: could not extract test endpoints, skipping`);
      continue;
    }

    const upstreamEndpoints = endpoints.map((endpoint) => ({
      ...endpoint,
      url: proxyUrlToUpstream(endpoint.url),
    }));
    const upstreamHost = hostFromProxyUrl(baseUrl);

    entries.push({
      skill: skillName,
      upstreamHost,
      baseUrl: proxyUrlToUpstream(baseUrl),
      testEndpoints: upstreamEndpoints,
      preferredEndpointIndex: undefined,
    });
  }

  return entries;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base) || Array.isArray(override)) {
    return (override as T) ?? base;
  }
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override as T) ?? base;
  }

  const merged: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(override)) {
    const existing = merged[k];
    if (isPlainObject(existing) && isPlainObject(v)) {
      merged[k] = deepMerge(existing, v);
    } else {
      merged[k] = v;
    }
  }
  return merged as T;
}

function expandTemplateString(input: string): string {
  return input.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, tokenRaw: string) => {
    const token = tokenRaw.trim();
    if (token === "timestamp") return String(Date.now());
    if (token === "randomHex8") return randomBytes(4).toString("hex");
    if (token.startsWith("env:")) {
      const envKey = token.slice(4).trim();
      return process.env[envKey] ?? "";
    }
    return `{{${token}}}`;
  });
}

function expandTemplates<T>(value: T): T {
  if (typeof value === "string") return expandTemplateString(value) as T;
  if (Array.isArray(value)) return value.map((v) => expandTemplates(v)) as T;
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = expandTemplates(v);
    return out as T;
  }
  return value;
}

function applyOverrides(skills: SkillEntry[], overridesPath?: string): SkillEntry[] {
  if (!overridesPath) return skills;
  const resolved = path.resolve(process.cwd(), overridesPath);
  if (!existsSync(resolved)) {
    throw new Error(`Overrides file not found: ${resolved}`);
  }

  const raw = readFileSync(resolved, "utf-8");
  const parsed = JSON.parse(raw) as unknown;
  if (!isPlainObject(parsed)) {
    throw new Error(`Overrides JSON must be an object keyed by skill name: ${resolved}`);
  }

  const overridesBySkill = parsed as Record<string, unknown>;
  const known = new Set(skills.map((s) => s.skill));
  for (const key of Object.keys(overridesBySkill)) {
    if (!known.has(key)) {
      console.warn(`⚠ overrides: unknown skill "${key}" (ignored)`);
    }
  }

  const merged = skills.map((skill) => {
    const override = overridesBySkill[skill.skill];
    if (!override) return skill;
    const withOverride = deepMerge(skill, override) as SkillEntry & { testEndpoint?: TestEndpoint };
    const expanded = expandTemplates(withOverride);
    // Backward-compat: allow overrides with `testEndpoint` (singular).
    if (
      isPlainObject(expanded) &&
      "testEndpoint" in expanded &&
      expanded.testEndpoint &&
      (!("testEndpoints" in expanded) || !Array.isArray(expanded.testEndpoints))
    ) {
      expanded.testEndpoints = [expanded.testEndpoint as TestEndpoint];
    }
    if (!Array.isArray(expanded.testEndpoints) || expanded.testEndpoints.length === 0) {
      throw new Error(`Overrides produced no testEndpoints for skill: ${skill.skill}`);
    }
    return expanded as SkillEntry;
  });

  console.log(`Applied endpoint overrides from ${resolved}`);
  return merged;
}

function buildFinalUrl(endpoint: TestEndpoint): string {
  let finalUrl = endpoint.url;
  if (endpoint.query && Object.keys(endpoint.query).length > 0) {
    const params = new URLSearchParams(endpoint.query);
    finalUrl += (finalUrl.includes("?") ? "&" : "?") + params.toString();
  }
  return finalUrl;
}

function scoreProbeStatus(status: number): number {
  if (status === 404 || status === 405) return -2;
  if (status === 402 || status === 200 || status === 401 || status === 403) return 4;
  if (status >= 200 && status < 500) return 2;
  if (status >= 500) return 1;
  return 0;
}

function isLikelyUsdcAsset(asset?: unknown): boolean {
  if (typeof asset !== "string") return false;
  const a = asset.toLowerCase();
  return a === "usdc" || a.includes("usd coin") || a === "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
}

function parseAmountToMicros(raw: unknown): bigint | null {
  if (typeof raw !== "string") return null;
  const s = raw.trim();
  if (!/^\d+(\.\d+)?$/.test(s)) return null;
  if (!s.includes(".")) return BigInt(s);

  const [whole, frac] = s.split(".");
  const fracPadded = (frac + "000000").slice(0, 6);
  return BigInt(whole) * 1_000_000n + BigInt(fracPadded);
}

function extractCheapestMicrosFromPaymentRequirements(paymentRequirements: unknown): bigint | null {
  if (!isPlainObject(paymentRequirements)) return null;
  const accepts = paymentRequirements.accepts;
  if (!Array.isArray(accepts) || accepts.length === 0) return null;

  let cheapestUsdc: bigint | null = null;
  let cheapestAny: bigint | null = null;

  for (const accept of accepts) {
    if (!isPlainObject(accept)) continue;
    const rawAmount = accept.maxAmountRequired ?? accept.amount;
    const micros = parseAmountToMicros(rawAmount);
    if (micros == null) continue;

    if (cheapestAny == null || micros < cheapestAny) cheapestAny = micros;
    if (isLikelyUsdcAsset(accept.asset)) {
      if (cheapestUsdc == null || micros < cheapestUsdc) cheapestUsdc = micros;
    }
  }

  return cheapestUsdc ?? cheapestAny;
}

type EndpointProbe = {
  idx: number;
  statusScore: number;
  cheapestMicros: bigint | null;
};

function compareEndpointProbe(a: EndpointProbe, b: EndpointProbe): number {
  if (a.statusScore !== b.statusScore) return b.statusScore - a.statusScore;

  const aHasPrice = a.cheapestMicros != null;
  const bHasPrice = b.cheapestMicros != null;
  if (aHasPrice && bHasPrice && a.cheapestMicros !== b.cheapestMicros) {
    return a.cheapestMicros! < b.cheapestMicros! ? -1 : 1;
  }
  if (aHasPrice !== bHasPrice) return aHasPrice ? -1 : 1;
  return a.idx - b.idx;
}

async function resolveSkillEndpoint(entry: SkillEntry): Promise<ResolvedSkillEntry> {
  if (entry.testEndpoints.length === 0) {
    throw new Error(`Skill ${entry.skill} has no testEndpoints`);
  }
  if (
    entry.preferredEndpointIndex != null &&
    entry.preferredEndpointIndex >= 0 &&
    entry.preferredEndpointIndex < entry.testEndpoints.length
  ) {
    return {
      ...entry,
      selectedEndpointIndex: entry.preferredEndpointIndex,
      testEndpoint: entry.testEndpoints[entry.preferredEndpointIndex],
    };
  }
  if (entry.testEndpoints.length === 1) {
    return { ...entry, selectedEndpointIndex: 0, testEndpoint: entry.testEndpoints[0] };
  }

  let baseHost = "";
  try {
    baseHost = new URL(entry.baseUrl).host;
  } catch {
    baseHost = entry.upstreamHost;
  }

  const indices = entry.testEndpoints.map((_, i) => i);
  indices.sort((a, b) => {
    const aHost = new URL(entry.testEndpoints[a].url).host;
    const bHost = new URL(entry.testEndpoints[b].url).host;
    const aMatch = aHost === baseHost ? 1 : 0;
    const bMatch = bHost === baseHost ? 1 : 0;
    return bMatch - aMatch;
  });

  let bestProbe: EndpointProbe | null = null;

  for (const idx of indices) {
    const endpoint = entry.testEndpoints[idx];
    const finalUrl = buildFinalUrl(endpoint);
    const body = endpoint.body && endpoint.method !== "GET" ? JSON.stringify(endpoint.body) : undefined;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ENDPOINT_PROBE_TIMEOUT_MS);
    try {
      const res = await fetch(finalUrl, {
        method: endpoint.method,
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body,
      });
      const bodyText = await res.text().catch(() => "");
      const parsed = parsePaymentRequirements(res, bodyText);
      const probe: EndpointProbe = {
        idx,
        statusScore: scoreProbeStatus(res.status),
        cheapestMicros: extractCheapestMicrosFromPaymentRequirements(parsed),
      };

      if (!bestProbe || compareEndpointProbe(probe, bestProbe) < 0) {
        bestProbe = probe;
      }
    } catch {
      continue;
    } finally {
      clearTimeout(timeout);
    }
  }

  const chosenIdx = bestProbe?.idx ?? indices[0];
  return { ...entry, selectedEndpointIndex: chosenIdx, testEndpoint: entry.testEndpoints[chosenIdx] };
}

// ── x402 Client Setup ──────────────────────────────────────────────────────

function setupX402Fetch(): typeof fetch {
  const pk = process.env.PRIVATE_KEY;
  if (!pk) {
    console.error("ERROR: PRIVATE_KEY env var is required (EVM private key with USDC on Base)");
    process.exit(1);
  }

  const account = privateKeyToAccount(pk as `0x${string}`);
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const signer = toClientEvmSigner(account, publicClient);
  const client = new x402Client();
  const evmSchemeV2 = new ExactEvmScheme(signer);
  const evmSchemeV1 = new ExactEvmSchemeV1(signer);
  client
    // v2 registration (CAIP-2). Wildcard covers EVM networks like eip155:8453.
    .register("eip155:*", evmSchemeV2)
    // v1 registration (legacy simple network names).
    .registerV1("base", evmSchemeV1)
    .registerV1("base-sepolia", evmSchemeV1);

  return wrapFetchWithPayment(fetch, client);
}

// ── Audit Runner ───────────────────────────────────────────────────────────

async function auditSkill(
  entry: ResolvedSkillEntry,
  x402Fetch: typeof fetch
): Promise<AuditResult> {
  const { skill, upstreamHost, testEndpoint } = entry;
  const { method, url, query, body } = testEndpoint;

  let finalUrl = url;
  if (query && Object.keys(query).length > 0) {
    const params = new URLSearchParams(query);
    finalUrl += (finalUrl.includes("?") ? "&" : "?") + params.toString();
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const start = performance.now();
  let preflightPaymentRequired: boolean | null = null;
  let capturedPaymentRequirements: unknown | null = null;

  try {
    const requestBody = body && method !== "GET" ? JSON.stringify(body) : undefined;
    const init: RequestInit = {
      method,
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    };
    if (requestBody) {
      init.body = requestBody;
    }

    // Preflight request to capture raw 402 payment requirements for reporting.
    // We still run x402Fetch afterwards to execute payment + final request flow.
    try {
      const preflight = await fetch(finalUrl, init);
      preflightPaymentRequired = preflight.status === 402;
      if (preflight.status === 402) {
        const preflightBody = await preflight.text().catch(() => "");
        capturedPaymentRequirements = parsePaymentRequirements(preflight, preflightBody);
      }
    } catch {
      // Best effort only: do not fail audit if preflight capture fails.
    }

    const res = await x402Fetch(finalUrl, init);
    const elapsed = Math.round(performance.now() - start);

    if (res.ok) {
      const text = await res.text().catch(() => "");
      const paymentTxHash = extractPaymentTxHash(res);
      return {
        skill,
        upstreamHost,
        status: "PASS",
        request: { method, url: finalUrl },
        response: {
          statusCode: res.status,
          bodyPreview: text.slice(0, MAX_PREVIEW_CHARS),
        },
        timing: { totalMs: elapsed },
        x402: {
          paymentRequired: preflightPaymentRequired ?? (paymentTxHash ? true : null),
          paymentTxHash,
          paymentRequirements: capturedPaymentRequirements,
        },
      };
    }

    const text = await res.text().catch(() => "");
    const paymentTxHash = extractPaymentTxHash(res);
    return {
      skill,
      upstreamHost,
      status: "FAIL",
      request: { method, url: finalUrl },
      response: {
        statusCode: res.status,
        bodyPreview: text.slice(0, MAX_PREVIEW_CHARS),
      },
      timing: { totalMs: elapsed },
      error: { message: text.slice(0, 120) },
      x402: {
        paymentRequired: preflightPaymentRequired ?? (paymentTxHash ? true : null),
        paymentTxHash,
        paymentRequirements: capturedPaymentRequirements,
      },
    };
  } catch (err: unknown) {
    const elapsed = Math.round(performance.now() - start);
    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        skill,
        upstreamHost,
        status: "TIMEOUT",
        request: { method, url: finalUrl },
        response: {},
        timing: { totalMs: elapsed },
        error: { message: "Request timed out" },
        x402: {
          paymentRequired: preflightPaymentRequired,
          paymentTxHash: null,
          paymentRequirements: capturedPaymentRequirements,
        },
      };
    }
    const msg = err instanceof Error ? err.message : String(err);
    return {
      skill,
      upstreamHost,
      status: "FAIL",
      request: { method, url: finalUrl },
      response: { bodyPreview: msg.slice(0, MAX_PREVIEW_CHARS) },
      timing: { totalMs: elapsed },
      error: { message: msg.slice(0, 120) },
      x402: {
        paymentRequired: preflightPaymentRequired,
        paymentTxHash: null,
        paymentRequirements: capturedPaymentRequirements,
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
  keyFn?: (item: T) => string
): Promise<R[]> {
  if (!keyFn) {
    const results: R[] = new Array(items.length);
    let idx = 0;

    async function worker() {
      while (idx < items.length) {
        const i = idx++;
        results[i] = await fn(items[i]);
      }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
    return results;
  }

  // Host-aware scheduler:
  // - up to `concurrency` requests in-flight globally
  // - at most one in-flight request per key (upstream host)
  const results: R[] = new Array(items.length);
  const scheduled = new Array(items.length).fill(false);
  const inFlightByKey = new Map<string, number>();
  let active = 0;
  let scheduledCount = 0;
  let resolved = false;

  return await new Promise<R[]>((resolve, reject) => {
    function findNextRunnableIndex(): number {
      for (let i = 0; i < items.length; i++) {
        if (scheduled[i]) continue;
        const key = keyFn(items[i]);
        if ((inFlightByKey.get(key) ?? 0) === 0) return i;
      }
      return -1;
    }

    function maybeResolve() {
      if (!resolved && scheduledCount === items.length && active === 0) {
        resolved = true;
        resolve(results);
      }
    }

    function schedule() {
      if (resolved) return;
      while (active < concurrency && scheduledCount < items.length) {
        const i = findNextRunnableIndex();
        if (i === -1) break; // blocked by per-key limit; wait for an active task to finish

        scheduled[i] = true;
        scheduledCount += 1;
        active += 1;
        const key = keyFn(items[i]);
        inFlightByKey.set(key, (inFlightByKey.get(key) ?? 0) + 1);

        fn(items[i])
          .then((r) => {
            results[i] = r;
          })
          .catch((err) => {
            if (!resolved) {
              resolved = true;
              reject(err);
            }
          })
          .finally(() => {
            active -= 1;
            const keyCount = (inFlightByKey.get(key) ?? 1) - 1;
            if (keyCount <= 0) inFlightByKey.delete(key);
            else inFlightByKey.set(key, keyCount);

            schedule();
            maybeResolve();
          });
      }

      maybeResolve();
    }

    schedule();
  });
}

function logProgressStart(index: number, total: number, entry: ResolvedSkillEntry, inFlight: number) {
  const { method, url } = entry.testEndpoint;
  console.log(
    `[${index}/${total}] START inFlight=${inFlight} skill=${entry.skill} request=${method} ${url}`
  );
}

function logProgressDone(
  done: number,
  total: number,
  result: AuditResult,
  inFlight: number
) {
  const code = result.response.statusCode ?? "-";
  const time = result.timing.totalMs != null ? `${result.timing.totalMs}ms` : "-";
  console.log(
    `[${done}/${total}] DONE  inFlight=${inFlight} skill=${result.skill} status=${result.status} code=${code} time=${time}`
  );
}

// ── Report ─────────────────────────────────────────────────────────────────

function printReport(results: AuditResult[]) {
  // Column widths
  const nameW = Math.max(12, ...results.map((r) => r.skill.length));
  const hostW = Math.max(15, ...results.map((r) => r.upstreamHost.length));

  const header = [
    "Skill".padEnd(nameW),
    "Upstream Host".padEnd(hostW),
    "Status ".padStart(7),
    "Code",
    "Time  ",
    "Notes",
  ].join(" │ ");

  const separator = header.replace(/[^│]/g, "─").replace(/│/g, "┼");

  console.log("\n" + header);
  console.log(separator);

  for (const r of results) {
    const statusIcon =
      r.status === "PASS"
        ? "✅ PASS"
        : r.status === "TIMEOUT"
          ? "⏱ TMOUT"
          : r.status === "SKIP"
            ? "⏭ SKIP"
            : "❌ FAIL";

    console.log(
      [
        r.skill.padEnd(nameW),
        r.upstreamHost.padEnd(hostW),
        statusIcon.padStart(7),
        r.response.statusCode != null ? String(r.response.statusCode).padStart(4) : "   -",
        r.timing.totalMs != null ? `${r.timing.totalMs}ms`.padStart(6) : "     -",
        r.error?.message ?? "",
      ].join(" │ ")
    );
  }

  // Summary
  const passed = results.filter((r) => r.status === "PASS").length;
  const failed = results.filter((r) => r.status === "FAIL").length;
  const timedOut = results.filter((r) => r.status === "TIMEOUT").length;
  const skipped = results.filter((r) => r.status === "SKIP").length;

  console.log(separator);
  console.log(
    `\nSummary: ${passed} passed, ${failed} failed, ${timedOut} timed out, ${skipped} skipped (${results.length} total)\n`
  );
}

function buildRunOutput(results: AuditResult[], runId: string = new Date().toISOString().replaceAll(":", "-")): AuditRunOutput {
  return {
    runId,
    generatedAt: new Date().toISOString(),
    summary: {
      total: results.length,
      pass: results.filter((r) => r.status === "PASS").length,
      fail: results.filter((r) => r.status === "FAIL").length,
      timeout: results.filter((r) => r.status === "TIMEOUT").length,
      skip: results.filter((r) => r.status === "SKIP").length,
    },
    results,
  };
}

function writeArtifacts(results: AuditResult[]) {
  return writeArtifactsWithOutput(results);
}

function writeArtifactsWithOutput(results: AuditResult[], outputJsonPath?: string) {
  if (outputJsonPath) {
    const resolved = path.resolve(process.cwd(), outputJsonPath);
    mkdirSync(path.dirname(resolved), { recursive: true });
    const runId = new Date().toISOString().replaceAll(":", "-");
    const output = buildRunOutput(results, runId);
    writeFileSync(resolved, JSON.stringify(output, null, 2));
    console.log(`Wrote audit JSON to ${resolved}`);
    return;
  }

  mkdirSync(AUDIT_OUT_DIR, { recursive: true });
  const runId = new Date().toISOString().replaceAll(":", "-");
  const runDir = path.join(AUDIT_OUT_DIR, runId);
  mkdirSync(runDir, { recursive: true });

  const output = buildRunOutput(results, runId);

  const jsonPath = path.join(runDir, "results.json");
  writeFileSync(jsonPath, JSON.stringify(output, null, 2));

  const summaryPath = path.join(runDir, "report.md");
  const lines: string[] = [
    "# Upstream Audit Report",
    "",
    `- Generated: ${new Date().toISOString()}`,
    `- Total: ${results.length}`,
    `- Passed: ${results.filter((r) => r.status === "PASS").length}`,
    `- Failed: ${results.filter((r) => r.status === "FAIL").length}`,
    `- Timed out: ${results.filter((r) => r.status === "TIMEOUT").length}`,
    "",
    "## Per Upstream",
    "",
  ];

  for (const r of results) {
    lines.push(`### ${r.skill} (${r.upstreamHost})`);
    lines.push("");
    lines.push(`- Status: ${r.status}`);
    lines.push(`- Method: ${r.request.method}`);
    lines.push(`- URL: ${r.request.url}`);
    lines.push(`- Status code: ${r.response.statusCode ?? "-"}`);
    lines.push(`- Time: ${r.timing.totalMs != null ? `${r.timing.totalMs}ms` : "-"}`);
    lines.push(`- x402 payment required: ${r.x402.paymentRequired == null ? "unknown" : String(r.x402.paymentRequired)}`);
    if (r.x402.paymentTxHash) lines.push(`- x402 tx hash: ${r.x402.paymentTxHash}`);
    if (r.x402.paymentRequirements) lines.push(`- x402 payment requirements: captured`);
    if (r.error?.message) lines.push(`- Error: ${r.error.message}`);
    if (r.response.bodyPreview) {
      lines.push("");
      lines.push("```text");
      lines.push(r.response.bodyPreview);
      lines.push("```");
    }
    lines.push("");
  }

  writeFileSync(summaryPath, lines.join("\n"));
  console.log(`Wrote audit artifacts to ${runDir}`);
}

function upsertResultInJson(resultsJsonPath: string, newResult: AuditResult): AuditRunOutput {
  const resolvedPath = path.resolve(process.cwd(), resultsJsonPath);
  let existingResults: AuditResult[] = [];
  let existingRunId = new Date().toISOString().replaceAll(":", "-");

  if (existsSync(resolvedPath)) {
    const raw = readFileSync(resolvedPath, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      existingResults = parsed as AuditResult[];
    } else if (
      typeof parsed === "object" &&
      parsed !== null &&
      "results" in parsed &&
      Array.isArray((parsed as { results: unknown }).results)
    ) {
      const p = parsed as AuditRunOutput;
      existingResults = p.results;
      existingRunId = p.runId ?? existingRunId;
    } else if (
      typeof parsed === "object" &&
      parsed !== null &&
      "results" in parsed &&
      typeof (parsed as { results: unknown }).results === "object" &&
      (parsed as { results: unknown }).results !== null
    ) {
      const map = (parsed as { results: Record<string, AuditResult> }).results;
      existingResults = Object.values(map);
      existingRunId = (parsed as { runId?: string }).runId ?? existingRunId;
    } else if (typeof parsed === "object" && parsed !== null) {
      // Support direct map format: { [skillName]: AuditResult }
      const values = Object.values(parsed as Record<string, unknown>).filter(
        (v): v is AuditResult =>
          typeof v === "object" &&
          v !== null &&
          "skill" in v &&
          "status" in v &&
          "request" in v &&
          "response" in v
      );
      existingResults = values;
    } else {
      throw new Error(`Unsupported results JSON format at ${resolvedPath}`);
    }

    if (existingResults.length === 0) {
      throw new Error(
        `Refusing to overwrite ${resolvedPath}: existing file was parsed but no results were found`
      );
    }

    copyFileSync(resolvedPath, `${resolvedPath}.bak`);
  }

  const idx = existingResults.findIndex((r) => r.skill === newResult.skill);
  if (idx === -1) {
    existingResults.push(newResult);
  } else {
    existingResults[idx] = newResult;
  }

  existingResults.sort((a, b) => a.skill.localeCompare(b.skill));
  const updated = buildRunOutput(existingResults, existingRunId);
  writeFileSync(resolvedPath, JSON.stringify(updated, null, 2));
  return updated;
}

function extractPaymentTxHash(res: Response): string | null {
  for (const name of X402_TX_HASH_HEADERS) {
    const v = res.headers.get(name);
    if (v) return v;
  }
  return null;
}

function parsePaymentRequirements(res: Response, responseBody: string): unknown {
  try {
    return JSON.parse(responseBody);
  } catch {
    const interestingHeaders = Object.fromEntries(
      Array.from(res.headers.entries()).filter(([name]) =>
        name.startsWith("x-payment") ||
        name.startsWith("payment-") ||
        name.startsWith("x-402") ||
        name === "www-authenticate"
      )
    );
    return {
      statusCode: res.status,
      headers: interestingHeaders,
      bodyPreview: responseBody.slice(0, MAX_PREVIEW_CHARS),
    };
  }
}

function writeEndpointManifest(skills: SkillEntry[], resolvedBySkill: Map<string, ResolvedSkillEntry>) {
  const manifestPath = path.join(REPO_ROOT, "scripts", "skill-endpoints.json");
  writeFileSync(
    manifestPath,
    JSON.stringify(
      skills.map((s) => {
        const resolved = resolvedBySkill.get(s.skill);
        return {
          skill: s.skill,
          upstreamHost: s.upstreamHost,
          baseUrl: s.baseUrl,
          preferredEndpointIndex: s.preferredEndpointIndex ?? null,
          selectedEndpointIndex: resolved?.selectedEndpointIndex ?? null,
          selectedTestEndpoint: resolved?.testEndpoint ?? null,
          testEndpoints: s.testEndpoints,
        };
      }),
      null,
      2
    )
  );
  console.log(`Wrote endpoint manifest to ${manifestPath}`);
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseCliOptions();
  console.log("Parsing skills...");
  const skills = applyOverrides(parseSkills(), opts.overridesPath);
  console.log(`Found ${skills.length} skills with testable endpoints`);

  let targetSkills = skills;
  if (opts.skill) {
    const hit = skills.find((s) => s.skill === opts.skill);
    if (!hit) {
      console.error(`ERROR: skill "${opts.skill}" not found`);
      process.exit(1);
    }
    targetSkills = [hit];
    console.log(`Single-skill mode: ${opts.skill}`);
  }

  console.log("Resolving best endpoint per skill...");
  const endpointResolved = await runWithConcurrency(
    targetSkills,
    Math.min(CONCURRENCY, targetSkills.length || 1),
    (skill) => resolveSkillEndpoint(skill),
    (skill) => skill.upstreamHost
  );
  const resolvedBySkill = new Map(endpointResolved.map((s) => [s.skill, s]));
  const resolvedTargetSkills = targetSkills.map((s) => {
    const resolved = resolvedBySkill.get(s.skill);
    if (!resolved) throw new Error(`Failed to resolve endpoint for skill: ${s.skill}`);
    return resolved;
  });
  writeEndpointManifest(skills, resolvedBySkill);

  console.log("\nSetting up x402 client...");
  const x402Fetch = setupX402Fetch();

  const effectiveConcurrency = opts.skill ? 1 : CONCURRENCY;
  console.log(`Running audit with concurrency=${effectiveConcurrency}...\n`);
  const total = resolvedTargetSkills.length;
  let started = 0;
  let completed = 0;
  let inFlight = 0;
  const results = await runWithConcurrency(resolvedTargetSkills, effectiveConcurrency, async (skill) => {
    started += 1;
    inFlight += 1;
    logProgressStart(started, total, skill, inFlight);
    const result = await auditSkill(skill, x402Fetch);
    completed += 1;
    inFlight -= 1;
    logProgressDone(completed, total, result, inFlight);
    return result;
  }, (skill) => skill.upstreamHost);

  if (opts.skill) {
    console.log("Single row result:");
    printReport(results);

    if (opts.resultsJsonPath) {
      const updated = upsertResultInJson(opts.resultsJsonPath, results[0]);
      console.log(`Updated results JSON: ${path.resolve(process.cwd(), opts.resultsJsonPath)}`);
      console.log("\nFull report from updated JSON:");
      printReport(updated.results);
    } else if (opts.outputJsonPath) {
      writeArtifactsWithOutput(results, opts.outputJsonPath);
    }
  } else {
    printReport(results);
    writeArtifactsWithOutput(results, opts.outputJsonPath);
  }

  const hasFails = results.some((r) => r.status === "FAIL" || r.status === "TIMEOUT");
  process.exit(hasFails ? 1 : 0);
}

main();
