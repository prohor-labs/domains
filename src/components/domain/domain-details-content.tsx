"use client";

import { useDomainDetails } from "@/hooks/use-domain-details";
import { useWatchlist } from "@/hooks/use-watchlist";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bookmark02Icon,
  GlobalIcon,
  ServerIcon,
  CheckmarkCircle02Icon,
  LockIcon,
  SentIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { toBdt } from "@/lib/utils/pricing";

export function DomainDetailsContent({ domainSlug }: { domainSlug: string }) {
  const cleanDomain = decodeURIComponent(domainSlug).toLowerCase().trim();
  const { data: detail, isLoading, error } = useDomainDetails(cleanDomain);
  const { toggleSave, isSaved } = useWatchlist();
  const saved = isSaved(cleanDomain);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-3 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
        <Skeleton className="h-44 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="md:col-span-2 h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <Empty className="mx-auto max-w-3xl py-20 border border-dashed border-border">
        <EmptyHeader>
          <EmptyTitle>Unable to load domain details</EmptyTitle>
          <EmptyDescription>Please check the domain name format and try again.</EmptyDescription>
        </EmptyHeader>
        <Button
          render={<Link href="/search" />}
          nativeButton={false}
          variant="default"
          size="sm"
        >
          Return to Search
        </Button>
      </Empty>
    );
  }

  const basePrice = detail.price ?? 13.19;
  const renewalPrice = detail.renewalPrice ?? 13.19;
  const totalPriceUsd = Number(basePrice.toFixed(2));
  const totalPriceBdt = toBdt(totalPriceUsd);

  const telegramMsg = `Hello, I would like to register "${cleanDomain}" for 1 year. Total: $${totalPriceUsd.toFixed(2)} USD (৳${totalPriceBdt.toLocaleString()} BDT).`;
  const telegramUrl = `https://t.me/frostfoe?text=${encodeURIComponent(telegramMsg)}`;

  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
      <Card className="bg-card/60 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "size-2.5 rounded-full",
                  detail.available ? "bg-emerald-500" : "bg-muted-foreground/60"
                )}
              />
              <span className="text-xs font-medium text-foreground">
                {detail.available ? "Available for Registration" : "Currently Registered"}
              </span>
            </div>

            <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-foreground break-all">
              {detail.sld}
              <span className="text-primary">.{detail.tld}</span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              {detail.available
                ? "This domain name is currently unclaimed and available for instant registration."
                : "This domain name is currently registered. Live DNS delegations and status are shown below."}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
            {detail.available && detail.price ? (
              <div className="text-left sm:text-right">
                <div className="flex items-baseline gap-1.5 justify-start sm:justify-end">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
                    ${detail.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">/yr</span>
                  <span className="text-sm font-medium text-primary">
                    (৳{toBdt(detail.price).toLocaleString()} BDT)
                  </span>
                </div>
                {detail.renewalPrice && (
                  <p className="text-xs text-muted-foreground">
                    Renews at ${detail.renewalPrice.toFixed(2)}/yr (৳{toBdt(detail.renewalPrice).toLocaleString()})
                  </p>
                )}
              </div>
            ) : null}

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                type="button"
                variant={saved ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  toggleSave({
                    domain: detail.domain,
                    available: detail.available,
                    price: detail.price,
                    renewalPrice: detail.renewalPrice,
                  })
                }
                className="w-full sm:w-auto"
              >
                <HugeiconsIcon
                  icon={Bookmark02Icon}
                  strokeWidth={1.5}
                  className={cn("size-4", saved && "fill-current")}
                />
                <span>{saved ? "Saved to Watchlist" : "Save to Watchlist"}</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {detail.available ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 flex flex-col gap-6">
            <Card className="p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
                <CardDescription>Domain registration duration and included protections.</CardDescription>
              </CardHeader>
              <Separator className="mb-4" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-2xl font-normal text-foreground">
                      {cleanDomain}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      First-year registration: ${basePrice.toFixed(2)} / ৳{toBdt(basePrice).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-xl font-normal text-foreground">
                      ${basePrice.toFixed(2)}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      ৳{toBdt(basePrice).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-foreground block">
                      Registration Term
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Subsequent renewal at ${renewalPrice.toFixed(2)}/yr (৳{toBdt(renewalPrice).toLocaleString()}/yr)
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-semibold text-foreground">
                      1 Year
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <HugeiconsIcon icon={Shield01Icon} strokeWidth={1.5} className="size-4 text-emerald-500" />
                    <div>
                      <span className="text-sm font-medium text-foreground block">WHOIS Privacy Protection</span>
                      <p className="text-xs text-muted-foreground">Redacts registrant contact records automatically</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Free</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/40">
              <div className="flex items-start gap-3">
                <HugeiconsIcon icon={LockIcon} strokeWidth={1.5} className="size-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground block mb-0.5">Direct Telegram Concierge</span>
                  Clicking order dispatch opens a direct chat with <strong>@frostfoe</strong> on Telegram pre-filled with your domain configuration for swift manual processing.
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="p-6 bg-card shadow-sm">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="font-serif text-lg">Total Due</CardTitle>
              </CardHeader>
              <Separator className="mb-4" />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Domain ({cleanDomain})</span>
                  <span>${basePrice.toFixed(2)} (৳{toBdt(basePrice).toLocaleString()})</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>ICANN & Registry Fees</span>
                  <span>$0.00</span>
                </div>

                <Separator className="my-2" />

                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-base text-foreground">Total</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-normal text-foreground">
                      ${totalPriceUsd.toFixed(2)}
                    </span>
                    <span className="block text-sm font-medium text-primary">
                      ৳{totalPriceBdt.toLocaleString()} BDT
                    </span>
                  </div>
                </div>

                <Button
                  render={
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Send Order on Telegram"
                    />
                  }
                  nativeButton={false}
                  variant="default"
                  size="lg"
                  className="w-full mt-4 font-medium"
                >
                  Send Order on Telegram
                  <HugeiconsIcon icon={SentIcon} strokeWidth={2} data-icon="inline-end" />
                </Button>

                <p className="text-[11px] text-center text-muted-foreground mt-1">
                  Redirects to <strong>t.me/frostfoe</strong>
                </p>
              </div>
            </Card>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-6 shadow-2xs">
          <CardHeader className="p-0">
            <div className="flex items-center gap-2 text-foreground font-serif text-lg">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={1.5} className="size-4.5 text-primary" />
              <CardTitle className="font-serif text-base">Registry Status</CardTitle>
            </div>
            <CardDescription className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Top-Level Domain <strong>.{detail.tld}</strong> is managed under standard ICANN root zone agreements.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="p-6 shadow-2xs">
          <CardHeader className="p-0">
            <div className="flex items-center gap-2 text-foreground font-serif text-lg">
              <HugeiconsIcon icon={GlobalIcon} strokeWidth={1.5} className="size-4.5 text-primary" />
              <CardTitle className="font-serif text-base">DNSSEC Support</CardTitle>
            </div>
            <CardDescription className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Cryptographic DNS authentication support to protect domain resolution from forgery.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="p-6 shadow-2xs">
          <CardHeader className="p-0">
            <div className="flex items-center gap-2 text-foreground font-serif text-lg">
              <HugeiconsIcon icon={ServerIcon} strokeWidth={1.5} className="size-4.5 text-primary" />
              <CardTitle className="font-serif text-base">Global Anycast</CardTitle>
            </div>
            <CardDescription className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Distributed nameserver routing for ultra-low latency record lookup worldwide.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {!detail.available && detail.dns && (
        <Card className="bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={ServerIcon} strokeWidth={1.5} className="size-4 text-primary" />
              <h2 className="font-mono text-sm font-medium text-foreground">
                DNS Records & Nameservers
              </h2>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">Edge Query</span>
          </div>

          <Separator className="mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs">
            <div>
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider block mb-2">
                Nameservers (NS)
              </span>
              {detail.dns.nsRecords && detail.dns.nsRecords.length > 0 ? (
                <ul className="flex flex-col gap-1.5 text-foreground">
                  {detail.dns.nsRecords.map((ns) => (
                    <li key={ns} className="rounded bg-background px-2.5 py-1 text-[11px] break-all border border-border">
                      {ns}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No active NS records found</p>
              )}
            </div>

            <div>
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider block mb-2">
                IP Address (A Records)
              </span>
              {detail.dns.aRecords && detail.dns.aRecords.length > 0 ? (
                <ul className="flex flex-col gap-1.5 text-foreground">
                  {detail.dns.aRecords.map((ip) => (
                    <li key={ip} className="rounded bg-background px-2.5 py-1 text-[11px] break-all border border-border">
                      {ip}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No active A records</p>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
