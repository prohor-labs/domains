"use server";

import { POPULAR_TLDS, TLD_DIRECTORY } from "@/lib/constants/tlds";
import type { DomainDetail, DomainSearchResponse, DomainSearchResult, TldPriceInfo } from "@/lib/types/domain";
import { applyPlatformFee } from "@/lib/utils/pricing";

const VERCEL_SEARCH_ENDPOINT = "https://api.vercel.com/v1/registrar/domains/search";

function parseDomainParts(input: string): { sld: string; extension: string | null } {
  const cleaned = input.toLowerCase().trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const parts = cleaned.split(".");
  if (parts.length > 1) {
    const sld = parts[0];
    const extension = parts.slice(1).join(".");
    return { sld, extension };
  }
  return { sld: cleaned, extension: null };
}

export async function searchDomainsAction(
  query: string,
  customTlds?: string[]
): Promise<DomainSearchResponse> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return { query: "", results: [] };
  }

  const { sld, extension } = parseDomainParts(trimmed);
  const tldList = customTlds && customTlds.length > 0
    ? customTlds
    : extension
    ? [extension, ...POPULAR_TLDS.filter((t) => t !== extension).slice(0, 7)]
    : [...POPULAR_TLDS];

  const domainsToSearch = tldList.map((tld) => `${sld}.${tld}`);
  const token = process.env.VERCEL_BEARER_TOKEN;

  if (token) {
    try {
      const res = await fetch(VERCEL_SEARCH_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domains: domainsToSearch }),
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.results)) {
          const results: DomainSearchResult[] = data.results.map((item: {
            domain: string;
            available: boolean;
            years?: number;
            price?: number;
            renewalPrice?: number;
            premium?: boolean;
          }) => ({
            domain: item.domain,
            available: Boolean(item.available),
            years: item.years ?? 1,
            price: item.price ? applyPlatformFee(item.price) : undefined,
            renewalPrice: item.renewalPrice
              ? applyPlatformFee(item.renewalPrice)
              : item.price
              ? applyPlatformFee(item.price)
              : undefined,
            premium: Boolean(item.premium),
          }));
          return { query: trimmed, results };
        }
      }
    } catch {
    }
  }

  const fallbackResults: DomainSearchResult[] = await Promise.all(
    domainsToSearch.map(async (domain) => {
      const parts = domain.split(".");
      const tld = parts.slice(1).join(".");
      const tldMeta = TLD_DIRECTORY.find((t) => t.tld === tld);

      let available = true;
      try {
        const dohRes = await fetch(
          `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=NS`,
          {
            headers: { Accept: "application/dns-json" },
            next: { revalidate: 300 },
          }
        );
        if (dohRes.ok) {
          const dohData = await dohRes.json();
          if (dohData.Status === 0 && dohData.Answer && dohData.Answer.length > 0) {
            available = false;
          }
        }
      } catch {
        available = false;
      }

      const rawPrice = tldMeta?.registrationPrice ?? 11.99;
      const rawRenewal = tldMeta?.renewalPrice ?? 11.99;

      return {
        domain,
        available,
        years: 1,
        price: applyPlatformFee(rawPrice),
        renewalPrice: applyPlatformFee(rawRenewal),
        premium: false,
      };
    })
  );

  return { query: trimmed, results: fallbackResults };
}

export async function getDomainDetailsAction(rawDomain: string): Promise<DomainDetail> {
  const domain = rawDomain.toLowerCase().trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const parts = domain.split(".");
  const sld = parts[0] || "";
  const tld = parts.slice(1).join(".") || "com";

  const searchData = await searchDomainsAction(domain, [tld]);
  const matched = searchData.results.find((r) => r.domain === domain) ?? {
    domain,
    available: true,
    price: applyPlatformFee(11.99),
    renewalPrice: applyPlatformFee(11.99),
    years: 1,
  };

  const aRecords: string[] = [];
  const nsRecords: string[] = [];
  const mxRecords: string[] = [];
  const txtRecords: string[] = [];

  if (!matched.available) {
    try {
      const [aRes, nsRes, mxRes, txtRes] = await Promise.all([
        fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
          headers: { Accept: "application/dns-json" },
          next: { revalidate: 300 },
        }),
        fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=NS`, {
          headers: { Accept: "application/dns-json" },
          next: { revalidate: 300 },
        }),
        fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=MX`, {
          headers: { Accept: "application/dns-json" },
          next: { revalidate: 300 },
        }),
        fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=TXT`, {
          headers: { Accept: "application/dns-json" },
          next: { revalidate: 300 },
        }),
      ]);

      if (aRes.ok) {
        const d = await aRes.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) aRecords.push(ans.data);
          }
        }
      }
      if (nsRes.ok) {
        const d = await nsRes.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) nsRecords.push(ans.data);
          }
        }
      }
      if (mxRes.ok) {
        const d = await mxRes.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) mxRecords.push(ans.data);
          }
        }
      }
      if (txtRes.ok) {
        const d = await txtRes.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) txtRecords.push(ans.data);
          }
        }
      }
    } catch {
    }
  }

  return {
    domain,
    sld,
    tld,
    available: matched.available,
    price: matched.price,
    renewalPrice: matched.renewalPrice,
    premium: matched.premium,
    years: matched.years ?? 1,
    whois: {
      registrar: matched.available ? undefined : "Registered (Private/Proxy)",
      status: matched.available ? ["AVAILABLE"] : ["clientTransferProhibited", "active"],
      nameServers: nsRecords.length > 0 ? nsRecords : undefined,
      dnssec: false,
    },
    dns: {
      aRecords: aRecords.length > 0 ? aRecords : undefined,
      nsRecords: nsRecords.length > 0 ? nsRecords : undefined,
      mxRecords: mxRecords.length > 0 ? mxRecords : undefined,
      txtRecords: txtRecords.length > 0 ? txtRecords : undefined,
    },
  };
}

export async function getTldPricingAction(tld?: string): Promise<TldPriceInfo[]> {
  const directory = TLD_DIRECTORY.map((item) => ({
    ...item,
    registrationPrice: applyPlatformFee(item.registrationPrice),
    renewalPrice: applyPlatformFee(item.renewalPrice),
    transferPrice: item.transferPrice ? applyPlatformFee(item.transferPrice) : undefined,
  }));

  if (tld) {
    const cleanTld = tld.toLowerCase().replace(/^\./, "");
    return directory.filter((item) => item.tld === cleanTld);
  }
  return directory;
}
