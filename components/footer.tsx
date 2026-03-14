import Link from 'next/link'
import { Github, Linkedin, Twitter, Rss } from 'lucide-react'
import { SITE } from '@/lib/constants'

const socialLinks = [
  { href: SITE.social.github, icon: Github, label: 'GitHub' },
  { href: SITE.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: SITE.social.twitter, icon: Twitter, label: 'X (Twitter)' },
  { href: '/rss.xml', icon: Rss, label: 'RSS Feed' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 text-sm text-muted-foreground">
        <span>{SITE.location}</span>

        <span>&copy; {new Date().getFullYear()} {SITE.name}</span>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-laravel"
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
