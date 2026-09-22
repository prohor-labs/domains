# Porkbun API: DNS Records Management

Manage DNS records for any domain registered with Porkbun or utilizing Porkbun DNS.

> [!NOTE]
> Ensure **API Access** is toggled ON for the domain inside the Porkbun Domain Management dashboard before calling DNS endpoints.

---

## 1. Retrieve DNS Records

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/dns/retrieve/{domain}`

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
  "records": [
    {
      "id": "12345678",
      "name": "prohor.dev",
      "type": "A",
      "content": "76.76.21.21",
      "ttl": "600",
      "prio": "0",
      "notes": ""
    }
  ]
}
```

---

## 2. Create DNS Record

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/dns/create/{domain}`

### Request Payload
```json
{
  "apikey": "pk1_...",
  "secretapikey": "sk1_...",
  "name": "www",
  "type": "CNAME",
  "content": "cname.vercel-dns.com",
  "ttl": "600"
}
```

### Response
```json
{
  "status": "SUCCESS",
  "id": 12345679
}
```

---

## 3. Edit DNS Record

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/dns/edit/{domain}/{id}`

### Request Payload
```json
{
  "apikey": "pk1_...",
  "secretapikey": "sk1_...",
  "name": "www",
  "type": "CNAME",
  "content": "cname2.vercel-dns.com",
  "ttl": "300"
}
```

---

## 4. Delete DNS Record

- **Endpoint**: `POST https://api.porkbun.com/api/json/v3/dns/delete/{domain}/{id}`

### Request Payload
```json
{
  "apikey": "pk1_...",
  "secretapikey": "sk1_..."
}
```
