---
name: obul-cnvrting
description: "USE THIS SKILL WHEN: the user wants to convert media files, transcribe audio or video, extract text from images via OCR, or download and convert content from YouTube, TikTok, Instagram, or other platforms. Provides pay-per-use media conversion and transcription via cnvrt.ing through the Obul proxy."
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

cnvrt.ing is a universal media conversion and analysis service — convert, transcribe, and analyze media from over 1000
platforms including YouTube, TikTok, Instagram, Twitter, and more. Through the Obul proxy, each request is paid
individually via x402 — no account or API key required. Supports audio, video, and image formats with AI-powered
transcription and image analysis.

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

### Convert Media

Convert media from a URL to a different format. Supports 1000+ platforms including YouTube, TikTok, Instagram, Twitter,
Facebook, Vimeo, Twitch, SoundCloud, Reddit, and more. Output formats include mp3, mp4, wav, aac, flac, ogg, m4a, mov,
mkv, avi, webm, jpg, png, webp, gif, and bmp.

**Pricing:** $0.00 (free)

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/cnvrt.ing/api/convert",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "url": "https://www.youtube.com/watch?v=VIDEO_ID",
    "format": "mp3",
    "quality": "best"
  }
}
```

**Response:** JSON object with the converted media file URL. Download the file from the returned URL.

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
| `POST /api/convert`        | $0.00   | Convert media from 1000+ platforms to any format     |
| `POST /api/transcribe`     | $0.025  | Transcribe audio/video to text via OpenAI Whisper    |
| `POST /api/analyze-image`  | $0.005  | OCR and object detection via GPT-4o Vision           |
| `POST /api/detect-format`  | $0.00   | Detect format and metadata of a media URL            |
| `POST /api/estimate-cost`  | $0.00   | Estimate cost for a paid operation                   |
| `POST /api/convertlive`    | $0.05   | Real-time live stream analysis with transcription    |
| `POST /api/validate`       | $0.00   | Pre-flight URL validation                            |

## When to Use

- **Media downloading** — Download and convert videos or audio from YouTube, TikTok, Instagram, Twitter, and 1000+
  other platforms to common formats like mp3 or mp4.
- **Transcription** — Convert spoken content in videos or audio files to text with high accuracy, useful for meeting
  notes, podcast transcripts, or content indexing.
- **Image analysis** — Extract text from images via OCR or detect objects in photographs, screenshots, or documents.
- **Format conversion** — Convert between audio formats (mp3, wav, flac, aac), video formats (mp4, mkv, webm), or
  image formats (jpg, png, webp).
- **Content research** — Download and transcribe video content for research, summarization, or knowledge base building.

## Best Practices

- **Use detect-format first** — Call `/api/detect-format` before converting to understand the source media's properties
  and available quality levels.
- **Use estimate-cost for paid operations** — Call `/api/estimate-cost` before transcription or image analysis to check
  pricing, especially for long media files.
- **Choose the right quality** — Set `"quality": "best"` for highest quality output, or omit for default quality which
  balances size and fidelity.
- **Use convert for free downloads** — The `/api/convert` endpoint is free, making it ideal for downloading media in
  common formats without cost.
- **Prefer transcribe over manual extraction** — For audio or video content, use the transcription endpoint rather than
  downloading and processing locally. The Whisper-based transcription is fast and accurate.
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


