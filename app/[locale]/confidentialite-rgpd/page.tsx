import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { confidentialiteRgpdTranslations } from "@/data/translations";
import { ConfidentialiteRgpdView } from "@/components/ConfidentialiteRgpdView";
import type { Locale } from "@/data/translations";
import { absoluteLocaleUrl, hreflangAlternates } from "@/lib/siteOrigin";

const pathAfterLocale = "/confidentialite-rgpd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as Locale;
  const t = confidentialiteRgpdTranslations[loc];
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

export default async function ConfidentialiteRgpdPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="min-h-[60vh] bg-[var(--background)]">
      <ConfidentialiteRgpdView locale={locale as Locale} />
    </div>
  );
}
