import Link from "next/link";
import { Container } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { SiteNavLinks } from "@/components/site-nav-links";

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

        <nav aria-label="Main navigation" className="hidden items-center gap-10 md:flex">
          <SiteNavLinks />
          <ThemeToggle />
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
