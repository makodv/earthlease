"use client";

import { useState } from "react";
import { contactTranslations, type Locale } from "@/data/translations";
import { inputBase } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
            type="time"
            required
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className={inputBase}
          />
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--navy-primary)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[var(--navy-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--navy-primary)] focus:ring-offset-2 sm:w-auto"
      >
        {step < 3 ? t.next : t.submit}
      </button>
    </form>
  );
}
