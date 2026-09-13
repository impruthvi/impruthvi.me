import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { notes } from "@/content/notes";
import { Band, Chip, Container, Label, SectionHeader } from "@/components/ui";
import { WorkRow } from "@/components/work-row";

const practice = [
  {
    n: "01",
    title: "Money movement",
    body: "Subscriptions, dunning, invoicing, refunds. Idempotency and reconciliation done properly, because finance will find out if they aren't.",
  },
  {
    n: "02",
    title: "Internal tooling",
    body: "Admin panels and ops consoles the support team actually likes. Fewer tickets, fewer manual database edits at 1am.",
  },
  {
    n: "03",
    title: "Making it fast",
    body: "Query plans, N+1s, cache layers, bundle budgets. Measured before and after — no vibes-based optimisation.",
  },
];

export default function HomePage() {
  return (
    <>
      <Container className="pt-16 pb-14 lg:pt-22 lg:pb-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Label tone="ink">{site.name}</Label>
          <span className="bg-rule h-px w-8 shrink-0 max-sm:hidden" aria-hidden />
          <Label>{site.role}</Label>
          <span className="bg-rule h-px w-8 shrink-0 max-sm:hidden" aria-hidden />
          <Label>
            {site.location} — {site.timezone}
          </Label>
        </div>

        {/* The poster. `text-balance` is deliberately absent — these line
            breaks are art-directed, not optimised. */}
        <h1 className="font-display text-display mt-8 font-black tracking-[-0.035em] uppercase">
          <span className="block">Software that</span>
          <span className="block">
            doesn&rsquo;t{" "}
            <span className="font-serif text-muted lowercase italic [font-size:0.82em]">
              flinch
            </span>
          </span>
          <span className="block">under load.</span>
        </h1>

        <div className="border-rule mt-14 flex flex-col-reverse items-start justify-between gap-8 border-t pt-8 lg:flex-row lg:items-end">
          <Chip>{site.availability}</Chip>
          <p className="text-body max-w-[32.5rem]">{site.description}</p>
        </div>
      </Container>

      <Container className="pb-20 lg:pb-24">
        <SectionHeader
          label="Selected work"
          aside={`2021 — 2026 / ${String(projects.length).padStart(2, "0")} case studies`}
        />
        {projects.map((project, i) => (
          <WorkRow key={project.slug} project={project} index={i} />
        ))}
      </Container>

      <Band className="py-20 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
          <h2 className="text-h2 max-w-[39rem] font-black tracking-[-0.035em]">
            Hired for three kinds of problem.
          </h2>
          <Label tone="on-band" className="lg:pt-3.5">
            Practice
          </Label>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-14">
          {practice.map((item) => (
            <div
              key={item.n}
              className="border-seam-on-band flex flex-col gap-5 border-t pt-6"
            >
              <span className="text-accent text-h3 leading-none font-black tracking-[-0.02em]">
                {item.n}
              </span>
              <h3 className="text-lead font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-prose-on-band text-base leading-[1.625rem]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Band>

      <Container className="py-20 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex flex-col items-start gap-3.5 lg:w-[22rem] lg:shrink-0">
            <Label tone="ink">Field notes</Label>
            <p className="text-muted text-base leading-[1.625rem]">
              Short write-ups on things that broke and what fixed them.
            </p>
            <Link
              href="/notes"
              className="label border-ink mt-1 border-b pb-1"
            >
              All notes
            </Link>
          </div>

          <div className="border-ink flex-1 border-t">
            {notes.slice(0, 3).map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="border-rule flex flex-col gap-2 border-b py-5 sm:flex-row sm:items-center sm:gap-8"
              >
                <Label className="sm:w-[6.5rem] sm:shrink-0">{note.date}</Label>
                <span className="flex-1 text-lg font-medium tracking-[-0.01em]">
                  {note.title}
                </span>
                <Label className="sm:w-14 sm:shrink-0">{note.readingTime}</Label>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
