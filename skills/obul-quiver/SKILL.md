---
name: obul-quiver
description: 'USE THIS SKILL WHEN: the user wants to generate SVGs from text prompts,
  vectorize raster images to SVG, or create AI-generated vector graphics. Provides
  AI SVG generation via QuiverAI through the Obul proxy.'
endpoints:
- path: /v1/svgs/generations
  method: POST
  price: $0.30
  description: Generate SVG from text prompt
- path: /v1/svgs/vectorizations
  method: POST
  price: $0.30
  description: Vectorize raster image to SVG
- path: /pricing
  method: GET
  price: $0.00
  description: Current pricing info
- path: /health
  method: GET
  price: $0.00
  description: Health check
- path: /openapi.json
  method: GET
  price: $0.00
  description: OpenAPI 3.1.0 specification
metadata:
  obul-skill:
    emoji: 🎨
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: x402endpoints
---

# Quiver

AI-powered SVG generation and image vectorization service using QuiverAI's Arrow model. Generate scalable vector graphics from text prompts or convert raster images to clean SVG format. Through the Obul proxy, each request is paid individually — no QuiverAI account or API key required.

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

Base URL: `https://proxy.obul.ai/proxy/https/quiver.x402endpoints.com`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Generate SVG from Text

Generate scalable vector graphics from a text description using AI.

**Pricing:** $0.30

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/quiver.x402endpoints.com/v1/svgs/generations",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "prompt": "a minimalist logo of a mountain with a sun rising behind it"
  }
}
```

**Response:** JSON with generated SVG(s) and token usage metadata. Optional parameters: `instructions` (style guidance), `references` (reference images), `n` (number of outputs), `temperature`, `max_output_tokens`.

### Vectorize an Image

Convert a raster image (PNG, JPG, etc.) to clean SVG format using AI.

**Pricing:** $0.30

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/quiver.x402endpoints.com/v1/svgs/vectorizations",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "image": "https://example.com/logo.png"
  }
}
```

**Response:** JSON with vectorized SVG(s) and token usage metadata. The `image` field accepts a URL or base64-encoded image data. Optional parameters: `auto_crop`, `target_size`, `n`, `temperature`.

### Get Pricing

Retrieve current per-endpoint pricing.

**Pricing:** $0.00

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/quiver.x402endpoints.com/pricing",
  "headers": {
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with pricing for each endpoint.

## When to Use

- **Logo generation** — Create vector logos from text descriptions
- **Icon design** — Generate SVG icons for UI components
- **Image vectorization** — Convert raster images to scalable SVG format
- **Illustration** — Create AI-generated vector illustrations
- **Brand assets** — Generate scalable brand graphics programmatically

## Best Practices

- **Be specific in prompts** — Describe colors, style, composition for better results
- **Use instructions** — Add style guidance via the `instructions` parameter for consistent output
- **Provide references** — Pass reference images to guide the AI's style
- **Use vectorization for existing assets** — Convert existing raster logos/icons to clean SVGs
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
