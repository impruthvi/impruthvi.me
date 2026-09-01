import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CaseStudyMetadata } from '@/actions/case-studies'

interface CaseStudyCardProps {
  study: CaseStudyMetadata
  featured?: boolean
}

export function CaseStudyCard({ study, featured = false }: CaseStudyCardProps) {
  if (featured) {
    return (
      <Link
        href={`/case-studies/${study.slug}`}
        className="group rounded-lg border border-border/50 bg-muted/30 p-6 transition-all hover:border-border hover:bg-muted/50 hover:shadow-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-laravel">
            {study.category}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">{study.period}</span>
        </div>
        <h3 className="mt-2 font-mono text-xl font-bold tracking-tight">
          {study.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{study.tagline}</p>

        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono text-base font-semibold text-foreground">
                {metric.value}
              </p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-laravel">
            Read Case Study <ArrowRight className="h-3.5 w-3.5" />
          </p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group rounded-lg border border-border/50 bg-muted/30 p-6 transition-all hover:border-border hover:bg-muted/50 hover:shadow-sm"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-laravel">
        {study.category}
      </span>
      <h3 className="mt-2 font-mono text-lg font-semibold tracking-tight">
        {study.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{study.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        {study.metrics.slice(0, 3).map((metric) => (
          <p key={metric.label} className="text-xs text-muted-foreground">
            <span className="font-mono font-semibold text-foreground">
              {metric.value}
            </span>{' '}
            {metric.label}
          </p>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {study.techStack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-laravel">
        Read Case Study <ArrowRight className="h-3.5 w-3.5" />
      </p>
    </Link>
  )
}
