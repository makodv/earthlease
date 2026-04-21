import Link from "next/link";
import { devisTranslations, type Locale } from "@/data/translations";

/** Static shell while `useSearchParams` hydrates (Cloudflare / static export). */
export function DemandeDevisFallback({ locale }: { locale: Locale }) {
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
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]"
      >
        {t.backToOffers}
      </Link>
      <header className="mb-10">
        <h1 className="text-section-title text-[var(--text-primary)]">{t.title}</h1>
        <p className="mt-3 text-body-lg text-[var(--text-secondary)]">{t.openQuoteSubtitle}</p>
      </header>
      <div className="animate-pulse space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="h-32 rounded-lg bg-[var(--muted)]" />
        <div className="h-10 rounded-lg bg-[var(--muted)]" />
        <div className="h-10 rounded-lg bg-[var(--muted)]" />
      </div>
    </div>
  );
}
