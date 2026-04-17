import type { Metadata } from "next";
import { Suspense } from "react";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { VehiclesCatalog } from "@/components/VehiclesCatalog";
import { sampleVehicles } from "@/data/vehicles";
import type { Locale } from "@/data/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr ? "Nos produits | EarthLease" : "Our products | EarthLease",
    description: fr
      ? "Voitures particulières, utilitaires et matériel professionnel. Filtrez par gamme et motorisation."
      : "Passenger cars, commercial vans and professional equipment. Filter by range and powertrain.",
  };
}

export default async function VehiclesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="section-vehicles-organic min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mt-2">
          <Suspense
            fallback={
              <div className="min-h-[320px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--text-muted)]">
                {locale === "fr" ? "Chargement…" : "Loading…"}
              </div>
            }
          >
            <VehiclesCatalog
              allVehicles={sampleVehicles}
              locale={locale as Locale}
              basePath={`/${locale}`}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
