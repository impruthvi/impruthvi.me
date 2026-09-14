import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Every absolute URL the site emits comes from here, so there is one place that
 * decides the host and the trailing-slash convention. Metadata fields go through
 * `metadataBase` instead — Next resolves those relative paths against the same
 * `site.url`, so both routes land on the identical string.
 */
export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString().replace(/(.)\/$/, "$1");
}

/**
 * Builds the canonical, OpenGraph and Twitter block for one page from a single
 * path, which is the point: `og:url` cannot drift from `rel=canonical` because
 * both are derived from the same argument. Twitter title and description are
 * left off deliberately — Next fills them from OpenGraph.
 *
 * `path` is relative; `metadataBase` in the root layout resolves it.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  image?: string;
  publishedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      title,
      description,
      // Setting `openGraph` here replaces the root object wholesale, which drops
      // the image the root `opengraph-image.tsx` contributed, so the card is
      // always named explicitly. Callers with their own generated card pass its
      // route; everything else falls back to the site-wide one. Going through
      // metadata rather than relying on the file convention also keeps the URL
      // on `metadataBase`, which is the only thing guaranteed to be www.
      images: [
        {
          url: image ?? "/opengraph-image",
          alt: title,
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
  };
}

/** Public profiles only. The socials list also carries a local PDF link. */
const profiles = site.socials
  .map((social) => social.href)
  .filter((href) => href.startsWith("http"));

/**
 * The one Person node for the whole site. Everything that needs an author
 * references it by `@id` rather than restating the name, so Google resolves a
 * single entity instead of one per page.
 */
export const personId = absoluteUrl("/#person");

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: absoluteUrl("/"),
    jobTitle: "Software Engineer",
    email: `mailto:${site.email}`,
    image: absoluteUrl("/images/authors/impruthvi.jpg"),
    description: site.description,
    sameAs: profiles,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Laravel",
      "PHP",
      "Node.js",
      "React",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "Amazon Web Services",
      "Backend engineering",
      "SaaS architecture",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

/** `trail` is ordered root-first and excludes the current page's own crumb. */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
  current: string,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      ...trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
      {
        "@type": "ListItem",
        position: trail.length + 1,
        name: current,
      },
    ],
  };
}

/** Wraps nodes in the single `@graph` a page emits. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
