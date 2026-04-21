"use client";

import { useCallback, useEffect, useRef } from "react";
import { audienceModalTranslations, type Locale } from "@/data/translations";
import { writeAudienceProfile, type AudienceProfile } from "@/lib/audienceProfile";
import { useAudienceProfile } from "@/hooks/useAudienceProfile";
import { useHasMounted } from "@/hooks/useHasMounted";

const LOGO_SRC = "/logo.svg";

interface WelcomeAudienceModalProps {
  locale: Locale;
}

export function WelcomeAudienceModal({ locale }: WelcomeAudienceModalProps) {
  const t = audienceModalTranslations[locale];
  const audience = useAudienceProfile();
  const hasMounted = useHasMounted();
  const individuelRef = useRef<HTMLButtonElement>(null);

  const visible = hasMounted && audience === null;

  const choose = useCallback((value: AudienceProfile) => {
    writeAudienceProfile(value);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    individuelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        choose("individuel");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, choose]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-[#0f172a]/55 backdrop-blur-[2px]"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="audience-modal-title"
        aria-describedby="audience-modal-desc"
        className="relative z-[301] w-full max-w-[640px] rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-lift)] sm:p-10"
      >
        <p className="text-center text-sm font-medium text-[var(--text-muted)]">
          {t.welcome}
        </p>
        <div className="mt-3 flex flex-col items-center justify-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt={t.brandName}
            className="h-12 w-auto max-w-[220px] object-contain object-center sm:h-14"
            width={200}
            height={56}
            decoding="async"
          />
        </div>

        <h2
          id="audience-modal-title"
          className="mt-8 text-center text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl"
        >
          {t.title}
        </h2>
        <p
          id="audience-modal-desc"
          className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[var(--text-secondary)]"
        >
          {t.subtitle}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <button
            ref={individuelRef}
            type="button"
            aria-label={t.individuelAria}
            onClick={() => choose("individuel")}
            className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-left shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--navy-primary)] focus-visible:ring-offset-2"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--muted)] text-[var(--navy-primary)] transition group-hover:border-[var(--navy-primary)]/20"
              aria-hidden
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="mt-4 text-base font-bold text-[var(--text-primary)]">
              {t.individuelTitle}
            </span>
            <span className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.individuelDesc}
            </span>
          </button>

          <button
            type="button"
            aria-label={t.professionnelAria}
            onClick={() => choose("professionnel")}
            className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-left shadow-[var(--shadow-card)] transition hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-lift)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--navy-primary)] focus-visible:ring-offset-2"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--muted)] text-[var(--navy-primary)] transition group-hover:border-[var(--navy-primary)]/20"
              aria-hidden
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            <span className="mt-4 text-base font-bold text-[var(--text-primary)]">
              {t.professionnelTitle}
            </span>
            <span className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.professionnelDesc}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
