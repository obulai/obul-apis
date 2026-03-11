---
name: obul-scrape-creators
description: 'USE THIS SKILL WHEN: the user wants to extract data from social media
  platforms including TikTok, Instagram, YouTube, Twitter/X, LinkedIn, Facebook, Reddit,
  Pinterest, Threads, Bluesky, Truth Social, Twitch, Kick, Snapchat, and more. Provides
  pay-per-use social media scraping via Scrape Creators through the Obul proxy.'
endpoints:
- path: /v1/tiktok/profile
  method: GET
  price: $0.02
  description: User profile data
- path: /v3/tiktok/profile/videos
  method: GET
  price: $0.02
  description: Videos from a profile (paginate with cursor)
- path: /v2/tiktok/video
  method: GET
  price: $0.02
  description: Video details by URL
- path: /v1/tiktok/video/transcript
  method: GET
  price: $0.02
  description: Video transcript (supports language param)
- path: /v1/tiktok/user/live
  method: GET
  price: $0.02
  description: User's live stream data
- path: /v1/tiktok/video/comments
  method: GET
  price: $0.02
  description: Comments on a video
- path: /v1/tiktok/user/following
  method: GET
  price: $0.02
  description: Accounts a user follows
- path: /v1/tiktok/user/followers
  method: GET
  price: $0.02
  description: Followers of an account
- path: /v1/tiktok/search/users
  method: GET
  price: $0.02
  description: Search users by query
- path: /v1/tiktok/search/hashtag
  method: GET
  price: $0.02
  description: Search videos by hashtag
- path: /v1/tiktok/search/keyword
  method: GET
  price: $0.02
  description: Search videos by keyword
- path: /v1/tiktok/search/top
  method: GET
  price: $0.02
  description: Top search results (photos + videos)
- path: /v1/tiktok/songs/popular
  method: GET
  price: $0.02
  description: Popular songs (may take up to 30s)
- path: /v1/tiktok/creators/popular
  method: GET
  price: $0.02
  description: Popular creators (filter by country, audience, follower count)
- path: /v1/tiktok/videos/popular
  method: GET
  price: $0.02
  description: Popular videos (filter by period, country, sort by likes/views)
- path: /v1/tiktok/hashtags/popular
  method: GET
  price: $0.02
  description: Popular hashtags (filter by period, country)
- path: /v1/tiktok/song
  method: GET
  price: $0.02
  description: Song details by ID or URL
- path: /v1/tiktok/song/videos
  method: GET
  price: $0.02
  description: TikToks using a specific song
- path: /v1/tiktok/get-trending-feed
  method: GET
  price: $0.02
  description: Trending feed
- path: /v1/tiktok/shop/search
  method: GET
  price: $0.02
  description: Search TikTok Shop products
- path: /v1/tiktok/shop/products
  method: GET
  price: $0.02
  description: Products from a shop (paginate with cursor)
- path: /v1/tiktok/product
  method: GET
  price: $0.02
  description: Product details including stock amount
- path: /v1/tiktok/shop/product/reviews
  method: GET
  price: $0.02
  description: Product reviews (100 per page, use cursor)
- path: /v1/instagram/profile
  method: GET
  price: $0.02
  description: Full profile with recent posts and related accounts
- path: /v1/instagram/basic-profile
  method: GET
  price: $0.02
  description: Basic profile by user ID
- path: /v2/instagram/user/posts
  method: GET
  price: $0.02
  description: User's public posts (video view counts may be unreliable)
- path: /v1/instagram/post
  method: GET
  price: $0.02
  description: Post/reel details by URL
- path: /v2/instagram/media/transcript
  method: GET
  price: $0.02
  description: Transcript of a post or reel
- path: /v2/instagram/reels/search
  method: GET
  price: $0.02
  description: Search reels by keyword (via Google, IG restricts search)
- path: /v2/instagram/post/comments
  method: GET
  price: $0.02
  description: Comments on a post or reel
- path: /v1/instagram/user/reels
  method: GET
  price: $0.02
  description: All public reels from a profile
- path: /v1/instagram/user/highlights
  method: GET
  price: $0.02
  description: Story highlights from a user
- path: /v1/instagram/user/highlight/detail
  method: GET
  price: $0.02
  description: Details of a specific story highlight
- path: /v1/instagram/user/embed
  method: GET
  price: $0.02
  description: HTML embed code for a user's profile
- path: /v1/youtube/channel
  method: GET
  price: $0.02
  description: Channel info (accepts channelId, handle, or URL)
- path: /v1/youtube/channel-videos
  method: GET
  price: $0.02
  description: All videos from a channel
- path: /v1/youtube/channel/shorts
  method: GET
  price: $0.02
  description: Shorts from a channel
- path: /v1/youtube/video
  method: GET
  price: $0.02
  description: Video/short details including transcript
- path: /v1/youtube/video/transcript
  method: GET
  price: $0.02
  description: Video transcript (supports language param)
- path: /v1/youtube/search
  method: GET
  price: $0.02
  description: Search videos, channels, playlists, shorts, lives
- path: /v1/youtube/search/hashtag
  method: GET
  price: $0.02
  description: Search by hashtag (paginate with continuationToken)
- path: /v1/youtube/video/comments
  method: GET
  price: $0.02
  description: Video comments (~1k top, ~7k newest)
- path: /v1/youtube/shorts/trending
  method: GET
  price: $0.02
  description: ~48 trending shorts (paginate with continuationToken)
- path: /v1/youtube/playlist
  method: GET
  price: $0.02
  description: Videos in a playlist
- path: /v1/youtube/community-post
  method: GET
  price: $0.02
  description: Community post details
- path: /v1/twitter/profile
  method: GET
  price: $0.02
  description: Profile information
- path: /v1/twitter/user-tweets
  method: GET
  price: $0.02
  description: Tweets from a user
- path: /v1/twitter/tweet
  method: GET
  price: $0.02
  description: Tweet details
- path: /v1/twitter/tweet/transcript
  method: GET
  price: $0.02
  description: Transcript of video tweet
- path: /v1/twitter/community
  method: GET
  price: $0.02
  description: Community details
- path: /v1/twitter/community/tweets
  method: GET
  price: $0.02
  description: Tweets from a community
- path: /v1/linkedin/profile
  method: GET
  price: $0.02
  description: Person's public profile with recent posts
- path: /v1/linkedin/company
  method: GET
  price: $0.02
  description: Company page
- path: /v1/linkedin/company/posts
  method: GET
  price: $0.02
  description: Company posts (max 7 pages, LinkedIn limitation)
- path: /v1/linkedin/post
  method: GET
  price: $0.02
  description: Post or article details
- path: /v1/linkedin/ads/search
  method: GET
  price: $0.02
  description: Search LinkedIn Ad Library
- path: /v1/linkedin/ad
  method: GET
  price: $0.02
  description: Ad details by ID
- path: /v1/facebook/profile
  method: GET
  price: $0.02
  description: Public profile information
- path: /v1/facebook/profile/reels
  method: GET
  price: $0.02
  description: Page reels (10 per page, paginate with next_page_id)
- path: /v1/facebook/profile/photos
  method: GET
  price: $0.02
  description: Page photos (paginate with next_page_id, cursor)
- path: /v1/facebook/profile/posts
  method: GET
  price: $0.02
  description: Public profile posts
- path: /v1/facebook/group/posts
  method: GET
  price: $0.02
  description: Public group posts (3 at a time, Facebook API limit)
- path: /v1/facebook/post
  method: GET
  price: $0.02
  description: Post or reel by URL
- path: /v1/facebook/post/transcript
  method: GET
  price: $0.02
  description: Transcript of a video post/reel
- path: /v1/facebook/post/comments
  method: GET
  price: $0.02
  description: Comments on a post or reel
- path: /v1/facebook/adLibrary/ad
  method: GET
  price: $0.02
  description: Ad details by ID
- path: /v1/facebook/adLibrary/search/ads
  method: GET
  price: $0.02
  description: Search Meta Ad Library (~1,500 results max)
- path: /v1/facebook/adLibrary/company/ads
  method: GET
  price: $0.02
  description: All running ads for a company by pageId
- path: /v1/facebook/adLibrary/search/companies
  method: GET
  price: $0.02
  description: Search companies to get ad library page ID
- path: /v1/google/search
  method: GET
  price: $0.02
  description: Google search results
- path: /v1/google/company/ads
  method: GET
  price: $0.02/$0.50
  description: Company ads (get_ad_details=true costs 25 credits)
- path: /v1/google/ad
  method: GET
  price: $0.02
  description: Ad details (uses OCR for text extraction)
- path: /v1/google/adLibrary/advertisers/search
  method: GET
  price: $0.02
  description: Search Ad Transparency Library for advertiser IDs
- path: /v1/reddit/subreddit/details
  method: GET
  price: $0.02
  description: Subreddit info (name is case-sensitive, e.g. AskReddit)
- path: /v1/reddit/subreddit
  method: GET
  price: $0.02
  description: Recent posts from a subreddit
- path: /v1/reddit/subreddit/search
  method: GET
  price: $0.02
  description: Search within a subreddit
- path: /v1/reddit/post/comments
  method: GET
  price: $0.02
  description: Post comments
- path: /v1/reddit/search
  method: GET
  price: $0.02
  description: Search Reddit for posts
- path: /v1/reddit/ads/search
  method: GET
  price: $0.02
  description: Search Reddit Ad Library
- path: /v1/reddit/ad
  method: GET
  price: $0.02
  description: Ad details by ID
- path: /v1/threads/profile
  method: GET
  price: $0.02
  description: Profile info
- path: /v1/threads/user/posts
  method: GET
  price: $0.02
  description: User posts (~20-30 most recent, Threads limitation)
- path: /v1/threads/post
  method: GET
  price: $0.02
  description: Post details with comments and related posts
- path: /v1/threads/search/users
  method: GET
  price: $0.02
  description: Search for users by username
- path: /bluesky/profile
  method: GET
  price: $0.02
  description: Profile info
- path: /bluesky/user/posts
  method: GET
  price: $0.02
  description: User posts (use userId for faster response)
- path: /bluesky/post
  method: GET
  price: $0.02
  description: Post details
- path: /v1/truthsocial/profile
  method: GET
  price: $0.02
  description: Profile info
- path: /v1/truthsocial/user/posts
  method: GET
  price: $0.02
  description: User posts (only prominent public profiles viewable as of 2025)
- path: /v1/truthsocial/post
  method: GET
  price: $0.02
  description: Post details
- path: /v1/pinterest/search
  method: GET
  price: $0.02
  description: Search Pinterest
- path: /v1/pinterest/pin
  method: GET
  price: $0.02
  description: Pin details
- path: /v1/pinterest/user/boards
  method: GET
  price: $0.02
  description: User's boards
- path: /v1/pinterest/board
  method: GET
  price: $0.02
  description: Pins from a board
- path: /v1/twitch/profile
  method: GET
  price: $0.02
  description: Profile info
- path: /v1/twitch/clip
  method: GET
  price: $0.02
  description: Clip details
- path: /v1/kick/clip
  method: GET
  price: $0.02
  description: Kick clip details
- path: /v1/snapchat/profile
  method: GET
  price: $0.02
  description: Snapchat profile info
- path: /v1/linktree
  method: GET
  price: $0.02
  description: Linktree page
- path: /v1/komi
  method: GET
  price: $0.02
  description: Komi page
- path: /v1/pillar
  method: GET
  price: $0.02
  description: Pillar page
- path: /v1/linkbio
  method: GET
  price: $0.02
  description: lnk.bio page
- path: /v1/linkme
  method: GET
  price: $0.02
  description: Linkme profile
- path: /v1/amazon/shop
  method: GET
  price: $0.02
  description: Amazon Shop page (products and details)
- path: /v1/detect-age-gender
  method: GET
  price: $0.02
  description: AI-powered age and gender detection from profile images
metadata:
  obul-skill:
    emoji: 📱
    requires:
      env:
      - OBUL_API_KEY
    primaryEnv: OBUL_API_KEY
registries: {}
provider: x402endpoints
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
9. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
