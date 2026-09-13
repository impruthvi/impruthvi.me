import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "@/content/notes";
import { ArrowLeft, ArrowUpRight, Container, Label } from "@/components/ui";

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return note ? { title: note.title } : {};
}

/**
 * Shell only. The body becomes MDX in the next step — this proves the reading
 * layout (measure, TOC lane, code block, pull quote) before content lands.
 */
export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();

  const next = notes[(notes.findIndex((n) => n.slug === slug) + 1) % notes.length];

  return (
    <>
      <Container className="pt-14 pb-10 lg:pt-16 lg:pb-12">
        <Link href="/notes" className="text-muted hover:text-ink flex items-center gap-2.5 transition-colors">
          <ArrowLeft />
          <Label>All notes</Label>
        </Link>

        <h1 className="text-h1 mt-7 max-w-[65rem] font-black tracking-[-0.035em]">
          {note.title}
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <span className="bg-accent text-on-accent label px-3 py-1.5">
            {note.tag}
          </span>
          <Label>{note.date}</Label>
          <Label>{note.readingTime} read</Label>
        </div>
      </Container>

      <Container className="border-rule border-t py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <nav className="flex flex-col gap-3.5 lg:sticky lg:top-12 lg:h-fit lg:w-[14.5rem] lg:shrink-0">
            <Label>On this page</Label>
            <span className="text-[0.9375rem] leading-6 font-medium">The failure mode</span>
            <span className="text-muted text-[0.9375rem] leading-6">A dedupe table</span>
            <span className="text-muted text-[0.9375rem] leading-6">Ordering is not guaranteed</span>
          </nav>

          <article className="flex max-w-measure flex-col gap-7">
            <p className="text-lead">
              TODO — this article body becomes MDX. The blocks below exist to
              lock the reading layout: measure, type scale, code, pull quote.
            </p>

            <h2 className="text-h3 pt-4 leading-9 font-bold tracking-[-0.02em]">
              The failure mode
            </h2>
            <p className="text-prose text-body">
              Placeholder paragraph. Replace with real prose once the MDX
              pipeline is wired.
            </p>

            <figure className="mt-2 flex flex-col gap-3">
              <pre className="bg-code-bg text-code-fg border-rule overflow-x-auto border px-7 py-6 font-mono text-sm leading-[1.625rem]">
{`CREATE TABLE webhook_events (
  id           text PRIMARY KEY,   -- Stripe event id
  processed_at timestamptz NOT NULL DEFAULT now()
);

-- INSERT ... ON CONFLICT DO NOTHING
-- 0 rows affected = already handled, return 200 and stop.`}
              </pre>
              <figcaption>
                <Label>Fig. 01 — the entire fix, more or less</Label>
              </figcaption>
            </figure>

            <blockquote className="border-accent mt-3 border-l-[3px] py-7 pl-7">
              <p className="font-serif text-[2.125rem] leading-11 italic">
                The dedupe table is boring. Boring is the point — it is the only
                part of the system nobody has to think about again.
              </p>
            </blockquote>
          </article>
        </div>
      </Container>

      <Container className="border-rule border-t py-14">
        <Link href={`/notes/${next.slug}`} className="group flex items-end justify-between gap-8">
          <span className="flex flex-col gap-3.5">
            <Label>Next note</Label>
            <span className="text-h3 max-w-[51rem] font-black tracking-[-0.03em]">
              {next.title}
            </span>
          </span>
          <ArrowUpRight className="size-7 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </>
  );
}
