import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/hero'
import { OpenSourceSection } from '@/components/open-source-section'
import { CaseStudyCard } from '@/components/case-study-card'
import { Experience } from '@/components/experience'
import { Skills } from '@/components/skills'
import { FeaturedPosts } from '@/components/featured-posts'
import { CtaBanner } from '@/components/cta-banner'
import { getCaseStudies } from '@/actions/case-studies'
import { getPersonSchema, getWebSiteSchema } from '@/lib/structured-data'

export default async function Home() {
  const caseStudies = await getCaseStudies()
  const featured = caseStudies.filter((s) => s.featured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([getPersonSchema(), getWebSiteSchema()]),
        }}
      />
      <Hero />

      {/* Case Studies */}
      <section className="site-section">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              What I&apos;ve Built
            </h2>
            <p className="mt-2 text-muted-foreground">
              Production applications with real users and measurable impact.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="hidden shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            All {caseStudies.length} projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} featured />
          ))}
        </div>

        <Link
          href="/case-studies"
          className="mt-6 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        >
          All {caseStudies.length} projects <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      <OpenSourceSection />
      <Experience />
      <Skills />
      <FeaturedPosts />
      <CtaBanner />
    </>
  )
}
