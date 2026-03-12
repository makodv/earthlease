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
      className="hero-full-bleed hero-dark-cinematic relative flex min-h-[100vh] flex-col px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      {/* Inner content: max-width container, grid on desktop */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12 lg:px-8 xl:gap-16">
        {/* Left: badge, headline, text, CTAs, trust */}
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
        <div
          ref={badgeRef}
          className="hero-badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" aria-hidden />
          {t.heroBadge}
        </div>

        <h1
          ref={titleRef}
          className="mt-6 text-3xl font-bold tracking-tight text-[var(--hero-text)] sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]"
        >
          {t.heroTitle}
          <span
            ref={subtitleRef}
            className="mt-2 block text-[var(--accent-green)]"
          >
            {t.heroSubtitle}
          </span>
        </h1>

        <p
          ref={descRef}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--hero-text-muted)] sm:text-lg"
        >
          {t.heroDescription}
        </p>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5 lg:items-start"
        >
          <Button
            href={`/${locale}/vehicles`}
            variant="accent"
            size="lg"
            className="min-w-[200px] rounded-full"
          >
            {nav.seeVehicles} →
          </Button>
          <Button
            href={`/${locale}/contact`}
            variant="secondary"
            size="lg"
            className="min-w-[200px] rounded-full border-[var(--hero-border)] !bg-transparent !text-[var(--hero-text)] hover:!bg-white/10 hover:!border-white/25"
          >
            {locale === "fr" ? "Nous contacter" : "Contact us"}
          </Button>
        </div>

        <p
          ref={trustRef}
          className="mt-8 text-sm text-[var(--hero-text-muted)]"
        >
          {t.heroTrust}
        </p>
        </div>

        {/* Right: premium vehicle / fleet visual — automotive placeholder or image */}
      <div
        ref={visualRef}
        className="hero-visual-frame relative mt-10 w-full overflow-hidden rounded-2xl sm:mt-12 lg:mt-0 lg:flex lg:justify-end"
      >
        <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:w-full lg:max-w-[480px] xl:max-w-[520px]">
          {/* Mockup chrome bar when no image — reinforces “app” frame */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--hero-dark-surface)]">
            {heroImageSrc ? (
              <Image
                src={heroImageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(6, 46, 91, 0.4) 0%, rgba(6, 46, 91, 0.6) 50%, rgba(92, 184, 92, 0.08) 100%)",
                }}
              >
                {/* Mini “vehicle card” strip — premium placeholder */}
                <div className="flex h-24 w-full max-w-[200px] items-center justify-center sm:h-32" aria-hidden>
                  <svg
                    className="h-full w-full text-[var(--hero-text-muted)] opacity-50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 17h14v-4H5v4z" />
                    <path d="M2 12l2-4h16l2 4" />
                    <path d="M4 10h16" />
                  </svg>
                </div>
                <p className="mt-4 text-center text-sm font-medium text-[var(--hero-text-muted)]">
                  {locale === "fr" ? "Flotte premium — photo véhicule" : "Premium fleet — vehicle image"}
                </p>
                <p className="mt-1 text-center text-xs text-[var(--hero-text-muted)] opacity-75">
                  {locale === "fr" ? "Remplacez par votre image" : "Replace with your image"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
