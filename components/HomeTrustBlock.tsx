import { homeTranslations, type Locale } from "@/data/translations";
import { Card } from "@/components/ui/Card";

interface HomeTrustBlockProps {
  locale: Locale;
}

export function HomeTrustBlock({ locale }: HomeTrustBlockProps) {
  const t = homeTranslations[locale];
  const items = [
    { title: t.trustAllIncluded, desc: t.trustAllIncludedDesc },
    { title: t.trustFlexible, desc: t.trustFlexibleDesc },
    { title: t.trustEco, desc: t.trustEcoDesc },
  ];

  return (
    <section
      className="border-t border-slate-200/70 py-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(92, 184, 92, 0.06) 0%, transparent 50%), linear-gradient(180deg, #f2f6fa 0%, #e8eef5 45%, #e0e8f0 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-section-title text-[var(--text-primary)]">
          {t.trustTitle}
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} variant="glass" className="text-center">
              <h3 className="font-semibold text-[var(--navy-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
