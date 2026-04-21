import type { OfferCategorySlug } from "@/lib/offerCategory";

/** Number of dashed image slots per section on category offer pages. */
export const CATEGORY_PAGE_IMAGE_LAYOUT: Record<
  OfferCategorySlug,
  { heroWide: number; primaryGrid: number; secondaryGrid: number }
> = {
  materiel: { heroWide: 1, primaryGrid: 12, secondaryGrid: 8 },
  utilitaires: { heroWide: 2, primaryGrid: 6, secondaryGrid: 4 },
  tourisme: { heroWide: 3, primaryGrid: 9, secondaryGrid: 6 },
  "deux-roues": { heroWide: 1, primaryGrid: 8, secondaryGrid: 4 },
};
