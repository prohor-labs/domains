export interface DomainSearchResult {
  domain: string;
  available: boolean;
  years?: number;
  price?: number;
  renewalPrice?: number;
  premium?: boolean;
}

export interface DomainSearchResponse {
  results: DomainSearchResult[];
  query: string;
}

export interface TldPriceInfo {
  tld: string;
  category: "popular" | "tech" | "business" | "creative" | "geo" | "niche";
  registrationPrice: number;
  renewalPrice: number;
  transferPrice?: number;
  description: string;
  isPopular?: boolean;
  isPromo?: boolean;
}

export interface DomainDetail {
  domain: string;
  sld: string;
  tld: string;
  available: boolean;
  price?: number;
  renewalPrice?: number;
  premium?: boolean;
  years?: number;
  whois?: {
    registrar?: string;
    abuseEmail?: string;
    abusePhone?: string;
    createdDate?: string;
    expiredDate?: string;
    updatedDate?: string;
    status?: string[];
    nameServers?: string[];
    dnssec?: boolean;
  };
  dns?: {
    aRecords?: string[];
    aaaaRecords?: string[];
    cnameRecords?: string[];
    mxRecords?: string[];
    txtRecords?: string[];
    nsRecords?: string[];
    soaRecord?: string;
  };
}
