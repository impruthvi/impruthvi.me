import Link from 'next/link'
import { ExternalLink, GitPullRequest, Package } from 'lucide-react'
import { openSourceData } from '@/lib/open-source-data'

export function OpenSourceSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <h2 className="font-mono text-2xl font-bold tracking-tight">
        Open Source
      </h2>
      <p className="mt-2 text-muted-foreground">
        Packages I maintain and contributions to the Laravel ecosystem.
      </p>

      <div className="mt-8 space-y-4">
        {openSourceData.map((item) => (
          <div
            key={item.name}
            className="group rounded-lg border border-border/50 bg-muted/30 p-5 transition-colors hover:border-border hover:bg-muted/50"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {item.type === 'package' ? (
                    <Package className="h-4 w-4 text-laravel" />
                  ) : (
                    <GitPullRequest className="h-4 w-4 text-laravel" />
                  )}
                  <h3 className="font-mono text-sm font-semibold">
                    {item.name}
                  </h3>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                {item.badge && (
                  <span className="rounded-full bg-laravel/10 px-3 py-1 text-xs font-medium text-laravel">
                    {item.badge}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.prUrl ? 'View PR' : 'GitHub'}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  {item.docsUrl && (
                    <Link
                      href={item.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Docs
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
