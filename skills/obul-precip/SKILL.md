---
name: obul-precip
description: Hyperlocal weather data API with site-specific rainfall, temperature,
  humidity, wind, soil moisture, and solar radiation data.
endpoints:
- path: /api/v1/hourly
  method: GET
  price: Dynamic
  description: Hourly precipitation
- path: /api/v1/daily
  method: GET
  price: Dynamic
  description: Daily precipitation
- path: /api/v1/last-48
  method: GET
  price: Dynamic
  description: Last 48 hours total
- path: /api/v1/recent-rain
  method: GET
  price: Dynamic
  description: Recent rain event
- path: /api/v1/temperature-hourly
  method: GET
  price: Dynamic
  description: Hourly temperature
- path: /api/v1/wind-speed-hourly
  method: GET
  price: Dynamic
  description: Hourly wind speed
- path: /api/v1/wind-speed-gust-hourly
  method: GET
  price: Dynamic
  description: Hourly wind gusts
- path: /api/v1/wind-direction-hourly
  method: GET
  price: Dynamic
  description: Hourly wind direction
- path: /api/v1/relative-humidity-hourly
  method: GET
  price: Dynamic
  description: Hourly humidity
- path: /api/v1/specific-humidity-hourly
  method: GET
  price: Dynamic
  description: Specific humidity
- path: /api/v1/cloud-cover-hourly
  method: GET
  price: Dynamic
  description: Cloud cover
- path: /api/v1/solar-radiation-hourly
  method: GET
  price: Dynamic
  description: Solar radiation
- path: /api/v1/soil-moisture-hourly
  method: GET
  price: Dynamic
  description: Soil moisture
- path: /api/v1/soil-moisture-daily
  method: GET
  price: Dynamic
  description: Daily soil moisture
- path: /api/v1/temp-0-10cm-hourly
  method: GET
  price: Dynamic
  description: Soil temperature
- path: /api/v1/map/{service}/tile/{z}/{y}/{x}
  method: GET
  price: Dynamic
  description: Map tiles
- path: /embed/location
  method: GET
  price: $0.10
  description: Weather widget
metadata:
  obul-skill: 🌧️
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Precip

Highly accurate, site-specific hyperlocal weather data API. Get rainfall accumulation, temperature, humidity, wind speed, soil moisture, solar radiation, and more for any location.

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

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/precip`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### Get Hourly Precipitation

Returns comprehensive hourly precipitation data.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Returns precipitation amount, type (rain/snow/mixed), probability, and source.

### Get Daily Precipitation

Returns comprehensive daily precipitation data.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/daily?start=2024-01-01&end=2024-01-31&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Last 48 Hours

Total precipitation in the last 48 hours.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/last-48?latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Recent Rain

Get details about the most recent precipitation event.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/recent-rain?latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Returns total amounts, precipitation type, timing, and how long ago.

### Hourly Temperature

Get hourly near-surface air temperature in Celsius.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/temperature-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hourly Wind Speed

Get hourly near-surface wind speed in meters per second.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/wind-speed-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hourly Humidity

Get hourly relative humidity as a percentage.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/relative-humidity-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Soil Moisture

Get hourly soil moisture percentage.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/soil-moisture-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Solar Radiation

Get hourly downward short-wave radiation flux.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/solar-radiation-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hourly Wind Direction

Get hourly wind direction in compass degrees.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/wind-direction-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hourly Wind Gust Speed

Get hourly wind gust speed in meters per second.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/wind-speed-gust-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hourly Cloud Cover

Get hourly cloud cover fraction (0-1).

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/cloud-cover-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Hourly Specific Humidity

Get hourly specific humidity in kg/kg.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/specific-humidity-hourly?start=2024-01-01&end=2024-01-02&latitude=37.7749&longitude=-122.4194",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

### Map Tiles

Get map tiles for visualization in GIS tools.

**Pricing:** Dynamic

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/api/v1/map/last-48/ImageServer/tile/{z}/{y}/{x}",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Compatible with Mapbox, Google Maps, ArcGIS, Leaflet, OpenLayers, and QGIS.

### Weather Widget Embed

Get HTML widget displaying comprehensive weather data.

**Pricing:** $0.10

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/precip/embed/location?lat=37.7749&lon=-122.4194&units=metric",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

## When to Use

- **Weather Monitoring**: Track precipitation and weather at specific locations
- **Agriculture**: Monitor soil moisture and conditions for farming
- **Construction**: Plan around weather conditions
- **Insurance**: Assess weather-related risks
- **Energy**: Forecast solar and wind energy production

## Best Practices

1. **Specify Timezone**: Use timeZoneId for localized timestamps
2. **Multiple Locations**: Can query multiple lat/long at once
3. **Format Selection**: Choose format (json, geojson, csv) as needed
4. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting
