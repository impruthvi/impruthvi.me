"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui";

export function ArticleToc({ headings }: { headings: { text: string; id: string }[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    let frame: number | undefined;

    function update() {
      frame = undefined;
      // Keep long sections active after their heading leaves the viewport.
      // The reading line is below the headings' scroll-margin for anchor jumps.
      const readingLine = 128;
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > readingLine) break;
        current = section.id;
      }
      setActiveId(current);
    }

    function scheduleUpdate() {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    // Recalculate after fonts, images or code-block feedback change the layout.
    const observer = new ResizeObserver(scheduleUpdate);
    const article = sections[0]?.closest("article");
    if (article) observer.observe(article);

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      observer.disconnect();
    };
  }, [headings]);

  useEffect(() => {
    const nav = navigation.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !active || !window.matchMedia("(min-width: 1024px)").matches) return;

    // Scroll only the sidebar when a long contents list hides its active item.
    const bounds = nav.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    if (item.top < bounds.top) nav.scrollTop += item.top - bounds.top;
    else if (item.bottom > bounds.bottom) nav.scrollTop += item.bottom - bounds.bottom;
  }, [activeId]);

  return (
    <nav
      ref={navigation}
      aria-label="On this page"
      className="flex flex-col gap-3.5 lg:sticky lg:top-12 lg:max-h-[calc(100dvh-6rem)] lg:w-[14.5rem] lg:shrink-0 lg:overflow-y-auto"
    >
      <Label>On this page</Label>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          aria-current={activeId === heading.id ? "location" : undefined}
          className={`border-l-2 py-1 pl-3 text-[0.9375rem] leading-6 font-medium transition-colors ${
            activeId === heading.id
              ? "border-accent text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
