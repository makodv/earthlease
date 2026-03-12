# Glassmorphism evolution — audit & changes

## New premium glassmorphism direction

- **Navbar:** Translucent light glass bar with `backdrop-blur`, subtle inner highlight and soft shadow; sticky.
- **Hero:** Layered background (soft radial gradients, navy + green tint); content in a floating **glass-panel** for depth and hierarchy.
- **Cards:** **glass-card** for vehicle cards, trust blocks, contact trust tiles, form containers, filters, and specs — frosted bg, blur, soft border, hover lift/shadow.
- **Footer:** **glass-dark** (navy translucent) with white/white-80 text; clear link hover.
- **Buttons:** Primary = solid navy with soft hover shadow; Secondary = glass-style (translucent + border); Accent = green with hover glow; smooth transitions and active scale.
- **Sections:** **section-hero-bg** (subtle radial gradients) for hero and key content pages; **section-alt-bg** for trust block; alternating depth without clutter.
- **Inputs:** Kept solid (or input-glass) for readability; strong focus ring.
- **Rules:** Glass used selectively; text kept high-contrast; blur moderate (blur-md to blur-xl); no neon, no heavy gradients.

---

## What to change from current flat version

| Area | Current | Change for glassmorphism |
|------|---------|--------------------------|
| **Design tokens** | Solid colors only; single shadow | Add glass surfaces (rgba), blur levels, layered shadows, border opacities |
| **Navbar** | Solid white `bg-[var(--surface)]`, thin border | Translucent glass bar, `backdrop-blur`, subtle white border, same layout |
| **Hero** | Flat `--background`, no depth | Layered background (soft gradient/glow), optional floating glass panel; keep typography and CTAs |
| **Cards** | Solid white, thin border | Glass card variant: frosted bg, blur, soft border, subtle shadow; keep text contrast |
| **Buttons** | Solid fill / solid border | Primary: keep navy or slight glass overlay; Secondary: glass + border; smooth transitions |
| **Inputs** | Solid white bg | Light glass or solid with stronger focus ring; labels/placeholders stay clear |
| **Sections** | Alternating solid background/surface | Some sections with soft gradient or blurred background; content on glass or solid for readability |
| **Footer** | Light solid background | Dark glass or rich navy with subtle inner highlight; links stay readable |
| **Vehicle cards** | Solid surface | Glass card with hover lift and soft shadow |
| **Trust block** | Solid section + solid cards | Section with subtle depth; cards as glass panels |

## What to preserve

- All existing components, pages, and logic
- Nav structure, dropdown, locale switcher
- Hero copy and CTA hierarchy
- Form steps and validation behavior
- Responsive breakpoints and container widths
- Typography scale and color contrast for text
- Accessibility (focus states, contrast on glass)

## Glass usage rules

- **Navbar**: Always glass (sticky, one bar).
- **Hero**: Background layered; content can sit on a light glass panel for emphasis.
- **Cards**: Use glass for hero trust cards, vehicle list cards, contact trust tiles; keep form containers readable (solid or very light glass).
- **Footer**: One dark glass or navy block.
- **Blur**: Use `backdrop-blur-md` or `backdrop-blur-xl` only where needed; avoid blur on huge full-page areas.
- **Text**: Never place primary body text on strong glass without a solid backing or high-contrast text.
