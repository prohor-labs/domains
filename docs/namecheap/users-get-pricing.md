# Method: `namecheap.users.getPricing`

Returns pricing information for domain registration, renewal, and transfer across all supported TLDs.

---

## Endpoint & Method

- **Command**: `namecheap.users.getPricing`
- **HTTP Method**: GET or POST

---

## Request Parameters

In addition to [Global Parameters](file:///root/domains.prohor.dev/docs/namecheap/global-parameters.md):

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `ProductType` | String | **Yes** | Product type. Set to `DOMAIN` for domain names. |
| `ProductCategory` | String | No | Category filter (e.g. `DOMAINS`, `COMODO`). |
| `PromotionCode` | String | No | Coupon or promo code to check discounted pricing. |
| `ActionName` | String | No | Action filter: `REGISTER`, `RENEW`, `REACTIVATE`, `TRANSFER`. |
| `ProductName` | String | No | Specific TLD (e.g. `COM`, `DEV`, `NET`). |

---

## Performance & Caching

> [!TIP]
> The full dataset for all TLDs can exceed several hundred kilobytes. Always cache the response locally in Redis or PostgreSQL and refresh periodically (e.g. daily) rather than querying this endpoint synchronously during user search.

---

## Example XML Response

```xml
<?xml version="1.0" encoding="utf-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.getPricing</RequestedCommand>
  <CommandResponse Type="namecheap.users.getPricing">
    <UserGetPricingResult>
      <ProductType Name="domains">
        <ProductCategory Name="register">
          <Product Name="com">
            <Price Duration="1" DurationType="YEAR" Price="10.28" RegularPrice="14.58" Currency="USD" />
            <Price Duration="2" DurationType="YEAR" Price="20.56" RegularPrice="29.16" Currency="USD" />
          </Product>
          <Product Name="dev">
            <Price Duration="1" DurationType="YEAR" Price="12.98" RegularPrice="15.98" Currency="USD" />
          </Product>
        </ProductCategory>
        <ProductCategory Name="renew">
          <Product Name="com">
            <Price Duration="1" DurationType="YEAR" Price="14.58" RegularPrice="14.58" Currency="USD" />
          </Product>
        </ProductCategory>
      </ProductType>
    </UserGetPricingResult>
  </CommandResponse>
</ApiResponse>
```
