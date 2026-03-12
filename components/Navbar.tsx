"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navTranslations, type Locale } from "@/data/translations";

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
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 shadow-sm backdrop-blur-xl"
    >
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          ref={logoRef}
          href={basePath}
          className="relative flex items-center transition-opacity hover:opacity-90"
        >
          <img
            src={LOGO_SRC}
            alt="EarthLease"
            className="w-auto object-contain object-left"
            style={{ height: "64px", minWidth: "120px" }}
            width={240}
            height={64}
          />
        </Link>

        <nav
          ref={navRef}
          className="hidden items-center gap-1 md:flex"
        >
          {/* Vehicles dropdown */}
          <div ref={dropdownRef} className="relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setVehiclesOpen((o) => !o)}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--primary)] ${
                  pathname.startsWith(`${basePath}/vehicles`)
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)]"
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
              {pathname.startsWith(`${basePath}/vehicles`) && !vehiclesOpen && (
                <span
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[var(--primary)]"
                  aria-hidden
                />
              )}
            </div>
            {vehiclesOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-[var(--border)] bg-white py-2 shadow-lg">
                {vehicleOptions.map((opt) => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => setVehiclesOpen(false)}
                    className="block px-4 py-2.5 text-left transition-colors hover:bg-[var(--muted-bg)]"
                  >
                    <span className="block text-sm font-medium text-[var(--foreground)]">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-[var(--muted)]">
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
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--primary)] ${
                  isActive ? "text-[var(--primary)]" : "text-[var(--foreground)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[var(--primary)]"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div
          ref={ctaRef}
          className="flex items-center gap-4 sm:gap-6"
        >
          <div className="hidden text-right sm:block">
            <a
              href={`tel:${t.phone.replace(/\s/g, "")}`}
              className="block text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
            >
              {t.phone}
            </a>
            <span className="text-xs text-[var(--muted)]">{t.hours}</span>
          </div>

          <Link
            href={switchPath}
            className="rounded-full border-2 border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition-all hover:border-[var(--primary)] hover:bg-[var(--muted-bg)] hover:text-[var(--primary)]"
          >
            {switchLocale.toUpperCase()}
          </Link>
        </div>
      </div>
    </header>
  );
}
