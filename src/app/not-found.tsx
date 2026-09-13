import Link from "next/link";
import { Container, Label } from "@/components/ui";

const links = [
  { label: "Back home", href: "/", current: true },
  { label: "Selected work", href: "/" },
  { label: "Field notes", href: "/notes" },
];

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-16">
      <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2">
        <span className="font-display text-[clamp(5rem,18vw,12.5rem)] leading-[0.9] font-black tracking-[-0.05em]">
          404
        </span>
        <span className="font-serif text-muted text-[clamp(2.25rem,7vw,4.5rem)] leading-none italic">
          not found
        </span>
      </div>

      <div className="border-ink mt-10 flex flex-col justify-between gap-8 border-t pt-6 lg:flex-row lg:gap-20">
        <p className="text-prose max-w-[32.5rem] text-xl leading-8">
          This URL doesn&rsquo;t resolve to anything. Either I moved it, or you
          typed it from memory. Both are recoverable.
        </p>
        <div className="flex flex-wrap items-center gap-9 lg:pt-1.5">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`label transition-colors ${
                link.current
                  ? "border-ink text-ink border-b pb-1.5"
                  : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
