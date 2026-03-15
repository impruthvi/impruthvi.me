import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug, getPosts } from '@/actions/posts'
import { MDXContent } from '@/components/mdx-content'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CtaBanner } from '@/components/cta-banner'
import { getArticleSchema } from '@/lib/structured-data'
import { SITE } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      title: `${post.metadata.title} — ${SITE.name}`,
      description: post.metadata.summary,
      type: 'article',
      publishedTime: post.metadata.publishedAt,
      ...(post.metadata.image && { images: [post.metadata.image] }),
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const { metadata, content } = post

  const articleSchema = getArticleSchema({
    title: metadata.title,
    description: metadata.summary,
    url: `${SITE.url}/posts/${slug}`,
    publishedAt: metadata.publishedAt,
    image: metadata.image,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/posts' },
            { label: metadata.title },
          ]}
        />

        <header className="mt-8">
          <h1 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
            {metadata.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{metadata.summary}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{metadata.author}</span>
            <span>&middot;</span>
            <time dateTime={metadata.publishedAt}>
              {formatDate(metadata.publishedAt)}
            </time>
          </div>
        </header>

        <div className="mt-12">
          <MDXContent source={content} />
        </div>

        <div className="mt-12 border-t border-border/50 pt-8">
          <Button variant="ghost" render={<Link href="/posts" />}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </article>

      <CtaBanner />
    </>
  )
}
