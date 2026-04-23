import Link from "next/link";
import { conditionsUtilisationTranslations, type Locale } from "@/data/translations";
import { LegalPublisherCard } from "@/components/LegalPublisherCard";

interface ConditionsUtilisationViewProps {
  locale: Locale;
}

export function ConditionsUtilisationView({ locale }: ConditionsUtilisationViewProps) {
  const t = conditionsUtilisationTranslations[locale];
  const basePath = `/${locale}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
        EarthLease
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {t.pageTitle}
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{t.lastUpdated}</p>
      <p className="mt-8 text-[var(--text-secondary)] leading-relaxed">{t.intro}</p>

      <nav
        aria-label={locale === "fr" ? "Sommaire" : "On this page"}
        className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          {locale === "fr" ? "Sommaire" : "Contents"}
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          {t.sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-[var(--navy-primary)] underline-offset-2 hover:underline"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-12 space-y-14">
        {t.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">{section.title}</h2>
            <div className="mt-4 space-y-4 text-[var(--text-secondary)] leading-relaxed">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {section.id === "editeur" ? (
              <div className="mt-8">
                <LegalPublisherCard locale={locale} compact />
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <p className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/60 px-5 py-4 text-sm text-[var(--text-secondary)]">
        <Link
          href={`${basePath}/confidentialite-rgpd`}
          className="font-semibold text-[var(--navy-primary)] underline-offset-2 hover:underline"
        >
          {t.privacyLinkLabel}
        </Link>
      </p>
    </div>
  );
}
