# Vercel Registrar API (Free Domain Availability & Pricing)

Vercel provides a REST API endpoint for domain search, availability, and live registration/renewal pricing.

---

## Endpoint Specification

- **Endpoint**: `POST https://api.vercel.com/v1/registrar/domains/search`
- **Authentication**: Bearer Token (`Authorization: Bearer <VERCEL_TOKEN>`)
- **Content-Type**: `application/json`
- **Batch Size**: 1 – 200 domains per request

---

## Request Format

```json
{
  "domains": [
    "prohor.dev",
    "myawesomeprohortest123.com",
    "google.com",
    "prohorbangladesh2026.xyz"
  ]
}
```

---

## Live Response Output

```json
{
  "results": [
    {
      "domain": "prohor.dev",
      "available": false
    },
    {
      "domain": "myawesomeprohortest123.com",
      "available": true,
      "years": 1,
      "price": 11.25,
      "renewalPrice": 11.25,
      "premium": false
    },
    {
      "domain": "google.com",
      "available": false
    },
    {
      "domain": "prohorbangladesh2026.xyz",
      "available": true,
      "years": 1,
      "price": 1.99,
      "renewalPrice": 13,
      "premium": false
    }
  ]
}
```

---

## Response Field Schema

| Field | Type | Description |
| :--- | :--- | :--- |
| `domain` | String | The queried domain name. |
| `available` | Boolean | `true` if available for registration; `false` if taken. |
| `price` | Number | First-year registration price in USD (present when available). |
| `renewalPrice` | Number | Standard annual renewal price in USD (present when available). |
| `years` | Integer | Minimum registration period in years (typically `1`). |
| `premium` | Boolean | `true` if this is a premium tier registry domain. |
