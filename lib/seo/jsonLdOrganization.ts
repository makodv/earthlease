import { SITE_ORIGIN } from "@/lib/siteOrigin";

/** Single LocalBusiness entity (same domain for all locales). */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "EarthLease",
  alternateName: "Earthlease Capital SAS",
  url: SITE_ORIGIN,
  telephone: "+33972123253",
  email: "contact@earthlease.fr",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "3 boulevard Georges Méliès",
      addressLocality: "Villiers-sur-Marne",
      postalCode: "94350",
      addressCountry: "FR",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "22 rue Saarinen",
      addressLocality: "Rungis",
      postalCode: "94150",
      addressCountry: "FR",
    },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "€€",
  description: "Location professionnelle de véhicules et matériel d'isolation en France.",
} as const;
