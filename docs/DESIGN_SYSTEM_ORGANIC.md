# Earthlease Design System — Organic / Natural

This document describes the visual direction applied to the Earthlease site: **organic softness inside a premium mobility brand**. The goal is calm, premium, sustainable, and original—not rustic or generic.

## Brand guardrails

- **Colors**: Navy (#062E5B, #0B3F78) and green (#5CB85C, #4AA64A) stay the source of truth. No beige/terracotta takeover.
- **Organic** applies to: shape (curves, radius), rhythm (spacing), depth (shadows, layers), and subtle warmth—not to replacing the palette.
- **Feel**: Premium automotive / green-tech, trustworthy, elegant, slightly human.

## Token architecture (`app/globals.css`)

### Core tokens

- **Surfaces**: `--background` (#F7F9FC), `--surface`, `--muted`, `--organic-tint`, `--organic-surface` (supporting only).
- **Shadows**: `--shadow-ambient`, `--shadow-lift`, `--shadow-card`, `--shadow-glass`, `--shadow-glass-hover`.
- **Radius**: `--radius-panel` (24px), `--radius-card` (20px), `--radius-button` (16px); components use `rounded-2xl` / `rounded-3xl` for organic softness.
- **Glass**: `--glass-white`, `--glass-border-light`, etc. for navbar and hero panel.

### Section backgrounds

Reusable classes so sections don’t repeat long gradient strings:

- `.section-hero-organic` — hero (navy + green radials, organic-tint gradient).
- `.section-alt-organic` — trust / alternate (green tint, muted gradient).
- `.section-brands-organic`, `.section-explore-organic`, `.section-reviews-organic`, `.section-how-organic` — named section styles.

### Component classes

- `.navbar-organic` — sticky nav (glass, soft shadow).
- `.panel-hero-organic` — hero content panel (glass, `--radius-panel`).
- `.glass-card` — cards with glass look and hover lift.
- `.footer-organic` — footer (solid navy, soft top).
- `.grain-subtle` — optional very low-opacity texture (e.g. hero).

## Components

- **Button**: `rounded-2xl`, tokenized shadows; primary (navy), secondary (surface + border), accent (green).
- **Card**: Solid and glass variants; both use `rounded-2xl` and token shadows.
- **Navbar, Hero, Trust, Brands, Explore, Reviews, HowItWorks, Footer**: Use section classes and shared tokens; no one-off inline gradients.

## Extending to other pages

1. Use section classes (e.g. `section-hero-organic`, `section-alt-organic`) for new sections.
2. Use `--shadow-*`, `--radius-*`, `--border`, `--muted` in new components.
3. Prefer `rounded-2xl` for panels and cards.
4. Keep navy for structure and trust, green for positive actions only.
5. Add new section classes in `globals.css` if a new pattern repeats; avoid ad-hoc inline backgrounds.

## Accessibility

- Contrast and focus states use existing navy/green tokens.
- Touch targets and semantic HTML are unchanged.
- Grain and glass stay subtle so readability is preserved.
