# Earthlease UI Audit & Design Direction

## 1. UI Audit Summary

### What feels outdated
- **Color palette**: Green-dominant theme (#2d5a27) reads as generic “eco” rather than premium mobility; no navy to convey trust/corporate.
- **Hero**: Gradient + radial glow feels template-like; green accent on subtitle competes with CTA; single CTA, no secondary action.
- **Navbar**: `backdrop-blur-xl` and `bg-white/80` (glassmorphism) conflict with requested flat UI; green for active state is not aligned with logo identity.

### What feels cheap
- **Inconsistent accents**: Green used for primary, hover, active, borders—everything reads same weight.
- **Cards**: `shadow-sm`/`hover:shadow-md` without clear border hierarchy; cramped padding (`p-4`).
- **Buttons**: Pill shape (`rounded-full`) on hero CTA only; mix of rounded-lg and rounded-full; green used for all CTAs.
- **Footer**: Dense grid, green headings, no clear visual hierarchy.

### Spacing problems
- Section padding varies (py-12, py-16, py-20) without a clear 8px rhythm.
- Card internal padding (p-4) too tight for “premium”; container max-w-6xl vs max-w-7xl inconsistent.
- Hero content not enough breathing room (min-h-85vh but content feels centered without clear section spacing).

### Typography problems
- No defined type scale; ad-hoc text-3xl, text-4xl, text-lg mix.
- Body and muted colors (--foreground, --muted) too similar in tone; weak hierarchy.
- No display vs body distinction; headings don’t feel “confident.”

### Color misuse
- Single primary green for links, buttons, active nav, borders, badges—no semantic separation.
- No navy; no “trust” anchor; logo suggests navy + green but UI is green-only.
- Muted/border greens (d4e5d4) feel washed; not enough contrast for secondary text.

### Inconsistent components
- Buttons: some rounded-full, some rounded-lg; some with shadow, some without.
- Cards: vehicle cards vs contact trust cards vs form container—different radius and border treatment.
- Inputs: focus ring uses primary (green); no shared input component.

### Layout hierarchy problems
- Contact page: two columns OK but trust badges and form card don’t align with a clear grid.
- Vehicle list: filters and grid are functional but don’t feel “premium”; no section title hierarchy.
- Vehicle detail: good two-column but CTAs and specs section could have clearer separation.

### Conversion issues
- Hero: one CTA only; no “secondary” (e.g. Comment ça marche or Contact).
- Vehicle cards: “Voir le véhicule” is clear but card doesn’t emphasize price/trust enough.
- Contact/devis: forms work but don’t feel high-end; no clear “why fill this” above fold.

---

## 2. New Design Direction Summary

- **Flat UI**: No glassmorphism; solid surfaces (white, #F7F9FC); thin borders (#E6EBF2).
- **Navy as primary**: Trust, structure, main CTAs, nav active state (#062E5B, #0B3F78).
- **Green as accent**: Eco-positive actions, success, sustainability highlights only (#5CB85C, #4AA64A).
- **Typography**: Clear scale (display vs body); text-primary #0F172A, text-secondary #475569, muted #94A3B8.
- **Spacing**: 8px base → 8, 16, 24, 32, 40, 48, 64, 80, 96; section padding 64–80px; container max-w-6xl (content) / max-w-7xl (wide).
- **Radius**: 8px (inputs, small), 12px (cards, buttons), 16px (hero CTA, large cards).
- **Shadows**: None or very subtle (e.g. 0 1px 3px rgba(6, 46, 91, 0.06)) for cards only.
- **CTAs**: Primary = navy; Secondary = white + navy border; Accent = green for “eco” actions only.

---

## 3. Token Summary (see globals.css)

- **Colors**: navy-primary, navy-secondary, accent-green, green-dark, background, surface, border, text-primary, text-secondary, muted.
- **Typography**: font-sans (Geist); scale via Tailwind + custom classes.
- **Spacing**: 8px grid; section = py-16 md:py-24; container px-4 sm:px-6 lg:px-8.
- **Radius**: radius-sm 8px, radius-md 12px, radius-lg 16px.
- **Shadows**: shadow-card only where needed.

---

## 4. Component Patterns

- **Button**: Primary (navy), Secondary (outline navy), Accent (green); rounded-xl; clear hover/focus.
- **Card**: White, border border-default, rounded-xl, padding 24px; no or subtle shadow.
- **Input**: White bg, border-default, rounded-lg, focus:ring-2 navy or green.
- **Navbar**: White surface, sticky, navy links, navy primary CTA; no blur.
- **Footer**: Light bg (#F7F9FC), navy section headings, clean link list.
- **Hero**: Flat background; large navy headline; green for one accent line or CTA; two CTAs; more vertical spacing.

---

## 5. Responsive

- Mobile-first; navbar collapses to hamburger if needed (optional later).
- Section padding and font sizes scale (text-4xl → sm:text-5xl → lg:text-6xl).
- Grids: 1 col mobile, 2–3 cols tablet/desktop; container padding 16px → 24px → 32px.
