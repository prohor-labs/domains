export const domainKeys = {
  all: ["domains"] as const,
  search: (query: string, tlds?: string[]) =>
    [...domainKeys.all, "search", query.toLowerCase().trim(), tlds?.sort().join(",")] as const,
  detail: (domain: string) =>
    [...domainKeys.all, "detail", domain.toLowerCase().trim()] as const,
  suggestions: (term: string) =>
    [...domainKeys.all, "suggestions", term.toLowerCase().trim()] as const,
};
