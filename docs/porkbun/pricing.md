# Porkbun API: Pricing Matrix

Retrieves live registration, renewal, and transfer pricing for all 900+ TLDs supported by Porkbun.

---

## Endpoint Specification

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/pricing/get`
- **Authentication**: None required (public endpoint)

---

## Example Request

```bash
curl -X POST "https://api.porkbun.com/api/json/v3/pricing/get"
```

---

## Example JSON Response

```json
{
  "status": "SUCCESS",
  "pricing": {
    "com": {
      "registration": "11.08",
      "renewal": "11.08",
      "transfer": "11.08",
      "coupons": []
    },
    "dev": {
      "registration": "8.75",
      "renewal": "12.87",
      "transfer": "12.87",
      "coupons": []
    },
    "net": {
      "registration": "12.52",
      "renewal": "12.52",
      "transfer": "12.52",
      "coupons": []
    },
    "io": {
      "registration": "28.12",
      "renewal": "51.80",
      "transfer": "51.80",
      "coupons": []
    },
    "ai": {
      "registration": "82.70",
      "renewal": "82.70",
      "transfer": "165.09",
      "coupons": []
    },
    "xyz": {
      "registration": "2.04",
      "renewal": "14.21",
      "transfer": "14.21",
      "coupons": []
    }
  }
}
```

---

## Schema Reference

| Field | Type | Description |
| :--- | :--- | :--- |
| `status` | String | `"SUCCESS"` or `"ERROR"`. |
| `pricing` | Object | Map of TLD extensions to their respective pricing details. |
| `registration` | String (Decimal) | Cost in USD to register a new 1-year domain. |
| `renewal` | String (Decimal) | Cost in USD to renew an existing domain for 1 year. |
| `transfer` | String (Decimal) | Cost in USD to transfer an existing domain from another registrar. |
| `coupons` | Array | Active coupon codes applicable to this TLD. |
