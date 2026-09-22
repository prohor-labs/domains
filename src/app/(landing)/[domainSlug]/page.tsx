import type { Metadata } from "next";
import { getDomainDetailsAction } from "@/lib/actions/domains";
import { toBdt } from "@/lib/utils/pricing";
import { DomainDetailsContent } from "@/components/domain/domain-details-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domainSlug: string }>;
}): Promise<Metadata> {
  const { domainSlug } = await params;
  const cleanDomain = decodeURIComponent(domainSlug).toLowerCase().trim();

  try {
    const detail = await getDomainDetailsAction(cleanDomain);
    const isAvailable = detail.available;
    const priceUsd = detail.price ?? 11.99;
    const priceBdt = toBdt(priceUsd);

    const title = isAvailable
      ? `${cleanDomain} is Available ($${priceUsd.toFixed(2)} / ৳${priceBdt.toLocaleString()})`
      : `${cleanDomain} — Domain & Live DNS Intelligence`;

    const description = isAvailable
      ? `${cleanDomain} is available for instant registration at $${priceUsd.toFixed(2)}/yr (৳${priceBdt.toLocaleString()} BDT). Includes free WHOIS privacy and automated DNS configuration.`
      : `Live WHOIS registration status, registrar delegations, and active DNS routing records for ${cleanDomain}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://domains.prohor.dev/${encodeURIComponent(cleanDomain)}`,
        siteName: "Prohor Domains",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: `${cleanDomain} — Domain Search & Registration`,
      description: `Check live availability, WHOIS records, and wholesale registration pricing for ${cleanDomain}.`,
    };
  }
}

export default async function DomainDetailPage({
  params,
}: {
  params: Promise<{ domainSlug: string }>;
}) {
  const { domainSlug } = await params;

  return <DomainDetailsContent domainSlug={domainSlug} />;
}
