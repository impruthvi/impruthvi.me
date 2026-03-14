import type { MetadataRoute } from 'next'
import { getCaseStudies } from '@/actions/case-studies'
import { getPosts } from '@/actions/posts'
import { SITE } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getCaseStudies()
  const posts = await getPosts()

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${SITE.url}/case-studies/${study.slug}`,
    lastModified: new Date(study.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postRoutes = posts.map((post) => ({
    url: `${SITE.url}/posts/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE.url}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...caseStudyRoutes,
    ...postRoutes,
  ]
}
