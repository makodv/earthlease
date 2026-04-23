"use client";

import { useState } from "react";
import Link from "next/link";
import { contactTranslations, type Locale } from "@/data/translations";
import { inputBase } from "@/components/ui/Card";
import {
  getFormspreeContactFormId,
  submitFormspree,
} from "@/lib/formspree";

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = contactTranslations[locale];
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }

    const formId = getFormspreeContactFormId();
    if (!formId) {
      setSubmitError(t.configMissing);
      return;
    }

    setSubmitting(true);
    const subject =
      locale === "fr"
        ? "[EarthLease] Contact — demande de rendez-vous"
        : "[EarthLease] Contact — appointment request";

    const result = await submitFormspree(formId, {
      _subject: subject,
      _replyto: form.email,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone || "—",
      preferredDate: form.date,
      preferredTime: form.time,
    });

    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setSubmitError(result.message || t.submitError);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-white/20 bg-white/70 p-8 text-center shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
        <h2 className="text-xl font-semibold text-[var(--navy-primary)]">{t.successTitle}</h2>
        <p className="mt-4 text-[var(--text-secondary)]">{t.successMessage}</p>
        <Link
          href={`/${locale}`}
          className="mt-6 inline-block text-sm font-medium text-[var(--navy-primary)] underline-offset-2 hover:underline"
        >
          {locale === "fr" ? "Retour à l’accueil" : "Back to home"}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step indicators */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${
              s <= step ? "bg-[var(--navy-primary)]" : "bg-[var(--border)]"
            }`}
            aria-hidden
          />
        ))}
      </div>
      <p className="text-sm font-medium text-[var(--text-muted)]">
        {step === 1 && t.step1}
        {step === 2 && t.step2}
        {step === 3 && t.step3}
      </p>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="contact-name"
              className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
            >
              {t.fullName}
            </label>
            <input
              id="contact-name"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className={inputBase}
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
            >
              {t.email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputBase}
              placeholder={t.emailPlaceholder}
            />
          </div>
          <div>
            <label
              htmlFor="contact-phone"
              className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
            >
              {t.phone}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={inputBase}
              placeholder={t.phonePlaceholder}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <label
            htmlFor="contact-date"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.step2}
          </label>
          <input
            id="contact-date"
            name="preferredDate"
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className={inputBase}
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <label
            htmlFor="contact-time"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.step3}
          </label>
          <input
            id="contact-time"
            name="preferredTime"
            type="time"
            required
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className={inputBase}
          />
        </div>
      )}

      {submitError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--navy-primary)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[var(--navy-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--navy-primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? t.submitting : step < 3 ? t.next : t.submit}
      </button>
    </form>
  );
}
