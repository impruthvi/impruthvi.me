import { Hero } from '@/components/hero'
import { OpenSourceSection } from '@/components/open-source-section'
import { CaseStudyCard } from '@/components/case-study-card'
import { Experience } from '@/components/experience'
import { Skills } from '@/components/skills'
import { FeaturedPosts } from '@/components/featured-posts'
import { Education } from '@/components/education'
import { CtaBanner } from '@/components/cta-banner'
import { getCaseStudies } from '@/actions/case-studies'
import { getPersonSchema, getWebSiteSchema } from '@/lib/structured-data'

export default async function Home() {
  const caseStudies = await getCaseStudies()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([getPersonSchema(), getWebSiteSchema()]),
        }}
      />
      <Hero />
      <OpenSourceSection />

      {/* Case Studies */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2 className="font-mono text-2xl font-bold tracking-tight">
          What I&apos;ve Built
        </h2>
        <p className="mt-2 text-muted-foreground">
          Production applications with real users and measurable impact.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <Experience />
      <Skills />
      <FeaturedPosts />
      <Education />
      <CtaBanner />
    </>
  )
}
