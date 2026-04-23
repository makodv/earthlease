import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { HeroLayoutWrapper } from "@/components/HeroLayoutWrapper";
import { WelcomeAudienceModal } from "@/components/WelcomeAudienceModal";
import { isValidLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/data/translations";
import { rootMetadataByLocale } from "@/lib/seo/rootMetadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : "fr";
  return rootMetadataByLocale[locale];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <HeroLayoutWrapper locale={locale}>
      <Suspense fallback={<div className="min-h-[88px] w-full" aria-hidden />}>
        <Navbar locale={locale as Locale} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
      <FloatingWhatsApp />
      <WelcomeAudienceModal locale={locale as Locale} />
    </HeroLayoutWrapper>
  );
}
