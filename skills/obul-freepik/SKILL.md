---
name: obul-freepik
description: "USE THIS SKILL WHEN: the user wants to generate high-quality AI images with realistic, stylized, or editorial styles. Provides pay-per-use AI image generation via Freepik Mystic through the Obul proxy."
homepage: https://www.freepik.com
metadata:
  obul-skill:
    emoji: "🎨"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Freepik

Freepik provides high-quality AI image generation through the Mystic model. Supports multiple art styles, resolutions up to 4K, and advanced controls like style and structure references. No Freepik account needed — payment is handled automatically by the Obul proxy.

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

Base URL: `https://proxy.obul.ai/proxy/https/api.freepik.com`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Mystic Image Generation

Generate an AI image using the Mystic model with customizable style, resolution, and aspect ratio.

**Pricing:** $0.02

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/api.freepik.com/v1/x402/ai/mystic",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "prompt": "A futuristic city at sunset with neon lights reflecting on wet streets",
    "model": "realism",
    "resolution": "2k",
    "aspect_ratio": "widescreen_16_9"
  }
}
```

**Response:** JSON with task status and generated image URLs.

### Higher Quality Generation

Generate with higher detail and quality settings.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/api.freepik.com/v1/x402/ai/mystic",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "prompt": "Professional product photo of a luxury watch on marble surface, studio lighting",
    "model": "super_real",
    "resolution": "4k",
    "hdr": 75,
    "creative_detailing": 50
  }
}
```

**Response:** JSON with task status and generated image URLs.

## Endpoint Pricing Reference

| Endpoint                    | Price   | Purpose                              |
|-----------------------------|---------|--------------------------------------|
| `POST /v1/x402/ai/mystic`  | $0.02-0.05 | AI image generation with Mystic    |

## When to Use

- **AI image generation** — User wants a high-quality, realistic AI-generated image
- **Art styles** — User requests specific art styles (realism, fluid, zen, editorial portraits)
- **High resolution** — User needs high-resolution output (2K or 4K)
- **Fine control** — User wants fine control over aspect ratio, style references, or HDR
- **Freepik specifically** — User asks for Freepik or Mystic specifically

## Best Practices

- **Model selection** — The `model` parameter significantly changes output style: `realism` for photorealistic, `fluid` for artistic, `zen` for minimalist, `super_real` for hyper-realistic
- **Style references** — Style references and LoRAs are ignored when using `fluid`, `flexible`, `super_real`, or `editorial_portraits` models
- **Write detailed prompts** — For best results, write detailed prompts describing subject, style, lighting, and composition
- **Resolution options** — Available: `1k`, `2k`, `4k`
- **Aspect ratios** — Available: `square_1_1`, `widescreen_16_9`, `social_story_9_16`, `traditional_3_4`
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
