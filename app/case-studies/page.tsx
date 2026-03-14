import type { Metadata } from 'next'
import { getCaseStudies } from '@/actions/case-studies'
import { CaseStudyCard } from '@/components/case-study-card'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Production applications I\'ve built — healthcare SaaS, property platforms, e-commerce systems, and more.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <h1 className="font-mono text-3xl font-bold tracking-tight">
        Case Studies
      </h1>
      <p className="mt-2 text-muted-foreground">
        Production applications with real users and measurable impact.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </section>
  )
}
