"use client";

import Link from "next/link";
import Image from "next/image";
import type { VehicleOption } from "@/data/types/vehicle";
import { vehicleTranslations, type Locale } from "@/data/translations";

interface CarOptionPreviewProps {
  vehicle: VehicleOption;
  locale: Locale;
  href: string;
}

export function CarOptionPreview({ vehicle, locale, href }: CarOptionPreviewProps) {
  const t = vehicleTranslations[locale];
  const transmissionLabel =
    vehicle.transmission === "automatic" ? t.automatic : t.manual;
  const fuelLabel =
    vehicle.fuelType === "diesel" ? t.diesel : t.essence;

  return (
    <article className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--muted-bg)]">
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
            <svg
              className="h-16 w-16 opacity-40"
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
        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-[var(--foreground)]">
          {vehicle.brand}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          {vehicle.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--muted)]">
          <span>{vehicle.seats} {t.seats}</span>
          <span>{transmissionLabel}</span>
          <span>{fuelLabel}</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-[var(--muted)]">{t.from}</p>
            <p className="text-xl font-bold text-[var(--primary)]">
              {vehicle.pricePerMonth.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
              {vehicle.currency ?? "€"}
              <span className="text-sm font-normal text-[var(--muted)]">
                {t.perMonth}
              </span>
            </p>
            <p className="mt-0.5 text-xs text-[var(--muted)]">{t.allIncluded}</p>
          </div>
          <Link
            href={href}
            className="shrink-0 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
          >
            {t.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}
