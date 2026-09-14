import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { renderMdx } from "@/components/mdx";
import { getCaseStudies, getPosts, isDraft, postsByYear } from "@/lib/content";
import { GET as getFeed } from "@/app/rss.xml/route";
import { site } from "@/lib/site";

/** Files the site is expected to publish — drafts are deliberately withheld. */
function publishedFiles(dir: string) {
  return fs
    .readdirSync(path.join("content", dir))
    .filter((file) => file.endsWith(".mdx"))
    .filter((file) => !isDraft(fs.readFileSync(path.join("content", dir, file), "utf8")))
    .sort();
}

describe("restored content", () => {
  test("every published MDX file is discoverable, dated, and backed by existing artwork", () => {
    const posts = getPosts();
    const studies = getCaseStudies();
    expect(posts.map((post) => `${post.slug}.mdx`).sort()).toEqual(publishedFiles("posts"));
    expect(studies.map((study) => `${study.slug}.mdx`).sort()).toEqual(
      publishedFiles("case-studies"),
    );
    for (const item of [...posts, ...studies]) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.body.length).toBeGreaterThan(0);
      expect(Number.isNaN(Date.parse(item.publishedAt ?? ""))).toBe(false);
    }
    for (const post of posts) {
      if (post.image) expect(fs.existsSync(path.join("public", post.image))).toBe(true);
    }
    const dates = posts.map((post) => post.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(postsByYear().flatMap((group) => group.items)).toEqual(posts);
  });

  test("drafts stay on disk but out of every listing", () => {
    const drafts = ["posts", "case-studies"].flatMap((dir) =>
      fs
        .readdirSync(path.join("content", dir))
        .filter((file) => file.endsWith(".mdx"))
        .filter((file) => isDraft(fs.readFileSync(path.join("content", dir, file), "utf8")))
        .map((file) => file.replace(/\.mdx$/, "")),
    );
    const published = [...getPosts(), ...getCaseStudies()].map((entry) => entry.slug);
    for (const slug of drafts) expect(published).not.toContain(slug);
  });

  test("every restored body compiles and every navigation anchor renders", async () => {
    for (const entry of [...getPosts(), ...getCaseStudies()]) {
      const { content, headings } = await renderMdx(entry.body);
      const html = renderToStaticMarkup(content);
      for (const heading of headings) expect(html).toContain(`id="${heading.id}"`);
      expect(new Set(headings.map((heading) => heading.id)).size).toBe(headings.length);
    }
  });

  test("formatted and duplicate headings work, while code examples stay out of navigation", async () => {
    const source = [
      "## Using `Mail.fake()` with **queues**",
      "Text.",
      "## Using `Mail.fake()` with **queues**",
      "~~~md",
      "## Not a heading",
      "~~~",
      "## [Next steps](https://example.com)",
    ].join("\n\n");
    const { content, headings } = await renderMdx(source);
    expect(headings.map((heading) => heading.text)).toEqual([
      "Using Mail.fake() with queues", "Using Mail.fake() with queues", "Next steps",
    ]);
    expect(headings[1].id).toBe(`${headings[0].id}-1`);
    const html = renderToStaticMarkup(content);
    for (const heading of headings) expect(html).toContain(`id="${heading.id}"`);
  });

  test("RSS uses new article links and preserves subscriber GUIDs", async () => {
    const response = getFeed();
    expect(response.headers.get("content-type")).toContain("application/rss+xml");
    const xml = await response.text();
    expect(xml.match(/<item>/g)?.length).toBe(getPosts().length);
    for (const post of getPosts()) {
      expect(xml).toContain(`<link>${site.url}/notes/${post.slug}</link>`);
      // GUIDs stay on the pre-rewrite /posts/ path so subscribers do not see
      // every post again. They redirect, hence isPermaLink="false".
      expect(xml).toContain(`<guid isPermaLink="false">${site.url}/posts/${post.slug}</guid>`);
    }
    expect(xml).toContain("&amp;");
    expect(xml).not.toContain("Invalid Date");
  });

  test("navigation includes legacy introductions without promoting nested subsections", async () => {
    const { content, headings } = await renderMdx([
      "### Introduction", "Opening paragraph.",
      "## The Setup", "### Install dependencies", "Details.",
      "## What I Learned", "Closing paragraph.",
    ].join("\n\n"));
    expect(headings.map((heading) => heading.text)).toEqual([
      "Introduction", "The Setup", "What I Learned",
    ]);
    const html = renderToStaticMarkup(content);
    for (const heading of headings) expect(html).toContain(`id="${heading.id}"`);
  });
});
