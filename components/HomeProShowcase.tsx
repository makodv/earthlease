import { ProOfferGallery } from "@/components/ProOfferGallery";
import type { Locale } from "@/data/translations";

interface HomeProShowcaseProps {
  locale: Locale;
}

export function HomeProShowcase({ locale }: HomeProShowcaseProps) {
  return (
    <section
      id="offres-pro"
      className="section-explore-organic scroll-mt-24 border-t border-[var(--border)] py-16 sm:py-20 lg:py-24"
      aria-labelledby="offres-pro-heading"
    >
      <h2 id="offres-pro-heading" className="sr-only">
        {locale === "fr"
          ? "Offres : matériel, utilitaires, tourisme électrique et hybride, deux-roues"
          : "Offers: equipment, vans, electric and hybrid passenger, two-wheelers"}
      </h2>
      <ProOfferGallery locale={locale} variant="home" />
    </section>
  );
}
