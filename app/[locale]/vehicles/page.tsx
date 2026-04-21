import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ProOfferGallery } from "@/components/ProOfferGallery";
import { proShowcaseTranslations } from "@/data/translations";
import type { Locale } from "@/data/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = proShowcaseTranslations[locale as Locale];
  return {
    title: t.vehiclesMetaTitle,
    description: t.vehiclesMetaDescription,
  };
}

export default async function VehiclesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="section-vehicles-organic min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ProOfferGallery locale={locale as Locale} variant="vehicles" />
      </div>
    </div>
  );
}
