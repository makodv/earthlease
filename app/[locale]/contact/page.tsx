import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { contactTranslations, type Locale } from "@/data/translations";
import { isValidLocale } from "@/lib/i18n";
import { absoluteLocaleUrl, hreflangAlternates } from "@/lib/siteOrigin";

const pathAfterLocale = "/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as Locale;
  const isFr = loc === "fr";
  const title = isFr
    ? "Contact — EarthLease | Demande de devis et informations"
    : "Contact — EarthLease | Quote request and information";
  const description = isFr
    ? "Contactez EarthLease pour un devis personnalisé : location de véhicules professionnels, fourgons, électrique/hybride et matériel d'isolation KRENDL."
    : "Contact EarthLease for a personalised quote: professional vehicle rental, vans, electric/hybrid and KRENDL insulation equipment.";
  return {
    title,
    description,
    alternates: hreflangAlternates(loc, pathAfterLocale),
    openGraph: {
      title,
      description,
      url: absoluteLocaleUrl(loc, pathAfterLocale),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as Locale;
  const t = contactTranslations[loc];

  return (
    <div className="min-h-[60vh] bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--text-secondary)]">{t.subtitle}</p>
        <div className="mt-10">
          <ContactForm locale={loc} />
        </div>
      </div>
    </div>
  );
}
