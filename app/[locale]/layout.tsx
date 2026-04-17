import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroLayoutWrapper } from "@/components/HeroLayoutWrapper";
import { isValidLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/data/translations";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
    </HeroLayoutWrapper>
  );
}
