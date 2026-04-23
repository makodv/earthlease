"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { navTranslations, vehicleTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";
import { useCatalogLandingFromAudience } from "@/hooks/useCatalogLandingFromAudience";
import { offersCategoryHref } from "@/lib/offerCategory";

const LOGO_SRC = "/logo.svg";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = navTranslations[locale];
  const basePath = `/${locale}`;
  const { catalogLandingHref: productsLandingHref } = useCatalogLandingFromAudience(basePath);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productsDropdownRef = useRef<HTMLDivElement>(null);

  const productQuickLinks = useMemo(() => {
    const v = vehicleTranslations[locale];
    return [
      { href: offersCategoryHref(basePath, "materiel"), label: v.segmentMateriel },
      { href: offersCategoryHref(basePath, "utilitaires"), label: v.segmentPro },
      { href: offersCategoryHref(basePath, "tourisme"), label: v.segmentIndividuel },
      { href: offersCategoryHref(basePath, "deux-roues"), label: v.segmentDeuxRoues },
      { href: `${basePath}/vehicles`, label: t.allOffersPage },
    ] as const;
  }, [basePath, locale]);

  const navLinks = [
    { href: `${basePath}/how-it-works`, label: t.howItWorks },
    { href: `${basePath}/faq`, label: t.faq },
    { href: `${basePath}/contact`, label: t.contact },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(e.target as Node)
      ) {
        setProductsMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(
        navRef.current?.children ?? [],
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.25,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.35, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const switchLocale = locale === "fr" ? "en" : "fr";
  const switchPath = useMemo(() => {
    const path = pathname.replace(`/${locale}`, `/${switchLocale}`);
    const q = searchParams.toString();
    return q ? `${path}?${q}` : path;
  }, [pathname, locale, switchLocale, searchParams]);

  const isProductsActive =
    pathname === `${basePath}/vehicles` || pathname.startsWith(`${basePath}/vehicles/`);

  const desktopNavTone = (active: boolean) =>
    active
      ? "text-[var(--navy-primary)]"
      : "text-[var(--muted-foreground)] hover:text-[var(--navy-primary)]";

  return (
    <header
      ref={headerRef}
      className="navbar-organic sticky top-0 z-[200] w-full"
    >
      <div className="navbar-pill relative z-[201] mx-auto flex min-h-[88px] max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:min-h-[96px] sm:gap-6 sm:px-8">
        <Link
          ref={logoRef}
          href={basePath}
          className="relative z-[202] flex shrink-0 items-center justify-center transition-opacity hover:opacity-90"
        >
          <img
            src={LOGO_SRC}
            alt="EarthLease"
            className="mx-auto block h-auto max-h-[5rem] w-auto max-w-none object-contain object-center sm:max-h-[6.5rem] md:max-h-[7rem]"
            width={800}
            height={800}
            decoding="async"
          />
        </Link>

        <nav
          ref={navRef}
          className="relative z-[202] hidden shrink-0 items-center gap-1 md:flex md:gap-0"
        >
          <div ref={productsDropdownRef} className="relative inline-flex shrink-0 items-center">
            <span className="relative inline-flex items-center">
              <Link
                href={productsLandingHref}
                className={`relative whitespace-nowrap rounded-full py-2.5 pl-4 pr-1 text-sm font-medium transition-colors ${desktopNavTone(isProductsActive)}`}
              >
                {t.nosProduits}
              </Link>
              <button
                type="button"
                className={`navbar-products-chevron flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${desktopNavTone(isProductsActive)} hover:bg-[var(--navy-primary)]/[0.08]`}
                aria-expanded={productsMenuOpen}
                aria-haspopup="menu"
                aria-label={t.productsQuickMenuAria}
                onClick={() => setProductsMenuOpen((o) => !o)}
              >
                <svg
                  className={`h-4 w-4 opacity-80 transition-transform ${productsMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsActive && (
                <span
                  className="navbar-products-active-line absolute bottom-1 left-3 right-2 h-0.5 rounded-full bg-[var(--navy-primary)]"
                  aria-hidden
                />
              )}
            </span>
            {productsMenuOpen && (
              <div
                role="menu"
                className="navbar-dropdown absolute left-0 top-[calc(100%+6px)] z-[220] min-w-[260px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-2 shadow-[var(--shadow-lift)]"
              >
                {productQuickLinks.map((item) => (
                  <Link
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    scroll={false}
                    className="block px-5 py-2.5 text-left text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--muted)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--navy-primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--navy-primary)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-[var(--navy-primary)]"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div
          ref={ctaRef}
          className="relative z-[202] hidden shrink-0 items-center gap-3 sm:gap-5 md:flex"
        >
          <Link
            href={switchPath}
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--navy-primary)]"
          >
            {switchLocale.toUpperCase()}
          </Link>
          <Button
            href={`${basePath}/demande-devis`}
            variant="accent"
            size="sm"
            className="whitespace-nowrap rounded-full !px-5 !py-2.5"
          >
            {t.seeVehicles}
          </Button>
        </div>

        <div className="relative z-[202] flex items-center gap-2 md:hidden">
          <Link
            href={switchPath}
            className="rounded-full px-3 py-2 text-xs font-semibold text-[var(--muted-foreground)] transition-colors hover:text-[var(--navy-primary)]"
          >
            {switchLocale.toUpperCase()}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-ambient)]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={
              mobileMenuOpen
                ? locale === "fr"
                  ? "Fermer le menu"
                  : "Close menu"
                : locale === "fr"
                  ? "Ouvrir le menu"
                  : "Open menu"
            }
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="relative z-[210] mx-auto mt-2 w-full max-w-6xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-lift)] md:hidden"
        >
          <Link
            href={productsLandingHref}
            className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
              pathname === `${basePath}/vehicles`
                ? "bg-[var(--muted)] text-[var(--navy-primary)]"
                : "text-[var(--text-primary)] hover:bg-[var(--muted)]"
            }`}
          >
            {t.nosProduits}
          </Link>
          <p className="mt-3 px-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            {vehicleTranslations[locale].catalogChooseRange}
          </p>
          <div className="mt-1 space-y-0.5">
            {productQuickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--muted)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 space-y-1 border-t border-[var(--border)] pt-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--muted)] text-[var(--navy-primary)]"
                      : "text-[var(--text-primary)] hover:bg-[var(--muted)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Button
            href={`${basePath}/demande-devis`}
            variant="accent"
            size="sm"
            className="mt-3 w-full rounded-full !py-3"
          >
            {t.seeVehicles}
          </Button>
        </div>
      )}
    </header>
  );
}
