import { site } from "@/lib/site";
import { Chip, Container, Label } from "@/components/ui";

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

const channels = [
  {
    label: "Email — best",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Replies within a day, usually the same evening.",
  },
  {
    label: "A call",
    value: "Book 30 minutes",
    href: "#",
    note: `Weekdays 10:00 — 19:00 IST (${site.timezone}).`,
  },
  {
    label: "Elsewhere",
    value: "GitHub · LinkedIn",
    href: site.socials[0].href,
    note: "Résumé available as a PDF on request.",
  },
];

export default function ContactPage() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-16">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-16">
        <div className="flex flex-col gap-6">
          <Label>Contact</Label>
          <h1 className="font-display text-h1 font-black tracking-[-0.04em] uppercase">
            <span className="block">Tell me what&rsquo;s</span>
            <span className="font-serif text-muted block lowercase italic [font-size:0.85em]">
              breaking.
            </span>
          </h1>
        </div>
        <div className="lg:pb-4">
          <Chip>{site.availability}</Chip>
        </div>
      </div>

      <dl className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => (
          <div key={channel.label} className="border-ink flex flex-col gap-2.5 border-t py-6">
            <dt>
              <Label>{channel.label}</Label>
            </dt>
            <dd className="flex flex-col gap-2.5">
              <a
                href={channel.href}
                className="hover:text-muted text-[1.625rem] leading-8 font-medium tracking-[-0.02em] transition-colors"
              >
                {channel.value}
              </a>
              <span className="text-muted text-base leading-[1.625rem]">
                {channel.note}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
