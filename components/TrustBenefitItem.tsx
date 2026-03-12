import { type ReactNode } from "react";

interface TrustBenefitItemProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

function DefaultCheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function TrustBenefitItem({
  title,
  description,
  icon,
}: TrustBenefitItemProps) {
  return (
    <div className="flex gap-5">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--navy-primary)] shadow-[var(--shadow-card)]"
        aria-hidden
      >
        {icon ?? <DefaultCheckIcon />}
      </div>
      <div>
        <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
}
