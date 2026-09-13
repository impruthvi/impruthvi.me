"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Chip } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Body scroll lock while the overlay owns the screen.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex w-6 flex-col items-end gap-1.5 py-2"
      >
        <span className="bg-ink h-px w-6" />
        <span className="bg-ink h-px w-3.5" />
      </button>

      {open ? (
        <div className="bg-band fixed inset-0 z-50 flex flex-col">
          <div className="border-seam-on-band flex items-center justify-between border-b px-6 py-5">
            <span className="flex items-center gap-2.5">
              <span className="bg-accent size-2 shrink-0 rounded-full" aria-hidden />
              <span className="text-on-band font-mono text-sm font-medium">
                impruthvi.me
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-on-band"
            >
              <svg
                viewBox="0 0 18 18"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="square"
                aria-hidden
              >
                <path d="M3 3L15 15M15 3L3 15" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-6 pt-10">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-seam-on-band text-on-band font-display border-b py-5 text-[2.75rem] leading-none font-black tracking-[-0.035em] uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-6 px-6 pt-10 pb-9">
            <Chip>{site.availability}</Chip>
            <a
              href={`mailto:${site.email}`}
              className="text-on-band text-lg font-medium tracking-[-0.02em]"
            >
              {site.email}
            </a>
            <div className="border-seam-on-band flex items-center gap-6 border-t pt-5">
              {site.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  className="label text-label-on-band"
                >
                  {social.label}
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
