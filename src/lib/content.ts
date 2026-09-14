import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Metric = { label: string; value: string };

export type CaseStudy = {
  slug: string;
  title: string;
  /** Optional search title. Falls back to `title` when absent. */
  seoTitle?: string;
  tagline: string;
  category: string;
  period: string;
  role: string;
  metrics: Metric[];
  techStack: string[];
  url?: string;
  publishedAt?: string;
  featured: boolean;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  /** Useful to a reader arriving from a link, but not worth a search result.
      Stays on the site and in the feed; leaves the sitemap. */
  noindex?: boolean;
  image?: string;
  author?: string;
  publishedAt: string;
  /** Set only when a post is substantively revised, so `dateModified` and
      `lastmod` stay honest rather than tracking deploys. */
  updatedAt?: string;
  featured: boolean;
  readingTime: string;
  body: string;
};

/** `draft: true` in the frontmatter keeps a file in the repo but off the site. */
export function isDraft(raw: string) {
  return Boolean(matter(raw).data.draft);
}

function readDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, body: content };
    })
    .filter(({ data }) => !data.draft);
}

/** ~220 wpm, rounded up. Close enough that nobody has ever checked. */
function readingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 220))} min`;
}

/** Newest first; entries without a date sort to the top as in-progress work. */
function byDateDesc<T extends { publishedAt?: string }>(a: T, b: T) {
  return (b.publishedAt ?? "9999").localeCompare(a.publishedAt ?? "9999");
}

export function getCaseStudies(): CaseStudy[] {
  return readDir("case-studies")
    .map(({ slug, data, body }) => ({
      slug,
      title: String(data.title ?? slug),
      seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
      tagline: String(data.tagline ?? ""),
      category: String(data.category ?? ""),
      period: String(data.period ?? ""),
      role: String(data.role ?? ""),
      metrics: (data.metrics ?? []) as Metric[],
      techStack: (data.techStack ?? []) as string[],
      url: data.url ? String(data.url) : undefined,
      publishedAt: data.publishedAt ? String(data.publishedAt) : undefined,
      featured: Boolean(data.featured),
      body,
    }))
    .sort(byDateDesc);
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((study) => study.slug === slug);
}

export function getPosts(): Post[] {
  return readDir("posts")
    .map(({ slug, data, body }) => ({
      slug,
      title: String(data.title ?? slug),
      summary: String(data.summary ?? ""),
      noindex: Boolean(data.noindex),
      image: data.image ? String(data.image) : undefined,
      author: data.author ? String(data.author) : undefined,
      publishedAt: String(data.publishedAt ?? ""),
      updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
      featured: Boolean(data.featured),
      readingTime: readingTime(body),
      body,
    }))
    .sort(byDateDesc);
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

/** Posts that belong in the sitemap and in search results. */
export function getIndexablePosts() {
  return getPosts().filter((post) => !post.noindex);
}

/** Posts grouped by year, newest first, for the notes index. */
export function postsByYear() {
  const groups = new Map<string, Post[]>();
  for (const post of getPosts()) {
    const year = post.publishedAt.slice(0, 4) || "Undated";
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, items]) => ({ year, items }));
}

/** "Oct 2022 – Mar 2023" → "2022 — 2026" style range across all case studies. */
export function workYearRange(studies: CaseStudy[]) {
  const years = studies
    .flatMap((study) => study.period.match(/\d{4}/g) ?? [])
    .map(Number)
    .filter(Boolean);
  if (years.length === 0) return "";
  const min = Math.min(...years);
  const max = Math.max(...years);
  const present = studies.some((s) => /present/i.test(s.period));
  return `${min} — ${present ? "present" : max}`;
}
