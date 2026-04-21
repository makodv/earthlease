import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { confidentialiteRgpdTranslations } from "@/data/translations";
import { ConfidentialiteRgpdView } from "@/components/ConfidentialiteRgpdView";
import type { Locale } from "@/data/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = confidentialiteRgpdTranslations[locale as Locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
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
