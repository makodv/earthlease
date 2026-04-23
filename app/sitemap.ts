import type { MetadataRoute } from "next";
import { getAllVehicleSlugs } from "@/data/vehicles";
import { OFFER_CATEGORY_SLUGS } from "@/lib/offerCategory";
import { SITE_ORIGIN } from "@/lib/siteOrigin";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "",
  "/contact",
  "/faq",
  "/vehicles",
  "/demande-devis",
  "/how-it-works",
  "/conditions",
  "/confidentialite-rgpd",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"] as const;
  const slugs = getAllVehicleSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of STATIC_PATHS) {
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "monthly" : "weekly",
        priority: locale === "fr" && page === "" ? 1 : locale === "fr" ? 0.8 : 0.5,
      });
    }

    for (const category of OFFER_CATEGORY_SLUGS) {
      entries.push({
        url: `${SITE_ORIGIN}/${locale}/offres/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: locale === "fr" ? 0.8 : 0.5,
      });
    }

    for (const slug of slugs) {
      entries.push({
        url: `${SITE_ORIGIN}/${locale}/vehicles/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: locale === "fr" ? 0.6 : 0.4,
      });
    }
  }

  return entries;
}
