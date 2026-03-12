"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navTranslations, type Locale } from "@/data/translations";
import { Button } from "@/components/ui/Button";

const LOGO_SRC = "/logo.svg";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const t = navTranslations[locale];
  const basePath = `/${locale}`;
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const vehicleOptions = [
    {
      href: `${basePath}/vehicles/professionnel`,
      label: t.vehiclesPro,
      desc: t.vehiclesProDesc,
    },
    {
      href: `${basePath}/vehicles`,
      label: t.vehiclesCars,
      desc: t.vehiclesCarsDesc,
    },
  ];

  const navLinks = [
    { href: `${basePath}/how-it-works`, label: t.howItWorks },
    { href: `${basePath}/faq`, label: t.faq },
    { href: `${basePath}/contact`, label: t.contact },
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setVehiclesOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const switchLocale = locale === "fr" ? "en" : "fr";
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`);
  const isVehiclesActive = pathname.startsWith(`${basePath}/vehicles`);

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

  return (
    <header
      ref={headerRef}
      className="navbar-organic sticky top-0 z-50 w-full"
    >
      <div className="navbar-pill mx-auto flex min-h-[88px] max-w-6xl items-center justify-between gap-4 px-6 py-2 sm:min-h-[96px] sm:gap-6 sm:px-8">
        <Link
          ref={logoRef}
          href={basePath}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <img
            src={LOGO_SRC}
            alt="EarthLease"
            className="h-24 w-auto object-contain sm:h-[7rem]"
            style={{ minWidth: "280px" }}
            width={400}
            height={112}
          />
        </Link>

        <nav ref={navRef} className="hidden shrink-0 items-center gap-1 md:flex md:gap-0">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setVehiclesOpen((o) => !o)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors rounded-full ${
                isVehiclesActive
                  ? "text-[var(--navy-primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--navy-primary)]"
              }`}
              aria-expanded={vehiclesOpen}
              aria-haspopup="true"
            >
              {t.vehicles}
              <svg
                className={`h-4 w-4 transition-transform ${vehiclesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isVehiclesActive && !vehiclesOpen && (
              <span
                className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-[var(--navy-primary)]"
                aria-hidden
              />
            )}
            {vehiclesOpen && (
              <div className="navbar-dropdown absolute left-0 top-full z-50 mt-1.5 min-w-[240px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-2 shadow-[var(--shadow-lift)]">
                {vehicleOptions.map((opt) => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => setVehiclesOpen(false)}
                    className="block px-5 py-2.5 text-left transition-colors hover:bg-[var(--muted)]"
                  >
                    <span className="block text-sm font-medium text-[var(--text-primary)]">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-[var(--text-muted)]">
                      {opt.desc}
                    </span>
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

        <div ref={ctaRef} className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Link
            href={switchPath}
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--navy-primary)]"
          >
            {switchLocale.toUpperCase()}
          </Link>
          <Button
            href={`${basePath}/vehicles`}
            variant="accent"
            size="sm"
            className="whitespace-nowrap rounded-full !px-5 !py-2.5"
          >
            {t.seeVehicles}
          </Button>
        </div>
      </div>
    </header>
  );
}
