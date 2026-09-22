# Namecheap API: Global Parameters & Authentication

Every API call to Namecheap requires a set of global parameters for authentication and command routing.

---

## Global Parameters Table

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `ApiUser` | String | **Yes** | Username allowed to access the API. |
| `ApiKey` | String | **Yes** | API key generated in the Namecheap account profile. |
| `UserName` | String | **Yes** | The username on which the command is executed (usually identical to `ApiUser`). |
| `Command` | String | **Yes** | The specific API method to execute (e.g. `namecheap.domains.check`). |
| `ClientIp` | String | **Yes** | Public IPv4 address of the originating server (must be whitelisted in Namecheap portal). |

---

## HTTP Methods

- **GET**: Acceptable for read-only queries with limited URL lengths (e.g., `namecheap.domains.check`, `namecheap.domains.getInfo`).
- **POST**: Recommended for mutating actions, domain creation with contact fields, and bulk DNS updates (`namecheap.domains.create`, `namecheap.domains.dns.setHosts`).

---

## IP Whitelisting Requirement

The IP address specified in `ClientIp` must match the public IP address making the request and must be added to the whitelist in:
- **Production Dashboard**: *Profile > Tools > Namecheap API Access > Manage IP Access*.
- **Sandbox Dashboard**: *Profile > Tools > Namecheap API Access > Manage IP Access*.

If the IP is missing or not whitelisted, the API returns error `1011150`.

---

## Example Request

```http
POST https://api.namecheap.com/xml.response HTTP/1.1
Content-Type: application/x-www-form-urlencoded

ApiUser=myapiuser&ApiKey=0123456789abcdef0123456789abcdef&UserName=myapiuser&Command=namecheap.domains.check&ClientIp=192.0.2.1&DomainList=example.com
```
