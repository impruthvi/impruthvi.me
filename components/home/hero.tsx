import Link from 'next/link'
import { HERO_METRICS, OPEN_SOURCE_SIGNAL, SITE } from '@/lib/constants'

export function HomeHero() {
  return (
    <section className="site-container border-b border-border pb-0 pt-16 xl:pb-16 xl:pt-24">
      <div className="flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between xl:gap-[72px]">
        <div className="xl:w-[700px] xl:shrink-0">
          <div className="flex items-center gap-2.5 font-mono text-[10px] font-medium tracking-[0.08em] text-muted-foreground xl:block xl:text-xs xl:font-semibold xl:text-laravel">
            <span className="size-[7px] rounded-full bg-laravel xl:hidden" aria-hidden="true" />
            <span className="xl:hidden">{SITE.availability.toUpperCase()}</span>
            <span className="hidden xl:inline">LARAVEL + NODE.JS ENGINEER</span>
          </div>

          <h1 className="mt-5 max-w-[680px] font-display text-[44px] font-semibold leading-[46px] tracking-[-0.04em] xl:mt-6 xl:text-[68px] xl:leading-[70px] xl:tracking-[-0.045em]">
            <span className="hidden xl:inline">I build </span>
            Backend systems that stay fast as products grow.
          </h1>

          <p className="mt-5 max-w-[610px] text-base leading-[25px] text-muted-foreground xl:mt-7 xl:text-lg xl:leading-[30px]">
            <span className="xl:hidden">
              I build Laravel and Node.js systems for production: performance,
              queues, payments, testing, and the infrastructure behind reliable
              products.
            </span>
            <span className="hidden xl:inline">
              Five years shipping production Laravel systems across healthcare,
              SaaS, and commerce. Measurable performance, reliability, and
              revenue impact.
            </span>
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5 xl:mt-[34px] xl:gap-3.5">
            <Link
              href="/case-studies"
              className="inline-flex min-h-12 items-center rounded-sm bg-laravel px-4 text-[13px] font-bold text-brand-foreground transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring xl:bg-primary xl:px-[22px] xl:text-sm xl:text-primary-foreground"
            >
              <span className="xl:hidden">View my work</span>
              <span className="hidden xl:inline">View selected work</span>
              <span className="ml-2" aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-sm border border-border px-4 text-[13px] font-semibold transition-colors hover:border-laravel hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring xl:hidden"
            >
              Contact
            </Link>
            <Link
              href="/resume"
              className="hidden min-h-12 items-center rounded-sm border border-border px-[22px] text-sm font-medium transition-colors hover:border-laravel hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring xl:inline-flex"
            >
              Resume
            </Link>
          </div>

          <Link
            href="#open-source"
            className="mt-7 flex items-center justify-between rounded-lg bg-surface p-4 transition-colors hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring xl:hidden"
          >
            <span>
              <span className="block font-mono text-[9px] tracking-[0.07em] text-laravel">
                OPEN SOURCE SIGNAL
              </span>
              <span className="mt-1 block text-[13px] font-semibold text-foreground">
                {OPEN_SOURCE_SIGNAL.value} {OPEN_SOURCE_SIGNAL.label}
              </span>
            </span>
            <span className="text-lg" aria-hidden="true">↗</span>
          </Link>
        </div>

        <aside className="relative hidden min-h-[390px] w-[360px] shrink-0 flex-col justify-between overflow-hidden border border-border bg-surface p-7 xl:flex">
          <span className="absolute -right-14 -top-14 size-[190px] rounded-full border border-[#3a3a3f]" aria-hidden="true" />
          <span className="absolute -right-4 -top-4 size-[108px] rounded-full border border-laravel opacity-75" aria-hidden="true" />
          <p className="relative font-mono text-[11px] font-semibold leading-4 tracking-[0.1em] text-muted-foreground">
            STRONGEST SIGNAL / 01
          </p>
          <div className="relative pt-20">
            <p className="font-display text-[74px] font-semibold leading-[74px] tracking-[-0.05em]">{OPEN_SOURCE_SIGNAL.value}</p>
            <p className="mt-2.5 font-mono text-sm font-semibold leading-[22px] text-laravel">LARAVEL ORG PRs</p>
          </div>
          <p className="relative pt-12 text-sm leading-[22px] text-muted-foreground">
            {OPEN_SOURCE_SIGNAL.description}
          </p>
        </aside>
      </div>

      <div className="mt-12 grid grid-cols-2 border-y border-border xl:mt-16 xl:grid-cols-4">
        {HERO_METRICS.map((metric, index) => (
          <div
            key={metric.label}
            className={`bg-surface py-6 ${index % 2 === 0 ? 'pr-5' : 'pl-5'} ${index < 2 ? 'border-b border-border xl:border-b-0' : ''} ${index !== HERO_METRICS.length - 1 ? 'xl:border-r xl:border-border' : ''} xl:px-6 xl:py-5`}
          >
            <p className={`font-mono text-[28px] font-semibold leading-8 tracking-[-0.03em] ${index === 0 ? 'text-laravel xl:text-foreground' : ''}`}>
              {metric.mobileValue ? (
                <>
                  <span className="xl:hidden">{metric.mobileValue}</span>
                  <span className="hidden xl:inline">{metric.value}</span>
                </>
              ) : metric.value}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground xl:font-mono xl:text-[10px] xl:font-semibold xl:uppercase xl:tracking-[0.1em] xl:text-laravel">
              {metric.mobileLabel ? (
                <>
                  <span className="xl:hidden">{metric.mobileLabel}</span>
                  <span className="hidden xl:inline">{metric.label}</span>
                </>
              ) : metric.label}
            </p>
            <p className="mt-1 hidden text-xs leading-[18px] text-muted-foreground xl:block">
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
