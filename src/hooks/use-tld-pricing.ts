"use client";

import { useQuery } from "@tanstack/react-query";
import { getTldPricingAction } from "@/lib/actions/domains";
import { domainKeys } from "@/lib/query/keys";

export function useTldPricing(tld?: string) {
  return useQuery({
    queryKey: domainKeys.pricing(tld),
    queryFn: async () => getTldPricingAction(tld),
    staleTime: 1000 * 60 * 30,
  });
}
