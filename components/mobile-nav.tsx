'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const lastFocusRef = useRef<HTMLElement | null>(null)

  const handleOpen = () => {
    lastFocusRef.current = document.activeElement as HTMLElement
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    requestAnimationFrame(() => lastFocusRef.current?.focus())
  }

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        requestAnimationFrame(() => lastFocusRef.current?.focus())
        return
      }
      if (e.key === 'Tab') {
        const overlay = overlayRef.current
        if (!overlay) return
        const focusable = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-11 w-11 flex-col gap-1.5 rounded-md border-border bg-transparent p-0 text-foreground hover:bg-muted"
        onClick={handleOpen}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
      >
        <span className="h-px w-4 bg-current" aria-hidden="true" />
        <span className="h-px w-4 bg-current" aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </Button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={overlayRef}
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto overscroll-contain bg-background"
          >
            <div className="site-container flex h-[79px] shrink-0 items-center justify-between border-b border-border">
              <span className="flex items-center gap-2.5 font-mono text-xs font-semibold">
                <span className="size-[9px] bg-laravel" aria-hidden="true" />
                IMPRUTHVI
              </span>
              <Button
                autoFocus
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-md border-border bg-transparent"
                onClick={handleClose}
              >
                <X className="size-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav
              aria-label="Main navigation"
              className="site-container flex flex-1 flex-col justify-center"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={cn(
                    'flex min-h-16 items-center justify-between border-b border-border font-display text-3xl font-semibold tracking-tight transition-colors first:border-t hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                    pathname === link.href
                      ? 'text-laravel'
                      : 'text-muted-foreground'
                  )}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-sm" aria-hidden="true">
                    {pathname === link.href ? '●' : '→'}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="site-container flex items-center justify-between border-t border-border py-6">
              <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                APPEARANCE
              </span>
              <ThemeToggle />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
