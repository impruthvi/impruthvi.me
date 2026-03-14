import { SITE } from "@/lib/constants";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    jobTitle: "Laravel Developer",
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: [
      SITE.social.github,
      SITE.social.linkedin,
      SITE.social.twitter,
    ],
    knowsAbout: [
      "PHP",
      "Laravel",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "React",
      "Vue.js",
      "TypeScript",
      "AWS",
      "Docker",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    author: {
      "@type": "Person",
      name: SITE.name,
    },
  };
}

export function getArticleSchema({
  title,
  description,
  url,
  publishedAt,
  image,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE.name,
    },
    ...(image && { image }),
    ...(keywords && { keywords: keywords.join(", ") }),
  };
}
