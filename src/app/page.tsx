import Link from "next/link";
import { site } from "@/lib/site";
import { getCaseStudies, getPosts, workYearRange } from "@/lib/content";
import { absoluteUrl, graph, pageMetadata, personId, personSchema, websiteSchema } from "@/lib/seo";
import { Band, Chip, Container, Label, SectionHeader } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { WorkRow } from "@/components/work-row";

export const metadata = pageMetadata({
  title: site.seoTitle,
  description: site.description,
  path: "/",
});

// ProfilePage rather than WebPage: the homepage's subject is the person, and
// `mainEntity` is what tells Google which entity the site is about.
const homeSchema = graph(
  personSchema(),
  websiteSchema(),
  {
    "@type": "ProfilePage",
    "@id": absoluteUrl("/"),
    url: absoluteUrl("/"),
    name: site.seoTitle,
    description: site.description,
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: { "@id": personId },
  },
);

const practice = [
  {
    n: "01",
    title: "Product engineering",
    body: "Healthcare, property and business platforms. Laravel and React applications with payments, role-based access and the workflows that connect them.",
  },
  {
    n: "02",
    title: "Developer tools",
    body: "Open-source email libraries, offline billing tests and Laravel starter kits. Tools built from problems I run into while shipping software.",
  },
  {
    n: "03",
    title: "Making it fast",
    body: "Query profiling, eager loading, Redis caching and queue workers. Performance improvements grounded in the applications and case studies below.",
  },
];

export default function HomePage() {
  const studies = getCaseStudies();
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={homeSchema} />
      <Container className="pt-16 pb-14 lg:pt-22 lg:pb-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Label tone="ink">{site.name}</Label>
          <span className="bg-rule h-px w-8 shrink-0 max-sm:hidden" aria-hidden />
          <Label>{site.role}</Label>
          <span className="bg-rule h-px w-8 shrink-0 max-sm:hidden" aria-hidden />
          <Label>
            {site.location} — {site.timezone}
          </Label>
        </div>

        {/* The poster. `text-balance` is deliberately absent — these line
            breaks are art-directed, not optimised. */}
        <h1 className="font-display text-display mt-8 font-black tracking-[-0.035em] uppercase">
          <span className="block">Software that</span>
          <span className="block">
            doesn&rsquo;t{" "}
            <span className="font-serif text-muted lowercase italic [font-size:0.82em]">
              flinch
            </span>
          </span>
          <span className="block">under load.</span>
        </h1>

        <div className="border-rule mt-14 flex flex-col-reverse items-start justify-between gap-8 border-t pt-8 lg:flex-row lg:items-end">
          <Chip>{site.availability}</Chip>
          <p className="text-body max-w-[32.5rem]">{site.description}</p>
        </div>
      </Container>

      <section id="work" className="scroll-mt-8">
        <Container className="pb-20 lg:pb-24">
          <SectionHeader
            label="Selected work"
            aside={`${workYearRange(studies)} / ${String(studies.length).padStart(2, "0")} case studies`}
          />
          {studies.map((study, i) => (
            <WorkRow key={study.slug} study={study} index={i} />
          ))}
          <Link href="/work" className="label border-ink mt-8 inline-block border-b pb-1">
            All case studies
          </Link>
        </Container>
      </section>

      <Band className="py-20 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
          <h2 className="text-h2 max-w-[39rem] font-black tracking-[-0.035em]">
            Three threads through my work.
          </h2>
          <Label tone="on-band" className="lg:pt-3.5">
            Practice
          </Label>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-14">
          {practice.map((item) => (
            <div
              key={item.n}
              className="border-seam-on-band flex flex-col gap-5 border-t pt-6"
            >
              <span className="text-accent text-h3 leading-none font-black tracking-[-0.02em]">
                {item.n}
              </span>
              <h3 className="text-lead font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-prose-on-band text-base leading-[1.625rem]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Band>

      <Container className="py-20 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex flex-col items-start gap-3.5 lg:w-[22rem] lg:shrink-0">
            <Label tone="ink">Field notes</Label>
            <p className="text-muted text-base leading-[1.625rem]">
              Notes on Laravel, React, infrastructure and the tools I build.
            </p>
            <Link href="/notes" className="label border-ink mt-1 border-b pb-1">
              All notes
            </Link>
          </div>

          <div className="border-ink flex-1 border-t">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/notes/${post.slug}`}
                className="border-rule flex flex-col gap-2 border-b py-5 sm:flex-row sm:items-center sm:gap-8"
              >
                <Label className="sm:w-[6.5rem] sm:shrink-0">
                  {post.publishedAt}
                </Label>
                <span className="flex-1 text-lg font-medium tracking-[-0.01em]">
                  {post.title}
                </span>
                <Label className="sm:w-14 sm:shrink-0">{post.readingTime}</Label>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
