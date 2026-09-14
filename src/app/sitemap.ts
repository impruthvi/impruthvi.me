import type { MetadataRoute } from "next";
import { getCaseStudies, getPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * `lastModified` is set only where a real date exists. Index pages inherit the
 * newest date among their children; the static pages get none at all, because
 * stamping a deploy time on them would tell Google everything changed every
 * time anything shipped.
 */
function newest(dates: (string | undefined)[]) {
  const valid = dates.filter((date): date is string => Boolean(date)).sort();
  return valid.at(-1);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const studies = getCaseStudies();

  return [
    { url: absoluteUrl("/"), lastModified: newest([...posts, ...studies].map((i) => i.publishedAt)) },
    { url: absoluteUrl("/notes"), lastModified: newest(posts.map((post) => post.publishedAt)) },
    { url: absoluteUrl("/work"), lastModified: newest(studies.map((study) => study.publishedAt)) },
    { url: absoluteUrl("/about") },
    { url: absoluteUrl("/contact") },
    { url: absoluteUrl("/privacy") },
    ...posts.map((post) => ({
      url: absoluteUrl(`/notes/${post.slug}`),
      lastModified: post.publishedAt,
    })),
    ...studies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}`),
      lastModified: study.publishedAt,
    })),
  ];
}
