"use client";

import Link from "next/link";
import Image from "next/image";
import type { VehicleOption } from "@/data/types/vehicle";
import { vehicleTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";

export type PriceDisplay = "month" | "day";

const DAYS_PER_MONTH = 30;

interface CarOptionPreviewProps {
  vehicle: VehicleOption;
  locale: Locale;
  href: string;
  priceDisplay?: PriceDisplay;
}

export function CarOptionPreview({ vehicle, locale, href, priceDisplay = "month" }: CarOptionPreviewProps) {
  const t = vehicleTranslations[locale];
  const isMateriel = vehicle.vehicleCategory === "materiel";
  const transmissionLabel =
    vehicle.transmission === "automatic" ? t.automatic : t.manual;
  const fuelLabel =
    vehicle.fuelType === "diesel"
      ? t.diesel
      : vehicle.fuelType === "electric"
        ? t.electric
        : t.essence;

  const isDay = priceDisplay === "day";
  const priceValue = isDay
    ? Math.round((vehicle.pricePerMonth / DAYS_PER_MONTH) * 10) / 10
    : vehicle.pricePerMonth;
  const priceSuffix = isDay ? t.perDay : t.perMonth;
  const localeStr = locale === "fr" ? "fr-FR" : "en-US";
  const showPrice = !vehicle.priceOnRequest && vehicle.pricePerMonth > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-lift)] hover:border-[var(--navy-primary)]/15">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--muted)]">
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
            <svg
              className="h-14 w-14 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]/95 px-2.5 py-1 text-xs font-medium text-[var(--text-primary)] shadow-sm">
          {vehicle.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {vehicle.name}
        </h3>

        {isMateriel ? (
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            <span className="font-medium text-[var(--text-primary)]">{t.equipmentLine}</span>
            {vehicle.category ? (
              <>
                {" · "}
                {vehicle.category}
              </>
            ) : null}
          </p>
        ) : (
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
            <span>
              {vehicle.seats} {t.seats}
            </span>
            <span>{transmissionLabel}</span>
            <span>{fuelLabel}</span>
          </p>
        )}

        {vehicle.brochureUrl ? (
          <a
            href={vehicle.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-medium text-[var(--navy-primary)] underline-offset-2 hover:underline"
          >
            {t.brochurePdf}
          </a>
        ) : null}

        <div className="mt-6 flex flex-1 items-end justify-between gap-4">
          <div>
            {showPrice ? (
              <>
                <p className="text-xs font-medium text-[var(--text-muted)]">{t.from}</p>
                <p className="mt-0.5 text-xl font-bold text-[var(--navy-primary)]">
                  {priceValue.toLocaleString(localeStr)}
                  {vehicle.currency ?? "€"}
                  <span className="text-sm font-normal text-[var(--text-muted)]">{priceSuffix}</span>
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{t.allIncluded}</p>
              </>
            ) : (
              <>
                <p className="text-xs font-medium text-[var(--text-muted)]">
                  {locale === "fr" ? "Tarification" : "Pricing"}
                </p>
                <p className="mt-0.5 text-xl font-bold text-[var(--navy-primary)]">{t.priceOnRequest}</p>
              </>
            )}
          </div>
          <Button href={href} variant="primary" size="sm" className="shrink-0">
            {t.viewDetails}
          </Button>
        </div>
      </div>
    </article>
  );
}
