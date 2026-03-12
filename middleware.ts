import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en"] as const;

// Static assets in public/ (don't redirect these to /fr/...)
const isStaticAsset = (pathname: string) =>
  /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot)$/i.test(pathname);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Let static assets (e.g. /logo.svg) be served from root
  if (isStaticAsset(pathname)) return NextResponse.next();

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect root to default locale (French)
  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL("/fr", request.url));
  }

  // For other paths without locale, redirect to /fr/path
  return NextResponse.redirect(new URL(`/fr${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
