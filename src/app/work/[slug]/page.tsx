import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { ArrowLeft, ArrowUpRight, Band, Container, Label } from "@/components/ui";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  return (
    <>
      <Container className="pt-14 pb-12 lg:pt-16">
        <Link href="/" className="text-muted hover:text-ink flex items-center gap-2.5 transition-colors">
          <ArrowLeft />
          <Label>All work</Label>
        </Link>

        <div className="mt-9 flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5 lg:max-w-[51rem]">
            <h1 className="text-h1 font-black tracking-[-0.035em]">{project.name}</h1>
            <p className="text-muted text-lead">{project.summary}</p>
          </div>
          {project.metric ? (
            <div className="flex flex-col gap-1 lg:pb-2">
              <span className="text-h2 leading-none font-black tracking-[-0.03em]">
                {project.metric.value}
              </span>
              <Label>{project.metric.label}</Label>
            </div>
          ) : null}
        </div>
      </Container>

      <Container className="pb-14">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {[
            ["Role", project.role],
            ["Timeline", project.timeline],
            ["Team", project.team],
            ["Stack", project.stack.join(", ")],
          ].map(([term, value]) => (
            <div key={term} className="border-ink flex flex-col gap-2 border-t py-5">
              <dt>
                <Label>{term}</Label>
              </dt>
              <dd className="text-[1.0625rem] font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pb-10 lg:pb-16">
        {project.sections.map((section) => (
          <section
            key={section.label}
            className="border-rule flex flex-col gap-8 border-t py-8 lg:flex-row lg:gap-20 lg:py-12"
          >
            <div className="lg:w-[19.5rem] lg:shrink-0">
              <Label tone="ink">{section.label}</Label>
            </div>
            <div className="flex max-w-[43.5rem] flex-col gap-6">
              <h2 className="text-h3 leading-10 font-bold tracking-[-0.025em]">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-prose text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </Container>

      {project.results.length > 0 ? (
        <Band className="py-16 lg:py-18">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-12">
            <div className="flex flex-col gap-3.5 lg:w-80 lg:shrink-0">
              <Label tone="on-band">04 / Result</Label>
              <h2 className="text-h3 leading-9 font-black tracking-[-0.03em]">
                Measured against the 90 days before launch.
              </h2>
            </div>
            <div className="flex flex-wrap gap-10 lg:gap-12">
              {project.results.map((result, i) => (
                <div key={result.label} className="flex flex-col gap-1.5">
                  <span
                    className={`text-h2 leading-none font-black tracking-[-0.035em] ${i === 0 ? "text-accent" : ""}`}
                  >
                    {result.value}
                  </span>
                  <Label tone="on-band">{result.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </Band>
      ) : null}

      <Container className="py-14 lg:py-16">
        <Link href={`/work/${next.slug}`} className="group flex items-end justify-between gap-8">
          <span className="flex flex-col gap-3.5">
            <Label>Next case study</Label>
            <span className="text-h2 font-black tracking-[-0.035em]">{next.name}</span>
          </span>
          <ArrowUpRight className="size-8 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </>
  );
}
