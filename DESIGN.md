---
name: impruthvi.me
description: Dark-mode-first developer portfolio — precision terminal aesthetic, single Laravel Red accent
colors:
  laravel-red: "#FF2D20"
  ink: "#09090b"
  card-dark: "#18181b"
  border-dark: "#27272a"
  ash: "#a1a1aa"
  near-white: "#fafafa"
  surface-light: "#f5f5f5"
  stone: "#737373"
  pure-white: "#ffffff"
typography:
  display:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.near-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "rgba(250,250,250,0.85)"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
    height: "32px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.near-white}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
    height: "32px"
  button-outline-hover:
    backgroundColor: "rgba(39,39,42,0.5)"
    textColor: "{colors.near-white}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
    height: "32px"
  card-case-study:
    backgroundColor: "rgba(24,24,27,0.3)"
    textColor: "{colors.near-white}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-metric:
    backgroundColor: "rgba(24,24,27,0.5)"
    textColor: "{colors.near-white}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  chip-skill:
    backgroundColor: "rgba(24,24,27,0.5)"
    textColor: "{colors.ash}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  chip-tech:
    backgroundColor: "{colors.border-dark}"
    textColor: "{colors.near-white}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
---

# Design System: impruthvi.me

## Overview

**Creative North Star: "The Precision Terminal"**

This system communicates engineering mastery by *being* engineered. Near-black zinc (#09090b) reads like a terminal in full focus — not a dark-themed website, but a purpose-built surface where every pixel is load-bearing. JetBrains Mono anchors every heading and identifier, creating a consistent subtext: this was built by someone who lives in a code editor. Inter handles reading copy with quiet professionalism, never competing for attention.

One color breaks the discipline: Laravel Red (#FF2D20). It appears on timeline dots, metric values, category labels, active nav underlines, and focus rings — never filling surfaces, never decorating. Its rarity is its meaning. When the eye lands on red, it has landed on something that matters. The contrast ratio between the zinc ground and the accent is extreme by design.

The system is dark-mode-first — `.dark` is the default body class, not an opt-in. The light mode exists and is fully resolved, but the design's visual identity lives in the dark. Surfaces layer tonally (ink → card-dark → border-dark) rather than through shadows, with depth conveyed through stepped zinc stops and controlled opacity borders.

**Key Characteristics:**
- Dark zinc ground (#09090b) as base; tonal layering via #18181b and #27272a for depth
- Single accent (Laravel Red #FF2D20) used with strict economy — status color, not decoration
- JetBrains Mono for all structural type (headings, identifiers, metrics); Inter for reading
- Borders always at 50% opacity at rest; full opacity on hover signals interactivity
- Flat-by-default elevation; `shadow-sm` appears on card hover only
- Max-width container (1024px) with 24px gutter; generous section padding (48–64px)
- Supports light mode fully; color token inversion is complete and tested

## Colors

A near-achromatic palette — deep zinc ground, stepped neutral surfaces — punctuated by a single high-saturation accent that never decorates, only signals.

### Primary
- **Laravel Red** (#FF2D20): The single accent color. Used for: category labels on cards, metric values in MetricCard, timeline dots in Experience, active nav underline, bullet point markers, logo hover, icon hover states, focus rings, and chart-1. Never used as a background fill on large surfaces. Never combined with another accent.

### Neutral
- **Ink** (#09090b): Dark mode body background and light mode primary text. The deepest surface in the system.
- **Card Dark** (#18181b): Card, popover, and muted background in dark mode. One step lighter than ink — creates tonal depth without borders.
- **Border Dark** (#27272a): Secondary surfaces, muted/accent background, and border color in dark mode. Also used for tech-stack chips (bg-secondary).
- **Ash** (#a1a1aa): Muted foreground in dark mode. Used for secondary text, metadata, timestamps, muted labels, skill chip text at rest.
- **Near White** (#fafafa): Dark mode primary foreground text. Also the primary button background in dark mode (inverted from conventional — button is the lightest element on screen).
- **Surface Light** (#f5f5f5): Light mode muted and secondary surface.
- **Stone** (#737373): Light mode muted foreground text.
- **Pure White** (#ffffff): Light mode body background and card surface.

### Named Rules
**The One Red Rule.** Laravel Red appears on ≤3 interactive or semantic elements per viewport at rest. It is a status color, not a decoration. When something is red, it is either active, focused, a measurable achievement, or the brand identifier. Never use it as a fill on any surface larger than a 12px dot or an underline.

**The Opacity Border Rule.** Borders are declared at 50% opacity (`border-border/50`) at rest. Full-opacity borders (`border-border`) appear only on hover or focus, conveying interactivity through increased definition without adding visual noise to the resting state.

## Typography

**Display / Headline / Title Font:** JetBrains Mono (ui-monospace fallback)
**Body Font:** Inter (ui-sans-serif fallback)
**No tertiary font family** — the system uses exactly two typefaces.

**Character:** JetBrains Mono imports terminal authority into the layout. Used exclusively for structural type — section headings, the logo mark, metric values, case study titles — it signals that the author is at home in a code editor. Inter keeps reading copy legible at small sizes without competing for identity. The pairing is high-contrast by intent: monospaced structure, proportional prose.

### Hierarchy
- **Display** (JetBrains Mono, 700, clamp(1.875rem → 2.25rem), lh 1.1, ls -0.025em): Hero h1 only. Pruthvisinh's name at the top of the page.
- **Headline** (JetBrains Mono, 700, 1.5rem / 24px, lh 1.2, ls -0.025em): Section headings — "What I've Built", "Experience", "Technical Skills", "Open Source", etc.
- **Title** (JetBrains Mono, 600, 1.125rem / 18px, lh 1.3, ls -0.015em): Case study card titles, company names in Experience, open-source package names.
- **Body** (Inter, 400, 0.875rem / 14px, lh 1.6): All descriptive copy — hero tagline, card taglines, experience highlights, blog post excerpts.
- **Label** (Inter, 500, 0.75rem / 12px, ls 0.1em, uppercase): Category tags on case study cards and open source items. The only uppercase treatment in the system. Always in Laravel Red.
- **Metric Value** (JetBrains Mono, 700, 1.25rem / 20px): MetricCard primary stat. Always in Laravel Red.

### Named Rules
**The Mono Authority Rule.** JetBrains Mono is used exclusively for structural type — headings, identifiers, metrics, the logo. Inter handles all reading copy. Cross-pollination (mono for body text, sans for headings) is not permitted. The typeface is the signal; keep it unambiguous.

## Layout

Single-column content flow with a max-width container of `max-w-5xl` (1024px) and horizontal padding of `px-6` (24px each side). All sections share this container — no edge-to-edge surfaces or full-bleed breakouts.

Section vertical rhythm: `py-12` (48px) base, `py-16` (64px) at `md` breakpoint. Headings sit at the top of each section with `mt-2` (8px) leading body text, then `mt-8` (32px) before the content grid.

**Grid patterns:**
- Case studies: `grid grid-cols-1 sm:grid-cols-2 gap-4` (16px)
- Metrics: `grid grid-cols-2 sm:grid-cols-4 gap-4`
- Skills: flex-wrap with `gap-2` (8px)
- Experience highlights: `space-y-2` with a left border timeline

**Header:** sticky, `h-16` (64px), `max-w-5xl` container, `backdrop-blur-md` glass layer, `border-b border-border/50`.

**Footer:** `h-16`, same container, `border-t border-border/50`, three-column flex (location / copyright / social icons).

**Responsive:** Full desktop layout at `md` breakpoint (768px). Below md: hero stacks vertically, nav collapses to mobile drawer, two-column grids become single-column.

## Elevation & Depth

The system is flat by default. Depth is conveyed through tonal stepping — Ink (#09090b) → Card Dark (#18181b) → Border Dark (#27272a) — not through shadow. At rest, no component casts a shadow.

The sole exception: card surfaces receive `shadow-sm` on hover, providing tactile lift without ambient noise. The header uses `backdrop-blur-md` to create a frosted-glass separation layer from scrolling content — this is the only persistent depth effect in the system.

### Shadow Vocabulary
- **Card hover lift** (`box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)`): Applied on hover to CaseStudyCard and OpenSource items. Signals interactivity.
- **Header glass** (`backdrop-filter: blur(12px)` + `background: rgba(9,9,11,0.8)`): Persistent. The only ambient depth layer in the system.

### Named Rules
**The Flat-By-Default Rule.** Surfaces rest flat. Shadow is a hover state, not a design element. If a card is casting a shadow at rest, it is wrong.

## Shapes

The system uses a consistent, gently rounded form language based on `--radius: 0.625rem` (10px) as the base unit.

- **Cards and containers:** `rounded-lg` (0.625rem / 10px) — applies to CaseStudyCard, MetricCard, CTA Banner, OpenSource items, contact form inputs.
- **Chips and tags:** `rounded-md` (0.5rem / 8px) — applies to tech stack tags, skill chips.
- **Badge pills:** `rounded-full` — applies only to the open-source badge ("Merged by Taylor Otwell"). This is the only fully-rounded element in the system.
- **Timeline dot:** `rounded-full h-3 w-3` with `border-2 border-laravel bg-background` — 12px circle, Laravel Red border, background fill. The system's most prominent brand-colored shape.
- **Buttons:** `rounded-lg` (0.625rem) for all variants except `xs`/`sm` which use `rounded-[min(var(--radius-md),10px)]`.

**No sharp corners.** Nothing uses `rounded-none`. The softest element is `rounded-full` (badges and dots only). The system sits between clinical and approachable — never aggressive, never soft.

## Components

### Buttons
Precise and functional — zero ornament. Two meaningful variants: primary and outline. Hierarchy is clear; no decoration beyond the functional affordance.

- **Shape:** Rounded corners (0.625rem / 10px); small/xs use 8px minimum
- **Primary (dark mode):** Near-white (#fafafa) background, ink (#09090b) text — the lightest element on screen, guaranteeing maximum contrast against the zinc ground. Padding: 4px 10px, height 32px default.
- **Primary (light mode):** Ink (#0a0a0a) background, near-white (#fafafa) text — conventional inversion.
- **Hover:** Opacity reduces to 80% (`bg-primary/80`). No position shift at rest; `active:translate-y-px` on click.
- **Outline:** Transparent background, `border-border` (dark: #27272a), foreground text. Hover: `bg-muted` fill. The secondary CTA in every paired-button context (hero, CTA banner, resume page).
- **Ghost:** Transparent, no border; hover fills with `bg-muted`. Used for nav-adjacent controls and icon buttons.
- **Focus:** `border-ring` (Laravel Red #FF2D20) border + `ring-3 ring-ring/50` (3px Laravel Red at 50% opacity).
- **Size:** Default h-8 (32px). `lg` at h-9 (36px) for CTA contexts. Icons at `size-8` (32px).

### Cards / Containers
The primary content surface. Two weight variants — case study cards and metric cards — sharing the same radius and border language.

- **Case Study Card:** `rounded-lg border border-border/50 bg-muted/30 p-6`. On hover: `border-border` (full opacity) + `bg-muted/50` + `shadow-sm`. The entire card is a link; cursor pointer throughout. Hover state is the primary interactivity signal.
- **Metric Card:** `rounded-lg border border-border/50 bg-muted/50 px-4 py-3`. Intersection-observer fade-in on first scroll into view (`translate-y-2 opacity-0` → `translate-y-0 opacity-100`, 500ms transition). No hover state — purely informational.
- **CTA Banner:** `rounded-lg border border-border/50 bg-muted/30 px-8 py-12`. Full-width within the container. Text-centered. No hover state.
- **Open Source Item:** Same visual spec as Case Study Card.

### Chips
Two chip variants: tech-stack tags and skill chips. Both use 8px radius.

- **Tech Stack Tag (bg-secondary):** `rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground`. Dark: #27272a bg, #fafafa text. No border, no hover. Used inline inside cards for stack enumeration.
- **Skill Chip (bordered):** `rounded-md border border-border/50 bg-muted/50 px-3 py-1.5 text-sm`. Hover: `border-laravel/50 text-foreground` — the border shifts toward Laravel Red at 50% opacity, the only hover-state color shift for chips.
- **Badge Pill:** `rounded-full bg-laravel/10 px-3 py-1 text-xs font-medium text-laravel`. Laravel Red at 10% opacity fill, full-opacity text. Used for achievement callouts (e.g. "Merged by Taylor Otwell").

### Inputs / Fields
- **Style:** `rounded-lg border border-border bg-background px-4 py-2.5 text-sm`. Border is full opacity (not `/50`) to signal that these are interactive forms, not informational surfaces.
- **Placeholder:** `text-muted-foreground`.
- **Focus:** `focus:border-ring` — border shifts to Laravel Red (#FF2D20). No ring on the input itself (ring is reserved for buttons).
- **Error:** `text-destructive` (#ef4444) below the field, text-xs.
- **Disabled:** `disabled:pointer-events-none disabled:opacity-50`.

### Navigation
- **Header:** Sticky, `h-16`, `backdrop-blur-md` glass, `border-b border-border/50`. Left: logo (`IMPRUTHVI`, font-mono font-bold, hover: `text-laravel`). Right: nav links + theme toggle.
- **Nav Link (default):** `text-sm text-muted-foreground`, hover: `text-laravel`.
- **Nav Link (active):** `text-foreground` + absolute `h-px w-full bg-laravel` underline at `-bottom-1`. The underline is the only positional indicator — no background fill, no bold weight change.
- **Mobile:** hamburger opens a sheet drawer with the full nav links stacked vertically.

### Timeline (Signature Component)
The Experience section's left-border timeline is the most structurally distinctive component.

- **Track:** `border-l-2 border-border/50 pl-6` — 2px left border at 50% opacity, 24px indent.
- **Dot:** `absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-laravel bg-background` — 12px circle, centered on the track, Laravel Red border, background-filled to punch through the track line. The dot is the most prominent use of Laravel Red in the Experience section.
- **Bullet points:** `text-laravel` bullet character (`&bull;`) followed by `text-muted-foreground` highlight text.

## Do's and Don'ts

### Do:
- **Do** use JetBrains Mono for all section headings (`font-mono font-bold tracking-tight`) — it is the system's structural identity.
- **Do** keep borders at 50% opacity at rest (`border-border/50`) and full opacity on hover — this is the primary interactivity signal for cards and chips.
- **Do** use Laravel Red (#FF2D20) for metric values, active states, category labels, timeline dots, and focus rings — these are its only sanctioned uses.
- **Do** use the badge pill (`rounded-full bg-laravel/10 text-laravel`) only for quantified achievement callouts (PR merged, shipped, measurable impact).
- **Do** maintain `max-w-5xl px-6` for all section containers — no edge-to-edge surfaces.
- **Do** include the intersection-observer fade-in (`translate-y-2 opacity-0` → `translate-y-0 opacity-100`, 500ms) for metric and stat cards on first scroll entry.
- **Do** write section headings as short, declarative, title-case phrases — "What I've Built", "Technical Skills" — matching the existing voice.

### Don't:
- **Don't** use Laravel Red as a background fill on any surface larger than a 12px circle or a 1px underline.
- **Don't** add a second accent color. The system has one: #FF2D20. Chart colors (#f97316, #eab308, #22c55e, #3b82f6) exist but are never used in UI chrome.
- **Don't** use Inter for section headings or the logo — mono is the structural signal, sans is the prose signal. Crossing them breaks the system.
- **Don't** add shadows at rest. Only `shadow-sm` on card hover. The header `backdrop-blur` is the only persistent depth effect.
- **Don't** use fully-rounded corners (`rounded-full`) on anything except timeline dots and badge pills. Cards, buttons, chips, and inputs all use `rounded-lg` or `rounded-md`.
- **Don't** use uppercase text except for category labels (label role, `text-laravel`, `uppercase tracking-wider`). Buttons, headings, and nav links are sentence/title case.
- **Don't** break out of the `max-w-5xl` container. There are no full-bleed sections in this system.
