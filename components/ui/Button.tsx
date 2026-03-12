"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

const variants = {
  primary:
    "bg-[var(--navy-primary)] text-white hover:bg-[var(--navy-primary-hover)] hover:shadow-[0_4px_14px_rgba(6,46,91,0.25)] focus:ring-[var(--navy-primary)] active:scale-[0.98]",
  secondary:
    "bg-[var(--glass-white)] text-[var(--text-primary)] border border-[var(--glass-border-light)] backdrop-blur-md hover:bg-white/90 hover:border-[var(--navy-primary)]/30 hover:shadow-[var(--shadow-card)] focus:ring-[var(--navy-primary)] active:scale-[0.98]",
  accent:
    "bg-[var(--accent-green)] text-white hover:bg-[var(--accent-green-hover)] hover:shadow-[0_4px_14px_rgba(92,184,92,0.35)] focus:ring-[var(--accent-green)] active:scale-[0.98]",
  ghost:
    "text-[var(--text-primary)] hover:bg-[var(--glass-white)] focus:ring-[var(--border)]",
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
