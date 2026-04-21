import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryOfferView } from "@/components/CategoryOfferView";
import { categoryPagesTranslations } from "@/data/translations/categoryPages";
import type { Locale } from "@/data/translations";
import { isValidLocale } from "@/lib/i18n";
import { OFFER_CATEGORY_SLUGS, isOfferCategorySlug, type OfferCategorySlug } from "@/lib/offerCategory";

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
  const t = categoryPagesTranslations[locale as Locale][category];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
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
