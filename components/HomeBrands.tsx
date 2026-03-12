"use client";

import Image from "next/image";
import { homeTranslations, type Locale } from "@/data/translations";
import { brandLogos } from "@/data/brands";

interface HomeBrandsProps {
  locale: Locale;
}

export function HomeBrands({ locale }: HomeBrandsProps) {
  const t = homeTranslations[locale];

  return (
    <section className="section-brands-organic relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold uppercase tracking-wider text-[var(--navy-primary)] sm:text-2xl">
          {t.brandsTitle}
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
          {brandLogos.map((brand) => (
            <div
              key={brand.id}
              className="flex h-14 w-24 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-all hover:border-[var(--navy-primary)]/20 hover:shadow-[var(--shadow-lift)] sm:h-16 sm:w-28"
              title={brand.name}
            >
              {brand.logoSrc ? (
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  width={112}
                  height={64}
                  className="max-h-10 w-auto max-w-[80px] object-contain sm:max-h-12 sm:max-w-[100px]"
                />
              ) : (
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                  Logo
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
