import type { MetadataRoute } from "next";
import { getCaseStudies, getPosts } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/notes", "/about", "/contact", "/privacy"].map((path) => ({ url: `${site.url}${path}` })),
    ...getPosts().map((post) => ({ url: `${site.url}/notes/${post.slug}` })),
    ...getCaseStudies().map((study) => ({ url: `${site.url}/work/${study.slug}` })),
  ];
}
