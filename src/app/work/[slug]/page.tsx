import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { Mdx } from "@/components/mdx";
import { ArrowLeft, ArrowUpRight, Band, Container, Label } from "@/components/ui";

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.tagline,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: study.title, description: study.tagline, url: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const studies = getCaseStudies();
  const next = studies[(studies.findIndex((s) => s.slug === slug) + 1) % studies.length];
  const headline = study.metrics[0];
  // The headline metric already sits in the header; the band shows the rest.
  const bandMetrics = study.metrics.slice(1);

  return (
    <>
      <Container className="pt-14 pb-12 lg:pt-16">
        <Link
          href="/"
          className="text-muted hover:text-ink flex items-center gap-2.5 transition-colors"
        >
          <ArrowLeft />
          <Label>All work</Label>
        </Link>

        <div className="mt-9 flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex min-w-0 flex-col gap-5 lg:max-w-[51rem]">
            <h1 className="text-h1 font-black tracking-[-0.035em]">{study.title}</h1>
            <p className="text-muted text-lead">{study.tagline}</p>
          </div>
          {headline ? (
            <div className="flex flex-col gap-1 lg:pb-2">
              <span className="text-h2 leading-none font-black tracking-[-0.03em]">
                {headline.value}
              </span>
              <Label>{headline.label}</Label>
            </div>
          ) : null}
        </div>
      </Container>

      <Container className="pb-14">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {[
            ["Role", study.role],
            ["Period", study.period],
            ["Category", study.category],
            ["Live", study.url ? new URL(study.url).host : "—"],
          ].map(([term, value]) => (
            <div key={term} className="border-ink flex flex-col gap-2 border-t py-5">
              <dt>
                <Label>{term}</Label>
              </dt>
              <dd className="text-[1.0625rem] font-medium">
                {term === "Live" && study.url ? (
                  <a
                    href={study.url}
                    className="decoration-accent underline decoration-2 underline-offset-4"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pb-12 lg:pb-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex flex-col gap-4 lg:sticky lg:top-12 lg:h-fit lg:w-[19.5rem] lg:shrink-0">
            <Label tone="ink">Stack</Label>
            <ul className="flex flex-col">
              {study.techStack.map((tech) => (
                <li
                  key={tech}
                  className="border-rule border-t py-2 text-[1.0625rem] leading-6 font-medium"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <article className="mdx-content max-w-measure flex min-w-0 flex-1 flex-col gap-6">
            <Mdx source={study.body} />
          </article>
        </div>
      </Container>

      {bandMetrics.length > 0 ? (
        <Band className="py-16 lg:py-18">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-12">
            <div className="flex flex-col gap-3.5 lg:w-80 lg:shrink-0">
              <Label tone="on-band">Result</Label>
              <h2 className="text-h3 leading-9 font-black tracking-[-0.03em]">
                What it added up to.
              </h2>
            </div>
            <div className="grid min-w-0 flex-1 gap-10 sm:grid-cols-2 lg:gap-12">
              {bandMetrics.map((metric, i) => (
                <div key={metric.label} className="flex flex-col gap-1.5">
                  <span
                    className={`text-h3 leading-tight font-black tracking-[-0.035em] wrap-anywhere ${i === 0 ? "text-accent" : ""}`}
                  >
                    {metric.value}
                  </span>
                  <Label tone="on-band">{metric.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </Band>
      ) : null}

      <Container className="py-14 lg:py-16">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-end justify-between gap-8"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-3.5">
            <Label>Next case study</Label>
            <span className="text-h2 font-black tracking-[-0.035em] wrap-anywhere">{next.title}</span>
          </span>
          <ArrowUpRight className="size-8 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </>
  );
}
