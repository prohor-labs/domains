"use client";

import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { DomainSearchResult } from "@/lib/types/domain";
import { cn } from "@/lib/utils";
import { toBdt } from "@/lib/utils/pricing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SearchResultCard({
  result,
  featured = false,
}: {
  result: DomainSearchResult;
  featured?: boolean;
}) {
  const parts = result.domain.split(".");
  const sld = parts[0];
  const tld = parts.slice(1).join(".");

  return (
    <Card
      className={cn(
        "transition-all py-4",
        featured
          ? "border-primary/50 bg-card"
          : "border-border bg-background hover:border-primary/40 hover:bg-card/50",
      )}
    >
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-0 px-4">
        <div className="flex items-start gap-3.5 w-full sm:w-auto">
          <div className="mt-1.5 flex size-2.5 shrink-0 rounded-full">
            <span
              className={cn(
                "size-2.5 rounded-full",
                result.available ? "bg-emerald-500" : "bg-muted-foreground/50",
              )}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <Link
                href={`/${encodeURIComponent(result.domain)}`}
                className="font-serif text-xl sm:text-2xl font-normal tracking-[-0.02em] text-foreground hover:text-primary transition-colors"
              >
                {sld}
                <span className="text-primary">.{tld}</span>
              </Link>

              <span className="text-xs text-muted-foreground font-medium">
                {result.available ? "Available" : "Registered"}
              </span>

              {result.premium && (
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Premium
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {result.available
                ? "Available for instant setup"
                : "Active domain — view details and DNS"}
            </p>
          </div>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
          {result.available && result.price ? (
            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1.5 justify-start sm:justify-end">
                <span className="font-serif text-2xl font-normal text-foreground">
                  ${result.price.toFixed(2)}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  (৳{toBdt(result.price).toLocaleString()})
                </span>
                <span className="text-xs text-muted-foreground">/yr</span>
              </div>
              {result.renewalPrice && (
                <p className="text-[11px] text-muted-foreground">
                  Renews at ${result.renewalPrice.toFixed(2)} (৳
                  {toBdt(result.renewalPrice).toLocaleString()})/yr
                </p>
              )}
            </div>
          ) : (
            <div className="text-left sm:text-right">
              <span className="text-xs text-muted-foreground">Unavailable</span>
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0">
            <Button
              render={<Link href={`/${encodeURIComponent(result.domain)}`} />}
              nativeButton={false}
              variant={result.available ? "default" : "outline"}
              size="sm"
            >
              {result.available ? "Get Domain" : "Inspect"}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                data-icon="inline-end"
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
