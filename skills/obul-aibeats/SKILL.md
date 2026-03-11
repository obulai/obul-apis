---
name: obul-aibeats
description: "USE THIS SKILL WHEN: the user wants to generate AI music, create song lyrics, or enhance music prompts. Provides pay-per-use AI music generation, lyric writing, and prompt enhancement via AI Beats through the Obul proxy."
homepage: https://www.aibeats.fun
metadata:
  obul-skill:
    emoji: "🎵"
    requires:
      env: ["OBUL_API_KEY"]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# AI Beats Music Generation

Generate AI music tracks, song lyrics, and enhanced music prompts via AI Beats' x402-enabled endpoints. Create
full-length songs from text descriptions, generate lyrics for any genre or theme, and refine vague ideas into
detailed music prompts. Through the Obul proxy, each request is paid individually — no AI Beats account or API key
required.

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

Base URL: `https://proxy.obul.ai/proxy/https/www.aibeats.fun`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Generate Music

Generate an AI music track from a text prompt. Produces a full audio track based on the description provided,
including genre, mood, instruments, and style. Returns a URL to the generated audio file.

**Pricing:** $0.15

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/www.aibeats.fun/api/x402/music/generate",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "prompt": "Upbeat electronic dance track with synth leads, pulsing bass, and energetic drums at 128 BPM",
    "lyrics": "Optional lyrics to include in the track"
  }
}
```

**Response:** JSON object with the generated music track URL and metadata including duration, format, and generation
details.

### Generate Lyrics

Generate song lyrics for a given theme, genre, or description. Useful as a standalone lyric writing tool or as input
to the music generation endpoint.

**Pricing:** $0.001

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/www.aibeats.fun/api/x402/music/generate-lyrics",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "prompt": "A nostalgic pop ballad about summer memories and growing up"
  }
}
```

**Response:** JSON object with generated lyrics including verses, chorus, and bridge sections formatted for use in
music generation.

### Enhance Music Prompt

Refine a vague or simple music description into a detailed, production-quality prompt optimized for AI music
generation. Use this before calling the music generation endpoint to get better results.

**Pricing:** $0.001

```json
{
  "method": "POST",
  "url": "https://proxy.obul.ai/proxy/https/www.aibeats.fun/api/x402/music/enhance-prompt",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "prompt": "chill lofi beats"
  }
}
```

**Response:** JSON object with an enhanced, detailed prompt that includes specific genre characteristics, instrument
suggestions, tempo, mood descriptors, and production style details optimized for AI music generation.

## Endpoint Pricing Reference

| Endpoint                                | Price   | Purpose                                        |
|-----------------------------------------|---------|------------------------------------------------|
| `POST /api/x402/music/generate`         | $0.15   | Generate a full AI music track from a prompt   |
| `POST /api/x402/music/generate-lyrics`  | $0.001  | Generate song lyrics for a theme or genre      |
| `POST /api/x402/music/enhance-prompt`   | $0.001  | Enhance a vague prompt into a detailed one     |

## When to Use

- **Music creation** — Generate complete AI music tracks from text descriptions for content creation, prototyping, or
  background music.
- **Songwriting assistance** — Generate lyrics for any genre, mood, or theme to use standalone or feed into music
  generation.
- **Prompt refinement** — Turn simple ideas like "happy jazz" into detailed, production-quality prompts that produce
  better music output.
- **Content production pipeline** — Chain enhance-prompt, generate-lyrics, and generate-music together for a full
  end-to-end music production workflow.
- **Cost-effective music generation** — Lyrics and prompt enhancement are extremely cheap ($0.001), so iterate on those
  before committing to the $0.15 music generation call.

## Best Practices

- **Enhance prompts first** — Always call `/api/x402/music/enhance-prompt` before generating music. The $0.001 cost
  is negligible and dramatically improves output quality.
- **Be specific in prompts** — Include genre, tempo (BPM), mood, instruments, and style references for best results.
  Vague prompts produce generic output.
- **Generate lyrics separately** — Use `/api/x402/music/generate-lyrics` to create lyrics, review and edit them, then
  pass them to the music generation endpoint for a more controlled workflow.
- **Chain operations** — For the best results: enhance-prompt ($0.001) -> generate-lyrics ($0.001) -> generate music
  with enhanced prompt + lyrics ($0.15). Total cost: $0.152.
- **Iterate on cheap endpoints** — Prompt enhancement and lyric generation are 150x cheaper than music generation.
  Refine your inputs before generating the final track.
- **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


