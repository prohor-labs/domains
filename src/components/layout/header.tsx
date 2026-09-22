"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark02Icon,
  Cancel01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useWatchlist } from "@/hooks/use-watchlist";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const { watchlist } = useWatchlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className="group flex items-center gap-2">
            <BrandLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/pricing"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/pricing" ? "text-primary" : "text-muted-foreground"
              )}
            >
              TLD Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            render={<Link href="/search?tab=saved" />}
            nativeButton={false}
            variant="outline"
            size="icon"
            className="relative"
            aria-label="Saved domains"
          >
            <HugeiconsIcon icon={Bookmark02Icon} strokeWidth={2} className="size-4" />
            {watchlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {watchlist.length}
              </span>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <HugeiconsIcon
              icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3">
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/pricing" ? "bg-card text-primary" : "text-foreground hover:bg-card"
            )}
          >
            TLD Pricing Matrix
          </Link>
          <Link
            href="/search?tab=saved"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors text-foreground hover:bg-card"
            )}
          >
            <span>Saved Watchlist</span>
            {watchlist.length > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                {watchlist.length}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
