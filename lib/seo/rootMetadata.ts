import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/lib/siteOrigin";

const BASE = SITE_ORIGIN;
const ogImagePath = "/og-image.jpg";

export const rootMetadataByLocale: Record<"fr" | "en", Metadata> = {
  fr: {
    metadataBase: new URL(BASE),
    title: {
      default: "EarthLease — Location professionnelle véhicules & matériel isolation",
      template: "%s | EarthLease",
    },
    description:
      "Location flexible de fourgons, utilitaires, voitures électriques/hybrides et cardeuses KRENDL pour les pros du bâtiment. Durée minimum 1 mois. Devis sous 24–48 h.",
    keywords: [
      "location longue durée professionnel",
      "location fourgon professionnel",
      "location utilitaire chantier",
      "location cardeuse souffleuse",
      "location KRENDL 425 575 2300",
      "location véhicule électrique hybride",
      "location matériel isolation",
      "location voiture électrique professionnelle",
      "location SUV hybride",
      "location longue durée sans engagement",
      "location véhicule pro France",
      "EarthLease",
    ],
    authors: [{ name: "EarthLease", url: BASE }],
    creator: "EarthLease",
    publisher: "Earthlease Capital SAS",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: {
      canonical: `${BASE}/fr`,
      languages: {
        "fr-FR": `${BASE}/fr`,
        "en-GB": `${BASE}/en`,
        "x-default": `${BASE}/fr`,
      },
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      alternateLocale: ["en_GB"],
      siteName: "EarthLease",
      url: `${BASE}/fr`,
      title: "EarthLease — Location pro véhicules & matériel isolation",
      description:
        "Fourgons, utilitaires, électrique/hybride et cardeuses KRENDL. Location flexible 1 mois minimum. Devis rapide.",
      images: [
        {
          url: `${BASE}${ogImagePath}`,
          width: 1200,
          height: 630,
          alt: "EarthLease — Location professionnelle véhicules et matériel isolation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "EarthLease — Location pro véhicules & matériel isolation",
      description:
        "Fourgons, utilitaires, électrique/hybride et cardeuses KRENDL. Location 1 mois min. Devis rapide.",
      images: [`${BASE}${ogImagePath}`],
    },
  },

  en: {
    metadataBase: new URL(BASE),
    title: {
      default: "EarthLease — Professional Vehicle & Insulation Equipment Rental",
      template: "%s | EarthLease",
    },
    description:
      "Flexible rental of vans, utility vehicles, electric/hybrid cars and KRENDL blowing machines for construction professionals. Minimum 1 month. Quote within 24–48 h.",
    keywords: [
      "professional vehicle rental France",
      "long-term van rental",
      "utility vehicle rental",
      "KRENDL blowing machine rental",
      "insulation equipment rental",
      "electric car rental professional",
      "hybrid vehicle rental",
      "construction vehicle rental",
      "flexible vehicle leasing",
      "EarthLease",
    ],
    authors: [{ name: "EarthLease", url: BASE }],
    creator: "EarthLease",
    publisher: "Earthlease Capital SAS",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: {
      canonical: `${BASE}/en`,
      languages: {
        "fr-FR": `${BASE}/fr`,
        "en-GB": `${BASE}/en`,
        "x-default": `${BASE}/fr`,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      alternateLocale: ["fr_FR"],
      siteName: "EarthLease",
      url: `${BASE}/en`,
      title: "EarthLease — Professional Vehicle & Insulation Equipment Rental",
      description:
        "Vans, utility vehicles, electric/hybrid cars and KRENDL blowing machines. Flexible rental from 1 month. Fast quote.",
      images: [
        {
          url: `${BASE}${ogImagePath}`,
          width: 1200,
          height: 630,
          alt: "EarthLease — Professional vehicle and insulation equipment rental",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "EarthLease — Professional Vehicle & Insulation Equipment Rental",
      description:
        "Vans, EVs, hybrids and KRENDL machines. Rental from 1 month. Fast quote.",
      images: [`${BASE}${ogImagePath}`],
    },
  },
};
