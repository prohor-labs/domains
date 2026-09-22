"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toBdt } from "@/lib/utils/pricing";
import { useTldPricing } from "@/hooks/use-tld-pricing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "popular", label: "Popular" },
  { id: "tech", label: "Tech" },
  { id: "business", label: "Business" },
  { id: "creative", label: "Creative" },
  { id: "niche", label: "Niche" },
] as const;

export function TldPricingTable() {
  const { data: tldList = [], isLoading } = useTldPricing();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"tld" | "registration" | "renewal">("tld");

  const filtered = useMemo(() => {
    return tldList
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "all" ||
          (selectedCategory === "popular" ? item.isPopular : item.category === selectedCategory);
        const matchesSearch =
          !searchFilter ||
          item.tld.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.description.toLowerCase().includes(searchFilter.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "registration") return a.registrationPrice - b.registrationPrice;
        if (sortBy === "renewal") return a.renewalPrice - b.renewalPrice;
        return a.tld.localeCompare(b.tld);
      });
  }, [tldList, selectedCategory, searchFilter, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              type="button"
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="h-8 px-3 text-xs font-medium shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="w-full sm:w-64 shrink-0">
          <InputGroup className="h-8 bg-background">
            <InputGroupAddon align="inline-start">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={1.5} />
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter extensions..."
              className="text-xs placeholder:text-muted-foreground"
            />
          </InputGroup>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {isLoading ? (
          <Empty className="border border-dashed border-border py-12">
            <EmptyHeader>
              <Spinner className="mx-auto size-6 text-primary" />
              <EmptyTitle>Loading directory...</EmptyTitle>
              <EmptyDescription>Fetching live registrar wholesale prices.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : filtered.length === 0 ? (
          <Empty className="border border-dashed border-border py-12">
            <EmptyHeader>
              <EmptyTitle>No extensions found</EmptyTitle>
              <EmptyDescription>Try adjusting your category or search filter.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          filtered.map((item) => (
            <Card key={item.tld} className="p-4">
              <CardContent className="flex items-center justify-between gap-4 p-0">
                <div>
                  <span className="font-serif text-2xl font-normal text-foreground">
                    .{item.tld}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-2 flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-lg text-foreground">
                        ${item.registrationPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        (৳{toBdt(item.registrationPrice).toLocaleString()})
                      </span>
                      <span className="text-xs text-muted-foreground">/yr</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      Renews at ${item.renewalPrice.toFixed(2)} (৳{toBdt(item.renewalPrice).toLocaleString()})/yr
                    </span>
                  </div>
                </div>

                <Button
                  render={<Link href={`/search?q=mybrand.${item.tld}`} />}
                  nativeButton={false}
                  variant="outline"
                  size="sm"
                >
                  Check
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader className="bg-card">
            <TableRow>
              <TableHead
                className="px-6 py-3.5 cursor-pointer hover:text-foreground"
                onClick={() => setSortBy("tld")}
              >
                Extension
              </TableHead>
              <TableHead className="px-6 py-3.5">Purpose</TableHead>
              <TableHead
                className="px-6 py-3.5 cursor-pointer hover:text-foreground text-right"
                onClick={() => setSortBy("registration")}
              >
                Registration
              </TableHead>
              <TableHead
                className="px-6 py-3.5 cursor-pointer hover:text-foreground text-right"
                onClick={() => setSortBy("renewal")}
              >
                Renewal Rate
              </TableHead>
              <TableHead className="px-6 py-3.5 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Spinner className="size-4 text-primary" />
                    <span>Loading pricing directory...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  No extensions found matching your filter.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.tld} className="hover:bg-card/60">
                  <TableCell className="px-6 py-4 font-serif text-xl font-normal text-foreground">
                    .{item.tld}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-xs text-muted-foreground max-w-xs">
                    {item.description}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="font-serif text-lg font-normal text-foreground">
                      ${item.registrationPrice.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      ৳{toBdt(item.registrationPrice).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-foreground">
                      ${item.renewalPrice.toFixed(2)}/yr
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      ৳{toBdt(item.renewalPrice).toLocaleString()}/yr
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button
                      render={<Link href={`/search?q=mybrand.${item.tld}`} />}
                      nativeButton={false}
                      variant="outline"
                      size="sm"
                    >
                      Check
                      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
