import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { devisTranslations, type Locale } from "@/data/translations";
import { isValidLocale } from "@/lib/i18n";
import { absoluteLocaleUrl, hreflangAlternates } from "@/lib/siteOrigin";
import { DemandeDevisClient } from "./DemandeDevisClient";
import { DemandeDevisFallback } from "./DemandeDevisFallback";

const pathAfterLocale = "/demande-devis";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as Locale;
  const t = devisTranslations[loc];
  const title = `${t.title} | EarthLease`;
  return {
    title,
    description: t.openQuoteSubtitle,
    alternates: hreflangAlternates(loc, pathAfterLocale),
    openGraph: {
      title,
      description: t.openQuoteSubtitle,
      url: absoluteLocaleUrl(loc, pathAfterLocale),
    },
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
