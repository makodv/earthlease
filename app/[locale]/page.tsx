import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { HomeHero } from "@/components/HomeHero";
import { HomeTrustBlock } from "@/components/HomeTrustBlock";
import { HomeProShowcase } from "@/components/HomeProShowcase";
import { HomeReviews } from "@/components/HomeReviews";
import { HomeHowItWorks } from "@/components/HomeHowItWorks";
import { HomePartnerTraining } from "@/components/HomePartnerTraining";
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
      <HomeHero locale={locale as Locale} heroImageSrc="/heroimage.png" />
      <HomeTrustBlock locale={locale as Locale} imageSrc="/pourquoi section.png" />
      <HomeProShowcase locale={locale as Locale} />
      <HomePartnerTraining locale={locale as Locale} />
      <HomeReviews locale={locale as Locale} />
      <HomeHowItWorks locale={locale as Locale} />
    </>
  );
}
