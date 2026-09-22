"use client";

import { useQuery } from "@tanstack/react-query";
import { getDomainDetailsAction } from "@/lib/actions/domains";
import { domainKeys } from "@/lib/query/keys";

export function useDomainDetails(domain: string) {
  const normalizedDomain = domain.trim().toLowerCase();

  return useQuery({
    queryKey: domainKeys.detail(normalizedDomain),
    queryFn: async () => {
      if (!normalizedDomain) {
        throw new Error("Domain name is required");
      }
      return getDomainDetailsAction(normalizedDomain);
    },
    enabled: normalizedDomain.length >= 3,
    staleTime: 1000 * 60 * 10,
  });
}
