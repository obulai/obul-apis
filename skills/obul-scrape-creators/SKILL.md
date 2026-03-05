---
name: obul-scrape-creators
description: "USE THIS SKILL WHEN: the user wants to extract data from social media platforms including TikTok, Instagram, YouTube, Twitter/X, LinkedIn, Facebook, Reddit, Pinterest, Threads, Bluesky, Truth Social, Twitch, Kick, Snapchat, and more. Provides pay-per-use social media scraping via Scrape Creators through the Obul proxy."
homepage: https://scrapecreators.com
metadata:
  obul-skill:
    emoji: "📱"
    requires:
      env: ["OBUL_API_KEY"]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Scrape Creators

Scrape Creators provides pay-per-use social media data extraction across 22+ platforms. Get profiles, posts, comments,
transcripts, ad libraries, trending content, and more from TikTok, Instagram, YouTube, Twitter/X, LinkedIn, Facebook,
Reddit, Pinterest, Threads, Bluesky, Truth Social, Twitch, Kick, Snapchat, and link-in-bio services. Each request costs
$0.02 (1 credit) with no monthly fees — pay only for what you use through the Obul proxy.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/scrapecreators.x402endpoints.com`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### TikTok Profile

Get a TikTok user's profile data including follower count, bio, and verification status.

**Pricing:** $0.02

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/scrapecreators.x402endpoints.com/v1/tiktok/profile?handle=khaby.lame",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Profile object with username, nickname, follower/following/like counts, bio, avatar URLs, and verification status.

### Instagram Profile

Get public Instagram profile data, recent posts, and related accounts.

**Pricing:** $0.02

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/scrapecreators.x402endpoints.com/v1/instagram/profile?handle=therock",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Profile object with username, full name, bio, follower/following counts, post count, profile picture URL, recent posts, and related accounts.

### YouTube Video Details

Get complete information about a YouTube video or short, including metadata and transcript.

**Pricing:** $0.02

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/scrapecreators.x402endpoints.com/v1/youtube/video?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Video object with title, description, view/like/comment counts, channel info, publish date, duration, thumbnail URLs, and optionally the transcript.

### Twitter/X Profile

Get Twitter/X profile information including stats and metadata.

**Pricing:** $0.02

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/scrapecreators.x402endpoints.com/v1/twitter/profile?handle=elonmusk",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Profile object with username, display name, bio, follower/following counts, tweet count, verification status, join date, and profile/banner image URLs.

### LinkedIn Profile

Get a person's public LinkedIn profile including recent posts. For personal profiles, not company pages.

**Pricing:** $0.02

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/scrapecreators.x402endpoints.com/v1/linkedin/profile?url=https://www.linkedin.com/in/sundarpichai",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Profile object with name, headline, summary, experience, education, skills, location, connections, and recent posts.

## Endpoint Pricing Reference

All endpoints are GET requests. Most cost $0.02 per request (1 credit). Exceptions noted.

### TikTok (19 endpoints)

| Endpoint                             | Price | Purpose                                                        |
| ------------------------------------ | ----- | -------------------------------------------------------------- |
| `GET /v1/tiktok/profile`             | $0.02 | User profile data                                              |
| `GET /v3/tiktok/profile/videos`      | $0.02 | Videos from a profile (paginate with `cursor`)                 |
| `GET /v2/tiktok/video`               | $0.02 | Video details by URL                                           |
| `GET /v1/tiktok/video/transcript`    | $0.02 | Video transcript (supports `language` param)                   |
| `GET /v1/tiktok/user/live`           | $0.02 | User's live stream data                                        |
| `GET /v1/tiktok/video/comments`      | $0.02 | Comments on a video                                            |
| `GET /v1/tiktok/user/following`      | $0.02 | Accounts a user follows                                        |
| `GET /v1/tiktok/user/followers`      | $0.02 | Followers of an account                                        |
| `GET /v1/tiktok/search/users`        | $0.02 | Search users by query                                          |
| `GET /v1/tiktok/search/hashtag`      | $0.02 | Search videos by hashtag                                       |
| `GET /v1/tiktok/search/keyword`      | $0.02 | Search videos by keyword                                       |
| `GET /v1/tiktok/search/top`          | $0.02 | Top search results (photos + videos)                           |
| `GET /v1/tiktok/songs/popular`       | $0.02 | Popular songs (may take up to 30s)                             |
| `GET /v1/tiktok/creators/popular`    | $0.02 | Popular creators (filter by country, audience, follower count) |
| `GET /v1/tiktok/videos/popular`      | $0.02 | Popular videos (filter by period, country, sort by likes/views)|
| `GET /v1/tiktok/hashtags/popular`    | $0.02 | Popular hashtags (filter by period, country)                   |
| `GET /v1/tiktok/song`               | $0.02 | Song details by ID or URL                                      |
| `GET /v1/tiktok/song/videos`        | $0.02 | TikToks using a specific song                                  |
| `GET /v1/tiktok/get-trending-feed`   | $0.02 | Trending feed                                                  |

### TikTok Shop (4 endpoints)

| Endpoint                               | Price | Purpose                                       |
| -------------------------------------- | ----- | --------------------------------------------- |
| `GET /v1/tiktok/shop/search`           | $0.02 | Search TikTok Shop products                   |
| `GET /v1/tiktok/shop/products`         | $0.02 | Products from a shop (paginate with `cursor`)  |
| `GET /v1/tiktok/product`              | $0.02 | Product details including stock amount          |
| `GET /v1/tiktok/shop/product/reviews`  | $0.02 | Product reviews (100 per page, use `cursor`)   |

### Instagram (11 endpoints)

| Endpoint                                  | Price | Purpose                                                   |
| ----------------------------------------- | ----- | --------------------------------------------------------- |
| `GET /v1/instagram/profile`               | $0.02 | Full profile with recent posts and related accounts       |
| `GET /v1/instagram/basic-profile`         | $0.02 | Basic profile by user ID                                  |
| `GET /v2/instagram/user/posts`            | $0.02 | User's public posts (video view counts may be unreliable) |
| `GET /v1/instagram/post`                  | $0.02 | Post/reel details by URL                                  |
| `GET /v2/instagram/media/transcript`      | $0.02 | Transcript of a post or reel                              |
| `GET /v2/instagram/reels/search`          | $0.02 | Search reels by keyword (via Google, IG restricts search) |
| `GET /v2/instagram/post/comments`         | $0.02 | Comments on a post or reel                                |
| `GET /v1/instagram/user/reels`            | $0.02 | All public reels from a profile                           |
| `GET /v1/instagram/user/highlights`       | $0.02 | Story highlights from a user                              |
| `GET /v1/instagram/user/highlight/detail` | $0.02 | Details of a specific story highlight                     |
| `GET /v1/instagram/user/embed`            | $0.02 | HTML embed code for a user's profile                      |

### YouTube (11 endpoints)

| Endpoint                            | Price | Purpose                                                |
| ----------------------------------- | ----- | ------------------------------------------------------ |
| `GET /v1/youtube/channel`           | $0.02 | Channel info (accepts `channelId`, `handle`, or `url`) |
| `GET /v1/youtube/channel-videos`    | $0.02 | All videos from a channel                              |
| `GET /v1/youtube/channel/shorts`    | $0.02 | Shorts from a channel                                  |
| `GET /v1/youtube/video`             | $0.02 | Video/short details including transcript               |
| `GET /v1/youtube/video/transcript`  | $0.02 | Video transcript (supports `language` param)           |
| `GET /v1/youtube/search`            | $0.02 | Search videos, channels, playlists, shorts, lives      |
| `GET /v1/youtube/search/hashtag`    | $0.02 | Search by hashtag (paginate with `continuationToken`)  |
| `GET /v1/youtube/video/comments`    | $0.02 | Video comments (~1k top, ~7k newest)                   |
| `GET /v1/youtube/shorts/trending`   | $0.02 | ~48 trending shorts (paginate with `continuationToken`)|
| `GET /v1/youtube/playlist`          | $0.02 | Videos in a playlist                                   |
| `GET /v1/youtube/community-post`    | $0.02 | Community post details                                 |

### Twitter/X (6 endpoints)

| Endpoint                            | Price | Purpose                  |
| ----------------------------------- | ----- | ------------------------ |
| `GET /v1/twitter/profile`           | $0.02 | Profile information      |
| `GET /v1/twitter/user-tweets`       | $0.02 | Tweets from a user       |
| `GET /v1/twitter/tweet`             | $0.02 | Tweet details            |
| `GET /v1/twitter/tweet/transcript`  | $0.02 | Transcript of video tweet|
| `GET /v1/twitter/community`         | $0.02 | Community details        |
| `GET /v1/twitter/community/tweets`  | $0.02 | Tweets from a community  |

### LinkedIn (6 endpoints)

| Endpoint                         | Price | Purpose                                          |
| -------------------------------- | ----- | ------------------------------------------------ |
| `GET /v1/linkedin/profile`       | $0.02 | Person's public profile with recent posts        |
| `GET /v1/linkedin/company`       | $0.02 | Company page                                     |
| `GET /v1/linkedin/company/posts` | $0.02 | Company posts (max 7 pages, LinkedIn limitation) |
| `GET /v1/linkedin/post`          | $0.02 | Post or article details                          |
| `GET /v1/linkedin/ads/search`    | $0.02 | Search LinkedIn Ad Library                       |
| `GET /v1/linkedin/ad`            | $0.02 | Ad details by ID                                 |

### Facebook (12 endpoints)

| Endpoint                                      | Price | Purpose                                                |
| --------------------------------------------- | ----- | ------------------------------------------------------ |
| `GET /v1/facebook/profile`                    | $0.02 | Public profile information                             |
| `GET /v1/facebook/profile/reels`              | $0.02 | Page reels (10 per page, paginate with `next_page_id`) |
| `GET /v1/facebook/profile/photos`             | $0.02 | Page photos (paginate with `next_page_id`, `cursor`)   |
| `GET /v1/facebook/profile/posts`              | $0.02 | Public profile posts                                   |
| `GET /v1/facebook/group/posts`                | $0.02 | Public group posts (3 at a time, Facebook API limit)   |
| `GET /v1/facebook/post`                       | $0.02 | Post or reel by URL                                    |
| `GET /v1/facebook/post/transcript`            | $0.02 | Transcript of a video post/reel                        |
| `GET /v1/facebook/post/comments`              | $0.02 | Comments on a post or reel                             |
| `GET /v1/facebook/adLibrary/ad`               | $0.02 | Ad details by ID                                       |
| `GET /v1/facebook/adLibrary/search/ads`       | $0.02 | Search Meta Ad Library (~1,500 results max)             |
| `GET /v1/facebook/adLibrary/company/ads`      | $0.02 | All running ads for a company by `pageId`              |
| `GET /v1/facebook/adLibrary/search/companies` | $0.02 | Search companies to get ad library page ID             |

### Google (4 endpoints)

| Endpoint                                      | Price       | Purpose                                              |
| --------------------------------------------- | ----------- | ---------------------------------------------------- |
| `GET /v1/google/search`                       | $0.02       | Google search results                                |
| `GET /v1/google/company/ads`                  | $0.02/$0.50 | Company ads (`get_ad_details=true` costs 25 credits) |
| `GET /v1/google/ad`                           | $0.02       | Ad details (uses OCR for text extraction)            |
| `GET /v1/google/adLibrary/advertisers/search` | $0.02       | Search Ad Transparency Library for advertiser IDs    |

### Reddit (7 endpoints)

| Endpoint                           | Price | Purpose                                                    |
| ---------------------------------- | ----- | ---------------------------------------------------------- |
| `GET /v1/reddit/subreddit/details` | $0.02 | Subreddit info (name is case-sensitive, e.g. `AskReddit`)  |
| `GET /v1/reddit/subreddit`         | $0.02 | Recent posts from a subreddit                              |
| `GET /v1/reddit/subreddit/search`  | $0.02 | Search within a subreddit                                  |
| `GET /v1/reddit/post/comments`     | $0.02 | Post comments                                              |
| `GET /v1/reddit/search`            | $0.02 | Search Reddit for posts                                    |
| `GET /v1/reddit/ads/search`        | $0.02 | Search Reddit Ad Library                                   |
| `GET /v1/reddit/ad`                | $0.02 | Ad details by ID                                           |

### Threads (4 endpoints)

| Endpoint                       | Price | Purpose                                             |
| ------------------------------ | ----- | --------------------------------------------------- |
| `GET /v1/threads/profile`      | $0.02 | Profile info                                        |
| `GET /v1/threads/user/posts`   | $0.02 | User posts (~20-30 most recent, Threads limitation) |
| `GET /v1/threads/post`         | $0.02 | Post details with comments and related posts        |
| `GET /v1/threads/search/users` | $0.02 | Search for users by username                        |

### Bluesky (3 endpoints)

| Endpoint                  | Price | Purpose                                       |
| ------------------------- | ----- | --------------------------------------------- |
| `GET /bluesky/profile`    | $0.02 | Profile info                                  |
| `GET /bluesky/user/posts` | $0.02 | User posts (use `userId` for faster response) |
| `GET /bluesky/post`       | $0.02 | Post details                                  |

### Truth Social (3 endpoints)

| Endpoint                         | Price | Purpose                                                         |
| -------------------------------- | ----- | --------------------------------------------------------------- |
| `GET /v1/truthsocial/profile`    | $0.02 | Profile info                                                    |
| `GET /v1/truthsocial/user/posts` | $0.02 | User posts (only prominent public profiles viewable as of 2025) |
| `GET /v1/truthsocial/post`       | $0.02 | Post details                                                    |

### Pinterest (4 endpoints)

| Endpoint                        | Price | Purpose           |
| ------------------------------- | ----- | ----------------- |
| `GET /v1/pinterest/search`      | $0.02 | Search Pinterest   |
| `GET /v1/pinterest/pin`         | $0.02 | Pin details        |
| `GET /v1/pinterest/user/boards` | $0.02 | User's boards      |
| `GET /v1/pinterest/board`       | $0.02 | Pins from a board  |

### Twitch (2 endpoints)

| Endpoint                 | Price | Purpose      |
| ------------------------ | ----- | ------------ |
| `GET /v1/twitch/profile` | $0.02 | Profile info |
| `GET /v1/twitch/clip`    | $0.02 | Clip details |

### Other Platforms

| Endpoint                    | Price | Purpose                                                 |
| --------------------------- | ----- | ------------------------------------------------------- |
| `GET /v1/kick/clip`         | $0.02 | Kick clip details                                       |
| `GET /v1/snapchat/profile`  | $0.02 | Snapchat profile info                                   |
| `GET /v1/linktree`          | $0.02 | Linktree page                                           |
| `GET /v1/komi`              | $0.02 | Komi page                                               |
| `GET /v1/pillar`            | $0.02 | Pillar page                                              |
| `GET /v1/linkbio`           | $0.02 | lnk.bio page                                            |
| `GET /v1/linkme`            | $0.02 | Linkme profile                                           |
| `GET /v1/amazon/shop`       | $0.02 | Amazon Shop page (products and details)                 |
| `GET /v1/detect-age-gender` | $0.02 | AI-powered age and gender detection from profile images |

## Query Parameter Patterns

Most endpoints follow simple, consistent patterns:

| Pattern             | Parameter            | Example                                                  |
| ------------------- | -------------------- | -------------------------------------------------------- |
| **Profile by handle** | `?handle=username`   | `/v1/tiktok/profile?handle=khaby.lame`                   |
| **Profile by URL**  | `?url=<profile-url>` | `/v1/linkedin/profile?url=https://linkedin.com/in/user`  |
| **Content by URL**  | `?url=<content-url>` | `/v1/youtube/video?url=https://youtube.com/watch?v=abc`  |
| **Search**          | `?query=<term>`      | `/v1/reddit/search?query=artificial+intelligence`        |
| **Hashtag search**  | `?hashtag=<tag>`     | `/v1/tiktok/search/hashtag?hashtag=cooking`              |
| **Keyword search**  | `?keyword=<word>`    | `/v1/tiktok/search/keyword?keyword=dance`                |
| **Pagination**      | `?cursor=<token>`    | `/v3/tiktok/profile/videos?handle=user&cursor=abc123`    |
| **YT Pagination**   | `?continuationToken=`| `/v1/youtube/video/comments?url=...&continuationToken=x` |
| **Transcript lang** | `?language=<code>`   | `/v1/youtube/video/transcript?url=...&language=es`       |
| **Subreddit**       | `?subreddit=<name>`  | `/v1/reddit/subreddit?subreddit=AskReddit`               |

## When to Use

- **Influencer Research**: Analyze creator profiles, follower counts, and engagement across platforms
- **Social Media Monitoring**: Track brand mentions and competitor activity
- **Content Aggregation**: Collect posts, videos, and transcripts from multiple platforms
- **Ad Intelligence**: Monitor competitor advertising via Facebook, Google, LinkedIn, and Reddit ad libraries
- **Trend Analysis**: Discover trending content, popular creators, songs, and hashtags on TikTok
- **E-commerce Research**: Search TikTok Shop products, reviews, and pricing
- **Video Transcription**: Extract transcripts from TikTok, Instagram, YouTube, Twitter, and Facebook videos
- **Lead Research**: Enrich social profiles with link-in-bio data (Linktree, Komi, Pillar, etc.)
- **Reddit Research**: Monitor subreddits, search discussions, and analyze community engagement

## Best Practices

1. **Use handles when available**: Profile endpoints accept `?handle=username` which is simpler than full URLs
2. **Paginate large results**: Use `cursor` or `continuationToken` from responses to fetch additional pages
3. **Use userId for speed**: Instagram and Bluesky endpoints respond faster with `userId` than `handle`
4. **Transcript languages**: Pass `?language=en` (2-letter ISO code) for transcript endpoints — defaults to original language
5. **Reddit case sensitivity**: Subreddit names are case-sensitive (use `AskReddit` not `askreddit`)
6. **Facebook group limits**: Group posts return only 3 at a time due to Facebook API restrictions
7. **LinkedIn company post limits**: Company posts max out at 7 pages due to LinkedIn restrictions
8. **Google ad details pricing**: `/v1/google/company/ads` with `get_ad_details=true` costs $0.50 (25 credits) instead of $0.02

## Error Handling

| Code | Cause              | Solution                                         |
| ---- | ------------------ | ------------------------------------------------ |
| 400  | Invalid parameters | Check handle/URL/query format for the platform   |
| 401  | Missing API key    | Include `x-obul-api-key` header                  |
| 402  | Payment required   | Check Obul account balance at https://my.obul.ai |
| 404  | Content not found  | Profile/post may be private, deleted, or missing |
| 429  | Rate limited       | Implement exponential backoff                    |
| 500  | Server error       | Retry with exponential backoff                   |
