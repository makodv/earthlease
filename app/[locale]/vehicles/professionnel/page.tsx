import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { VehicleListWithFilters } from "@/components/VehicleListWithFilters";
import { vehiclesProfessionnel } from "@/data/vehicles";
import type { Locale } from "@/data/translations";

export default async function VehiclesProfessionnelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const eyebrow =
    locale === "fr" ? "Utilitaires & chantier" : "Commercial & construction";
  const title =
    locale === "fr" ? "Véhicules professionnels" : "Professional vehicles";
  const subtitle =
    locale === "fr"
      ? "Utilitaires, véhicules de construction et chantier. Tout compris."
      : "Commercial, construction and utility vehicles. All-inclusive.";

  return (
    <div className="section-vehicles-organic min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-center text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-[var(--text-secondary)]">
          {subtitle}
        </p>

        <div className="mt-14">
          <VehicleListWithFilters
            vehicles={vehiclesProfessionnel}
            locale={locale as Locale}
            basePath={`/${locale}`}
          />
        </div>
      </div>
    </div>
  );
}
