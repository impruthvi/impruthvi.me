import { getCaseStudies, workYearRange } from "@/lib/content";
import { absoluteUrl, breadcrumbSchema, graph, pageMetadata, personId } from "@/lib/seo";
import { Container, Label } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { WorkRow } from "@/components/work-row";

const description =
  "Case studies from healthcare, property and B2B SaaS platforms — the architecture decisions, the performance work and what each one measured.";

export const metadata = pageMetadata({
  title: "Case studies",
  description,
  path: "/work",
});

export default function WorkPage() {
  const studies = getCaseStudies();

  const schema = graph(
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/work"),
      url: absoluteUrl("/work"),
      name: "Case studies",
      description,
      inLanguage: "en",
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": personId },
      hasPart: studies.map((study) => ({
        "@type": "Article",
        "@id": absoluteUrl(`/work/${study.slug}`),
        headline: study.title,
        description: study.tagline,
      })),
    },
    breadcrumbSchema([{ name: "Home", path: "/" }], "Case studies"),
  );

  return (
    <>
      <JsonLd data={schema} />

      <Container className="pt-16 pb-12 lg:pt-18 lg:pb-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <Label>Selected work</Label>
            <h1 className="font-display text-h1 font-black tracking-[-0.035em] uppercase">
              <span className="block">Systems I</span>
              <span className="block">
                shipped, and what{" "}
                <span className="font-serif text-muted lowercase italic [font-size:0.86em]">
                  held
                </span>
                .
              </span>
            </h1>
          </div>
          <div className="flex flex-col gap-3.5 lg:w-[22rem] lg:shrink-0 lg:pb-3.5">
            <p className="text-prose text-[1.0625rem] leading-7">
              Healthcare, property and B2B platforms built mostly on Laravel.
              Each case study covers the problem, the architecture and the
              numbers it moved.
            </p>
            <Label>
              {workYearRange(studies)} / {String(studies.length).padStart(2, "0")} case studies
            </Label>
          </div>
        </div>
      </Container>

      <Container className="pb-20 lg:pb-24">
        <div className="border-ink border-t">
          {studies.map((study, i) => (
            <WorkRow key={study.slug} study={study} index={i} />
          ))}
        </div>
      </Container>
    </>
  );
}
