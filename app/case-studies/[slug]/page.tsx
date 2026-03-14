import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getCaseStudyBySlug, getCaseStudies } from '@/actions/case-studies'
import { MDXContent } from '@/components/mdx-content'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CtaBanner } from '@/components/cta-banner'
import { getArticleSchema } from '@/lib/structured-data'
import { SITE } from '@/lib/constants'
import { Button } from '@/components/ui/button'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const studies = await getCaseStudies()
  return studies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) return {}

  return {
    title: study.metadata.title,
    description: study.metadata.tagline,
    openGraph: {
      title: `${study.metadata.title} — ${SITE.name}`,
      description: study.metadata.tagline,
      type: 'article',
      publishedTime: study.metadata.publishedAt,
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) notFound()

  const { metadata, content } = study

  const articleSchema = getArticleSchema({
    title: metadata.title,
    description: metadata.tagline,
    url: `${SITE.url}/case-studies/${slug}`,
    publishedAt: metadata.publishedAt,
    keywords: metadata.techStack,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Breadcrumbs
          items={[
            { label: 'Case Studies', href: '/case-studies' },
            { label: metadata.title },
          ]}
        />

        {/* Header */}
        <div className="mt-8">
          <span className="text-xs font-medium uppercase tracking-wider text-laravel">
            {metadata.category} &middot; {metadata.role}
          </span>
          <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
            {metadata.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {metadata.tagline}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {metadata.period}
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metadata.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-border/50 bg-muted/50 px-4 py-3"
            >
              <p className="font-mono text-xl font-bold text-laravel">
                {metric.value}
              </p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {metadata.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* MDX Content */}
        <div className="mt-12">
          <MDXContent source={content} />
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between border-t border-border/50 pt-8">
          <Button variant="ghost" render={<Link href="/case-studies" />}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Case Studies
          </Button>
          <Button render={<Link href="/contact" />}>
            Contact Me <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </article>

      <CtaBanner />
    </>
  )
}
