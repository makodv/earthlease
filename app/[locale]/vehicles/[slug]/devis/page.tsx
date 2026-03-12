import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug, getAllVehicleSlugs } from "@/data/vehicles";
import { isValidLocale, locales } from "@/lib/i18n";
import { devisTranslations, type Locale } from "@/data/translations";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";

export async function generateStaticParams() {
  const slugs = getAllVehicleSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function VehicleDevisPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const t = devisTranslations[locale as Locale];
  const vehicleDetailPath = `/${locale}/vehicles/${slug}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={vehicleDetailPath}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t.backToVehicle}
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          {t.title}
        </h1>
        <p className="mt-2 text-[var(--muted)]">{t.subtitle}</p>
      </div>

      <QuoteRequestForm
        vehicle={vehicle}
        locale={locale as Locale}
        vehicleDetailPath={vehicleDetailPath}
      />
    </div>
  );
}
