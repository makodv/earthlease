import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { contactTranslations, type Locale } from "@/data/translations";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = contactTranslations[locale as Locale];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--muted-bg)] px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
          {t.subtitle}
        </p>
      </section>

      {/* Contact info + Form */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: contact info + trust badges */}
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-wider text-[var(--primary)]">
                {t.contactInfo}
              </h2>
              <ul className="mt-6 space-y-5">
                <li>
                  <p className="text-sm font-medium text-[var(--muted)]">
                    {t.email}
                  </p>
                  <a
                    href={`mailto:${t.emailValue}`}
                    className="mt-1 block text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                  >
                    {t.emailValue}
                  </a>
                </li>
                <li>
                  <p className="text-sm font-medium text-[var(--muted)]">
                    {t.phone}
                  </p>
                  <a
                    href={`tel:${t.phoneValue.replace(/\s/g, "")}`}
                    className="mt-1 block text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                  >
                    {t.phoneValue}
                  </a>
                </li>
                <li>
                  <p className="text-sm font-medium text-[var(--muted)]">
                    {t.address}
                  </p>
                  <p className="mt-1 text-[var(--foreground)]">
                    {t.addressValue}
                  </p>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--foreground)]">
                  {t.quickResponse}
                </h3>
                <p className="mt-1 text-sm font-medium text-[var(--primary)]">
                  {t.quickResponseDesc}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {t.quickResponseDetail}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--foreground)]">
                  {t.secureData}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {t.secureDataDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right: appointment form */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm lg:col-span-3">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              {t.appointmentTitle}
            </h2>
            <div className="mt-8">
              <ContactForm locale={locale as Locale} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
