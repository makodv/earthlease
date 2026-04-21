"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { VehicleOption } from "@/data/types/vehicle";
import { devisTranslations, vehicleTranslations, type Locale } from "@/data/translations";
import { inputBase } from "@/components/ui/Card";
import { useAudienceProfile } from "@/hooks/useAudienceProfile";
import type { OfferCategorySlug } from "@/lib/offerCategory";

interface QuoteRequestFormProps {
  /** When `null`, the form is “open” (no pre-selected vehicle). */
  vehicle: VehicleOption | null;
  locale: Locale;
  vehicleDetailPath: string;
  /** Optional theme from `/demande-devis?category=` */
  quoteCategory?: OfferCategorySlug | null;
}

type QuoteProfile = "individuel" | "professionnel";

const OFFER_CATEGORY_LABEL: Record<Locale, Record<OfferCategorySlug, string>> = {
  fr: {
    materiel: "Thématique : matériel & isolation",
    utilitaires: "Thématique : utilitaires",
    tourisme: "Thématique : tourisme électrique & hybride",
    "deux-roues": "Thématique : deux-roues",
  },
  en: {
    materiel: "Topic: equipment & insulation",
    utilitaires: "Topic: commercial vans",
    tourisme: "Topic: electric & hybrid passenger cars",
    "deux-roues": "Topic: two-wheelers",
  },
};

export function QuoteRequestForm({
  vehicle,
  locale,
  vehicleDetailPath,
  quoteCategory = null,
}: QuoteRequestFormProps) {
  const t = devisTranslations[locale];
  const vT = vehicleTranslations[locale];
  const audience = useAudienceProfile();
  const isOpenQuote = vehicle === null;

  const transmissionLabel =
    vehicle && (vehicle.transmission === "automatic" ? vT.automatic : vT.manual);
  const fuelLabel =
    vehicle &&
    (vehicle.fuelType === "diesel"
      ? vT.diesel
      : vehicle.fuelType === "electric"
        ? vT.electric
        : vT.essence);

  const showNumericPrice =
    vehicle && !vehicle.priceOnRequest && vehicle.pricePerMonth > 0;

  const initialProfile: QuoteProfile = useMemo(() => {
    if (!vehicle) {
      return audience === "professionnel" ? "professionnel" : "individuel";
    }
    if (vehicle.vehicleCategory !== "individuel") return "professionnel";
    return audience === "professionnel" ? "professionnel" : "individuel";
  }, [vehicle, audience]);

  const [submitted, setSubmitted] = useState(false);
  const [hasManualProfileChoice, setHasManualProfileChoice] = useState(false);
  const [profile, setProfile] = useState<QuoteProfile>(initialProfile);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    siret: "",
    vatNumber: "",
    businessRole: "",
    startDate: "",
    endDate: "",
    needDescription: "",
  });

  const isPro = profile === "professionnel";

  useEffect(() => {
    if (hasManualProfileChoice) return;
    setProfile(initialProfile);
  }, [initialProfile, hasManualProfileChoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to API
    console.log("Quote request", {
      mode: isOpenQuote ? "open" : "vehicle",
      vehicle: vehicle?.slug ?? null,
      quoteCategory,
      profile,
      ...form,
    });
    setSubmitted(true);
  };

  const successLabel = isOpenQuote ? t.backToOffers : t.backToVehicle;

  if (submitted) {
    return (
      <div className="rounded-xl border border-white/20 bg-white/70 p-8 text-center shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
        <h2 className="text-xl font-semibold text-[var(--navy-primary)]">
          {t.successTitle}
        </h2>
        <p className="mt-4 text-[var(--text-secondary)]">{t.successMessage}</p>
        <Link
          href={vehicleDetailPath}
          className="mt-6 inline-block text-sm font-medium text-[var(--navy-primary)] hover:underline"
        >
          {successLabel}
        </Link>
      </div>
    );
  }

  const profileSection = (
    <section className="rounded-xl border border-white/20 bg-white/70 p-6 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--navy-primary)]">
        {t.profileLabel}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            setHasManualProfileChoice(true);
            setProfile("individuel");
          }}
          className={`rounded-xl border p-4 text-left transition ${
            !isPro
              ? "border-[var(--navy-primary)] bg-[var(--navy-primary)]/5"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--navy-primary)]/25"
          }`}
        >
          <p className="font-semibold text-[var(--text-primary)]">{t.profileIndividuel}</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t.profileIndividuelDesc}</p>
        </button>
        <button
          type="button"
          onClick={() => {
            setHasManualProfileChoice(true);
            setProfile("professionnel");
          }}
          className={`rounded-xl border p-4 text-left transition ${
            isPro
              ? "border-[var(--navy-primary)] bg-[var(--navy-primary)]/5"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--navy-primary)]/25"
          }`}
        >
          <p className="font-semibold text-[var(--text-primary)]">{t.profileProfessionnel}</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t.profileProfessionnelDesc}</p>
        </button>
      </div>
    </section>
  );

  const vehicleSection =
    vehicle ? (
      <section className="rounded-xl border border-white/20 bg-white/70 p-6 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy-primary)]">
          {t.vehicleChosen}
        </h3>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--text-primary)]">
              {vehicle.brand} {vehicle.name}
            </p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {vehicle.seats} {t.seats} · {transmissionLabel} · {fuelLabel}
            </p>
          </div>
          <p className="text-xl font-bold text-[var(--navy-primary)]">
            {showNumericPrice ? (
              <>
                {vehicle.pricePerMonth.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
                {vehicle.currency ?? "€"}
                {t.perMonth}
              </>
            ) : (
              <span className="text-lg">{vT.priceOnRequest}</span>
            )}
          </p>
        </div>
      </section>
    ) : null;

  const needSection = isOpenQuote ? (
    <section className="space-y-3 rounded-xl border border-white/20 bg-white/70 p-6 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
      {quoteCategory ? (
        <p className="inline-flex rounded-full border border-[var(--accent-green)]/35 bg-[var(--accent-green)]/10 px-3 py-1 text-xs font-semibold text-[var(--navy-primary)]">
          {OFFER_CATEGORY_LABEL[locale][quoteCategory]}
        </p>
      ) : null}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy-primary)]">
        {t.describeNeed}
      </h3>
      <textarea
        id="quote-need"
        required
        rows={7}
        value={form.needDescription}
        onChange={(e) => setForm((f) => ({ ...f, needDescription: e.target.value }))}
        className={`${inputBase} min-h-[160px] resize-y`}
        placeholder={t.describeNeedPlaceholder}
      />
    </section>
  ) : null;

  const personalSection = (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy-primary)]">
        {t.personalInfo}
      </h3>
      <div className="grid gap-4 sm:grid-cols-1">
        <div>
          <label
            htmlFor="quote-name"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.fullName}
          </label>
          <input
            id="quote-name"
            type="text"
            required
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            className={inputBase}
            placeholder={t.fullNamePlaceholder}
          />
        </div>
        <div>
          <label
            htmlFor="quote-email"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.email}
          </label>
          <input
            id="quote-email"
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
            htmlFor="quote-phone"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.phone}
          </label>
          <input
            id="quote-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputBase}
            placeholder={t.phonePlaceholder}
          />
        </div>
      </div>
    </section>
  );

  const proSection = isPro ? (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy-primary)]">
        {t.professionalInfo}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="quote-company-name"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.companyName}
          </label>
          <input
            id="quote-company-name"
            type="text"
            required={isPro}
            value={form.companyName}
            onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
            className={inputBase}
            placeholder={t.companyNamePlaceholder}
          />
        </div>
        <div>
          <label
            htmlFor="quote-siret"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.siret}
          </label>
          <input
            id="quote-siret"
            type="text"
            required={isPro}
            pattern="[0-9]{14}"
            maxLength={14}
            value={form.siret}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, "");
              setForm((f) => ({ ...f, siret: digitsOnly.slice(0, 14) }));
            }}
            className={inputBase}
            placeholder={t.siretPlaceholder}
          />
          <p className="mt-1 text-xs text-[var(--text-muted)]">{t.siretHint}</p>
        </div>
        <div>
          <label
            htmlFor="quote-vat-number"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.vatNumber}
          </label>
          <input
            id="quote-vat-number"
            type="text"
            value={form.vatNumber}
            onChange={(e) => setForm((f) => ({ ...f, vatNumber: e.target.value }))}
            className={inputBase}
            placeholder={t.vatNumberPlaceholder}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="quote-business-role"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.businessRole}
          </label>
          <input
            id="quote-business-role"
            type="text"
            required={isPro}
            value={form.businessRole}
            onChange={(e) => setForm((f) => ({ ...f, businessRole: e.target.value }))}
            className={inputBase}
            placeholder={t.businessRolePlaceholder}
          />
        </div>
      </div>
    </section>
  ) : null;

  const rentalSection = (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy-primary)]">
        {t.rentalPeriod}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="quote-start"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.startDate}
          </label>
          <input
            id="quote-start"
            type="date"
            required
            value={form.startDate}
            onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
            className={inputBase}
          />
        </div>
        <div>
          <label
            htmlFor="quote-end"
            className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
          >
            {t.endDate}
          </label>
          <input
            id="quote-end"
            type="date"
            required
            value={form.endDate}
            onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
            className={inputBase}
          />
        </div>
      </div>
    </section>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="rounded-xl border border-[var(--navy-primary)]/15 bg-[var(--navy-primary)]/5 px-4 py-3 text-sm leading-relaxed text-[var(--text-secondary)]">
        {t.leaseMinNote}
      </p>
      {isOpenQuote ? (
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{t.openQuoteSubtitle}</p>
      ) : null}

      {isOpenQuote ? (
        <>
          {needSection}
          {profileSection}
        </>
      ) : (
        <>
          {profileSection}
          {vehicleSection}
        </>
      )}

      {personalSection}
      {proSection}
      {rentalSection}

      <button
        type="submit"
        className="w-full rounded-xl bg-[var(--navy-primary)] px-8 py-4 text-base font-bold text-white shadow-[0_10px_28px_rgba(6,46,91,0.28)] transition-colors hover:bg-[var(--navy-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--navy-primary)] focus:ring-offset-2 sm:w-auto sm:min-w-[220px] sm:px-12"
      >
        {t.submit}
      </button>

      <button
        type="button"
        onClick={() => {
          setHasManualProfileChoice(true);
          setProfile((current) => (current === "professionnel" ? "individuel" : "professionnel"));
        }}
        className="block text-sm font-medium text-[var(--navy-primary)] underline-offset-2 hover:underline"
      >
        {isPro ? t.switchToIndividuel : t.switchToPro}
      </button>
    </form>
  );
}
