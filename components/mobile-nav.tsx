'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-foreground"
        onClick={handleOpen}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          >
            <Button
              autoFocus
              variant="ghost"
              size="icon"
              className="absolute right-6 top-4 h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>

            <nav
              id="mobile-nav-menu"
              aria-label="Main navigation"
              className="flex flex-col items-center gap-8"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  className={cn(
                    'font-mono text-2xl transition-colors hover:text-laravel',
                    pathname === link.href
                      ? 'text-laravel'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>,
          document.body
        )}
    </>
  )
}
