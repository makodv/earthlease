import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug, getAllVehicleSlugs } from "@/data/vehicles";
import { isValidLocale, locales } from "@/lib/i18n";
import { vehicleTranslations, type Locale } from "@/data/translations";

export async function generateStaticParams() {
  const slugs = getAllVehicleSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const t = vehicleTranslations[locale as Locale];
  const transmissionLabel =
    vehicle.transmission === "automatic" ? t.automatic : t.manual;
  const fuelLabel = vehicle.fuelType === "diesel" ? t.diesel : t.essence;

  const listPath =
    vehicle.vehicleCategory === "professionnel"
      ? `/${locale}/vehicles/professionnel`
      : `/${locale}/vehicles`;
  const contactPath = `/${locale}/contact`;
  const devisPath = `/${locale}/vehicles/${slug}/devis`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={listPath}
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
        {t.backToList}
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--muted-bg)]">
          {vehicle.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.name}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
              <svg
                className="h-24 w-24 opacity-30"
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
          <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] shadow-sm">
            {vehicle.brand}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
            {vehicle.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {vehicle.name}
          </h1>

          <div className="mt-6 flex flex-wrap gap-4 text-[var(--muted)]">
            <span>{vehicle.seats} {t.seats}</span>
            <span>{transmissionLabel}</span>
            <span>{fuelLabel}</span>
          </div>

          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6">
            <p className="text-sm font-medium text-[var(--muted)]">
              {t.priceFrom}
            </p>
            <p className="mt-1 text-3xl font-bold text-[var(--primary)]">
              {vehicle.pricePerMonth.toLocaleString(
                locale === "fr" ? "fr-FR" : "en-US"
              )}
              {vehicle.currency ?? "€"}
              <span className="text-lg font-normal text-[var(--muted)]">
                {t.perMonth}
              </span>
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">{t.allIncluded}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={devisPath}
              className="inline-flex justify-center rounded-xl bg-[var(--primary)] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
            >
              {t.requestQuote}
            </Link>
            <Link
              href={contactPath}
              className="inline-flex justify-center rounded-xl border-2 border-[var(--border)] bg-white px-8 py-4 text-base font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </div>

      {/* Specs section */}
      <section className="mt-16 border-t border-[var(--border)] pt-12">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          {t.specs}
        </h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--border)] bg-white p-4">
            <dt className="text-sm text-[var(--muted)]">{t.seats}</dt>
            <dd className="mt-1 font-semibold text-[var(--foreground)]">
              {vehicle.seats}
            </dd>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-white p-4">
            <dt className="text-sm text-[var(--muted)]">{t.transmission}</dt>
            <dd className="mt-1 font-semibold text-[var(--foreground)]">
              {transmissionLabel}
            </dd>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-white p-4">
            <dt className="text-sm text-[var(--muted)]">{t.filterFuel}</dt>
            <dd className="mt-1 font-semibold text-[var(--foreground)]">
              {fuelLabel}
            </dd>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-white p-4">
            <dt className="text-sm text-[var(--muted)]">{t.priceFrom}</dt>
            <dd className="mt-1 font-semibold text-[var(--primary)]">
              {vehicle.pricePerMonth}€ / {t.perMonth}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
