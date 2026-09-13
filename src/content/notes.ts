/**
 * PLACEHOLDER CONTENT — see src/content/projects.ts.
 *
 * These become MDX files in a later step; keeping them as data for now so the
 * index and article routes have something real-shaped to render.
 */
export type Note = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  readingTime: string;
};

export const notes: Note[] = [
  {
    slug: "stripe-webhooks-idempotent",
    title: "Stripe webhooks are not idempotent, your handler has to be",
    date: "2026-08-14",
    tag: "Payments",
    readingTime: "6 min",
  },
  {
    slug: "killing-n-plus-one",
    title: "Killing 340 N+1 queries without an ORM rewrite",
    date: "2026-06-02",
    tag: "Performance",
    readingTime: "9 min",
  },
  {
    slug: "feature-flags-are-a-schema",
    title: "Feature flags are a database schema, treat them like one",
    date: "2026-04-21",
    tag: "Architecture",
    readingTime: "7 min",
  },
  {
    slug: "offline-first-sync",
    title: "Offline-first sync: what we got wrong three times",
    date: "2026-03-19",
    tag: "Mobile",
    readingTime: "12 min",
  },
  {
    slug: "reconciliation-report",
    title: "The reconciliation report that ended the finance stand-ups",
    date: "2026-01-08",
    tag: "Payments",
    readingTime: "5 min",
  },
  {
    slug: "queue-workers-survive-deploy",
    title: "Queue workers that survive a deploy mid-job",
    date: "2025-11-30",
    tag: "Infra",
    readingTime: "8 min",
  },
  {
    slug: "admin-panels-verbs",
    title: "Admin panels: stop building CRUD, start building verbs",
    date: "2025-09-12",
    tag: "Tooling",
    readingTime: "6 min",
  },
  {
    slug: "what-abap-taught-me",
    title: "What ABAP taught me about writing careful code",
    date: "2025-05-27",
    tag: "Craft",
    readingTime: "4 min",
  },
];

/** Notes grouped by year, newest first, for the index page. */
export function notesByYear() {
  const groups = new Map<string, Note[]>();
  for (const note of notes) {
    const year = note.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), note]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, items]) => ({
      year,
      items: [...items].sort((a, b) => b.date.localeCompare(a.date)),
    }));
}
