import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryOfferView } from "@/components/CategoryOfferView";
import type { Locale } from "@/data/translations";
import { isValidLocale } from "@/lib/i18n";
import { OFFER_CATEGORY_SLUGS, isOfferCategorySlug, type OfferCategorySlug } from "@/lib/offerCategory";
import { absoluteLocaleUrl, hreflangAlternates } from "@/lib/siteOrigin";
import { getCategoryOfferSeo } from "@/lib/seo/categoryOfferMeta";

export function generateStaticParams(): { category: OfferCategorySlug }[] {
  return OFFER_CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidLocale(locale) || !isOfferCategorySlug(category)) return {};
  const loc = locale as Locale;
  const seo = getCategoryOfferSeo(loc, category);
  const path = `/offres/${category}`;
  const alternates = hreflangAlternates(loc, path);
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: absoluteLocaleUrl(loc, path),
    },
  };
}

export default async function OfferCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isValidLocale(locale) || !isOfferCategorySlug(category)) notFound();

  return (
    <div className="min-h-[60vh] bg-[var(--background)]">
      <CategoryOfferView locale={locale as Locale} category={category} />
    </div>
  );
}
