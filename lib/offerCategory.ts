export const OFFER_CATEGORY_SLUGS = ["materiel", "utilitaires", "tourisme", "deux-roues"] as const;

export type OfferCategorySlug = (typeof OFFER_CATEGORY_SLUGS)[number];

export function isOfferCategorySlug(value: string): value is OfferCategorySlug {
  return (OFFER_CATEGORY_SLUGS as readonly string[]).includes(value);
}

export function offersCategoryHref(basePath: string, slug: OfferCategorySlug): string {
  return `${basePath}/offres/${slug}`;
}

export function demandeDevisHref(basePath: string, category: OfferCategorySlug): string {
  return `${basePath}/demande-devis?category=${category}`;
}
