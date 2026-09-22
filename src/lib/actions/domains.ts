"use server";

import { POPULAR_TLDS, TLD_DIRECTORY } from "@/lib/constants/tlds";
import type { DomainDetail, DomainSearchResponse, DomainSearchResult } from "@/lib/types/domain";
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

function sortSearchResults(results: DomainSearchResult[], exactQuery?: string): DomainSearchResult[] {
  return [...results].sort((a, b) => {
    if (exactQuery && exactQuery.includes(".")) {
      const isExactA = a.domain.toLowerCase() === exactQuery.toLowerCase();
      const isExactB = b.domain.toLowerCase() === exactQuery.toLowerCase();
      if (isExactA && !isExactB) return -1;
      if (!isExactA && isExactB) return 1;
    }

    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;

    return 0;
  });
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
          return { query: trimmed, results: sortSearchResults(results, trimmed) };
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

  return { query: trimmed, results: sortSearchResults(fallbackResults, trimmed) };
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
  const aaaaRecords: string[] = [];
  const cnameRecords: string[] = [];
  const nsRecords: string[] = [];
  const mxRecords: string[] = [];
  const txtRecords: string[] = [];
  let soaRecord: string | undefined;

  let rdapRegistrar: string | undefined;
  let rdapAbuseEmail: string | undefined;
  let rdapAbusePhone: string | undefined;
  let rdapCreatedDate: string | undefined;
  let rdapExpiredDate: string | undefined;
  let rdapUpdatedDate: string | undefined;
  let rdapStatus: string[] = [];
  let rdapDnssec = false;

  if (!matched.available) {
    try {
      const [aRes, aaaaRes, cnameRes, nsRes, mxRes, txtRes, soaRes, rdapRes] = await Promise.allSettled([
        fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
          headers: { Accept: "application/dns-json" },
          next: { revalidate: 300 },
        }),
        fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=AAAA`, {
          headers: { Accept: "application/dns-json" },
          next: { revalidate: 300 },
        }),
        fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=CNAME`, {
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
        fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=SOA`, {
          headers: { Accept: "application/dns-json" },
          next: { revalidate: 300 },
        }),
        fetch(`https://rdap.org/domain/${domain}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; ProhorBot/1.0)",
            Accept: "application/rdap+json, application/json",
          },
          redirect: "follow",
          next: { revalidate: 300 },
        }),
      ]);

      if (aRes.status === "fulfilled" && aRes.value.ok) {
        const d = await aRes.value.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) aRecords.push(ans.data);
          }
        }
      }

      if (aaaaRes.status === "fulfilled" && aaaaRes.value.ok) {
        const d = await aaaaRes.value.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) aaaaRecords.push(ans.data);
          }
        }
      }

      if (cnameRes.status === "fulfilled" && cnameRes.value.ok) {
        const d = await cnameRes.value.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) cnameRecords.push(ans.data);
          }
        }
      }

      if (nsRes.status === "fulfilled" && nsRes.value.ok) {
        const d = await nsRes.value.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) nsRecords.push(ans.data);
          }
        }
      }

      if (mxRes.status === "fulfilled" && mxRes.value.ok) {
        const d = await mxRes.value.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) mxRecords.push(ans.data);
          }
        }
      }

      if (txtRes.status === "fulfilled" && txtRes.value.ok) {
        const d = await txtRes.value.json();
        if (d.Answer) {
          for (const ans of d.Answer) {
            if (ans.data) txtRecords.push(ans.data);
          }
        }
      }

      if (soaRes.status === "fulfilled" && soaRes.value.ok) {
        const d = await soaRes.value.json();
        if (d.Answer && d.Answer[0]?.data) {
          soaRecord = d.Answer[0].data;
        }
      }

      if (rdapRes.status === "fulfilled" && rdapRes.value.ok) {
        const rdapData = await rdapRes.value.json();
        for (const ent of rdapData.entities || []) {
          if (ent.roles?.includes("registrar") || ent.roles?.includes("reseller")) {
            const vcard = ent.vcardArray?.[1] || [];
            const fn = vcard.find((v: string[]) => v[0] === "fn")?.[3];
            if (fn) rdapRegistrar = fn;
          }
          for (const sub of ent.entities || []) {
            if (sub.roles?.includes("abuse")) {
              const vcard = sub.vcardArray?.[1] || [];
              const email = vcard.find((v: string[]) => v[0] === "email")?.[3];
              const tel = vcard.find((v: string[]) => v[0] === "tel")?.[3];
              if (email) rdapAbuseEmail = email;
              if (tel) rdapAbusePhone = tel;
            }
          }
        }

        const events = rdapData.events || [];
        rdapCreatedDate = events.find((e: { eventAction: string; eventDate: string }) => e.eventAction === "registration")?.eventDate;
        rdapExpiredDate = events.find((e: { eventAction: string; eventDate: string }) => e.eventAction === "expiration")?.eventDate;
        rdapUpdatedDate = events.find((e: { eventAction: string; eventDate: string }) => e.eventAction === "last changed")?.eventDate;
        rdapStatus = rdapData.status || [];
        rdapDnssec = Boolean(rdapData.secureDNS?.delegationSigned);

        if (nsRecords.length === 0 && Array.isArray(rdapData.nameservers)) {
          for (const ns of rdapData.nameservers) {
            if (ns.ldhName) nsRecords.push(ns.ldhName.toLowerCase());
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
      registrar: rdapRegistrar || (matched.available ? undefined : "Registered"),
      abuseEmail: rdapAbuseEmail,
      abusePhone: rdapAbusePhone,
      createdDate: rdapCreatedDate,
      expiredDate: rdapExpiredDate,
      updatedDate: rdapUpdatedDate,
      status: rdapStatus.length > 0 ? rdapStatus : matched.available ? ["AVAILABLE"] : ["active"],
      nameServers: nsRecords.length > 0 ? nsRecords : undefined,
      dnssec: rdapDnssec,
    },
    dns: {
      aRecords: aRecords.length > 0 ? aRecords : undefined,
      aaaaRecords: aaaaRecords.length > 0 ? aaaaRecords : undefined,
      cnameRecords: cnameRecords.length > 0 ? cnameRecords : undefined,
      nsRecords: nsRecords.length > 0 ? nsRecords : undefined,
      mxRecords: mxRecords.length > 0 ? mxRecords : undefined,
      txtRecords: txtRecords.length > 0 ? txtRecords : undefined,
      soaRecord,
    },
  };
}
