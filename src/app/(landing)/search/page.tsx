"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DomainSearchHero } from "@/components/search/domain-search-hero";
import { SearchResultCard } from "@/components/search/search-result-card";
import { useDomainSearch } from "@/hooks/use-domain-search";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [submittedQuery, setSubmittedQuery] = useState(queryParam);

  const handleExecuteSearch = (query: string) => {
    const clean = query.trim().toLowerCase();
    setSubmittedQuery(clean);
    if (clean) {
      router.push(`/search?q=${encodeURIComponent(clean)}`);
    }
  };

  const activeSearchTerm = submittedQuery || queryParam;
  const { data: searchData, isLoading } = useDomainSearch(activeSearchTerm);

  const results = searchData?.results || [];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
          Domain Search & Availability
        </h1>
        <DomainSearchHero
          initialQuery={activeSearchTerm}
          compact
          onSubmitQuery={handleExecuteSearch}
        />
      </div>

      {activeSearchTerm.length < 2 ? (
        <Empty className="border border-dashed border-border py-12">
          <EmptyHeader>
            <HugeiconsIcon icon={Search01Icon} strokeWidth={1.5} className="mx-auto size-8 text-muted-foreground" />
            <EmptyTitle>Enter a domain name to search</EmptyTitle>
            <EmptyDescription>
              Type your desired brand or keyword above and click Search to check live availability.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <Empty className="border border-dashed border-border py-12">
          <EmptyHeader>
            <EmptyTitle>No domains found</EmptyTitle>
            <EmptyDescription>
              Try searching for another keyword or top-level extension.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {results.map((res, index) => (
            <SearchResultCard
              key={res.domain}
              result={res}
              featured={index === 0 && res.available}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-6 py-6 sm:py-8">
      <Suspense
        fallback={
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-9 w-64 rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </div>
  );
}
