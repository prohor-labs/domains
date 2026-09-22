# Porkbun API v3 Documentation

Official integration guide for Porkbun API v3.

---

## Base URLs

| Environment | Base URL |
| :--- | :--- |
| **Production API** | `https://api.porkbun.com/api/json/v3/` |
| **Sandbox API** | `https://api.porkbun.com/api/json/v3/` *(using `pk1_sb_...` / `sk1_sb_...` keys)* |
| **Mock Routes** | `https://api.porkbun.com/api/json/v3/mock/` |

---

## Authentication Format

All mutating and account-specific requests must be sent as `POST` requests with a JSON body containing your API credentials:

```json
{
  "apikey": "pk1_xxxxxxxxxxxxxxxxxxxxxxxx",
  "secretapikey": "sk1_xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

---

## Ping / Connection Test

Test your API credentials and retrieve your public IP:

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/ping`

### Request Payload
```json
{
  "apikey": "pk1_...",
  "secretapikey": "sk1_..."
}
```

### Response
```json
{
  "status": "SUCCESS",
  "yourIp": "192.0.2.1"
}
```

---

## API Method Index

1. **[Pricing Matrix](file:///root/domains.prohor.dev/docs/porkbun/pricing.md)**: `POST /api/json/v3/pricing/get` (900+ TLD live prices, no authentication required).
2. **[DNS Management](file:///root/domains.prohor.dev/docs/porkbun/domains-dns.md)**: `dns/create`, `dns/edit`, `dns/delete`, `dns/retrieve`.
3. **[Domain Management](file:///root/domains.prohor.dev/docs/porkbun/domain-management.md)**: `domain/listAll`, `domain/getNs`, `domain/updateNs`, `domain/getUrlForwarding`.
