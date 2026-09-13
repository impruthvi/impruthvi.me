import { site } from "@/lib/site";
import { Container, Label } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer className="bg-wash border-rule border-t">
      <Container className="pt-16 pb-12 lg:pt-24">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-5">
            <Label>Get in touch</Label>
            <p className="font-display text-h1 leading-[0.95] font-black tracking-[-0.035em] uppercase">
              Let&rsquo;s talk.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 lg:items-end">
            <a
              href={`mailto:${site.email}`}
              className="decoration-accent w-fit text-xl font-medium tracking-[-0.02em] underline decoration-[3px] underline-offset-[6px] lg:text-2xl"
            >
              {site.email}
            </a>
            <Label>Replies within a day</Label>
          </div>
        </div>

        <div className="border-rule mt-14 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Label>© {new Date().getFullYear()} {site.name}</Label>
          <div className="flex items-center gap-8">
            {site.socials.map((social) => (
              <a key={social.href} href={social.href} className="label hover:text-muted transition-colors">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
