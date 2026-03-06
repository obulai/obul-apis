---
name: obul-twit
description: "USE THIS SKILL WHEN: the user wants to search X/Twitter, look up a Twitter user profile, read a specific tweet, browse a user's timeline, explore communities, or check followers/following. Provides pay-per-use X/Twitter data via twit.sh through the Obul proxy."
homepage: https://twit.sh
metadata:
  obul-skill:
    emoji: "🐦"
    requires:
      env: [ "OBUL_API_KEY" ]
    primaryEnv: "OBUL_API_KEY"
registries: {}
---

# Twit

Twit's x402 API provides pay-per-use access to X/Twitter data — search tweets with advanced filters, look up user
profiles, read individual tweets, browse timelines, explore communities, and check followers/following. No X/Twitter API
key or developer account required — each request is paid individually through the Obul proxy.

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

**Base URL:** `https://proxy.obul.ai/proxy/https/x402.twit.sh`

## Common Operations

### Search Tweets

Full-archive tweet search with advanced filters. Supports keywords, phrases, hashtags, user filters, engagement
minimums, and date ranges.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.twit.sh/tweets/search?words=bitcoin&since=2026-03-01",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Array of tweet objects matching the query, each with tweet text, author info, engagement metrics (likes,
retweets, replies), and timestamps. Includes `next_token` for pagination.

### Get User Profile

Fetch a public X/Twitter profile by username, including bio, follower and following counts, and avatar.

**Pricing:** $0.005

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.twit.sh/users/by/username?username=elonmusk",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with the user's display name, username, bio, follower count, following count, tweet count, and
profile image URL.

### Get Tweet

Retrieve a single tweet by its ID, including full text, author info, and engagement metrics.

**Pricing:** $0.0025

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.twit.sh/tweets/by/id?id=1234567890",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** JSON object with the tweet's full text, author details, engagement metrics (likes, retweets, replies,
views), timestamp, and any media attachments.

### Get User Tweets

Fetch recent tweets from a specific user's timeline by username.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.twit.sh/tweets/user?username=vitalikbuterin",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Array of the user's recent tweets, each with tweet text, engagement metrics, and timestamps. Use
`next_token` from the response to paginate through additional results.

### Get Tweet Replies

Retrieve replies to a specific tweet by its ID.

**Pricing:** $0.01

```json
{
  "method": "GET",
  "url": "https://proxy.obul.ai/proxy/https/x402.twit.sh/tweets/replies?id=1234567890",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

**Response:** Array of reply tweets, each with tweet text, author info, engagement metrics, and timestamps. Use
`next_token` to paginate.

## Endpoint Pricing Reference

| Endpoint                    | Price   | Purpose                                |
|-----------------------------|---------|----------------------------------------|
| `GET /users/by/username`    | $0.005  | User profile by username               |
| `GET /users/by/id`          | $0.005  | User profile by numeric ID             |
| `GET /users/search`         | $0.01   | Search users by keyword                |
| `GET /users/followers`      | $0.01   | User's followers (paginated)           |
| `GET /users/following`      | $0.01   | Accounts a user follows (paginated)    |
| `GET /users`                | $0.01   | Bulk lookup up to 50 users             |
| `GET /tweets/by/id`         | $0.0025 | Single tweet by ID                     |
| `GET /tweets/user`          | $0.01   | User's recent tweets                   |
| `GET /tweets/search`        | $0.01   | Full-archive tweet search with filters |
| `GET /tweets`               | $0.01   | Bulk lookup up to 50 tweets            |
| `GET /tweets/replies`       | $0.01   | Replies to a tweet                     |
| `GET /tweets/quote_tweets`  | $0.01   | Quote tweets for a tweet               |
| `GET /tweets/retweeted_by`  | $0.01   | Users who reposted a tweet             |
| `GET /communities/by/id`    | $0.0025 | Community details                      |
| `GET /communities/posts`    | $0.01   | Community top posts                    |
| `GET /communities/members`  | $0.01   | Community members with roles           |

## Search Parameters

The `/tweets/search` endpoint supports these query parameters:

| Parameter     | Description                                      |
|---------------|--------------------------------------------------|
| `words`       | Match any of these words                         |
| `phrase`      | Exact phrase match                               |
| `anyWords`    | Match any of a set of words (OR logic)           |
| `noneWords`   | Exclude tweets containing these words            |
| `hashtags`    | Filter by hashtags                               |
| `from`        | Tweets from a specific user                      |
| `to`          | Tweets directed at a specific user               |
| `mentioning`  | Tweets mentioning a specific user                |
| `minReplies`  | Minimum number of replies                        |
| `minLikes`    | Minimum number of likes                          |
| `minReposts`  | Minimum number of reposts                        |
| `since`       | Start date (YYYY-MM-DD)                          |
| `until`       | End date (YYYY-MM-DD)                            |
| `next_token`  | Pagination token from previous response          |

## When to Use

- **Real-time tweet search** — Find tweets about a topic, token, event, or person with advanced filters and date ranges.
- **User research** — Look up public profiles to check follower counts, bios, and recent activity.
- **Individual tweet lookup** — Read a specific tweet's full text and engagement metrics by ID.
- **Timeline monitoring** — Track what specific accounts are posting by browsing their recent tweets.
- **Conversation threading** — Get all replies and quote tweets for a specific tweet.
- **Community analysis** — Explore X/Twitter communities, their posts, and member lists.
- **Follower/following analysis** — Check who follows a user or who they follow.
- **Bulk data retrieval** — Look up up to 50 users or tweets in a single request.
- **AI agent social monitoring** — Give autonomous agents on-demand access to X/Twitter data at a predictable per-call
  cost.

## Best Practices

- **Use advanced search filters** — Combine `words`, `phrase`, `from`, `minLikes`, and date ranges for precise results
  instead of broad keyword searches.
- **Paginate with next_token** — All list endpoints return a `next_token` when more results are available. Pass it as a
  query parameter to fetch the next page.
- **Use bulk endpoints** — When looking up multiple users or tweets, use `GET /users` or `GET /tweets` with comma-
  separated IDs instead of making individual requests.
- **Cache profile data** — User profiles don't change frequently. Cache profile lookups to reduce costs when freshness
  isn't critical.
- **Filter by engagement** — Use `minLikes`, `minReplies`, and `minReposts` to surface high-signal tweets and filter
  out noise.

## Error Handling

| Error                       | Cause                                       | Solution                                                                                  |
|-----------------------------|---------------------------------------------|-------------------------------------------------------------------------------------------|
| `402 Payment Required`      | Payment not processed or insufficient       | Verify your OBUL_API_KEY is valid and your account has sufficient balance.                 |
| `400 Bad Request`           | Missing or invalid query parameters         | Ensure required parameters like `words` for search are provided and properly formatted.    |
| `404 Not Found`             | Invalid username or tweet ID                | Double-check the username exists or the tweet ID is correct and the tweet is still public.  |
| `429 Too Many Requests`     | Rate limit exceeded                         | Add a short delay between requests and avoid unnecessary rapid-fire calls.                 |
| `500 Internal Server Error` | Upstream twit.sh service issue              | Wait a few seconds and retry. If persistent, check twit.sh status.                         |
