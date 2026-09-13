import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="border-rule border-b">
      <Container className="flex items-center justify-between py-5 lg:py-7">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="bg-accent size-2.5 shrink-0 rounded-full" aria-hidden />
          <span className="font-mono text-sm font-medium tracking-[-0.01em]">
            impruthvi.me
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label text-muted hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
