import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { SITE, HERO_METRICS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/metric-card'

export function Hero() {
  return (
    <section className="site-section">
      <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16">
        {/* Photo */}
        <div className="shrink-0">
          <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full border-2 border-border">
            <Image
              src="/images/authors/impruthvi.jpg"
              alt={`${SITE.name}, profile photo`}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {SITE.name}
          </h1>
          <p className="mt-1 text-lg text-laravel">Laravel & Node.js Engineer</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1 text-xs text-muted-foreground">
            {SITE.location} · Remote
          </span>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Shipped a healthcare SaaS to 3,000+ patients, reduced API response
            times by 45%, and had a PR merged by Taylor Otwell into the Laravel
            framework.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button nativeButton={false} render={<Link href="/resume" />}>
              View Resume <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button nativeButton={false} variant="outline" render={<Link href="/contact" />}>
              Let&apos;s Talk
            </Button>
            <div className="flex items-center gap-2 ml-2">
              <Link
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <span className="absolute -inset-3" aria-hidden="true" />
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <span className="absolute -inset-3" aria-hidden="true" />
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={SITE.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-muted-foreground transition-colors hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <span className="absolute -inset-3" aria-hidden="true" />
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {HERO_METRICS.map((metric) => (
          <MetricCard
            key={metric.label}
            value={metric.value}
            label={metric.label}
            subtext={metric.subtext}
          />
        ))}
      </div>
    </section>
  )
}
