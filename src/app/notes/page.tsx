import Link from "next/link";
import { notes, notesByYear } from "@/content/notes";
import { Container, Label } from "@/components/ui";

export const metadata = {
  title: "Field notes",
  description: "Post-mortems, migration diaries and the odd opinion.",
};

export default function NotesPage() {
  const groups = notesByYear();

  return (
    <>
      <Container className="pt-16 pb-12 lg:pt-18 lg:pb-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <Label>Field notes</Label>
            <h1 className="font-display text-h1 font-black tracking-[-0.035em] uppercase">
              <span className="block">Things that</span>
              <span className="block">
                <span className="font-serif text-muted lowercase italic [font-size:0.86em]">
                  broke,
                </span>{" "}
                and why.
              </span>
            </h1>
          </div>
          <div className="flex flex-col gap-3.5 lg:w-[22rem] lg:shrink-0 lg:pb-3.5">
            <p className="text-prose text-[1.0625rem] leading-7">
              Post-mortems, migration diaries and the odd opinion. No tutorials,
              no listicles.
            </p>
            <Label>{notes.length} posts — RSS available</Label>
          </div>
        </div>
      </Container>

      <Container className="pb-20 lg:pb-24">
        {groups.map((group, groupIndex) => (
          <section key={group.year} className={groupIndex > 0 ? "pt-14" : ""}>
            <div className="border-ink flex items-center justify-between border-b pb-3.5">
              <h2 className="text-h3 leading-9 font-black tracking-[-0.03em]">
                {group.year}
              </h2>
              <Label>
                {String(group.items.length).padStart(2, "0")} posts
              </Label>
            </div>

            {group.items.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="group border-rule flex flex-col gap-2.5 border-b py-5 lg:grid lg:grid-cols-[6.5rem_1fr_11.25rem_5rem] lg:items-center lg:gap-8 lg:py-6"
              >
                <Label className="lg:order-1">{note.date}</Label>
                <span className="text-lg font-medium tracking-[-0.015em] lg:order-2 lg:text-[1.375rem]">
                  {note.title}
                </span>
                <span className="flex items-center gap-6 lg:contents">
                  <Label className="lg:order-3">{note.tag}</Label>
                  <Label className="lg:order-4">{note.readingTime}</Label>
                </span>
              </Link>
            ))}
          </section>
        ))}
      </Container>
    </>
  );
}
