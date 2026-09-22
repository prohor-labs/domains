import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="group inline-flex items-center gap-2">
              <BrandLogo animated={false} />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Modern domain intelligence, live registrar availability, and multi-TLD pricing comparison platform.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm font-medium tracking-wide text-foreground uppercase">
              Popular Namespaces
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/search?q=prohor.com" className="hover:text-foreground transition-colors">
                  .com Search
                </Link>
              </li>
              <li>
                <Link href="/search?q=prohor.dev" className="hover:text-foreground transition-colors">
                  .dev for Developers
                </Link>
              </li>
              <li>
                <Link href="/search?q=prohor.ai" className="hover:text-foreground transition-colors">
                  .ai Intelligence
                </Link>
              </li>
              <li>
                <Link href="/search?q=prohor.io" className="hover:text-foreground transition-colors">
                  .io for Startups
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-medium tracking-wide text-foreground uppercase">
              Platform Tools
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/search" className="hover:text-foreground transition-colors">
                  Instant Availability
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  TLD Pricing Directory
                </Link>
              </li>
              <li>
                <Link href="/search?tab=saved" className="hover:text-foreground transition-colors">
                  Saved Watchlist
                </Link>
              </li>
              <li>
                <Link href="/api/domains/pricing" className="hover:text-foreground transition-colors">
                  Public JSON Pricing Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Prohor. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern Next.js, TanStack Query & Base UI
          </p>
        </div>
      </div>
    </footer>
  );
}
