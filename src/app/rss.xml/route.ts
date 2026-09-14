import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function xml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[character]!);
}

export function GET() {
  const items = getPosts().map((post) => `
    <item>
      <title>${xml(post.title)}</title>
      <link>${site.url}/notes/${post.slug}</link>
      <description>${xml(post.summary)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <guid isPermaLink="false">${site.url}/posts/${post.slug}</guid>
    </item>`).join("");

  // Keep the original GUIDs so subscribers do not receive every post again.
  // They are the pre-rewrite /posts/ URLs, which now redirect, so they are
  // flagged isPermaLink="false" — an identifier, not an address.
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.name)}</title>
    <link>${site.url}/notes</link>
    <description>${xml(site.description)}</description>
    <language>en</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
