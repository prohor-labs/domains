# Porkbun API: Domain Management

Endpoints for account-level domain inventory, nameserver delegation, and URL forwarding.

---

## 1. List All Domains

Retrieve all domains associated with the account that have API access enabled.

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/domain/listAll`

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
  "domains": [
    {
      "domain": "prohor.dev",
      "status": "ACTIVE",
      "tld": "dev",
      "createDate": "2024-01-15 10:20:30",
      "expireDate": "2027-01-15 10:20:30",
      "securityLock": "1",
      "whoisPrivacy": "1",
      "autoRenew": 1
    }
  ]
}
```

---

## 2. Get Nameservers

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/domain/getNs/{domain}`

### Response
```json
{
  "status": "SUCCESS",
  "ns": [
    "curitiba.ns.porkbun.com",
    "fortaleza.ns.porkbun.com",
    "maceio.ns.porkbun.com",
    "salvador.ns.porkbun.com"
  ]
}
```

---

## 3. Update Nameservers

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/domain/updateNs/{domain}`

### Request Payload
```json
{
  "apikey": "pk1_...",
  "secretapikey": "sk1_...",
  "ns": [
    "ns1.cloudflare.com",
    "ns2.cloudflare.com"
  ]
}
```

---

## 4. URL Forwarding

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/domain/getUrlForwarding/{domain}`
- **Add Forwarding**: `POST https://api.porkbun.com/api/json/v3/domain/addUrlForwarding/{domain}`
