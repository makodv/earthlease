import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page demandée n’existe pas sur earthlease.fr.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[var(--background)] px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">404</p>
      <h1 className="mt-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Page introuvable</h1>
      <p className="mt-4 max-w-md text-[var(--text-secondary)] leading-relaxed">
        Cette adresse n’existe pas ou n’est plus disponible. Page not found — this address is invalid or has moved.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/fr"
          className="rounded-xl bg-[var(--navy-primary)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--navy-primary-hover)]"
        >
          Accueil (FR)
        </Link>
        <Link
          href="/en"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition hover:border-[var(--navy-primary)]/30"
        >
          Home (EN)
        </Link>
      </div>
    </div>
  );
}
