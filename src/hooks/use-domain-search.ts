"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchDomainsAction } from "@/lib/actions/domains";
import { domainKeys } from "@/lib/query/keys";
import type { DomainSearchResponse } from "@/lib/types/domain";

async function fetchDomainSearch(query: string, customTlds?: string[]): Promise<DomainSearchResponse> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return { query: "", results: [] };
  }

  try {
    const url = new URL("/api/domains/search", window.location.origin);
    url.searchParams.set("q", normalized);
    if (customTlds && customTlds.length > 0) {
      url.searchParams.set("tlds", customTlds.join(","));
    }

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.results)) {
        return data;
      }
    }
  } catch {
  }

  return searchDomainsAction(normalized, customTlds);
}

export function useDomainSearch(query: string, customTlds?: string[]) {
  const normalizedQuery = query.trim().toLowerCase();

  return useQuery({
    queryKey: domainKeys.search(normalizedQuery, customTlds),
    queryFn: () => fetchDomainSearch(normalizedQuery, customTlds),
    enabled: normalizedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
