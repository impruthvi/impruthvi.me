/**
 * PLACEHOLDER CONTENT.
 *
 * Every name, number and sentence below is invented. None of it is safe to
 * ship. Replace it, then flip `PLACEHOLDER_CONTENT` to false — that clears the
 * build-time warning and the on-screen dev ribbon.
 *
 * For each project fill: name, summary, stack (3 max), metric (+ what it
 * measures), problem, approach, tradeoff. If a project genuinely has no
 * metric, set `metric: null` — the row restyles rather than inventing one.
 */
export const PLACEHOLDER_CONTENT = true;

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  stack: string[];
  metric: Metric | null;
  role: string;
  timeline: string;
  team: string;
  sections: { label: string; heading: string; body: string[] }[];
  results: Metric[];
};

export const projects: Project[] = [
  {
    slug: "cashier-dunning",
    name: "Cashier Dunning",
    summary: "Failed-payment recovery for subscription SaaS",
    stack: ["Laravel", "Stripe", "Postgres"],
    metric: { value: "+18.4%", label: "Revenue recovered" },
    role: "Lead engineer",
    timeline: "Jan — Apr 2026",
    team: "2 engineers, 1 designer",
    sections: [
      {
        label: "01 / Context",
        heading: "Involuntary churn was eating 6% of MRR every month.",
        body: [
          "Cards expired, banks declined, and the existing flow gave up after two retries and a single email. Nobody owned the problem because it looked like a billing config, not a product.",
          "I pulled 14 months of Stripe events, classified every decline code, and found that 64% of failures were recoverable with better timing alone.",
        ],
      },
      {
        label: "02 / Approach",
        heading: "A retry ladder that reads the decline code, not the calendar.",
        body: [
          "Each decline class got its own schedule. Soft declines retry within minutes; insufficient-funds waits for a payday window inferred from the account's history; hard declines skip retries entirely and go straight to a card-update prompt.",
          "Every attempt is an idempotent job keyed on invoice + attempt number, so a queue replay can never double-charge. Reconciliation runs nightly against Stripe and files a diff report anyone in finance can read.",
        ],
      },
      {
        label: "03 / Tradeoff",
        heading: "We capped the ladder at five attempts, on purpose.",
        body: [
          "Modelling said seven attempts recovered another 1.1%. Support data said attempts six and seven generated most of the angry tickets and two chargebacks. We took the smaller number and kept the goodwill.",
          "The downgrade path matters as much as the retries: accounts drop to a read-only tier instead of being locked out, and 31% of them self-serve a new card within two weeks.",
        ],
      },
    ],
    results: [
      { value: "+18.4%", label: "Revenue recovered" },
      { value: "−41%", label: "Billing tickets" },
      { value: "0", label: "Double charges" },
    ],
  },
  {
    slug: "rfp-intelligence",
    name: "RFP Intelligence",
    summary: "Bid-document parsing and requirement extraction",
    stack: ["Next.js", "Python", "pgvector"],
    metric: { value: "9 hrs", label: "Saved per bid" },
    role: "Full-stack engineer",
    timeline: "Aug — Dec 2025",
    team: "2 engineers",
    sections: [
      {
        label: "01 / Context",
        heading: "Every bid started with someone reading 200 pages by hand.",
        body: ["TODO — replace with the real story."],
      },
    ],
    results: [{ value: "9 hrs", label: "Saved per bid" }],
  },
  {
    slug: "dariya-pda",
    name: "Dariya PDA",
    summary: "Field data collection for port operations, offline-first",
    stack: ["React Native", "SQLite", "Sync"],
    metric: { value: "1,200+", label: "Daily field entries" },
    role: "Full-stack engineer",
    timeline: "2021 — 2023",
    team: "3 engineers",
    sections: [
      {
        label: "01 / Context",
        heading: "Dock crews had no signal and no patience.",
        body: ["TODO — replace with the real story."],
      },
    ],
    results: [{ value: "1,200+", label: "Daily field entries" }],
  },
  {
    slug: "entitlements-service",
    name: "Entitlements Service",
    summary: "Plan and feature-gating layer shared across four products",
    stack: ["Node", "Redis", "OpenAPI"],
    metric: { value: "41 ms", label: "p99 check latency" },
    role: "Lead engineer",
    timeline: "2024 — 2025",
    team: "Solo",
    sections: [
      {
        label: "01 / Context",
        heading: "Four products, four different ideas of what a plan was.",
        body: ["TODO — replace with the real story."],
      },
    ],
    results: [{ value: "41 ms", label: "p99 check latency" }],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
