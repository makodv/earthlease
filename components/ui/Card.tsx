"use client";

import { type HTMLAttributes } from "react";

const cardBase =
  "rounded-2xl p-6 border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-[box-shadow,transform,border-color] duration-200 hover:shadow-[var(--shadow-lift)]";

const glassCardBase =
  "rounded-2xl p-6 glass-card";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "glass";
}

export function Card({
  variant = "solid",
  className = "",
  children,
  ...props
}: CardProps) {
  const classes =
    variant === "glass"
      ? `${glassCardBase} ${className}`.trim()
      : `${cardBase} ${className}`.trim();
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

/** Base input styles — solid, readable. Use on light or glass sections. */
export const inputBase =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--navy-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--navy-primary)]/20 transition-colors";

/** Input with light glass-compatible styling (slightly translucent, strong focus). */
export const inputGlass =
  "w-full rounded-lg px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] input-glass focus:outline-none transition-all duration-200";
