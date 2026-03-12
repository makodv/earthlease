"use client";

import Link from "next/link";
import Image from "next/image";
import type { VehicleOption } from "@/data/types/vehicle";
import { vehicleTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";

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
    <article className="flex flex-col overflow-hidden rounded-xl border border-white/20 bg-white/70 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:shadow-[0_12px_40px_rgba(6,46,91,0.12)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f4f7fb]">
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
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
        <span className="absolute left-4 top-4 rounded-lg border border-white/20 bg-white/80 px-2.5 py-1 text-xs font-medium text-[var(--text-primary)] backdrop-blur-sm">
          {vehicle.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {vehicle.name}
        </h3>

        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
          <span>{vehicle.seats} {t.seats}</span>
          <span>{transmissionLabel}</span>
          <span>{fuelLabel}</span>
        </p>

        <div className="mt-6 flex flex-1 items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">
              {t.from}
            </p>
            <p className="mt-0.5 text-xl font-bold text-[var(--navy-primary)]">
              {vehicle.pricePerMonth.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
              {vehicle.currency ?? "€"}
              <span className="text-sm font-normal text-[var(--text-muted)]">
                {t.perMonth}
              </span>
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{t.allIncluded}</p>
          </div>
          <Button href={href} variant="primary" size="sm" className="shrink-0">
            {t.viewDetails}
          </Button>
        </div>
      </div>
    </article>
  );
}
