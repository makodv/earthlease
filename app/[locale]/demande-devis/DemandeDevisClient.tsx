"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";
import { devisTranslations, type Locale } from "@/data/translations";
import { isOfferCategorySlug, type OfferCategorySlug } from "@/lib/offerCategory";

interface DemandeDevisClientProps {
  locale: Locale;
}

export function DemandeDevisClient({ locale }: DemandeDevisClientProps) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("category");
  const category: OfferCategorySlug | null =
    raw && isOfferCategorySlug(raw) ? raw : null;

  const t = devisTranslations[locale];
  const basePath = `/${locale}`;

  return (
    <div
      className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,46,91,0.05) 0%, transparent 50%), #f4f7fb",
      }}
    >
      <Link
        href={`${basePath}/vehicles`}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--navy-primary)]"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t.backToOffers}
      </Link>

      <header className="mb-10">
        <h1 className="text-section-title text-[var(--text-primary)]">{t.title}</h1>
        <p className="mt-3 text-body-lg text-[var(--text-secondary)]">{t.openQuoteSubtitle}</p>
      </header>

      <QuoteRequestForm
        vehicle={null}
        locale={locale}
        vehicleDetailPath={`${basePath}/vehicles`}
        quoteCategory={category}
      />
    </div>
  );
}
