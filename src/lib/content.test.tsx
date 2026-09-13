import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { renderMdx } from "@/components/mdx";
import { getCaseStudies, getPosts, postsByYear } from "@/lib/content";
import { GET as getFeed } from "@/app/rss.xml/route";

describe("restored content", () => {
  test("every MDX file is discoverable, dated, and backed by existing artwork", () => {
    const posts = getPosts();
    const studies = getCaseStudies();
    expect(posts.map((post) => `${post.slug}.mdx`).sort()).toEqual(
      fs.readdirSync("content/posts").filter((file) => file.endsWith(".mdx")).sort(),
    );
    expect(studies.map((study) => `${study.slug}.mdx`).sort()).toEqual(
      fs.readdirSync("content/case-studies").filter((file) => file.endsWith(".mdx")).sort(),
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
      expect(xml).toContain(`<link>https://impruthvi.me/notes/${post.slug}</link>`);
      expect(xml).toContain(`<guid isPermaLink="true">https://impruthvi.me/posts/${post.slug}</guid>`);
    }
    expect(xml).toContain("&amp;");
    expect(xml).not.toContain("Invalid Date");
  });
});
