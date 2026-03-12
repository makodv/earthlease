import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { HomeHero } from "@/components/HomeHero";
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
    </>
  );
}
