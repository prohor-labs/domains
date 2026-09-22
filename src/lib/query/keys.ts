export const domainKeys = {
  all: ["domains"] as const,
  search: (query: string, tlds?: string[]) =>
    [...domainKeys.all, "search", query.toLowerCase().trim(), tlds?.sort().join(",")] as const,
  detail: (domain: string) =>
    [...domainKeys.all, "detail", domain.toLowerCase().trim()] as const,
  pricing: (tld?: string) =>
    [...domainKeys.all, "pricing", tld?.toLowerCase().trim() || "all"] as const,
  watchlist: () =>
    [...domainKeys.all, "watchlist"] as const,
  suggestions: (term: string) =>
    [...domainKeys.all, "suggestions", term.toLowerCase().trim()] as const,
};
