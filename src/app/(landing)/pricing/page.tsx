import type { Metadata } from "next";
import { TldPricingTable } from "@/components/pricing/tld-pricing-table";

export const metadata: Metadata = {
  title: "TLD Wholesale Pricing Directory (USD & BDT)",
  description:
    "Compare first-year registration and recurring renewal prices across 900+ extensions with live dual USD and BDT pricing.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 flex flex-col gap-10">
      <div className="text-center flex flex-col gap-3 max-w-xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.02em] text-foreground">
          TLD Pricing Directory
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Transparent first-year registration and predictable renewal rates across all supported domain namespaces.
        </p>
      </div>

      <TldPricingTable />
    </div>
  );
}
