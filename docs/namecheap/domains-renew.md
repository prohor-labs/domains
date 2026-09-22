# Method: `namecheap.domains.renew`

Renews an expiring domain registration for a specified number of years.

---

## Endpoint & Method

- **Command**: `namecheap.domains.renew`
- **HTTP Method**: POST (or GET)

---

## Request Parameters

In addition to [Global Parameters](file:///root/domains.prohor.dev/docs/namecheap/global-parameters.md):

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `DomainName` | String | **Yes** | Domain name to renew (e.g. `example.com`). |
| `Years` | Integer | **Yes** | Number of years to extend the registration. |
| `PromotionCode` | String | No | Promotional coupon code if applicable. |
| `IsPremiumDomain` | Boolean | No | `true` if renewing a premium domain. |
| `PremiumPrice` | Decimal | No | Required renewal price if premium domain. |

---

## Example Request

```http
POST https://api.namecheap.com/xml.response HTTP/1.1
Content-Type: application/x-www-form-urlencoded

ApiUser=myapiuser&ApiKey=0123456789abcdef0123456789abcdef&UserName=myapiuser&Command=namecheap.domains.renew&ClientIp=192.0.2.1&DomainName=example.com&Years=1
```

---

## Example XML Response

```xml
<?xml version="1.0" encoding="utf-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.renew</RequestedCommand>
  <CommandResponse Type="namecheap.domains.renew">
    <DomainRenewResult 
        DomainName="example.com" 
        DomainID="1040523" 
        Renew="true" 
        OrderID="5123413" 
        TransactionID="8923413" 
        ChargedAmount="13.98" />
  </CommandResponse>
  <Server>PHX01APIEXT02</Server>
  <GMTTimeDifference>--4:00</GMTTimeDifference>
  <ExecutionTime>2.102</ExecutionTime>
</ApiResponse>
```
