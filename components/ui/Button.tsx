"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 border border-transparent tracking-[0.01em]";

const variants = {
  primary:
    "bg-[linear-gradient(180deg,var(--navy-primary)_0%,#05264a_100%)] text-white shadow-[var(--shadow-ambient)] hover:bg-[linear-gradient(180deg,var(--navy-primary-hover)_0%,#073463_100%)] hover:shadow-[var(--shadow-lift)] focus:ring-[var(--navy-primary)] active:scale-[0.98]",
  secondary:
    "bg-[linear-gradient(180deg,var(--surface)_0%,#f6f9ff_100%)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--muted)] hover:border-[var(--navy-primary)]/25 hover:shadow-[var(--shadow-card)] focus:ring-[var(--navy-primary)] active:scale-[0.98]",
  accent:
    "bg-[linear-gradient(180deg,var(--accent-green)_0%,#4ea84e_100%)] text-white shadow-[var(--shadow-ambient)] hover:bg-[linear-gradient(180deg,var(--accent-green-hover)_0%,#419641_100%)] hover:shadow-[0_10px_24px_rgba(92,184,92,0.32)] focus:ring-[var(--accent-green)] active:scale-[0.98]",
  ghost:
    "text-[var(--text-primary)] hover:bg-[var(--muted)] focus:ring-[var(--border)]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface SharedProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton extends SharedProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface ButtonAsLink extends SharedProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
