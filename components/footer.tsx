import Link from 'next/link'
import { SITE } from '@/lib/constants'

const socialLinks = [
  { href: SITE.social.github, label: 'GitHub' },
  { href: SITE.social.linkedin, label: 'LinkedIn' },
  { href: SITE.social.twitter, label: 'X' },
  { href: '/', label: 'impruthvi.me', internal: true },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="site-container flex flex-col gap-6 py-8 pb-10 text-xs text-muted-foreground md:h-24 md:flex-row md:items-center md:justify-between md:py-0">
        <div className="flex items-center justify-between md:contents">
          <span className="flex items-center gap-[9px] font-mono text-[11px] font-semibold leading-[14px] text-foreground md:hidden">
            <span className="size-2 bg-laravel" aria-hidden="true" />
            IMPRUTHVI
          </span>
          <span className="font-mono text-[9px] leading-3 md:order-first md:font-sans md:text-xs md:leading-[18px]">
            <span className="md:hidden">&copy; {new Date().getFullYear()}</span>
            <span className="hidden md:inline">
              &copy; {new Date().getFullYear()} {SITE.name}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-5 md:gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              {...(!link.internal && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className="relative inline-flex min-h-11 min-w-11 items-center justify-center leading-4 transition-colors last:text-foreground hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:min-h-0 md:min-w-0 md:py-2 md:leading-[18px]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
