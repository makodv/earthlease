interface ImagePlaceholderSlotProps {
  /** Shown inside the frame (e.g. "Visuel 3") */
  label: string;
  /** Tailwind aspect class */
  aspectClass?: string;
  className?: string;
}

export function ImagePlaceholderSlot({
  label,
  aspectClass = "aspect-[4/3]",
  className = "",
}: ImagePlaceholderSlotProps) {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-[var(--navy-primary)]/20 bg-[linear-gradient(165deg,var(--surface)_0%,rgba(6,46,91,0.04)_100%)] p-4 text-center shadow-inner ${aspectClass} ${className}`.trim()}
    >
      <svg
        className="h-10 w-10 shrink-0 text-[var(--navy-primary)]/25"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  );
}

interface ImagePlaceholderGridProps {
  count: number;
  slotLabel: (index: number) => string;
  columnsClass: string;
  /** Taller slots for hero row */
  aspectClass?: string;
}

export function ImagePlaceholderGrid({
  count,
  slotLabel,
  columnsClass,
  aspectClass = "aspect-[4/3]",
}: ImagePlaceholderGridProps) {
  return (
    <ul className={`grid gap-3 sm:gap-4 ${columnsClass}`}>
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <ImagePlaceholderSlot label={slotLabel(i + 1)} aspectClass={aspectClass} />
        </li>
      ))}
    </ul>
  );
}
