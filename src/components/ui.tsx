import type { ComponentProps, ReactNode } from "react";

/** Page gutter. Every full-bleed section wraps its content in this. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 lg:px-24 ${className}`}>
      {children}
    </div>
  );
}

/** Mono, uppercase, wide-tracked. The metadata voice of the whole site. */
export function Label({
  as: Tag = "span",
  tone = "muted",
  className = "",
  children,
}: {
  as?: "span" | "h2" | "p";
  tone?: "muted" | "ink" | "on-band";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    muted: "text-muted",
    ink: "text-ink",
    "on-band": "text-label-on-band",
  } as const;
  return <Tag className={`label ${tones[tone]} ${className}`}>{children}</Tag>;
}

/**
 * Section head: a label on the left, an aside on the right, a rule underneath.
 * The rule is full-weight ink because it opens a section — row separators use
 * `border-rule` instead.
 */
export function SectionHeader({
  label,
  aside,
  className = "",
}: {
  label: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-ink flex items-end justify-between gap-6 border-b pb-4 ${className}`}
    >
      <Label tone="ink">{label}</Label>
      {aside ? <Label>{aside}</Label> : null}
    </div>
  );
}

/** Full-bleed feature band. Inverts in light mode, lifts in dark. */
export function Band({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`bg-band text-on-band ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** The availability pill — one of the few places accent is allowed. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="bg-accent text-on-accent label inline-flex items-center gap-2.5 rounded-full py-2 pr-3.5 pl-3">
      <span className="bg-on-accent size-1.5 shrink-0 rounded-full" aria-hidden />
      {children}
    </span>
  );
}

export function ArrowUpRight({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={className}
      strokeWidth={1.6}
      strokeLinecap="square"
      stroke="currentColor"
    >
      <path d="M5 15L15 5M15 5H7M15 5V13" />
    </svg>
  );
}

export function ArrowLeft({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
      strokeWidth={1.6}
      strokeLinecap="square"
      stroke="currentColor"
    >
      <path d="M10 3L5 8L10 13" />
    </svg>
  );
}

/**
 * Underline that sweeps in on hover. Used for every inline text link so the
 * hover language stays identical sitewide.
 */
export function SweepLink({
  className = "",
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={`from-ink to-ink bg-gradient-to-r bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 hover:bg-[length:100%_1px] ${className}`}
    >
      {children}
    </a>
  );
}
