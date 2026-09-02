import Link from 'next/link'
import type { CaseStudyMetadata } from '@/actions/case-studies'
import {
  selectedCaseStudyDetails,
  type SelectedCaseStudySlug,
} from '@/lib/homepage-data'
import { SectionHeading } from '@/components/home/section-heading'

interface SelectedSystemsProps {
  studies: CaseStudyMetadata[]
}

function BrandArcDiagram() {
  return (
    <figure className="flex flex-col overflow-hidden rounded-lg bg-surface xl:min-h-[430px] xl:rounded-none xl:border xl:border-border">
      <div className="hidden h-[52px] items-center justify-between border-b border-border px-[18px] xl:flex">
        <span className="flex gap-[7px]" aria-hidden="true">
          <span className="size-[7px] rounded-full bg-laravel" />
          <span className="size-[7px] rounded-full bg-zinc-600" />
          <span className="size-[7px] rounded-full bg-zinc-600" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">BRAND GENERATION PIPELINE</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2.5 p-[18px] xl:gap-[18px] xl:p-8">
        <div className="hidden border border-border px-4 py-2.5 font-mono text-[11px] xl:block">5-step founder input</div>
        <span className="hidden h-[18px] w-px bg-laravel xl:block" aria-hidden="true" />
        <div className="w-full rounded-[5px] border border-border bg-secondary px-3 py-[11px] text-xs dark:bg-transparent xl:w-auto xl:rounded-none xl:border-laravel xl:px-[18px] xl:py-3 xl:font-mono xl:text-[11px] xl:dark:bg-secondary">
          Strategy agent
        </div>
        <div className="flex w-full gap-2 xl:w-auto xl:gap-[68px]">
          <div className="w-1/2 rounded-[5px] border border-laravel px-2.5 py-[11px] text-[11px] text-muted-foreground xl:w-auto xl:rounded-none xl:border-border xl:px-3.5 xl:py-2.5 xl:font-mono xl:text-[10px]">
            Palette<span className="hidden xl:inline"> agent</span>
          </div>
          <div className="w-1/2 rounded-[5px] border border-laravel px-2.5 py-[11px] text-[11px] text-muted-foreground xl:w-auto xl:rounded-none xl:border-border xl:px-3.5 xl:py-2.5 xl:font-mono xl:text-[10px]">
            Typography<span className="hidden xl:inline"> agent</span>
          </div>
        </div>
        <span className="hidden h-[18px] w-px bg-laravel xl:block" aria-hidden="true" />
        <div className="w-full rounded-[5px] bg-laravel px-3 py-[11px] text-xs font-bold text-brand-foreground xl:w-auto xl:rounded-none xl:bg-primary xl:px-[18px] xl:py-3 xl:font-mono xl:text-[11px] xl:text-primary-foreground">
          <span className="xl:hidden">Logo → PNG · SVG · PDF</span>
          <span className="hidden xl:inline">3 logo directions + brand kit</span>
        </div>
      </div>
      <div className="hidden h-12 items-center justify-between border-t border-border px-[18px] font-mono text-[9px] tracking-[0.08em] text-muted-foreground xl:flex">
        <span>ASYNC QUEUES</span><span>CONCURRENT AGENTS</span><span>RETRY SAFE</span>
      </div>
      <figcaption className="sr-only">
        BrandArc pipeline: founder input moves through strategy, palette, and typography agents before producing logo directions and a complete brand kit.
      </figcaption>
    </figure>
  )
}

function EverflexDiagram() {
  return (
    <figure className="flex flex-col overflow-hidden rounded-lg bg-surface xl:min-h-[430px] xl:rounded-none xl:border xl:border-border">
      <div className="hidden h-[52px] items-center justify-between border-b border-border px-[18px] font-mono text-[10px] xl:flex">
        <span className="tracking-[0.1em] text-muted-foreground">PATIENT LIST ENDPOINT / PROFILE</span>
        <span className="text-laravel">−45%</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[22px] p-[18px] xl:gap-10 xl:p-[42px]">
        <div>
          <div className="mb-2 flex justify-between font-mono text-[9px] text-muted-foreground xl:mb-3 xl:text-[11px]">
            <span>BEFORE</span><span>800ms</span>
          </div>
          <div className="h-3 w-full bg-zinc-700 xl:h-7">
            <div className="h-full w-full bg-zinc-600" />
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between font-mono text-[9px] xl:mb-3 xl:text-[11px]">
            <span>AFTER</span><span className="text-laravel xl:text-foreground">440ms</span>
          </div>
          <div className="h-3 w-full bg-zinc-700 xl:h-7">
            <div className="h-full w-[55%] bg-laravel" />
          </div>
        </div>
        <p className="hidden text-[13px] leading-[21px] text-muted-foreground xl:block">
          Eager loading + composite indexes + Redis cache
        </p>
        <div className="flex justify-between border-t border-border pt-3.5 font-mono text-[9px] text-muted-foreground xl:hidden">
          <span>45% FASTER</span><span>95% COVERAGE</span>
        </div>
      </div>
      <div className="hidden h-12 items-center justify-between border-t border-border px-[18px] font-mono text-[9px] tracking-[0.08em] text-muted-foreground xl:flex">
        <span>3,000+ PATIENTS</span><span>95% COVERAGE</span><span>SQS FAN-OUT</span>
      </div>
      <figcaption className="sr-only">
        Everflex patient list response time improved from 800 milliseconds before optimization to 440 milliseconds after optimization, a 45 percent speedup.
      </figcaption>
    </figure>
  )
}

function ProjectStory({
  study,
  index,
}: {
  study: CaseStudyMetadata
  index: number
}) {
  const slug = study.slug as SelectedCaseStudySlug
  const detail = selectedCaseStudyDetails[slug]
  const isBrandArc = slug === 'brandarc'

  if (!detail) return null

  return (
    <article className={`grid gap-5 border-t border-border pt-7 first:border-t-0 first:pt-0 xl:items-center xl:gap-16 xl:border-t-0 xl:pt-0 ${isBrandArc ? 'xl:grid-cols-[minmax(0,680px)_minmax(0,420px)]' : 'xl:grid-cols-[minmax(0,420px)_minmax(0,680px)]'}`}>
      <div className={`order-2 ${isBrandArc ? 'xl:order-1' : 'xl:order-2'}`}>
        {isBrandArc ? <BrandArcDiagram /> : <EverflexDiagram />}
      </div>
      <div className={`order-1 ${isBrandArc ? 'xl:order-2' : 'xl:order-1'}`}>
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em]">
          <span className="text-laravel">{String(index + 1).padStart(2, '0')} / {study.title}</span>
          <span className="text-muted-foreground xl:hidden">{detail.eyebrow}</span>
        </div>
        <p className="mt-[18px] hidden font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-laravel xl:block">
          Project {String(index + 1).padStart(2, '0')} / {detail.eyebrow}
        </p>
        <Link
          href={`/case-studies/${study.slug}`}
          className="group mt-3 block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring xl:mt-0"
        >
          <h3 className="font-display text-[28px] font-semibold leading-8 tracking-[-0.03em] group-hover:text-laravel xl:mt-[18px] xl:text-[36px] xl:leading-10">
            <span className="hidden xl:inline">{study.title}</span>
            <span className="xl:hidden">{detail.headline}</span>
          </h3>
        </Link>
        <p className="mt-3 text-sm leading-[22px] text-muted-foreground xl:mt-[18px] xl:text-base xl:leading-[26px]">
          <span className="xl:hidden">{detail.summary}</span>
          <span className="hidden xl:inline">{study.tagline}</span>
        </p>
        <div className="mt-[26px] hidden border-l-2 border-laravel pl-[18px] xl:block">
          <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">KEY DECISION</p>
          <p className="mt-2 text-sm leading-[22px]">{detail.decision}</p>
        </div>
        <div className="mt-[30px] hidden items-end justify-start gap-8 xl:flex">
          <div className="flex flex-wrap gap-x-6 gap-y-3 xl:gap-8">
            {study.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label}>
                <p className="font-mono text-[10px] text-muted-foreground xl:font-display xl:text-2xl xl:font-semibold xl:text-foreground">
                  {metric.value}
                </p>
                <p className="hidden font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground xl:block">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
        <Link
          href={`/case-studies/${study.slug}`}
          className="mt-8 hidden py-2 text-sm font-semibold transition-colors hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring xl:inline-flex"
        >
          Read engineering case study <span className="ml-1" aria-hidden="true">→</span><span className="sr-only">: {study.title}</span>
        </Link>
      </div>
      <div className="order-3 flex items-center justify-between gap-4 xl:hidden">
        <p className="font-mono text-[10px] uppercase leading-[14px] text-muted-foreground">
          {isBrandArc
            ? study.metrics.find((metric) => metric.label === 'Tests')?.value
            : study.techStack.slice(0, 3).join(' · ')}
        </p>
        <Link
          href={`/case-studies/${study.slug}`}
          className="inline-flex min-h-11 shrink-0 items-center text-[13px] font-semibold transition-colors hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Read ↗<span className="sr-only"> {study.title}</span>
        </Link>
      </div>
    </article>
  )
}

export function SelectedSystems({ studies }: SelectedSystemsProps) {
  return (
    <section className="site-container border-b border-border py-[72px] xl:py-[120px]">
      <SectionHeading
        index="01"
        mobileLabel="SELECTED SYSTEMS"
        title="Selected systems"
        mobileTitle="Proof from production."
        description="Two systems that show how I approach product constraints, architecture, and measurable outcomes."
      />
      <div className="mt-9 flex flex-col gap-12 xl:mt-16 xl:gap-28">
        {studies.map((study, index) => (
          <ProjectStory key={study.slug} study={study} index={index} />
        ))}
      </div>
    </section>
  )
}
