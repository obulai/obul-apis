---
name: obul-cascade-twitter
description: "USE THIS SKILL WHEN: the user wants to search X/Twitter, look up a Twitter user profile, read a specific tweet, browse a user's timeline, get tweet replies, check trending topics, or retrieve community/list information. Provides pay-per-use X/Twitter data via Cascade x402 through the Obul proxy."
homepage: https://twitter.surf.cascade.fyi
metadata:
  obul-skill:
    emoji: "🐦"
    requires:
      env: [ "OBUL_API_KEY" ]
      primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Cascade Twitter x402

Cascade Twitter x402 API provides pay-per-use access to X/Twitter data through the x402 protocol. Search tweets, look up user profiles, read individual tweets, browse user timelines, get replies, check trending topics, and access community/list data. No X/Twitter API key or developer account required — each request is paid individually through the Obul proxy using USDC on Base.

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

Base URL: `https://proxy.obul.ai/proxy/https/twitter.surf.cascade.fyi`

## Common Operations

### Search Tweets

Search X/Twitter for tweets matching a query. Supports advanced search operators like `from:user`, `#hashtag`, `@mention`, and more than 50 operators. Use the `sort` parameter to switch between Top or Latest results.

**Pricing:** $0.002

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/twitter.surf.cascade.fyi/tweets/search?q=x402&sort=Top&limit=10",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Array of tweet objects with id, text, author, engagement metrics (likes, retweets, replies, quotes, impressions), timestamps, and optional media. Includes `meta` with pagination cursor.

### Get User Profile

Fetch a public X/Twitter profile by username or user ID (auto-detects). Returns full profile including bio, location, URL, follower/following counts, tweet count, and profile images.

**Pricing:** $0.001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/twitter.surf.cascade.fyi/users/cascade_fyi",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with user id, username, name, description, location, url, profile_image_url, cover_image_url, verified status, created_at, protected flag, public_metrics (followers, following, tweet, like counts), and pinned_tweet_ids.

### Read Tweet

Retrieve a single tweet by its ID, including full text, author info, engagement metrics, and media. Automatically includes quoted tweet and parent (if reply).

**Pricing:** $0.001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/twitter.surf.cascade.fyi/tweets/2033263360284987625",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with the tweet's id, url, text, created_at, lang, source, conversation_id, author, public_metrics (likes, retweets, replies, quotes, impressions, bookmarks), referenced_tweets, media, and entities.

### Get Tweet Replies

Retrieve paginated replies to a specific tweet. Sortable by Relevance, Latest, or Likes.

**Pricing:** $0.002

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/twitter.surf.cascade.fyi/tweets/2033263360284987625/replies?sort=Latest",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Array of reply tweets with same structure as regular tweets. Includes pagination cursor for fetching more pages.

### Get User Tweets

Fetch recent tweets from a specific user's timeline by username or user ID.

**Pricing:** $0.002

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/twitter.surf.cascade.fyi/users/elonmusk/tweets?include_replies=true",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Array of the user's recent tweets with full metadata. Supports `include_replies` parameter and pagination via cursor.

### Get Trending Topics

Retrieve currently trending topics on X/Twitter by WOEID location ID.

**Pricing:** $0.001

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/twitter.surf.cascade.fyi/trends?woeid=1",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Array of trending topics with name, target, rank, and description.

## Endpoint Pricing Reference

| Endpoint                             | Price  | Purpose                                        |
|--------------------------------------|--------|-----------------------------------------------|
| `GET /tweets/search`                 | $0.002 | Search tweets with advanced operators          |
| `GET /tweets/{id}`                   | $0.001 | Read a single tweet by ID                     |
| `GET /tweets`                        | $0.002 | Batch fetch tweets by IDs                      |
| `GET /tweets/{id}/replies`           | $0.002 | Get replies to a tweet                        |
| `GET /tweets/{id}/quotes`            | $0.002 | Get quote tweets                              |
| `GET /tweets/{id}/thread`             | $0.002 | Get full thread (parent chain + replies)      |
| `GET /tweets/{id}/retweeters`        | $0.002 | Get users who retweeted                       |
| `GET /users/{ref}`                   | $0.001 | Fetch user profile by username or ID           |
| `GET /users`                         | $0.002 | Batch fetch users by IDs                      |
| `GET /users/search`                  | $0.002 | Search users by keyword                       |
| `GET /users/{ref}/tweets`            | $0.002 | Get user's recent tweets                      |
| `GET /users/{ref}/mentions`           | $0.002 | Get tweets mentioning user                    |
| `GET /users/{ref}/followers`         | $0.002 | Get user's followers                           |
| `GET /users/{ref}/following`         | $0.002 | Get who user follows                          |
| `GET /users/{ref}/verified_followers` | $0.002 | Get only verified followers                   |
| `GET /users/relationship`             | $0.001 | Check follow relationship between users       |
| `GET /trends`                        | $0.001 | Get trending topics                           |
| `GET /spaces/{id}`                   | $0.001 | Get Space details                             |
| `GET /communities/{id}`              | $0.001 | Get community info                            |
| `GET /communities/{id}/tweets`       | $0.002 | Get community tweets                          |
| `GET /communities/{id}/members`      | $0.002 | Get community members                         |
| `GET /communities/{id}/moderators`   | $0.002 | Get community moderators                      |
| `GET /communities/search`            | $0.002 | Search community tweets                       |
| `GET /lists/{id}/tweets`             | $0.002 | Get list tweets                               |
| `GET /lists/{id}/members`            | $0.002 | Get list members                              |
| `GET /lists/{id}/followers`          | $0.002 | Get list followers                            |

## When to Use

- **Real-time tweet search** — Find tweets about a topic, token, event, or person using advanced operators without an X/Twitter API key.
- **User research** — Look up public profiles to check follower counts, bios, verification status, and recent activity.
- **Individual tweet lookup** — Read a specific tweet's full text, engagement metrics, and media by ID.
- **Timeline monitoring** — Track what specific accounts are posting by browsing their recent tweets.
- **Thread exploration** — Get full conversation context including parent tweets and all replies.
- **Reply analysis** — Understand engagement and sentiment on specific tweets by retrieving all replies.
- **Trending analysis** — See what's trending on X/Twitter for market sentiment or news monitoring.
- **AI agent social monitoring** — Give autonomous agents on-demand access to X/Twitter data at a predictable per-call cost.
- **Community/ list data** — Access X Communities and Lists for targeted data collection.
- **Low-volume or exploratory use** — When you need occasional X/Twitter data without committing to an API subscription.

## Best Practices

- **Use search operators** — Combine operators like `from:username`, `#hashtag`, `@mention`, `min_retweets:100`, `since:2026-01-01`, and quoted phrases for precise results.
- **Set the right sort mode** — Use `sort=Latest` for real-time results, `sort=Top` for popular tweets.
- **Paginate with cursor** — When results include a `next_cursor` field in meta, pass it as a query parameter to fetch the next page.
- **Use limit on timelines** — Endpoints like `/users/{ref}/tweets` accept `limit` parameter (default varies) to control result count.
- **Include replies when needed** — Use `include_replies=true` on `/users/{ref}/tweets` to get full timeline.
- **Check rate limits** — If you hit 429 errors, add delays between requests.
- **Cache profile data** — User profiles don't change frequently. Cache profile lookups to reduce costs when freshness isn't critical.

## Error Handling

| Error                       | Cause                                       | Solution                                                                                  |
|-----------------------------|---------------------------------------------|-------------------------------------------------------------------------------------------|
| `402 Payment Required`       | Payment not processed or insufficient balance | Verify your OBUL_API_KEY is valid and your account has sufficient balance.                |
| `400 Bad Request`           | Missing or invalid query parameters         | Ensure required parameters are provided and properly formatted.                             |
| `404 Not Found`             | Invalid username, tweet ID, or resource     | Double-check the username exists, tweet ID is correct, or resource is public.            |
| `429 Too Many Requests`     | Rate limit exceeded                         | Add a short delay between requests and avoid unnecessary rapid-fire calls.                |
| `500 Internal Server Error` | Upstream Cascade Twitter service issue     | Wait a few seconds and retry. If persistent, check service status.                         |
