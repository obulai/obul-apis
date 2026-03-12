---
name: obul-cnvrting
description: "USE THIS SKILL WHEN: the user wants to transcribe audio or video, extract text from images via OCR, or analyze live streams. Provides pay-per-use transcription and image analysis via cnvrt.ing through the Obul proxy."
homepage: https://cnvrt.ing
metadata:
  obul-skill:
    emoji: "🔄"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# cnvrt.ing

cnvrt.ing provides AI-powered transcription and image analysis for media from over 1000 platforms including YouTube,
TikTok, Instagram, Twitter, and more. Through the Obul proxy, each request is paid individually via x402 — no account
or API key required. Supports audio and video transcription via OpenAI Whisper, and image analysis via GPT-4o Vision.

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

Base URL: `https://proxy.obul.ai/proxy/https/cnvrt.ing`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Transcribe Audio or Video

Transcribe audio or video content to text using OpenAI Whisper with 95%+ accuracy. Provide a URL to any supported
platform and receive a full text transcription.

**Pricing:** $0.025

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/cnvrt.ing/api/transcribe",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://www.youtube.com/watch?v=VIDEO_ID"
  }
}
```

**Response:** JSON object with the transcribed text content. Includes the full transcription of the audio or video.

### Analyze Image (OCR and Object Detection)

Extract text via OCR and detect objects in images using GPT-4o Vision. Provide a URL to an image and receive structured
analysis results.

**Pricing:** $0.005

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/cnvrt.ing/api/analyze-image",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://example.com/image.png"
  }
}
```

**Response:** JSON object containing extracted text (OCR) and detected objects from the image.

### Detect Format

Identify the format and metadata of a media URL before converting. Useful for determining what formats are available
and estimating conversion costs.

**Pricing:** $0.00 (free)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/cnvrt.ing/api/detect-format",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://www.youtube.com/watch?v=VIDEO_ID"
  }
}
```

**Response:** JSON object with the detected format, resolution, duration, and other metadata about the media.

### Estimate Cost

Pre-flight cost estimation for paid operations like transcription and image analysis. Check the price before committing
to a paid request.

**Pricing:** $0.00 (free)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/cnvrt.ing/api/estimate-cost",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://www.youtube.com/watch?v=VIDEO_ID",
    "operation": "transcribe"
  }
}
```

**Response:** JSON object with the estimated cost in USDC for the requested operation.

## Endpoint Pricing Reference

| Endpoint                    | Price   | Purpose                                              |
|-----------------------------|---------|------------------------------------------------------|
| `POST /api/transcribe`     | $0.025  | Transcribe audio/video to text via OpenAI Whisper    |
| `POST /api/analyze-image`  | $0.005  | OCR and object detection via GPT-4o Vision           |
| `POST /api/detect-format`  | $0.00   | Detect format and metadata of a media URL            |
| `POST /api/estimate-cost`  | $0.00   | Estimate cost for a paid operation                   |
| `POST /api/convertlive`    | $0.05   | Real-time live stream analysis with transcription    |
| `POST /api/validate`       | $0.00   | Pre-flight URL validation                            |

## When to Use

- **Transcription** — Convert spoken content in videos or audio files to text with high accuracy, useful for meeting
  notes, podcast transcripts, or content indexing.
- **Image analysis** — Extract text from images via OCR or detect objects in photographs, screenshots, or documents.
- **Content research** — Transcribe video content for research, summarization, or knowledge base building.
- **Live stream analysis** — Real-time transcription and analysis of live streams.

## Best Practices

- **Use detect-format first** — Call `/api/detect-format` before transcription to understand the source media's
  properties and duration.
- **Use estimate-cost for paid operations** — Call `/api/estimate-cost` before transcription or image analysis to check
  pricing, especially for long media files.
- **Prefer transcribe over manual extraction** — For audio or video content, use the transcription endpoint rather than
  downloading and processing locally. The Whisper-based transcription is fast and accurate.

## Error Handling

| Error                       | Cause                                    | Solution                                                                                   |
|-----------------------------|------------------------------------------|--------------------------------------------------------------------------------------------|
| `402 Payment Required`      | Payment not processed or insufficient    | Verify your OBUL_API_KEY is valid and your account has sufficient balance at my.obul.ai.   |
| `400 Bad Request`           | Missing or invalid request body          | Ensure `url` is provided and is a valid, accessible URL. Check `format` is supported.      |
| `404 Not Found`             | URL content not found on platform        | Verify the URL is correct and the content is still available on the source platform.       |
| `415 Unsupported Media`     | Format not supported for conversion      | Check supported formats. Use `/api/detect-format` to see available options.                |
| `429 Too Many Requests`     | Rate limit exceeded                      | Add a short delay between requests. Avoid rapid-fire conversion calls.                     |
| `500 Internal Server Error` | Upstream service issue                   | Wait a few seconds and retry. If persistent, the service may be experiencing downtime.     |
| `504 Gateway Timeout`       | Media processing took too long           | The source file may be too large. Try a shorter clip or lower quality setting.              |
