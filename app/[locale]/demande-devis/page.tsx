import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { devisTranslations, type Locale } from "@/data/translations";
import { isValidLocale } from "@/lib/i18n";
import { DemandeDevisClient } from "./DemandeDevisClient";
import { DemandeDevisFallback } from "./DemandeDevisFallback";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = devisTranslations[locale as Locale];
  return {
    title: `${t.title} | EarthLease`,
    description: t.openQuoteSubtitle,
  };
}

export default async function DemandeDevisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <Suspense fallback={<DemandeDevisFallback locale={locale as Locale} />}>
      <DemandeDevisClient locale={locale as Locale} />
    </Suspense>
  );
}
