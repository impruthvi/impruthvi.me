import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CaseStudyMetadata } from '@/actions/case-studies'

interface CaseStudyCardProps {
  study: CaseStudyMetadata
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
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

      {/* Metrics */}
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

      {/* Tech stack */}
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
