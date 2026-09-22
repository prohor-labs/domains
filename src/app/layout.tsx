import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/lib/query/provider";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://domains.prohor.dev"),
  title: {
    default: "Buy Domains with Ease | Pay & Forget",
    template: "%s | Prohor",
  },
  description:
    "Buy domains with ease. Pay and forget — your domain, our responsibility. Instant domain search, live availability, transparent wholesale pricing in USD & BDT, free WHOIS privacy, and managed setup.",
  applicationName: "Prohor",
  keywords: [
    "buy domain with ease",
    "pay and forget domain",
    "domain search",
    "domain registration Bangladesh",
    "BDT domain pricing",
    "whois privacy",
    "prohor",
    "instant domain search",
  ],
  authors: [{ name: "Prohor", url: "https://domains.prohor.dev" }],
  creator: "Prohor",
  publisher: "Prohor",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/vercel.svg",
    apple: "/icons/vercel.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://domains.prohor.dev",
    siteName: "Prohor",
    title: "Buy Domains with Ease | Pay & Forget",
    description:
      "Buy domains with ease. Pay and forget — your domain, our responsibility. Instant domain search, live availability, and wholesale pricing in USD & BDT.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Domains with Ease | Pay & Forget",
    description:
      "Buy domains with ease. Pay and forget — your domain, our responsibility. Instant domain search and transparent pricing.",
    creator: "@frostfoe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        newsreader.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <QueryProvider>{children}</QueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
