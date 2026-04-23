"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { homeTranslations } from "@/data/translations/home";
import { navTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";

interface HomeHeroProps {
  locale: Locale;
  /** Optional: path to hero image in public/ (e.g. "/images/hero-vehicle.jpg") */
  heroImageSrc?: string;
}

export function HomeHero({ locale, heroImageSrc }: HomeHeroProps) {
  const t = homeTranslations[locale];
  const nav = navTranslations[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(badgeRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .fromTo(subtitleRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .fromTo(descRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .fromTo(ctaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.3")
        .fromTo(trustRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.25")
        .fromTo(visualRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="hero-full-bleed hero-dark-cinematic relative flex min-h-[min(100dvh,920px)] flex-col px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-16 lg:min-h-[90vh] lg:pt-16 lg:pb-20"
    >
      {/* Inner content: max-width container, grid on desktop */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10 lg:px-6 xl:max-w-7xl xl:gap-12 xl:px-8">
        {/* Left: badge, headline, text, CTAs, trust */}
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center lg:mx-0 lg:max-w-md lg:items-start lg:text-left xl:max-w-lg">
        <div
          ref={badgeRef}
          className="hero-badge inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" aria-hidden />
          {t.heroBadge}
        </div>

        <h1
          ref={titleRef}
          className="mt-4 max-w-xl text-2xl font-semibold leading-snug tracking-tight text-[var(--hero-text)] sm:text-[1.625rem] md:text-[1.75rem] lg:mt-5 lg:text-[1.875rem] lg:leading-tight xl:text-[2rem]"
        >
          {t.heroTitle}
          <span
            ref={subtitleRef}
            className="mt-2 block font-semibold text-[var(--accent-green)]"
          >
            {t.heroSubtitle}
          </span>
        </h1>

        <p
          ref={descRef}
          className="mt-4 max-w-md text-sm leading-relaxed text-[var(--hero-text-muted)] sm:text-[0.9375rem] sm:leading-relaxed lg:mt-5"
        >
          {t.heroDescription}
        </p>

        <div
          ref={ctaRef}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:mt-9 lg:items-start"
        >
          <Button
            href={`/${locale}/contact`}
            variant="accent"
            size="md"
            className="min-w-[180px] rounded-full !px-6 !py-2.5 text-sm sm:!py-3"
          >
            {nav.seeVehicles} →
          </Button>
          <Button
            href={`/${locale}/#offres-pro`}
            variant="secondary"
            size="md"
            className="min-w-[180px] rounded-full border-[var(--hero-border)] !bg-none !bg-transparent !px-6 !py-2.5 text-sm !text-[var(--hero-text)] hover:!bg-white/10 hover:!border-white/25 sm:!py-3"
          >
            {nav.heroSecondaryOffers}
          </Button>
        </div>

        <p
          ref={trustRef}
          className="mt-6 text-xs text-[var(--hero-text-muted)] sm:text-sm"
        >
          {t.heroTrust}
        </p>
        </div>

        {/* Right: premium vehicle / fleet visual (image optionnel via heroImageSrc) */}
      <div
        ref={visualRef}
        className="hero-visual-frame relative mt-8 w-full overflow-hidden rounded-[1.6rem] sm:mt-10 lg:mt-0 lg:flex lg:justify-end"
      >
        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-md lg:mx-0 lg:max-w-none lg:w-full lg:max-w-[420px] xl:max-w-[470px]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--hero-dark-surface)]">
            {heroImageSrc ? (
              <>
                <Image
                  src={heroImageSrc}
                  alt={locale === "fr" ? "Flotte EarthLease" : "EarthLease fleet"}
                  fill
                  className="scale-[1.02] object-cover object-[55%_50%]"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  priority
                  unoptimized
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(5,26,45,0.34) 0%, rgba(5,26,45,0.1) 36%, rgba(5,26,45,0.18) 100%), radial-gradient(ellipse 70% 45% at 50% 108%, rgba(6,46,91,0.45) 0%, transparent 62%)",
                  }}
                  aria-hidden
                />
              </>
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(6, 46, 91, 0.45) 0%, rgba(6, 46, 91, 0.65) 50%, rgba(92, 184, 92, 0.1) 100%)",
                }}
                aria-hidden
              />
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
