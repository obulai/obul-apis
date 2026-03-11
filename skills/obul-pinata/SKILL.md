---
name: obul-pinata
description: 'USE THIS SKILL WHEN: the user wants to pin files to IPFS, upload content
  to IPFS, or retrieve files by CID. Provides pay-per-use IPFS pinning and retrieval
  via Pinata through the Obul proxy.'
endpoints:
- path: /v1/pin/public
  method: POST
  price: $0.10 per GB/year
  description: Pin a file to the public IPFS network
- path: /v1/pin/private
  method: POST
  price: $0.10 per GB/year
  description: Pin a file to the private IPFS network
- path: /v1/retrieve/private/{cid}
  method: GET
  price: $0.0001
  description: Retrieve a privately pinned file by CID
metadata:
  obul-skill:
    emoji: 📌
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: pinata
---

# Pinata

Pinata provides pay-per-use IPFS pinning and retrieval — upload files to the decentralized web and retrieve them by
content identifier (CID). Through the Obul proxy, each request is paid individually via x402 — no Pinata account or
API key required. Pin files to the public IPFS network or retrieve privately pinned content with a single API call.

## Authentication

All requests route through the Obul proxy. Include your Obul API key in every request:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Base URL: `https://proxy.obul.ai/proxy/https/402.pinata.cloud`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Pin a File to Public IPFS

Upload and pin a file to Pinata's public IPFS network. The endpoint returns a presigned upload URL — first request the
URL by specifying the file size, then upload the file to the returned URL using a multipart form POST.

**Pricing:** $0.10 per GB per year

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/402.pinata.cloud/v1/pin/public",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "fileSize": 1048576
  }
}
```

**Response:** JSON object with a `url` field containing a presigned upload URL. Upload your file to this URL as
multipart form data. The file will be pinned to IPFS and accessible via its CID on the public network.

### Pin a File to Private IPFS

Upload and pin a file to Pinata's private IPFS network. Works the same as public pinning but the file is only
accessible through Pinata's private gateway with proper authorization.

**Pricing:** $0.10 per GB per year

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/402.pinata.cloud/v1/pin/private",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "fileSize": 1048576
  }
}
```

**Response:** JSON object with a `url` field containing a presigned upload URL. Upload your file to this URL as
multipart form data. The file will be pinned privately and only retrievable through the retrieve endpoint.

### Retrieve a Private File

Retrieve a privately pinned file by its content identifier (CID). Returns a temporary access URL for downloading the
file.

**Pricing:** $0.0001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/402.pinata.cloud/v1/retrieve/private/{cid}",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with a `url` field containing a temporary presigned URL to access the private file. Use this
URL to download the file content.

## When to Use

- **Decentralized storage** — Store files on IPFS for permanent, content-addressed, decentralized hosting without
  managing your own IPFS node.
- **NFT metadata** — Pin NFT metadata and assets to IPFS so they are permanently accessible and not dependent on any
  single server.
- **Content archiving** — Archive documents, images, or data on IPFS for long-term, tamper-proof storage.
- **File sharing** — Upload files to IPFS and share the CID with others for decentralized, censorship-resistant file
  distribution.
- **Private file storage** — Pin files privately and retrieve them on demand with pay-per-retrieval pricing.

## Best Practices

- **Specify accurate file sizes** — The `fileSize` field determines pricing. Provide the exact file size in bytes to
  avoid overpaying or having the upload rejected.
- **Use public pinning for shared content** — If the file should be publicly accessible on IPFS, use the public pin
  endpoint. Use private pinning only when access control is needed.
- **Save the CID** — After uploading to the presigned URL, record the returned CID. This is the only way to retrieve
  your file later.
- **Upload promptly to presigned URLs** — Presigned upload URLs expire after a short time. Upload your file immediately
  after receiving the URL.
- **Prefer retrieval for private files** — Public IPFS files can be accessed through any IPFS gateway using their CID.
  The retrieve endpoint is only needed for privately pinned files.
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
