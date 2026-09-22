# Method: `namecheap.domains.create`

Registers a new domain name with contact details and optional custom nameservers or privacy protection.

---

## Endpoint & Method

- **Command**: `namecheap.domains.create`
- **HTTP Method**: **POST** (Strongly recommended due to parameter count)

---

## Request Parameters

In addition to [Global Parameters](file:///root/domains.prohor.dev/docs/namecheap/global-parameters.md):

### Domain Attributes

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `DomainName` | String | **Yes** | Domain name to register (e.g. `example.com`). |
| `Years` | Integer | **Yes** | Registration duration in years (typically `1` to `10`). |
| `PromotionCode` | String | No | Coupon or promotion code. |
| `IdnCode` | String | No | IDN code if registering an Internationalized Domain Name (in Punycode format). |
| `Nameservers` | String | No | Comma-separated custom nameservers (e.g. `ns1.example.com,ns2.example.com`). Defaults to Namecheap DNS. |
| `AddFreeWhoisguard` | String | No | `yes` / `no` to enable privacy protection (*WithheldforPrivacy*). |
| `WGEnabled` | String | No | `yes` / `no` to enable privacy protection. |
| `IsPremiumDomain` | Boolean | No | `true` if registering a premium domain name. |
| `PremiumPrice` | Decimal | No | Required if registering a premium domain. |

### Contact Parameters (Registrant, Tech, Admin, AuxBilling)

For full compliance, contact details can be provided across 4 roles: `Registrant`, `Tech`, `Admin`, and `AuxBilling`.
Example for `Registrant` (repeat with `Tech*`, `Admin*`, `AuxBilling*`):

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `RegistrantFirstName` | String | Yes* | First name. |
| `RegistrantLastName` | String | Yes* | Last name. |
| `RegistrantAddress1` | String | Yes* | Street address. |
| `RegistrantCity` | String | Yes* | City. |
| `RegistrantStateProvince`| String | Yes* | State or Province code/name. |
| `RegistrantPostalCode` | String | Yes* | Postal/ZIP code. |
| `RegistrantCountry` | String | Yes* | Two-letter ISO country code (e.g. `US`, `GB`, `BD`). |
| `RegistrantPhone` | String | Yes* | Phone number in E.164 format: `+NNN.NNNNNNNNNN` (e.g. `+1.5551234567`). |
| `RegistrantEmailAddress` | String | Yes* | Valid contact email address. |

*\* If not provided, Namecheap may use default account profile contact details.*

---

## Example XML Response

```xml
<?xml version="1.0" encoding="utf-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.create</RequestedCommand>
  <CommandResponse Type="namecheap.domains.create">
    <DomainCreateResult 
        Domain="example.com" 
        Registered="true" 
        ChargedAmount="10.28" 
        DomainID="1040523" 
        OrderID="5123412" 
        TransactionID="8923412" 
        WhoisguardEnable="true" 
        NonRealTimeDomain="false" />
  </CommandResponse>
  <Server>PHX01APIEXT02</Server>
  <GMTTimeDifference>--4:00</GMTTimeDifference>
  <ExecutionTime>3.214</ExecutionTime>
</ApiResponse>
```
