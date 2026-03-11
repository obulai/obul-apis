---
name: obul-nano-banana
description: "USE THIS SKILL WHEN: the user wants to generate images from text prompts, edit images, or create image compositions using Google Gemini. Nano Banana uses Gemini 2.5 Flash for fast, high-quality image generation."
homepage: https://nanobanana.ai
metadata:
  obul-skill:
    emoji: "🎨"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Nano Banana

Generate and edit images using Google Gemini native image generation models. Supports text-to-image, image editing, multi-image composition through the Obul proxy. Two models: gemini-2.5-flash-image (fast) and gemini-3-pro-image-preview (Pro quality). No API key needed — payment is handled automatically.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/nano-banana`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Generate Image (Fast)

Generate images from text prompts using Gemini 2.5 Flash Image.

**Pricing:** $0.05

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nano-banana/v1beta/models/gemini-2.5-flash-image:generateContent",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "contents": [{
      "parts": [{"text": "A cute cat wearing a hat on a beach sunset"}]
    }],
    "generationConfig": {
      "responseModalities": ["IMAGE"]
    }
  }
}
```

**Response:** JSON with base64-encoded image data.

### Generate Image (Pro)

High-quality image generation with thinking capabilities using Gemini 3 Pro.

**Pricing:** $0.15

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nano-banana/v1beta/models/gemini-3-pro-image-preview:generateContent",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "contents": [{
      "parts": [{"text": "A detailed diagram of the solar system"}]
    }],
    "generationConfig": {
      "responseModalities": ["IMAGE"],
      "imageConfig": {
        "outputSize": "2048x2048"
      }
    }
  }
}
```

**Response:** JSON with high-quality base64-encoded image.

### List Available Models

List all available Gemini models with their capabilities.

**Pricing:** Free

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/nano-banana/v1beta/models",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON with available models and their capabilities.

## Endpoint Pricing Reference

| Endpoint                                             | Price  | Purpose                              |
|------------------------------------------------------|--------|-------------------------------------|
| `POST /v1beta/models/gemini-2.5-flash-image:generateContent` | $0.05  | Fast image generation              |
| `POST /v1beta/models/gemini-3-pro-image-preview:generateContent` | $0.15 | High-quality generation |
| `GET /v1beta/models`                                 | Free   | List available models              |

## When to Use

- **Text-to-image** — User wants to create images from text descriptions
- **Image editing** — User wants to edit existing images with new elements
- **Image composition** — User wants to combine multiple images
- **Fast generation** — User needs quick results with gemini-2.5-flash-image
- **High quality** — User needs the best quality with gemini-3-pro-image-preview

## Best Practices

- **Use flash for speed** — gemini-2.5-flash-image is faster and cheaper
- **Use pro for quality** — gemini-3-pro-image-preview offers better quality with thinking
- **Specify aspect ratio** — Use `imageConfig.aspectRatio` for desired dimensions
- **Use grounding** — Add `tools: [{"googleSearch": {}}]` for factual images
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
