import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { GET as getFeed } from "@/app/rss.xml/route";
import { getCaseStudies, getPosts } from "@/lib/content";
import { absoluteUrl, breadcrumbSchema, pageMetadata, personSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const CANONICAL_ORIGIN = "https://www.impruthvi.me";

/** Any impruthvi.me URL that is not on the canonical www origin is a redirect. */
function nonCanonicalUrls(text: string) {
  return [...text.matchAll(/https?:\/\/[^\s"'<>)]+/g)]
    .map((match) => match[0])
    .filter((url) => /impruthvi\.me|vercel\.app/.test(url))
    .filter((url) => !url.startsWith(CANONICAL_ORIGIN));
}

describe("canonical domain", () => {
  test("site.url is the www origin", () => {
    expect(site.url).toBe(CANONICAL_ORIGIN);
  });

  test("absoluteUrl never emits a trailing slash except at the root", () => {
    expect(absoluteUrl("/")).toBe(CANONICAL_ORIGIN);
    expect(absoluteUrl("/notes")).toBe(`${CANONICAL_ORIGIN}/notes`);
    expect(absoluteUrl("/notes/example")).toBe(`${CANONICAL_ORIGIN}/notes/example`);
  });

  test("robots points at the canonical sitemap", () => {
    expect(robots().sitemap).toBe(`${CANONICAL_ORIGIN}/sitemap.xml`);
  });

  test("the feed carries no redirecting links", async () => {
    const body = await (await getFeed()).text();
    // The GUIDs are deliberately the pre-rewrite /posts/ paths, and are flagged
    // isPermaLink="false" precisely because they no longer resolve.
    const links = body.replace(/<guid[^>]*>[^<]*<\/guid>/g, "");
    expect(nonCanonicalUrls(links)).toEqual([]);
    expect(body).toContain('isPermaLink="false"');
  });
});

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  test("every URL is on the canonical origin", () => {
    expect(nonCanonicalUrls(urls.join(" "))).toEqual([]);
  });

  test("contains no redirecting, duplicate or fragment URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(url).not.toContain("#");
      expect(url).not.toContain("?");
      expect(url).not.toMatch(/\/(posts|case-studies|resume)(\/|$)/);
    }
  });

  test("covers every published post and case study, and nothing else", () => {
    const expected = [
      "/",
      "/notes",
      "/work",
      "/about",
      "/contact",
      "/privacy",
      ...getPosts().map((post) => `/notes/${post.slug}`),
      ...getCaseStudies().map((study) => `/work/${study.slug}`),
    ].map((path) => absoluteUrl(path));
    expect(urls.sort()).toEqual(expected.sort());
  });

  test("lastmod is only set where a real content date exists", () => {
    const dated = new Map(entries.map((entry) => [entry.url, entry.lastModified]));
    // Static pages have no reliable modification date, so they carry none
    // rather than a deploy timestamp.
    for (const path of ["/about", "/contact", "/privacy"]) {
      expect(dated.get(absoluteUrl(path))).toBeUndefined();
    }
    for (const post of getPosts()) {
      expect(dated.get(absoluteUrl(`/notes/${post.slug}`))).toBe(post.publishedAt);
    }
  });
});

describe("page metadata", () => {
  test("canonical and og:url are always the same path", () => {
    for (const path of ["/", "/notes", "/work", "/about", "/notes/example"]) {
      const meta = pageMetadata({ title: "t", description: "d", path });
      expect(meta.alternates?.canonical).toBe(path);
      expect(meta.openGraph && "url" in meta.openGraph ? meta.openGraph.url : null).toBe(path);
    }
  });

  test("every page gets a title, a description and a social card", () => {
    const meta = pageMetadata({ title: "t", description: "d", path: "/x" });
    expect(meta.title).toBe("t");
    expect(meta.description).toBe("d");
    expect(meta.openGraph?.images).toBeTruthy();
  });
});

describe("structured data", () => {
  test("Person links only to real external profiles", () => {
    const person = personSchema();
    expect(person.sameAs.length).toBeGreaterThan(0);
    for (const profile of person.sameAs) expect(profile).toMatch(/^https:\/\//);
    // The socials list also holds a local resume PDF, which is not a profile.
    expect(person.sameAs.some((url) => url.endsWith(".pdf"))).toBe(false);
  });

  test("breadcrumb positions are contiguous and the last crumb has no URL", () => {
    const crumbs = breadcrumbSchema(
      [
        { name: "Home", path: "/" },
        { name: "Field notes", path: "/notes" },
      ],
      "A post",
    ).itemListElement;
    expect(crumbs.map((crumb) => crumb.position)).toEqual([1, 2, 3]);
    expect(crumbs.at(-1)).not.toHaveProperty("item");
  });

  test("all schema is JSON-serialisable and escapes script-closing brackets", () => {
    const payload = JSON.stringify(personSchema()).replace(/</g, "\\u003c");
    expect(() => JSON.parse(payload.replace(/\\u003c/g, "<"))).not.toThrow();
    expect(payload).not.toContain("</");
  });
});

describe("internal links", () => {
  const files = ["posts", "case-studies"].flatMap((dir) =>
    fs
      .readdirSync(path.join("content", dir))
      .map((file) => path.join("content", dir, file)),
  );

  test("no markdown link points at a route that redirects", () => {
    for (const file of files) {
      const body = fs.readFileSync(file, "utf8");
      const stale = [...body.matchAll(/]\((\/(?:posts|case-studies|resume)[^)]*)\)/g)];
      expect({ file, stale: stale.map((match) => match[1]) }).toEqual({ file, stale: [] });
    }
  });
});
