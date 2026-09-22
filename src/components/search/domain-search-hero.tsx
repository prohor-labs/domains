"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { POPULAR_TLDS } from "@/lib/constants/tlds";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export function DomainSearchHero({
  initialQuery = "",
  compact = false,
  onSubmitQuery,
}: {
  initialQuery?: string;
  compact?: boolean;
  onSubmitQuery?: (val: string) => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    if (clean) {
      if (onSubmitQuery) {
        onSubmitQuery(clean);
      } else {
        router.push(`/search?q=${encodeURIComponent(clean)}`);
      }
    }
  };

  const handleTldClick = (tld: string) => {
    const clean = query.trim().toLowerCase();
    const base = clean ? clean.split(".")[0] : "mybrand";
    const full = `${base}.${tld}`;
    setQuery(full);
    if (onSubmitQuery) {
      onSubmitQuery(full);
    } else {
      router.push(`/search?q=${encodeURIComponent(full)}`);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="w-full">
        <InputGroup className="h-12 bg-background p-1 shadow-2xs">
          <InputGroupAddon align="inline-start" className="pl-3.5">
            <HugeiconsIcon icon={Search01Icon} strokeWidth={1.5} className="size-4.5 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search domain (e.g. acme.com, prohor.dev)..."
            className="text-sm placeholder:text-muted-foreground px-2.5"
          />
          <InputGroupAddon align="inline-end" className="pr-1">
            <Button type="submit" variant="default" size="sm" className="h-9 px-4.5 font-medium">
              Search
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    );
  }

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-20 sm:pb-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[-0.03em] text-foreground leading-[1.08]">
          Buy domains with ease<span className="text-primary">.</span> <br />
          <span className="italic font-serif">Pay & forget</span>, your domain our responsibility.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Instant availability checks, transparent pricing in USD ($) and BDT (৳), free WHOIS privacy, and automatic DNS routing.
        </p>

        <form onSubmit={handleSearch} className="mx-auto mt-10 max-w-2xl">
          <InputGroup className="h-14 bg-background p-1.5 shadow-sm rounded-xl">
            <InputGroupAddon align="inline-start" className="pl-4">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={1.5} className="size-5 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your ideal domain (e.g. acme, prohor.dev)..."
              className="text-base placeholder:text-muted-foreground px-3"
            />
            <InputGroupAddon align="inline-end" className="pr-1.5">
              <Button type="submit" size="default" className="h-10 px-6 font-medium">
                Explore
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Popular:</span>
          {POPULAR_TLDS.slice(0, 6).map((tld) => (
            <Button
              key={tld}
              variant="ghost"
              size="xs"
              type="button"
              onClick={() => handleTldClick(tld)}
              className="text-xs font-medium text-foreground hover:text-primary"
            >
              .{tld}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
