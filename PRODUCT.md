# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Engineering managers and tech leads evaluating candidates for full-time senior IC roles. They arrive with a hypothesis ("can this person own hard problems end-to-end?") and scan for evidence fast. Secondary: founders at early-stage startups who need someone who ships without hand-holding.

## Product Purpose

Personal portfolio and developer brand site for Pruthvisinh Rajput (impruthvi.me). Makes the case — through real case studies, open-source contributions, and writing — that Pruthvisinh is a senior full-stack engineer worth hiring. Success = a qualified hiring manager reaching out after seeing the work.

## Positioning

4+ years shipping Laravel and Node.js in production: healthcare SaaS serving 3,000+ patients, $500K+ in processed transactions, 50,000+ users across 10+ applications, and a PR merged into the Laravel framework by Taylor Otwell himself. Not a generalist — a backend-leaning full-stack engineer with a track record of measurable impact.

## Operating Context

Visitors arrive from LinkedIn, GitHub, recruiter outreach, blog posts, and direct referrals. Primary device split is desktop (hiring workflow) with a meaningful mobile share (recruiter screening). The site must work in low-attention scanning mode first — headline metrics and case study cards are the hook; deeper content converts the already-interested.

## Capabilities and Constraints

- Stack: Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (Base UI), TypeScript
- Content: MDX for blog posts and case studies (gray-matter, next-mdx-remote)
- Contact: Resend for email delivery, react-hook-form + Zod for validation
- Analytics: Vercel Analytics
- SEO: structured data (Person + WebSite schema), sitemap, RSS feed
- No CMS — content is file-based; updates require a deploy
- Currently employed at Ricefwtech (Remote); not actively job-seeking

## Brand Commitments

- Name: Pruthvisinh Rajput / handle `impruthvi`
- URL: impruthvi.me
- Email: pruthvirajput97@gmail.com
- Mono font for headings — signals precision, engineering sensibility
- Laravel orange accent (`text-laravel`) — signals specialization, not just preference
- Social: GitHub (impruthvi), LinkedIn (impruthvi), X (@impruthvi13)
- Voice: confident, direct, no fluff — engineer who ships. Copy leads with outcomes and numbers, never vague adjectives.

## Evidence on Hand

- 6 case studies: BizNetworkPro, BrandArc, Everflex Plus, Fidali, Fleet Mart, Letting Property
- 10+ blog posts (Laravel, Node.js, OSS tooling, DX)
- Metric cards: 4+ yrs experience, 50K+ users, $500K+ transactions, 1 PR in Laravel Core merged by Taylor Otwell
- Author photo: `/public/images/authors/impruthvi.jpg`
- Open source: @impruthvi/nodemail (300+ weekly downloads); 1 PR in Laravel React Starter Kit merged by @taylorotwell (PR #46); 4 PRs merged in laravel/boost (https://github.com/laravel/boost); contributor + starter kit maintainer for shipfastlabs/parsel (Pushpak Chhajed, Laravel core team — parsel parses PDFs, Office docs, and images locally in PHP)
- Resume page at `/resume`
- Current employer: Ricefwtech (https://ricefwtech.com/), Software Engineer, Remote, Jun 2026–Present — cross-product architecture, gap analysis, PR reviews, engineering direction
- No invented testimonials, case study ROI figures, or pricing — fabrication banned

## Product Principles

1. **Work speaks first.** Case studies and metrics are the primary persuasion surface. Copy supports evidence; it never replaces it.
2. **Specificity over scope.** Laravel + Node.js depth beats "full-stack everything" breadth. The niche is a feature.
3. **Respect the scanner.** Every section must earn a second of attention before asking for more. Hierarchy, density, and scannability outrank decoration.
4. **Confidence without noise.** Direct, outcome-led copy. No hustle-speak, no vague superlatives, no filler sections.
5. **Ship-grade craft.** The site's own quality is a portfolio artifact. Performance, accessibility, and polish are not optional.

## Accessibility & Inclusion

WCAG 2.1 AA baseline. Focus states, semantic HTML, and `alt` text on all portfolio images are required — they are part of the craft signal, not a compliance checkbox.
