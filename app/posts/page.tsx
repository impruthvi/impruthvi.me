import type { Metadata } from 'next'
import { getPosts } from '@/actions/posts'
import { PostsWithSearch } from '@/components/posts-with-search'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Writing about Laravel, backend architecture, performance optimization, and developer tools.',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <h1 className="font-mono text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Writing about Laravel, backend architecture, and developer tools.
      </p>
      <div className="mt-8">
        <PostsWithSearch posts={posts} />
      </div>
    </section>
  )
}
