'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { PostMetadata } from '@/actions/posts'

interface PostsWithSearchProps {
  posts: PostMetadata[]
}

export function PostsWithSearch({ posts }: PostsWithSearchProps) {
  const [query, setQuery] = useState('')

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.summary.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div>
        <label
          htmlFor="post-search"
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
        >
          Search field notes
        </label>
        <div className="relative mt-2">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="post-search"
            type="search"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="field-control h-[50px] pl-10 pr-4"
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No posts found.
          </p>
        ) : (
          filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group flex flex-col gap-1 rounded-none border border-border bg-surface p-5 transition-colors hover:border-laravel sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div className="flex-1">
                <h2 className="font-display text-sm font-semibold tracking-tight transition-colors group-hover:text-laravel">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {post.summary}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground sm:ml-4">
                {formatDate(post.publishedAt)}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
