import { Container, Label } from "@/components/ui";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How this portfolio handles browser preferences and contact links.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-16 lg:py-20">
      <Label>About this site</Label>
      <h1 className="text-h1 mt-6 font-black tracking-tight">Privacy.</h1>
      <div className="text-prose text-body mt-12 flex max-w-measure flex-col gap-8">
        <section className="space-y-3">
          <h2 className="text-ink text-h3 font-bold">Browser preferences</h2>
          <p>
            This portfolio stores your light or dark theme preference in your
            browser&rsquo;s local storage. You can remove it by clearing this
            site&rsquo;s browser data. The site does not include analytics or
            advertising scripts.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-ink text-h3 font-bold">Contact and external links</h2>
          <p>
            Email links open your email application. This site has no contact
            form and does not receive messages through the website. If you email
            me, your message is handled by the email services involved. External
            sites such as GitHub and LinkedIn have their own privacy practices.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-ink text-h3 font-bold">Hosting</h2>
          <p>
            Requests to load the site include technical information such as your
            IP address and browser headers, which the hosting provider may
            process to deliver and operate the site.
          </p>
        </section>
        <p>
          Questions about this site can be sent to{" "}
          <a className="decoration-accent underline underline-offset-4 wrap-anywhere" href={`mailto:${site.email}`}>
            {site.email}
          </a>.
        </p>
      </div>
    </Container>
  );
}
