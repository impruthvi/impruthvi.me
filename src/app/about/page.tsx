import { site } from "@/lib/site";
import { Container, Label, SectionHeader } from "@/components/ui";

export const metadata = {
  title: "About",
  description: site.description,
};

// PLACEHOLDER — replace with real history.
const jobs = [
  {
    period: "2023 — Now",
    company: "RICEFW Technologies",
    title: "Senior full-stack engineer",
    body: "Owned billing and entitlements across four products. Built the dunning system, the shared feature-gating service, and the internal ops console support runs on.",
  },
  {
    period: "2021 — 2023",
    company: "Dariya Systems",
    title: "Full-stack engineer",
    body: "Port operations tooling. Shipped an offline-first field app used daily by dock crews, plus the sync layer that reconciles conflicting edits from patchy connections.",
  },
  {
    period: "2020 — 2021",
    company: "SAP Integration Practice",
    title: "ABAP / RICEF developer",
    body: "Reports, interfaces, conversions, enhancements and forms for enterprise rollouts. Learned what happens when a batch job silently fails for three days.",
  },
];

const toolkit = [
  { group: "Languages", items: ["PHP", "TypeScript", "Python", "SQL", "ABAP"] },
  { group: "Backend", items: ["Laravel", "Node / Nest", "Postgres", "Redis", "Stripe"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind", "React Native", "Motion"] },
  { group: "Infra & ops", items: ["Docker", "GitHub Actions", "Vercel / Fly", "Sentry", "Grafana"] },
];

export default function AboutPage() {
  return (
    <>
      <Container className="pt-14 pb-16 lg:pt-18">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
          <div className="flex flex-col gap-8 lg:max-w-[43.5rem]">
            <Label>About</Label>
            <h1 className="text-h1 font-black tracking-[-0.035em]">
              Six years of shipping the parts nobody demos.
            </h1>
            <p className="text-prose text-body">
              I started in SAP integration work — RICEF objects, IDocs, the kind
              of software where a bad deploy shows up in someone&rsquo;s payroll.
              That taught me to respect correctness before cleverness, and
              I&rsquo;ve carried it into every product team since.
            </p>
            <p className="text-prose text-body">
              Today I build billing systems, internal tools and the occasional
              offline-first mobile app. I like problems where the hard part is
              invisible: reconciliation, idempotency, sync conflicts, the query
              that only falls over at 40,000 rows.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:w-[22rem] lg:shrink-0">
            {/* TODO — swap for a real portrait via next/image. */}
            <div className="bg-wash flex aspect-4/5 items-end p-5">
              <Label>Portrait — 4:5</Label>
            </div>
            <Label>Ahmedabad, Gujarat — 2026</Label>
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <SectionHeader label="Experience" aside="2020 — present" />
        {jobs.map((job) => (
          <div
            key={job.company}
            className="border-rule flex flex-col gap-4 border-b py-7 lg:flex-row lg:gap-8"
          >
            <Label className="lg:w-40 lg:shrink-0 lg:pt-1.5">{job.period}</Label>
            <div className="flex flex-col gap-1.5 lg:w-[27.5rem] lg:shrink-0">
              <h3 className="text-lead font-bold tracking-[-0.02em]">{job.company}</h3>
              <Label>{job.title}</Label>
            </div>
            <p className="text-prose max-w-[34.5rem] text-[1.0625rem] leading-7">
              {job.body}
            </p>
          </div>
        ))}
      </Container>

      <Container className="pb-20 lg:pb-24">
        <SectionHeader label="Toolkit" aside="What I reach for first" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {toolkit.map((column) => (
            <div key={column.group} className="flex flex-col gap-4">
              <Label>{column.group}</Label>
              <ul className="flex flex-col">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="border-rule border-t py-2.5 text-[1.0625rem] leading-[1.625rem] font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
