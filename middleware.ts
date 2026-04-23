import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en"] as const;

/** Static files at site root (no locale) — must not be prefixed with `/fr`. */
const rootStaticFiles = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/icon.svg",
]);

// Static assets in public/ (don't redirect these to /fr/...)
const isStaticAsset = (pathname: string) =>
  /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot|pdf|txt|xml|webmanifest)$/i.test(pathname);

/** Dev / infra paths that must never hit locale redirect logic (avoids Turbopack compile loops). */
function isInternalOrVendorPath(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/__nextjs") ||
    pathname.startsWith("/__turbopack") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/ingest") ||
    pathname.startsWith("/monitoring")
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isInternalOrVendorPath(pathname)) return NextResponse.next();

  // Let static assets (e.g. /logo.svg) be served from root
  if (isStaticAsset(pathname)) return NextResponse.next();

  if (rootStaticFiles.has(pathname)) return NextResponse.next();

  // Common typo: /eng → /en
  if (pathname === "/eng" || pathname.startsWith("/eng/")) {
    const rest = pathname.slice("/eng".length);
    const target = `/en${rest === "" ? "" : rest}`;
    return NextResponse.redirect(new URL(target, request.url));
  }

  // Check if pathname already has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect root to default locale (French)
  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL("/fr", request.url));
  }

  // Paths without /fr or /en → default French locale
  const search = request.nextUrl.search;
  const hash = request.nextUrl.hash;
  const target = new URL(`/fr${pathname}${search}${hash}`, request.url);
  return NextResponse.redirect(target);
}

export const config = {
  // Skip Next internals, APIs, Vercel, and “file-like” paths (e.g. /logo.svg, /file.pdf).
  matcher: [
    "/",
    "/((?!api|_next|_vercel|favicon\\.ico|[^/]+\\.[^/]+$).*)",
  ],
};
