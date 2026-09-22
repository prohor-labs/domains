import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Link href="/" className="group inline-flex items-center gap-2">
              <BrandLogo animated={false} />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Instant domain search, live availability checking, and managed DNS
              setup with direct checkout.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm font-medium tracking-wide text-foreground uppercase">
              Popular Namespaces
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/search?q=prohor.com"
                  className="hover:text-foreground transition-colors"
                >
                  .com Search
                </Link>
              </li>
              <li>
                <Link
                  href="/search?q=prohor.dev"
                  className="hover:text-foreground transition-colors"
                >
                  .dev for Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/search?q=prohor.ai"
                  className="hover:text-foreground transition-colors"
                >
                  .ai Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/search?q=prohor.io"
                  className="hover:text-foreground transition-colors"
                >
                  .io for Startups
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Prohor. All rights reserved.</p>
          <p>Managed domain registry and infrastructure platform</p>
        </div>
      </div>
    </footer>
  );
}
