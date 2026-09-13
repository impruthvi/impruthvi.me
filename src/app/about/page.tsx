import Image from "next/image";
import portrait from "../../../public/images/authors/impruthvi.jpg";
import { site } from "@/lib/site";
import { experienceData } from "@/data/experience";
import { skillsData } from "@/data/skills";
import { openSourceData } from "@/data/open-source";
import { educationData } from "@/data/education";
import { ArrowUpRight, Container, Label, SectionHeader } from "@/components/ui";

export const metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <Container className="pt-14 pb-16 lg:pt-18">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
          <div className="flex flex-col gap-8 lg:max-w-[43.5rem]">
            <Label>About</Label>
            <h1 className="text-h1 font-black tracking-[-0.035em]">
              From the database to the details.
            </h1>
            <p className="text-prose text-body">
              I&rsquo;m Pruthvisinh, a full-stack engineer based in Ahmedabad.
              I build Laravel, Node.js and React applications for healthcare,
              property management and business software. My work spans payment
              integrations, database performance and the interfaces people use
              every day.
            </p>
            <p className="text-prose text-body">
              At Ricefwtech, I work on architecture, code reviews and product
              improvements across distributed teams. Outside that work, I build
              products including BrandArc and BizNetworkPro, contribute to the
              Laravel ecosystem, and write about the tools and decisions behind
              those projects.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:w-[22rem] lg:shrink-0">
            <Image
              src={portrait}
              alt="Pruthvisinh Rajput"
              sizes="(min-width: 1024px) 352px, (min-width: 640px) 448px, calc(100vw - 48px)"
              className="bg-wash aspect-4/5 w-full max-w-md object-cover"
              preload
            />
            <Label>
              {site.location} — {site.timezone}
            </Label>
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <SectionHeader label="Experience" aside={`${experienceData.length} roles`} />
        {experienceData.map((job) => (
          <div
            key={`${job.company}-${job.date}`}
            className="border-rule flex flex-col gap-4 border-b py-7 lg:flex-row lg:gap-8"
          >
            <div className="flex flex-col gap-1.5 lg:w-44 lg:shrink-0 lg:pt-1.5">
              <Label>{job.date}</Label>
              <Label>{job.location}</Label>
            </div>
            <div className="flex flex-col gap-1.5 lg:w-[21rem] lg:shrink-0">
              <h3 className="text-lead font-bold tracking-[-0.02em]">
                {job.company}
              </h3>
              <Label>{job.position}</Label>
            </div>
            <div className="flex max-w-[38rem] flex-col gap-3">
              <ul className="text-prose flex flex-col gap-2 text-[1.0625rem] leading-7">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <Label className="pt-1">{job.techStack.join(" · ")}</Label>
            </div>
          </div>
        ))}
      </Container>

      <Container className="pb-16">
        <SectionHeader label="Open source" aside="Packages and contributions" />
        {openSourceData.map((item) => (
          <a
            key={item.url}
            href={item.url}
            className="group border-rule flex flex-col gap-3 border-b py-6 lg:flex-row lg:items-start lg:gap-8"
          >
            <Label className="lg:w-44 lg:shrink-0 lg:pt-1.5">{item.type}</Label>
            <div className="flex max-w-[38rem] flex-1 flex-col gap-2">
              <h3 className="text-lead font-bold tracking-[-0.02em]">
                {item.name}
              </h3>
              <p className="text-prose text-[1.0625rem] leading-7">
                {item.description}
              </p>
              <Label className="pt-1">{item.techStack.join(" · ")}</Label>
            </div>
            <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 max-lg:hidden lg:mt-1.5" />
          </a>
        ))}
      </Container>

      <Container className="pb-16">
        <SectionHeader label="Toolkit" aside="What I reach for first" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {skillsData.map((column) => (
            <div key={column.category} className="flex flex-col gap-4">
              <Label>{column.category}</Label>
              <ul className="flex flex-col">
                {column.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border-rule border-t py-2.5 text-[1.0625rem] leading-[1.625rem] font-medium"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-20 lg:pb-24">
        <SectionHeader label="Education" />
        {educationData.map((entry) => (
          <div
            key={entry.institution}
            className="border-rule flex flex-col gap-2 border-b py-6 lg:flex-row lg:items-baseline lg:gap-8"
          >
            <Label className="lg:w-44 lg:shrink-0">{entry.date}</Label>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lead font-bold tracking-[-0.02em]">
                {entry.institution}
              </h3>
              <Label>{entry.degree}</Label>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
