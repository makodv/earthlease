import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { faqTranslations, type Locale } from "@/data/translations";
import { isValidLocale } from "@/lib/i18n";
import { absoluteLocaleUrl, hreflangAlternates } from "@/lib/siteOrigin";

const pathAfterLocale = "/faq";

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
    ? "FAQ — Location professionnelle véhicules & matériel | EarthLease"
    : "FAQ — Professional vehicle & equipment rental | EarthLease";
  const description = isFr
    ? "Questions fréquentes sur la location chez EarthLease : durée minimum, devis, livraison, matériel KRENDL, véhicules électriques et utilitaires."
    : "Frequently asked questions about renting with EarthLease: minimum duration, quotes, delivery, KRENDL equipment, electric vehicles and vans.";
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

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as Locale;
  const t = faqTranslations[loc];

  return (
    <div className="min-h-[60vh] bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--text-secondary)]">{t.subtitle}</p>
        <dl className="mt-12 space-y-8">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
            >
              <dt className="text-lg font-semibold text-[var(--text-primary)]">{item.question}</dt>
              <dd className="mt-3 text-[var(--text-secondary)] leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
