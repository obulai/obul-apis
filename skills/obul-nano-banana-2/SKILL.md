---
name: obul-nano-banana-2
description: 'USE THIS SKILL WHEN: the user wants to generate images from text prompts
  using Google Gemini 3.1 Flash Image (Nano Banana 2). Combines Pro-level quality
  with Flash speed for fast, high-quality image generation.'
endpoints:
- path: /v1beta/models/gemini-3.1-flash-image-preview:generateContent
  method: POST
  price: $0.05
  description: Image generation (Gemini 3.1)
- path: /v1beta/models
  method: GET
  price: Free
  description: List available models
metadata:
  obul-skill:
    emoji: 🎨
    requires:
      env:
      - OBUL_API_KEY
      primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Nano Banana 2

Generate and edit images using Google Gemini 3.1 Flash Image (Nano Banana 2). Combines Pro-level quality with Flash speed through the Obul proxy. Supports advanced world knowledge, subject consistency, precise text rendering, and rapid iteration. No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/nano-banana-2`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Generate Image

Generate images with Nano Banana 2 (Gemini 3.1 Flash Image). Pro-quality at Flash speed.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nano-banana-2/v1beta/models/gemini-3.1-flash-image-preview:generateContent",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "contents": [{
      "parts": [{"text": "A cute cat wearing a hat"}]
    }],
    "generationConfig": {
      "responseModalities": ["IMAGE"]
    }
  }
}
```

**Response:** JSON with base64-encoded image data.

### List Available Models

List all available Gemini models with their capabilities.

**Pricing:** Free

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nano-banana-2/v1beta/models",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with available models and their capabilities.

## When to Use

- **Text-to-image** — User wants to create images from text descriptions
- **Fast + quality** — User needs both speed and high quality
- **Subject consistency** — User wants consistent subjects across images
- **Text rendering** — User needs precise text in images

## Best Practices

- **Use responseModalities** — Set `["IMAGE"]` for image-only output
- **Specify aspect ratio** — Use `imageConfig.aspectRatio` (1:1, 16:9, etc.)
- **For editing** — Pass source image with `inlineData` plus edit instructions
- **Multi-image composition** — Supports up to 5 characters, 14 objects
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
