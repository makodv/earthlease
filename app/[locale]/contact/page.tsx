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
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="border-b border-slate-200/60 px-4 py-20 text-center sm:px-6 lg:px-8" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,46,91,0.06) 0%, transparent 50%), #f4f7fb" }}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-section-title text-[var(--text-primary)]">
            {t.title}
          </h1>
          <p className="mx-auto mt-5 text-body-lg text-[var(--text-secondary)]">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--navy-primary)]">
                {t.contactInfo}
              </h2>
              <ul className="mt-6 space-y-6">
                <li>
                  <p className="text-sm font-medium text-[var(--text-muted)]">
                    {t.email}
                  </p>
                  <a
                    href={`mailto:${t.emailValue}`}
                    className="mt-1 block text-[var(--text-primary)] transition-colors hover:text-[var(--navy-primary)]"
                  >
                    {t.emailValue}
                  </a>
                </li>
                <li>
                  <p className="text-sm font-medium text-[var(--text-muted)]">
                    {t.phone}
                  </p>
                  <a
                    href={`tel:${t.phoneValue.replace(/\s/g, "")}`}
                    className="mt-1 block text-[var(--text-primary)] transition-colors hover:text-[var(--navy-primary)]"
                  >
                    {t.phoneValue}
                  </a>
                </li>
                <li>
                  <p className="text-sm font-medium text-[var(--text-muted)]">
                    {t.address}
                  </p>
                  <p className="mt-1 text-[var(--text-primary)]">
                    {t.addressValue}
                  </p>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <div className="rounded-xl border border-white/20 bg-white/70 p-6 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {t.quickResponse}
                </h3>
                <p className="mt-1 text-sm font-medium text-[var(--navy-primary)]">
                  {t.quickResponseDesc}
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {t.quickResponseDetail}
                </p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/70 p-6 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-md">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {t.secureData}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {t.secureDataDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/75 p-8 shadow-[0_4px_24px_rgba(6,46,91,0.08)] backdrop-blur-xl lg:col-span-3">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
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
