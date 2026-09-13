"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Chip } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  // Body scroll lock while the overlay owns the screen.
  useEffect(() => {
    if (!open) {
      dialog.current?.close();
      return;
    }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    function onResize() {
      if (desktop.matches) setOpen(false);
    }
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex min-h-11 w-11 flex-col items-end justify-center gap-1.5"
      >
        <span className="bg-ink h-px w-6" />
        <span className="bg-ink h-px w-3.5" />
      </button>

      <dialog
        ref={dialog}
        id="mobile-menu"
        aria-label="Main menu"
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        className="bg-band text-on-band fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto border-0 p-0 open:flex open:flex-col backdrop:bg-band"
      >
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
            className="text-on-band flex size-11 items-center justify-end"
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

        <nav aria-label="Main navigation" className="flex flex-col px-6 pt-6">
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
          <div className="border-seam-on-band flex flex-wrap items-center gap-6 border-t pt-5">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="label text-label-on-band"
              >
                {social.label}
              </a>
            ))}
            <ThemeToggle className="text-label-on-band hover:text-on-band" />
          </div>
        </div>
      </dialog>
    </div>
  );
}
