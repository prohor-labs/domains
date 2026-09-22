# Method: `namecheap.domains.getInfo`

Retrieves complete information about a specific registered domain name.

---

## Endpoint & Method

- **Command**: `namecheap.domains.getInfo`
- **HTTP Method**: GET or POST

---

## Request Parameters

In addition to [Global Parameters](file:///root/domains.prohor.dev/docs/namecheap/global-parameters.md):

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `DomainName` | String | **Yes** | The domain name to inspect (e.g. `example.com`). |
| `HostName` | String | No | Optional host name. |

---

## Example XML Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.getinfo</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getinfo">
    <DomainGetInfoResult Status="Ok" ID="736542" DomainName="example.com" OwnerName="prohor" IsOwner="true" IsPremium="false">
      <DomainDetails>
        <CreatedDate>09/05/2023</CreatedDate>
        <ExpiredDate>09/05/2027</ExpiredDate>
        <NumYears>4</NumYears>
      </DomainDetails>
      <LockDetails>
        <RegistrarLock>true</RegistrarLock>
      </LockDetails>
      <Whoisguard Enabled="True">
        <ID>3655801</ID>
        <ExpiredDate>09/05/2027</ExpiredDate>
      </Whoisguard>
      <DnsDetails ProviderType="NAMECHEAP">
        <Nameserver>dns1.registrar-servers.com</Nameserver>
        <Nameserver>dns2.registrar-servers.com</Nameserver>
      </DnsDetails>
      <Modificationrights All="true" />
    </DomainGetInfoResult>
  </CommandResponse>
  <Server>PHX01APIEXT02</Server>
  <GMTTimeDifference>--4:00</GMTTimeDifference>
  <ExecutionTime>0.089</ExecutionTime>
</ApiResponse>
```
