import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DomainSearchHero } from "@/components/search/domain-search-hero";
import { TLD_DIRECTORY } from "@/lib/constants/tlds";
import { applyPlatformFee, toBdt } from "@/lib/utils/pricing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingHomePage() {
  const featuredTlds = TLD_DIRECTORY.filter((t) => t.isPopular).slice(0, 6);

  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      <DomainSearchHero />

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center flex flex-col gap-3 mb-12">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.02em] text-foreground">
            Curated Extensions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            Transparent first-year registration and locked-in renewal rates
            across top namespaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTlds.map((tldItem) => {
            const regPrice = applyPlatformFee(tldItem.registrationPrice);
            const renPrice = applyPlatformFee(tldItem.renewalPrice);

            return (
              <Card
                key={tldItem.tld}
                className="flex flex-col justify-between bg-card p-6 hover:border-primary/50 transition-colors group"
              >
                <div>
                  <span className="font-serif text-3xl font-normal tracking-tight text-foreground">
                    .{tldItem.tld}
                  </span>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {tldItem.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-2xl font-normal text-foreground">
                        ${regPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        (৳{toBdt(regPrice).toLocaleString()})
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        / yr
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Renews at ${renPrice.toFixed(2)} (৳
                      {toBdt(renPrice).toLocaleString()})/yr
                    </p>
                  </div>

                  <Button
                    render={<Link href={`/search?q=mybrand.${tldItem.tld}`} />}
                    nativeButton={false}
                    variant="outline"
                    size="icon"
                    aria-label={`Search .${tldItem.tld} domains`}
                    className="bg-background group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-12">
        <Card className="bg-primary p-8 sm:p-14 text-primary-foreground shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-0">
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-primary-foreground tracking-[-0.02em]">
              Ready to claim your next project’s name?
            </h2>
            <p className="text-sm text-primary-foreground/90">
              Instant search, zero tracking, and real-time wholesale
              availability.
            </p>
          </div>

          <Button
            render={<Link href="/search" />}
            nativeButton={false}
            variant="secondary"
            size="lg"
            className="shrink-0 font-medium"
          >
            Start Searching
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              data-icon="inline-end"
            />
          </Button>
        </Card>
      </section>
    </div>
  );
}
