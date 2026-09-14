"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function SiteNavLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return site.nav.map((item) => {
    const active = item.href === "/"
      ? pathname === "/" || pathname.startsWith("/work/")
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        aria-current={active ? (pathname === item.href ? "page" : "location") : undefined}
        className={mobile
          ? `border-seam-on-band text-on-band font-display border-b py-5 text-[2.75rem] leading-none font-black tracking-[-0.035em] uppercase ${
              active ? "decoration-accent underline decoration-[3px] underline-offset-8" : ""
            }`
          : `label flex min-h-11 items-center border-b-2 transition-colors ${
              active ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"
            }`
        }
      >
        {item.label}
      </Link>
    );
  });
}
