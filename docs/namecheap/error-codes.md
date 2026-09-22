# Namecheap API: Error Codes Catalog

When an API call encounters an error, the root `<ApiResponse>` contains `<Errors><Error Number="XXXXXXX">Message</Error></Errors>`.

---

## Authentication & Global Parameter Errors

| Error Code | Description | Resolution |
| :--- | :--- | :--- |
| `1010101` | Parameter `ApiUser` is missing | Include valid `ApiUser` query/body parameter. |
| `1010102` | Parameter `ApiKey` is missing | Include valid `ApiKey`. |
| `1010103` | Parameter `UserName` is missing | Include `UserName`. |
| `1010104` | Parameter `Command` is missing | Specify the command name (e.g. `namecheap.domains.check`). |
| `1010105` | Parameter `ClientIP` is missing | Include IPv4 address of calling server. |
| `1011150` | Parameter `RequestIP` is invalid / not whitelisted | Add the public IPv4 address to the API whitelist in Namecheap Profile Tools. |
| `1012151` | Authentication failed | Verify `ApiUser`, `ApiKey`, and `UserName` match active API profile. |

---

## Domain Management Errors

| Error Code | Description | Resolution |
| :--- | :--- | :--- |
| `2011166` | `UserName` is invalid or order domain mismatch | Verify target user and domain ownership. |
| `2011168` | Nameservers are not valid | Provide at least 2 valid fully qualified nameservers. |
| `2015182` | Contact phone number is invalid | Format phone strictly as `+CountryCode.Number` (e.g. `+1.5551234567`). |
| `2019166` | Domain not found | Verify domain name spelling or ownership in account. |
| `2030166` | Edit permission for domain is not supported | Verify account has administrative control over domain. |
| `3019166` | Domain not available | The domain is already registered or restricted by registry. |
| `4019166` | Domain creation failed / unavailable | Domain cannot be registered under specified terms. |
| `4023330` | Unable to fetch DNS records | Revert to default nameservers before managing host records. |
