import Link from "next/link";
import type { Locale } from "@/data/translations";
import { categoryPagesTranslations, type CategoryContentBlock } from "@/data/translations/categoryPages";
import { categoryVisualUi } from "@/data/translations/categoryVisualUi";
import type { OfferCategorySlug } from "@/lib/offerCategory";
import { demandeDevisHref } from "@/lib/offerCategory";
import { CATEGORY_PAGE_IMAGE_LAYOUT } from "@/lib/offerCategoryVisuals";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholderGrid, ImagePlaceholderSlot } from "@/components/ImagePlaceholderSlot";

function renderBlock(block: CategoryContentBlock, index: number) {
  switch (block.kind) {
    case "notice":
      return (
        <p
          key={index}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-relaxed text-[var(--text-secondary)]"
        >
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          key={index}
          className="mt-10 scroll-mt-28 text-xl font-bold tracking-tight text-[var(--text-primary)] first:mt-0 sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="mt-8 text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul
          key={index}
          className="mt-4 list-disc space-y-2 pl-5 text-[var(--text-secondary)] leading-relaxed marker:text-[var(--accent-green)]"
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

interface CategoryOfferViewProps {
  locale: Locale;
  category: OfferCategorySlug;
}

export function CategoryOfferView({ locale, category }: CategoryOfferViewProps) {
  const t = categoryPagesTranslations[locale][category];
  const ui = categoryVisualUi[locale];
  const layout = CATEGORY_PAGE_IMAGE_LAYOUT[category];
  const basePath = `/${locale}`;
  const slot = (n: number) => `${ui.slotPrefix} ${n}`;

  const heroAspect =
    category === "materiel"
      ? "aspect-[21/9] min-h-[140px] sm:min-h-[180px]"
      : category === "tourisme"
        ? "aspect-[16/7] min-h-[120px] sm:min-h-[160px]"
        : "aspect-[16/8] min-h-[120px] sm:min-h-[150px]";

  const heroCols =
    layout.heroWide >= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";
  const primaryCols =
    category === "materiel"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : category === "utilitaires"
        ? "grid-cols-2 md:grid-cols-3"
        : category === "tourisme"
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          : "grid-cols-2 md:grid-cols-4";

  const secondaryCols =
    category === "materiel" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 md:grid-cols-3";

  return (
    <article className="min-h-screen bg-[var(--background)] pb-20">
      <div className="border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(6,46,91,0.06)_0%,transparent_55%),var(--background)]">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--text-muted)]">
            <Link href={`${basePath}/vehicles`} className="font-medium text-[var(--navy-primary)] hover:underline">
              {ui.backOffers}
            </Link>
          </nav>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-green)]">
            {ui.heroEyebrow}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">{t.metaDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              href={demandeDevisHref(basePath, category)}
              variant="accent"
              size="lg"
              className="!px-10 !py-4 !text-base !font-bold shadow-[0_10px_32px_rgba(92,184,92,0.38)]"
            >
              {ui.demandeDevis} →
            </Button>
            <Button href={`${basePath}/#offres-pro`} variant="secondary" size="lg">
              {ui.seeHome}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <section aria-labelledby="gallery-top-heading">
          <h2 id="gallery-top-heading" className="text-lg font-semibold text-[var(--text-primary)]">
            {ui.galleryAboveTitle}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)]">{ui.galleryAboveHint}</p>
          <div className={`mt-6 grid gap-3 sm:gap-4 ${heroCols}`}>
            {Array.from({ length: layout.heroWide }, (_, i) => (
              <ImagePlaceholderSlot key={`hero-${i}`} label={slot(i + 1)} aspectClass={heroAspect} />
            ))}
          </div>
          <div className="mt-8">
            <ImagePlaceholderGrid
              count={layout.primaryGrid}
              slotLabel={(n) => slot(layout.heroWide + n)}
              columnsClass={primaryCols}
              aspectClass={category === "tourisme" ? "aspect-[5/4] min-h-[200px]" : "aspect-[4/3]"}
            />
          </div>
        </section>

        <div className="mx-auto mt-16 max-w-3xl border-t border-[var(--border)] pt-14">
          {t.blocks.map((block, i) => renderBlock(block, i))}
        </div>

        <section className="mt-16 border-t border-[var(--border)] pt-14" aria-labelledby="gallery-bottom-heading">
          <h2 id="gallery-bottom-heading" className="text-lg font-semibold text-[var(--text-primary)]">
            {ui.galleryBelowTitle}
          </h2>
          <div className="mt-6">
            <ImagePlaceholderGrid
              count={layout.secondaryGrid}
              slotLabel={(n) =>
                slot(layout.heroWide + layout.primaryGrid + n)
              }
              columnsClass={secondaryCols}
              aspectClass="aspect-[4/3]"
            />
          </div>
        </section>

        <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-3 border-t border-[var(--border)] pt-12 sm:flex-row">
          <Button
            href={demandeDevisHref(basePath, category)}
            variant="accent"
            size="lg"
            className="!px-10 !py-4 !text-base !font-bold shadow-[0_10px_32px_rgba(92,184,92,0.38)]"
          >
            {ui.demandeDevis} →
          </Button>
          <Button href={`${basePath}/vehicles`} variant="secondary" size="lg">
            {ui.backOffers}
          </Button>
        </div>
      </div>
    </article>
  );
}
