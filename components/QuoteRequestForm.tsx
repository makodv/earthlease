"use client";

import { useState } from "react";
import Link from "next/link";
import type { VehicleOption } from "@/data/types/vehicle";
import { devisTranslations, vehicleTranslations, type Locale } from "@/data/translations";

interface QuoteRequestFormProps {
  vehicle: VehicleOption;
  locale: Locale;
  vehicleDetailPath: string;
}

export function QuoteRequestForm({
  vehicle,
  locale,
  vehicleDetailPath,
}: QuoteRequestFormProps) {
  const t = devisTranslations[locale];
  const vT = vehicleTranslations[locale];
  const transmissionLabel =
    vehicle.transmission === "automatic" ? vT.automatic : vT.manual;
  const fuelLabel = vehicle.fuelType === "diesel" ? vT.diesel : vT.essence;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to API
    console.log("Quote request", { vehicle: vehicle.slug, ...form });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted-bg)] p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--primary)]">
          {t.successTitle}
        </h2>
        <p className="mt-4 text-[var(--muted)]">{t.successMessage}</p>
        <Link
          href={vehicleDetailPath}
          className="mt-6 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
        >
          {t.backToVehicle}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Vehicle summary */}
      <section className="rounded-xl border border-[var(--border)] bg-white p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          {t.vehicleChosen}
        </h3>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--foreground)]">
              {vehicle.brand} {vehicle.name}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {vehicle.seats} {t.seats} · {transmissionLabel} · {fuelLabel}
            </p>
          </div>
          <p className="text-xl font-bold text-[var(--primary)]">
            {vehicle.pricePerMonth}€{t.perMonth}
          </p>
        </div>
      </section>

      {/* Personal info */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          {t.personalInfo}
        </h3>
        <div className="grid gap-4 sm:grid-cols-1">
          <div>
            <label
              htmlFor="quote-name"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              {t.fullName}
            </label>
            <input
              id="quote-name"
              type="text"
              required
              value={form.fullName}
              onChange={(e) =>
                setForm((f) => ({ ...f, fullName: e.target.value }))
              }
              className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label
              htmlFor="quote-email"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              {t.email}
            </label>
            <input
              id="quote-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              placeholder="jean@exemple.fr"
            />
          </div>
          <div>
            <label
              htmlFor="quote-phone"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              {t.phone}
            </label>
            <input
              id="quote-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>
      </section>

      {/* Rental period */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          {t.rentalPeriod}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="quote-start"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              {t.startDate}
            </label>
            <input
              id="quote-start"
              type="date"
              required
              value={form.startDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, startDate: e.target.value }))
              }
              className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>
          <div>
            <label
              htmlFor="quote-end"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              {t.endDate}
            </label>
            <input
              id="quote-end"
              type="date"
              required
              value={form.endDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, endDate: e.target.value }))
              }
              className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>
        </div>
      </section>

      <button
        type="submit"
        className="w-full rounded-xl bg-[var(--primary)] px-6 py-4 font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] sm:w-auto sm:px-10"
      >
        {t.submit}
      </button>
    </form>
  );
}
