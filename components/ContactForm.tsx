"use client";

import { useState } from "react";
import { contactTranslations, type Locale } from "@/data/translations";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      // Submit logic (e.g. send to API)
      console.log("Submit", form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step indicators */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${
              s <= step ? "bg-[var(--primary)]" : "bg-[var(--border)]"
            }`}
            aria-hidden
          />
        ))}
      </div>
      <p className="text-sm font-medium text-[var(--muted)]">
        {step === 1 && t.step1}
        {step === 2 && t.step2}
        {step === 3 && t.step3}
      </p>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="contact-name"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              {t.fullName}
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              {t.email}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              placeholder={t.emailPlaceholder}
            />
          </div>
          <div>
            <label
              htmlFor="contact-phone"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              {t.phone}
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              placeholder={t.phonePlaceholder}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <label
            htmlFor="contact-date"
            className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
          >
            {t.step2}
          </label>
          <input
            id="contact-date"
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <label
            htmlFor="contact-time"
            className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
          >
            {t.step3}
          </label>
          <input
            id="contact-time"
            type="time"
            required
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--primary)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
      >
        {step < 3 ? t.next : t.submit}
      </button>
    </form>
  );
}
