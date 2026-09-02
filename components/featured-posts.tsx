import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedPosts } from '@/actions/posts'
import { formatDate } from '@/lib/utils'

export async function FeaturedPosts() {
  const posts = await getFeaturedPosts(3)

  if (posts.length === 0) return null

  return (
    <section className="site-section">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Writing
          </h2>
          <p className="mt-2 text-muted-foreground">
            Laravel, backend architecture, and developer tools.
          </p>
        </div>
        <Link
          href="/posts"
          className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          All Posts <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group flex flex-col gap-1 rounded-none border border-border bg-surface p-5 transition-colors hover:border-laravel sm:flex-row sm:items-baseline sm:justify-between"
          >
            <div className="flex-1">
              <h3 className="font-display text-sm font-semibold tracking-tight transition-colors group-hover:text-foreground">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                {post.summary}
              </p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground sm:ml-4">
              {formatDate(post.publishedAt)}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/posts"
        className="mt-6 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:hidden"
      >
        All Posts <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  )
}
