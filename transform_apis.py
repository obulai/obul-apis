#!/usr/bin/env python3
"""
Transform apis.json to apis-new.json with the following changes:
1. Remove `subcategory` field from all API objects
2. Remove `tag` field from API level (skill-level)
3. Add `tag` field to each endpoint object based on specific rules
"""

import json


def get_twit_tag(path: str) -> str:
    """Get tag for twit API endpoints based on path."""
    # Order matters - check more specific paths first
    
    # x-search patterns (more specific first)
    x_search_patterns = [
        "/tweets/search",
        "/tweets/by/id",
        "/tweets/user",
        "/tweets/replies",
        "/tweets/quote_tweets",
        "/users/search",
        "/communities/by/id",
        "/communities/posts",
    ]
    
    # x-profiles patterns (more specific first)
    x_profiles_patterns = [
        "/users/by/username",
        "/users/by/id",
        "/users/followers",
        "/users/following",
        "/tweets/retweeted_by",
        "/communities/members",
    ]
    
    # Check search patterns first (except for specific user patterns that should be profiles)
    for pattern in x_search_patterns:
        if path.startswith(pattern):
            return "x-search"
    
    # Check profiles patterns
    for pattern in x_profiles_patterns:
        if path.startswith(pattern):
            return "x-profiles"
    
    # Check remaining patterns: /users (bulk lookup) -> x-profiles, /tweets (bulk lookup) -> x-search
    if path == "/users" or path.startswith("/users/"):
        return "x-profiles"
    if path == "/tweets" or path.startswith("/tweets/"):
        return "x-search"
    
    # Default to x-search if no match
    return "x-search"


def get_amadeus_tag(path: str) -> str:
    """Get tag for amadeus API endpoints based on path."""
    if path.startswith("/api/flights/") or path.startswith("/api/transfers/"):
        return "find-flights"
    elif path.startswith("/api/hotels/"):
        return "search-hotels"
    elif path.startswith("/api/activities/") or path.startswith("/api/reference/"):
        return "search-places"
    else:
        return "travel"


def get_endpoint_tag(api: dict, endpoint: dict) -> str:
    """Determine the tag for an endpoint based on API category and skill."""
    category = api.get("category", "")
    skill = api.get("skill", "")
    path = endpoint.get("path", "")
    description = endpoint.get("description", "").lower()
    
    # Social Media Category
    if category == "social-media":
        if skill == "obul-twit":
            return get_twit_tag(path)
        elif skill == "obul-clawapi-x":
            return "x-search"
        elif skill == "obul-stableenrich-grokx":
            return "x-grok-search"
        elif skill == "obul-neynar":
            return "farcaster-search"
        elif skill == "obul-stableenrich-reddit":
            return "reddit-search"
        elif skill == "obul-scrape-creators":
            return "social-scrape"
        else:
            return "social-search"
    
    # Entertainment Category
    elif category == "entertainment":
        if skill == "obul-stabletravel-amadeus":
            return get_amadeus_tag(path)
        elif skill == "obul-stabletravel-flightaware":
            return "find-flights"
        elif skill == "obul-stableenrich-google-maps":
            return "search-places"
        elif "image" in skill or "generation" in description:
            return "image-generation"
        elif "audio" in skill or "tts" in description or "transcribe" in description:
            return "audio-generation"
        elif "video" in skill or "video" in description:
            return "video-generation"
        else:
            return "entertainment"
    
    # Obul Category
    elif category == "obul":
        if "proxy" in skill:
            return "proxy"
        elif "cli" in skill:
            return "cli"
        elif "finder" in skill:
            return "finder"
        elif "optimizer" in skill:
            return "pricing"
        elif "error" in skill:
            return "reference"
        else:
            return "obul"
    
    # Coding Category
    elif category == "coding":
        if skill == "obul-baseten":
            return "chat-completion"
        elif skill == "obul-pinata":
            return "ipfs"
        elif skill == "obul-cnvrting":
            return "media-conversion"
        elif skill == "obul-didit":
            return "auth"
        elif skill == "obul-textbelt":
            return "sms"
        elif skill == "obul-chronos":
            return "timezone"
        elif skill == "obul-browserbase":
            return "browser-automation"
        elif skill == "obul-coingecko":
            return "crypto-data"
        elif skill == "obul-nansen":
            return "blockchain-analytics"
        elif skill == "obul-slamai":
            return "blockchain-trading"
        elif skill == "obul-x402engine-chain":
            return "wallet"
        elif skill == "obul-dome":
            return "prediction-markets"
        elif skill == "obul-spraay":
            return "defi"
        elif skill == "obul-zai":
            return "glm-models"
        else:
            return "coding"
    
    # Productivity Category
    elif category == "productivity":
        # Scraping tools
        if skill in ["obul-x402endpoints-firecrawl", "obul-stableenrich-firecrawl"]:
            if "scrape" in description:
                return "scrape"
            elif "search" in description:
                return "web-search"
            else:
                return "web-scraping"
        elif skill == "obul-minifetch":
            return "metadata"
        elif skill == "obul-x402engine-web":
            if "scrape" in description:
                return "scrape"
            elif "screenshot" in description:
                return "screenshot"
            elif "search" in description:
                return "web-search"
            else:
                return "web-scraping"
        elif skill == "obul-aviato":
            if "company" in description or "person" in description or "social" in description:
                return "enrich"
            else:
                return "search"
        elif skill == "obul-fiber":
            if "linkedin" in description:
                return "linkedin"
            elif "email" in description or "validate" in description:
                return "email"
            else:
                return "enrich"
        elif skill == "obul-notte":
            return "web-scraping"
        elif skill == "obul-olostep":
            return "research"
        elif skill == "obul-riveter":
            return "extraction"
        elif skill == "obul-scrapegraph":
            return "web-scraping"
        elif skill == "obul-andi":
            return "search"
        elif skill == "obul-firecrawl-search":
            return "web-search"
        elif skill in ["obul-ortho-exa", "obul-stableenrich-exa"]:
            return "semantic-search"
        elif skill == "obul-jina":
            return "serp"
        elif skill == "obul-linkup":
            return "citations"
        elif skill == "obul-parallel":
            return "entity-discovery"
        elif skill == "obul-perplexity":
            return "ai-search"
        elif skill == "obul-tavily":
            return "web-research"
        elif skill == "obul-searchapi":
            return "serp"
        elif skill == "obul-valyu":
            return "deep-research"
        elif skill == "obul-sybil":
            return "combined-search"
        elif skill == "obul-geo":
            return "brand-visibility"
        # Lead enrichment tools
        elif skill in ["obul-ortho-apollo", "obul-stableenrich-apollo"]:
            return "enrich"
        elif skill in ["obul-ortho-hunter", "obul-stableenrich-hunter"]:
            return "email"
        elif skill == "obul-brand-dev":
            return "brand"
        elif skill == "obul-coresignal":
            return "recruitment"
        elif skill == "obul-ocean":
            return "discovery"
        elif skill == "obul-openmart":
            return "local-business"
        elif skill == "obul-peopledatalabs":
            return "enrich"
        elif skill == "obul-predictleads":
            return "signals"
        elif skill == "obul-sixtyfour":
            return "enrich"
        elif skill == "obul-tomba":
            return "email"
        elif skill == "obul-logo":
            return "logo"
        elif skill == "obul-stableenrich-clado":
            return "linkedin"
        elif skill == "obul-stableenrich-influencer":
            return "social"
        elif skill == "obul-stableenrich-whitepages":
            return "identity"
        elif skill == "obul-contactout":
            return "contact"
        else:
            return "productivity"
    
    # Default
    return "general"


def transform_apis(input_file: str, output_file: str) -> None:
    """Transform the APIs JSON file according to the requirements."""
    # Read input file
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    # Transform each API
    for api in data.get("apis", []):
        # Remove subcategory field
        if "subcategory" in api:
            del api["subcategory"]
        
        # Remove tag field from API level
        if "tag" in api:
            del api["tag"]
        
        # Add tag to each endpoint
        if "endpoints" in api:
            for endpoint in api["endpoints"]:
                endpoint["tag"] = get_endpoint_tag(api, endpoint)
    
    # Write output file with 2-space indentation
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Transformed {input_file} to {output_file}")


if __name__ == "__main__":
    input_path = "/Users/dpbmaverick98/obul-skills/obul-apis/apis.json"
    output_path = "/Users/dpbmaverick98/obul-skills/obul-apis/apis-new.json"
    transform_apis(input_path, output_path)
