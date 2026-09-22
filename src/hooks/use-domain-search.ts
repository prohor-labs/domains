"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchDomainsAction } from "@/lib/actions/domains";
import { domainKeys } from "@/lib/query/keys";

export function useDomainSearch(query: string, customTlds?: string[]) {
  const normalizedQuery = query.trim().toLowerCase();

  return useQuery({
    queryKey: domainKeys.search(normalizedQuery, customTlds),
    queryFn: () => searchDomainsAction(normalizedQuery, customTlds),
    enabled: normalizedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
