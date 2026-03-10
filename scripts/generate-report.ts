import ExcelJS from "exceljs";
import { readFileSync } from "fs";
import { resolve } from "path";

// --- CLI flags ---
function flag(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const resultsPath = resolve(flag("results", "results.json"));
const endpointsPath = resolve(flag("endpoints", "scripts/skill-endpoints.json"));
const overridesPath = resolve(flag("overrides", "scripts/endpoint-overrides.json"));
const outputPath = resolve(flag("output", "audit-report.xlsx"));

// --- Load data ---
const resultsData = JSON.parse(readFileSync(resultsPath, "utf-8"));
const endpointsData: any[] = JSON.parse(readFileSync(endpointsPath, "utf-8"));
const overridesData: Record<string, any> = JSON.parse(readFileSync(overridesPath, "utf-8"));

// Index endpoints and overrides by skill name
const endpointsBySkill = new Map(endpointsData.map((e) => [e.skill, e]));
const overridesBySkill = new Map(Object.entries(overridesData));

// --- Colors ---
const headerFill: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF1F4E79" },
};
const headerFont: Partial<ExcelJS.Font> = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };

const statusColors: Record<string, string> = {
  PASS: "FF27AE60",
  FAIL: "FFE74C3C",
  TIMEOUT: "FFF39C12",
  SKIP: "FF95A5A6",
};

function styleHeaders(sheet: ExcelJS.Worksheet) {
  const row = sheet.getRow(1);
  row.eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: "middle" };
  });
  row.height = 24;
}

function autoWidth(sheet: ExcelJS.Worksheet) {
  sheet.columns.forEach((col) => {
    let max = 10;
    col.eachCell?.({ includeEmpty: false }, (cell) => {
      const len = String(cell.value ?? "").length;
      if (len > max) max = len;
    });
    col.width = Math.min(max + 3, 80);
  });
}

function jsonCompact(obj: any): string {
  if (obj == null) return "";
  return JSON.stringify(obj);
}

// --- Build workbook ---
async function main() {
  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet("Audit");

  sheet.columns = [
    { header: "Skill", key: "skill" },
    { header: "Upstream Host", key: "upstreamHost" },
    { header: "Result Status", key: "resultStatus" },
    { header: "Request URL", key: "requestUrl" },
    { header: "Result Method", key: "resultMethod" },
    { header: "Request Parameters", key: "preferredEndpoint" },
    { header: "Time (ms)", key: "timeMs" },
    { header: "Response Body", key: "responseBody" },
    { header: "Response Error", key: "error" },
    { header: "Payment Requirements", key: "paymentRequirements" },
  ];

  for (const r of resultsData.results) {
    const ep = endpointsBySkill.get(r.skill);

    // Resolve the preferred endpoint object
    const prefIdx = ep?.preferredEndpointIndex;
    const preferredEp =
      prefIdx != null && ep?.testEndpoints?.[prefIdx]
        ? ep.testEndpoints[prefIdx]
        : null;

    const row = sheet.addRow({
      skill: r.skill,
      upstreamHost: r.upstreamHost,
      requestUrl: r.request?.url ?? "",
      resultMethod: r.request?.method ?? "",
      preferredEndpoint: preferredEp ? jsonCompact(preferredEp) : "",
      resultStatus: r.status,
      timeMs: r.timing?.totalMs ?? "",
      responseBody: r.response?.bodyPreview ?? "",
      error: r.error?.message ?? "",
      paymentRequirements: jsonCompact(r.x402?.paymentRequirements),
    });

    // Color the status cell
    const color = statusColors[r.status];
    if (color) {
      row.getCell("resultStatus").font = { bold: true, color: { argb: color } };
    }
  }

  styleHeaders(sheet);
  autoWidth(sheet);
  sheet.autoFilter = { from: "A1", to: "J1" };

  await wb.xlsx.writeFile(outputPath);
  console.log(`✔ Report written to ${outputPath} (${resultsData.results.length} rows)`);
}

main().catch((err) => {
  console.error("Failed to generate report:", err);
  process.exit(1);
});
