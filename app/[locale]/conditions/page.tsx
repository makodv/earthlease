import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { conditionsUtilisationTranslations } from "@/data/translations";
import { ConditionsUtilisationView } from "@/components/ConditionsUtilisationView";
import type { Locale } from "@/data/translations";
import { absoluteLocaleUrl, hreflangAlternates } from "@/lib/siteOrigin";

const pathAfterLocale = "/conditions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as Locale;
  const t = conditionsUtilisationTranslations[loc];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: hreflangAlternates(loc, pathAfterLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: absoluteLocaleUrl(loc, pathAfterLocale),
    },
  };
}

export default async function ConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="min-h-[60vh] bg-[var(--background)]">
      <ConditionsUtilisationView locale={locale as Locale} />
    </div>
  );
}
