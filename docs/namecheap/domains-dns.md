# DNS Management Methods: `namecheap.domains.dns.*`

Methods for managing domain name server records (A, AAAA, CNAME, MX, TXT, URL forwarding) and nameserver delegation.

---

## 1. `namecheap.domains.dns.getHosts`

Retrieves the complete list of DNS host records for a domain using Namecheap DNS.

### Request Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `SLD` | String | **Yes** | Second Level Domain (e.g., `prohor` for `prohor.dev`). |
| `TLD` | String | **Yes** | Top Level Domain (e.g., `dev`). |

### Example XML Response
```xml
<?xml version="1.0" encoding="utf-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.dns.getHosts</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.getHosts">
    <DomainDNSGetHostsResult Domain="prohor.dev" IsUsingOurDNS="true">
      <host HostId="101" Name="@" Type="A" Address="76.76.21.21" MXPref="10" TTL="1800" />
      <host HostId="102" Name="www" Type="CNAME" Address="cname.vercel-dns.com." MXPref="10" TTL="1800" />
    </DomainDNSGetHostsResult>
  </CommandResponse>
</ApiResponse>
```

---

## 2. `namecheap.domains.dns.setHosts`

Sets DNS host records for the domain.

> [!WARNING]
> **This command OVERWRITES the entire DNS zone.** You must retrieve existing records with `getHosts` and send all desired records in a single request. Any omitted records will be permanently deleted.

### Indexed Request Parameters
Records are passed as 1-indexed parameter groups (`HostName1`, `RecordType1`, `Address1`, `MXPref1`, `TTL1`, `HostName2`, ...):

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `SLD` | String | **Yes** | Second Level Domain (e.g. `example`). |
| `TLD` | String | **Yes** | Top Level Domain (e.g. `com`). |
| `HostName[1...N]` | String | **Yes** | Subdomain name (e.g. `@`, `www`, `api`). |
| `RecordType[1...N]`| String | **Yes** | Record type: `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `URL`, `URL301`, `FRAME`. |
| `Address[1...N]` | String | **Yes** | Target IP, hostname, or text value. |
| `MXPref[1...N]` | Integer | Conditional | Priority preference (required for `MX` records, e.g. `10`). |
| `TTL[1...N]` | Integer | No | Time-to-Live in seconds (e.g. `1800` = 30 min, `300` = 5 min). |

### Example Request
```http
POST https://api.namecheap.com/xml.response HTTP/1.1
Content-Type: application/x-www-form-urlencoded

ApiUser=myuser&ApiKey=mykey&UserName=myuser&Command=namecheap.domains.dns.setHosts&ClientIp=192.0.2.1&SLD=prohor&TLD=dev&HostName1=@&RecordType1=A&Address1=76.76.21.21&TTL1=1800&HostName2=www&RecordType2=CNAME&Address2=cname.vercel-dns.com.&TTL2=1800
```

---

## 3. `namecheap.domains.dns.setCustom`

Delegates domain nameservers to third-party providers (e.g. Cloudflare, AWS Route53).

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `SLD` | String | **Yes** | Second Level Domain. |
| `TLD` | String | **Yes** | Top Level Domain. |
| `Nameservers` | String | **Yes** | Comma-separated list of nameservers (e.g. `ns1.cloudflare.com,ns2.cloudflare.com`). |

---

## 4. `namecheap.domains.dns.setDefault`

Reverts domain back to Namecheap default nameservers to enable DNS host management and email forwarding.

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `SLD` | String | **Yes** | Second Level Domain. |
| `TLD` | String | **Yes** | Top Level Domain. |
