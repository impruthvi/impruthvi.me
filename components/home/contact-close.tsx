import Link from 'next/link'
import { SITE } from '@/lib/constants'

export function ContactClose() {
  return (
    <section className="site-container relative border-b border-border py-[72px] xl:flex xl:items-end xl:justify-between xl:py-[120px]">
      <span className="absolute left-0 top-0 h-1 w-[120px] bg-laravel" aria-hidden="true" />
      <div className="xl:w-[760px] xl:shrink-0">
        <p className="font-mono text-[10px] font-semibold tracking-[0.1em] text-laravel xl:text-[11px]">
          <span className="xl:hidden">NEXT SYSTEM</span>
          <span className="hidden xl:inline">05 / START A CONVERSATION</span>
        </p>
        <h2 className="mt-3.5 font-display text-4xl font-semibold leading-[39px] tracking-[-0.04em] xl:mt-[22px] xl:text-6xl xl:leading-[64px] xl:tracking-[-0.045em]">
          <span className="xl:hidden">Have a backend problem worth untangling?</span>
          <span className="hidden xl:inline">Have a difficult Laravel problem?</span>
        </h2>
        <p className="mt-3.5 max-w-[630px] text-sm leading-[22px] text-muted-foreground xl:mt-[22px] xl:text-[17px] xl:leading-7">
          <span className="xl:hidden">Tell me the constraint, the current stack, and what should be measurably better.</span>
          <span className="hidden xl:inline">Projects, architecture questions, and thoughtful engineering conversations are always welcome.</span>
        </p>
      </div>

      <div className="mt-7 xl:mt-0 xl:w-[300px] xl:shrink-0">
        <a
          href={`mailto:${SITE.email}`}
          className="flex min-h-[48px] items-center justify-between rounded-sm bg-primary px-4 text-[13px] font-bold text-primary-foreground transition-colors hover:bg-laravel hover:text-brand-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring xl:hidden"
        >
          {SITE.email}<span className="ml-2 text-laravel" aria-hidden="true">↗</span>
        </a>
        <Link
          href="/contact"
          className="hidden min-h-[52px] items-center rounded-sm bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-laravel hover:text-brand-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring xl:inline-flex"
        >
          Start a conversation <span className="ml-1" aria-hidden="true">→</span>
        </Link>
        <p className="mt-[18px] font-mono text-[9px] leading-[14px] tracking-[0.08em] text-muted-foreground xl:text-[10px] xl:leading-4">
          <span className="xl:hidden">TYPICAL REPLY · WITHIN 24 HOURS</span>
          <span className="hidden xl:inline">AHMEDABAD · REMOTE<br />TYPICAL REPLY WITHIN 24 HOURS</span>
        </p>
      </div>
    </section>
  )
}
