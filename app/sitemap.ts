import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * A single-page site, so the sitemap lists the one URL. The in-page anchors are
 * deliberately not listed — they are not separate documents, and submitting them
 * as such is a classic way to get a sitemap ignored.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
