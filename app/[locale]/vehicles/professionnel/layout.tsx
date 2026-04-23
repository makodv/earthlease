import type { ReactNode } from "react";
import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/data/translations";
import { catalogHref } from "@/lib/vehiclesCatalog";
import { SITE_ORIGIN } from "@/lib/siteOrigin";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as Locale;
  const path = catalogHref(`/${loc}`, "professionnel");
  return {
    title: "Redirection",
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_ORIGIN}${path}` },
  };
}

export default function LegacyProfessionnelLayout({ children }: { children: ReactNode }) {
  return children;
}
