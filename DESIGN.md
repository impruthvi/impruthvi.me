---
name: impruthvi.me
description: Engineering Field Notes — a dark editorial portfolio for a backend-leaning product engineer
canonicalDesign: "https://app.paper.design/file/01M1CC8YNEPWK7YY6R5R7KFJVF/1-0"
platform: web
breakpoints:
  mobile: 390px
  desktop: 1440px
---

# Design contract: impruthvi.me

## Authority

The Paper file linked in the frontmatter is the canonical visual source for the redesign. This document records the implementation decisions needed to translate that file into the production site.

When the current application, older design documentation, and Paper disagree, use this order of authority:

1. Product truth and real content in the repository
2. Accessibility, semantic HTML, and functional requirements
3. The approved Paper desktop and mobile artboards
4. Existing implementation details

Paper defines appearance and responsive composition. The existing application remains authoritative for content, routing, metadata, MDX rendering, RSS, structured data, analytics, contact delivery, validation, and error handling.

## Product direction

**Creative direction:** Engineering Field Notes.

The site should feel like an experienced engineer's working notebook: dark, precise, editorial, evidence-led, and intentionally restrained. Large sans-serif headlines create authority. Monospaced labels add technical structure. Red signals actions, measurements, and important transitions.

The design serves hiring managers, engineering leads, founders, and developers who scan quickly before deciding whether to read deeply. Outcomes and evidence must appear before broad claims.

## Canonical decisions

- Paper is the visual source of truth for the redesign.
- Space Grotesk is the display and heading family.
- Inter is the reading and interface family.
- JetBrains Mono is reserved for labels, metadata, code, dates, counters, and technical annotations.
- Dark mode is the primary authored experience.
- Existing light-mode functionality is preserved, but it must not delay the Paper-faithful dark implementation. Light mode receives a deliberate token mapping and accessibility verification.
- Desktop composition uses a 1440px reference viewport and an 1180px maximum content container.
- Mobile composition uses a 390px reference viewport with 24px side gutters, producing a 342px content lane.
- Editorial surfaces use sharp corners by default. Rounded shapes are limited to filters, status indicators, and controls whose affordance benefits from them.
- One reusable case-study template renders every case-study MDX document. Everflex Plus is the reference composition, not a hard-coded special case.
- One reusable article template renders every post MDX document. The Laravel starter-kit article is the reference composition.
- Existing content and measurable claims must remain truthful. Do not invent screenshots, testimonials, metrics, clients, dates, or outcomes.

## Design tokens

### Color

| Role | Value | Usage |
| --- | --- | --- |
| Background | `#09090B` | Page ground and deepest surface |
| Surface | `#18181B` | Diagrams, form emphasis, code, and selected content blocks |
| Border | `#2D2D30` | Rules, dividers, input outlines, and structural lanes |
| Primary text | `#FAFAFA` | Headlines and high-priority content |
| Muted text | `#A1A1AA` | Descriptions, metadata, and supporting copy |
| Accent | `#FF2D20` | Laravel identity, actions, measurements, flow arrows, and active states |

Red is deliberate but not restricted to tiny decoration. It may fill a primary action, an outcome block, or a queue stage when the Paper composition uses that moment as the section's focal point. Avoid multiple competing red surfaces in the same viewport.

Light mode should use semantic equivalents with verified contrast instead of mechanically inverting every value.

### Typography

| Role | Family | Typical desktop | Typical mobile |
| --- | --- | --- | --- |
| Display | Space Grotesk 600–700 | 68px / 70px | 42–48px / 44–50px |
| Section heading | Space Grotesk 600 | 40px / 44px | 30–34px / 35–38px |
| Card/title | Space Grotesk 600 | 24–32px | 19–23px |
| Lead | Inter 400–500 | 20px / 30px | 17–22px / 27–30px |
| Body | Inter 400 | 16px / 26px | 15–17px / 24–28px |
| Label | JetBrains Mono 400–600 | 10–12px / 16px | 9–10px / 14–16px |
| Code | JetBrains Mono 400 | Context dependent | Minimum 10px without horizontal clipping |

Large Space Grotesk headings use tight tracking. Small monospaced labels may use open tracking and uppercase. Body copy must never use the monospaced family.

### Spacing

Use the established 4px-based scale: 4, 8, 12, 16, 24, 32, 48, 64, and 96px.

- Desktop sections generally use 80–96px vertical space.
- Mobile sections generally use 48–64px vertical space.
- Related text groups use 8–18px gaps.
- Evidence blocks and major transitions use 24–32px gaps.
- Whitespace is part of the hierarchy; do not fill it with decorative cards.

## Layout system

### Desktop

- Reference viewport: 1440px.
- Content container: 1180px centered.
- Header and footer share the main container.
- Editorial asymmetry is preferred over equal card grids.
- Wide page families may use two columns when one column contains primary narrative and the other contains metadata, evidence, or navigation.

### Mobile

- Reference viewport: 390px.
- Content lane: 342px centered with 24px gutters.
- Include realistic system status chrome in design references, but do not implement fake status chrome on the website.
- Desktop columns become one reading sequence, ordered by user value rather than DOM convenience.
- Repeated rows use fixed-width lanes for dates, counters, icons, and trailing actions.
- Code, diagrams, filters, and metadata must fit without accidental horizontal scrolling.
- Interactive targets should be at least 44px in the primary touch dimension.

## Shared component language

### Site shell

- Wordmark: red square followed by `IMPRUTHVI` in JetBrains Mono.
- Desktop navigation: Work, Writing, Resume, Contact.
- Mobile navigation: a clearly bordered menu control opening an accessible navigation surface.
- Header uses a dark surface, structural bottom rule, and stable layout during navigation.
- Footer includes wordmark, copyright, GitHub, LinkedIn, X, and site link in the approved responsive composition.

### Section headers

- Use a small red monospaced label above or beside the Space Grotesk heading.
- Optional counters, dates, or state labels sit in a muted fixed lane.
- A structural rule may close the section header when used in Paper.

### Buttons and links

- Primary neutral action: near-white surface with dark text.
- Primary branded action: red surface with dark text when Paper assigns the section's focal action to red.
- Secondary action: transparent with a border.
- Text actions commonly end with `→` or `↗` and must expose a meaningful accessible name.
- Hover, active, focus-visible, disabled, submitting, success, and error states are required even when Paper only shows the resting state.

### Evidence and diagrams

- Prefer direct diagrams, performance comparisons, numbered flows, and outcome blocks over generic screenshots.
- Keep diagrams semantic enough to understand without color alone.
- Mobile architecture flows become vertical.
- Performance comparisons retain numeric labels in addition to bar length.

### Forms

- Labels remain visible above fields.
- Inputs have full structural borders and clear focus-visible treatment.
- Validation errors appear adjacent to the relevant field and are programmatically associated.
- Contact submission preserves the existing validation and delivery behavior.
- Submitting, success, and failure states must prevent duplicate or ambiguous actions.

## Page matrix

The implementation must cover these responsive page families:

1. Homepage — desktop and mobile
2. Work index — desktop and mobile
3. Case-study detail — desktop and mobile, reusable for every case study
4. Writing index — desktop and mobile
5. Article detail — desktop and mobile, reusable for every post
6. Résumé — desktop and mobile
7. Contact — desktop and mobile

Privacy, not-found, sitemap, RSS, robots, and other functional routes retain their behavior and receive enough visual alignment to feel part of the same site even though they do not have dedicated Paper artboards.

## Interaction and accessibility contract

- Meet WCAG 2.1 AA as a baseline.
- Preserve semantic landmarks and heading order.
- All functionality must work with keyboard input.
- Focus-visible states must be obvious against both themes.
- Mobile navigation must manage focus, expose its expanded state, and close predictably.
- Motion must respect `prefers-reduced-motion`.
- Content must remain usable at browser zoom and with long titles, labels, and validation messages.
- Images require useful alternative text when informative and empty alternative text when decorative.
- Do not encode meaning using red alone.

## Content and architecture contract

- Keep posts and case studies file-backed and MDX-driven.
- Keep reusable data in the existing content and data modules.
- Keep server rendering and metadata behavior appropriate to each route.
- Preserve Person and WebSite structured data, Open Graph metadata, sitemap, RSS, analytics, and robots behavior.
- Preserve the résumé PDF download.
- Preserve contact validation and Resend delivery.
- Do not hard-code article or case-study content into shared presentation components.

## Verification contract

The primary verification seam is the rendered public website in a real browser using production content.

- Capture deterministic screenshots at 390px and 1440px for every core page family.
- Compare visual hierarchy, composition, typography, spacing, color, responsive order, and clipping against Paper.
- Exercise navigation, filters, copy/share actions, PDF download, contact validation, and mobile-menu behavior through user-visible interactions.
- Verify the contact delivery boundary separately without sending uncontrolled production email during routine tests.
- Run lint, type checking, production build, accessibility checks, and current Core Web Vitals guidance before release.
- Test external behavior rather than internal class names or component implementation details.

## Definition of done

The redesign is complete when:

- Every core page family matches the intent of its Paper desktop and mobile artboards.
- Shared templates render all real MDX content without page-specific hard-coding.
- Existing functional and discovery behavior remains intact.
- Browser verification passes at mobile and desktop reference widths.
- Keyboard, focus, contrast, semantics, reduced-motion, and form validation checks pass.
- No horizontal overflow, clipped content, unexpected layout shift, or unreadable code remains.
- The production build passes and the preview deployment receives final visual approval.
