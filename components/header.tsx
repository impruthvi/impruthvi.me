'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileNav } from '@/components/mobile-nav'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-[79px] w-full border-b border-border bg-background/95 backdrop-blur-md md:h-[88px]">
      <div className="site-container flex h-full items-center justify-between">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2.5 font-mono text-xs font-semibold tracking-[-0.02em] md:gap-3 md:text-sm md:font-bold"
        >
          <span
            className="size-[9px] shrink-0 bg-laravel transition-transform group-hover:rotate-45 motion-reduce:transition-none"
            aria-hidden="true"
          />
          IMPRUTHVI
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Main navigation" className="flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  'relative py-3 text-sm leading-5 transition-colors hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute inset-x-0 bottom-1 h-px bg-laravel"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        <div className="flex items-center md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
