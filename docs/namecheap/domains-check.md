# Method: `namecheap.domains.check`

Checks domain name availability and returns pricing for standard as well as premium domains.

---

## Endpoint & Method

- **Command**: `namecheap.domains.check`
- **HTTP Method**: GET or POST

---

## Request Parameters

In addition to [Global Parameters](file:///root/domains.prohor.dev/docs/namecheap/global-parameters.md):

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `DomainList` | String | **Yes** | Comma-separated list of domain names to check (e.g. `domain1.com,domain2.net,domain3.org`). |

---

## Example Request

```http
GET https://api.namecheap.com/xml.response?ApiUser=your_user&ApiKey=your_key&UserName=your_user&Command=namecheap.domains.check&ClientIp=192.0.2.1&DomainList=example.com,prohor.dev HTTP/1.1
```

---

## Example XML Response

```xml
<?xml version="1.0" encoding="utf-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.check</RequestedCommand>
  <CommandResponse Type="namecheap.domains.check">
    <DomainCheckResult 
        Domain="example.com" 
        Available="false" 
        ErrorNo="0" 
        Description="" 
        IsPremiumName="false" 
        PremiumRegistrationPrice="0" 
        PremiumRenewalPrice="0" 
        PremiumRestorePrice="0" 
        PremiumTransferPrice="0" 
        IcannFee="0" 
        EapFee="0" />
    <DomainCheckResult 
        Domain="prohor.dev" 
        Available="true" 
        ErrorNo="0" 
        Description="" 
        IsPremiumName="false" 
        PremiumRegistrationPrice="0" 
        PremiumRenewalPrice="0" 
        PremiumRestorePrice="0" 
        PremiumTransferPrice="0" 
        IcannFee="0.18" 
        EapFee="0" />
  </CommandResponse>
  <Server>PHX01APIEXT02</Server>
  <GMTTimeDifference>--4:00</GMTTimeDifference>
  <ExecutionTime>0.125</ExecutionTime>
</ApiResponse>
```

---

## Response Attributes

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `Domain` | String | Domain name queried. |
| `Available` | Boolean | `true` if available for registration; `false` if taken or invalid. |
| `IsPremiumName` | Boolean | `true` if the domain is a premium tier domain with special pricing. |
| `PremiumRegistrationPrice` | Decimal | Registration price if premium domain. |
| `PremiumRenewalPrice` | Decimal | Renewal price if premium domain. |
| `IcannFee` | Decimal | Mandatory ICANN fee (usually $0.18 for supported generic TLDs). |
| `EapFee` | Decimal | Early Access Program fee if applicable. |
| `ErrorNo` | Integer | Error number (`0` if success). |
