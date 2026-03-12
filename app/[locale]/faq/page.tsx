import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">
        {locale === "fr" ? "FAQ" : "FAQ"}
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        {locale === "fr"
          ? "Foire aux questions à venir..."
          : "FAQ page coming soon..."}
      </p>
    </div>
  );
}
