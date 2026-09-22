import type { MetadataRoute } from "next";
import { TLD_DIRECTORY } from "@/lib/constants/tlds";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://domains.prohor.dev";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const tldRoutes: MetadataRoute.Sitemap = TLD_DIRECTORY.map((item) => ({
    url: `${baseUrl}/search?q=mybrand.${item.tld}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...tldRoutes];
}
