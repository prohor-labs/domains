import type { Metadata } from "next";
import { DomainDetailsContent } from "@/components/domain/domain-details-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domainSlug: string }>;
}): Promise<Metadata> {
  const { domainSlug } = await params;
  const cleanDomain = decodeURIComponent(domainSlug);

  return {
    title: `${cleanDomain} — Instant Acquisition & Registration`,
    description: `Claim ${cleanDomain} with ease. Pay and forget — live dual USD and BDT wholesale pricing, free WHOIS privacy, and automatic DNS setup.`,
  };
}

export default async function DomainDetailPage({
  params,
}: {
  params: Promise<{ domainSlug: string }>;
}) {
  const { domainSlug } = await params;

  return <DomainDetailsContent domainSlug={domainSlug} />;
}
