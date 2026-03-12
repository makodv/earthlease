import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { HomeHero } from "@/components/HomeHero";
import { HomeTrustBlock } from "@/components/HomeTrustBlock";
import { HomeBrands } from "@/components/HomeBrands";
import { HomeExploreVehicles } from "@/components/HomeExploreVehicles";
import { HomeReviews } from "@/components/HomeReviews";
import { HomeHowItWorks } from "@/components/HomeHowItWorks";
import type { Locale } from "@/data/translations";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <HomeHero locale={locale as Locale} />
      <HomeTrustBlock locale={locale as Locale} />
      <HomeBrands locale={locale as Locale} />
      <HomeExploreVehicles locale={locale as Locale} />
      <HomeReviews locale={locale as Locale} />
      <HomeHowItWorks locale={locale as Locale} />
    </>
  );
}
