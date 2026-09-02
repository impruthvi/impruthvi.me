import { HomeHero } from '@/components/home/hero'
import { SelectedSystems } from '@/components/home/selected-systems'
import { HomeOpenSource } from '@/components/home/open-source'
import { HomeExperience } from '@/components/home/experience'
import { HomeWriting } from '@/components/home/writing'
import { ContactClose } from '@/components/home/contact-close'
import { getCaseStudies } from '@/actions/case-studies'
import { getFeaturedPosts } from '@/actions/posts'
import { selectedCaseStudySlugs } from '@/lib/homepage-data'
import { getPersonSchema, getWebSiteSchema } from '@/lib/structured-data'

export default async function Home() {
  const [caseStudies, posts] = await Promise.all([
    getCaseStudies(),
    getFeaturedPosts(3),
  ])
  const selected = selectedCaseStudySlugs.flatMap((slug) => {
    const study = caseStudies.find((candidate) => candidate.slug === slug)
    return study ? [study] : []
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([getPersonSchema(), getWebSiteSchema()]),
        }}
      />
      <HomeHero />
      <SelectedSystems studies={selected} />
      <HomeOpenSource />
      <HomeExperience />
      <HomeWriting posts={posts} />
      <ContactClose />
    </>
  )
}
