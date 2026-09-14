import Link from "next/link";
import { getPosts, postsByYear } from "@/lib/content";
import { absoluteUrl, breadcrumbSchema, graph, pageMetadata, personId } from "@/lib/seo";
import { Container, Label } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";

const description =
  "Articles on Laravel, React, infrastructure and open-source developer tools.";

export const metadata = pageMetadata({
  title: "Field notes",
  description,
  path: "/notes",
});

export default function NotesPage() {
  const groups = postsByYear();
  const posts = getPosts();
  const total = posts.length;

  const schema = graph(
    {
      "@type": "Blog",
      "@id": absoluteUrl("/notes"),
      url: absoluteUrl("/notes"),
      name: "Field notes",
      description,
      inLanguage: "en",
      isPartOf: { "@id": absoluteUrl("/#website") },
      author: { "@id": personId },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": absoluteUrl(`/notes/${post.slug}`),
        headline: post.title,
        datePublished: post.publishedAt,
      })),
    },
    breadcrumbSchema([{ name: "Home", path: "/" }], "Field notes"),
  );

  return (
    <>
      <JsonLd data={schema} />
      <Container className="pt-16 pb-12 lg:pt-18 lg:pb-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <Label>Field notes</Label>
            <h1 className="font-display text-h1 font-black tracking-[-0.035em] uppercase">
              <span className="block">Things I build.</span>
              <span className="block">
                <span className="font-serif text-muted lowercase italic [font-size:0.86em]">
                  Lessons
                </span>{" "}
                I keep.
              </span>
            </h1>
          </div>
          <div className="flex flex-col gap-3.5 lg:w-[22rem] lg:shrink-0 lg:pb-3.5">
            <p className="text-prose text-[1.0625rem] leading-7">
              Tutorials, release notes and the decisions behind my projects.
              From Laravel and React to email testing and cloud infrastructure.
            </p>
            <Label>{total} posts</Label>
          </div>
        </div>
      </Container>

      <Container className="pb-20 lg:pb-24">
        {groups.map((group, groupIndex) => (
          <section key={group.year} className={groupIndex > 0 ? "pt-14" : ""}>
            <div className="border-ink flex items-center justify-between border-b pb-3.5">
              <h2 className="text-h3 leading-9 font-black tracking-[-0.03em]">
                {group.year}
              </h2>
              <Label>{String(group.items.length).padStart(2, "0")} posts</Label>
            </div>

            {group.items.map((post) => (
              <Link
                key={post.slug}
                href={`/notes/${post.slug}`}
                className="group border-rule flex flex-col gap-2.5 border-b py-5 lg:grid lg:grid-cols-[6.5rem_1fr_5rem] lg:items-center lg:gap-8 lg:py-6"
              >
                <Label className="lg:order-1">{post.publishedAt}</Label>
                <span className="text-lg font-medium tracking-[-0.015em] lg:order-2 lg:text-[1.375rem]">
                  {post.title}
                </span>
                <Label className="lg:order-3">{post.readingTime}</Label>
              </Link>
            ))}
          </section>
        ))}
      </Container>
    </>
  );
}
