import Link from 'next/link'
import type { PostMetadata } from '@/actions/posts'
import { SectionHeading } from '@/components/home/section-heading'

interface HomeWritingProps {
  posts: PostMetadata[]
}

function formatMonthYear(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(new Date(date))
    .toUpperCase()
}

export function HomeWriting({ posts }: HomeWritingProps) {
  return (
    <section className="site-container border-b border-border py-[72px] xl:py-28">
      <SectionHeading
        index="04"
        mobileLabel="FIELD NOTES"
        title="Field notes"
        mobileTitle="Writing from the work."
        action={
          <Link
            href="/posts"
            className="inline-flex min-h-11 items-center text-sm font-semibold transition-colors hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span className="xl:hidden">All notes ↗</span>
            <span className="hidden xl:inline">Browse all writing →</span>
          </Link>
        }
      />

      <div className="mt-7 border-t border-border xl:mt-14">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group flex min-h-[104px] flex-col justify-center gap-2.5 border-b border-border py-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring xl:flex-row xl:items-center xl:gap-0 xl:py-0"
          >
            <div className="flex items-center justify-between xl:contents">
              <span className="font-mono text-[9px] tracking-[0.08em] text-laravel xl:w-[120px] xl:shrink-0 xl:text-[10px] xl:text-muted-foreground">
                {formatMonthYear(post.publishedAt)}
              </span>
              <span className="font-mono text-[9px] tracking-[0.08em] text-muted-foreground xl:w-[160px] xl:shrink-0 xl:text-[10px] xl:text-laravel">
                FIELD NOTE
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold leading-[25px] tracking-[-0.02em] transition-colors group-hover:text-laravel xl:flex-1 xl:text-[23px] xl:font-medium xl:leading-[30px]">
              {post.title}
            </h3>
            <span className="hidden w-11 shrink-0 text-right text-lg xl:block" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
