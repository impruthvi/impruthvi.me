import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Twitter, ArrowRight, Download } from 'lucide-react'
import { SITE, HERO_METRICS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/metric-card'

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16">
        {/* Photo */}
        <div className="shrink-0">
          <Image
            src="/images/authors/impruthvi.jpg"
            alt={SITE.name}
            width={200}
            height={200}
            priority
            className="rounded-full border-2 border-border"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
            {SITE.name}
          </h1>
          <p className="mt-1 text-lg text-laravel">Laravel Developer</p>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Laravel developer who shipped a healthcare SaaS to 3,000+ patients,
            reduced API response times by 45%, and had a PR merged by Taylor
            Otwell.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button render={<Link href="/resume" />}>
              View Resume <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" render={<Link href="/contact" />}>
              Let&apos;s Talk
            </Button>
            <div className="flex items-center gap-2 ml-2">
              <Link
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={SITE.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="X (Twitter)"
              >
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
