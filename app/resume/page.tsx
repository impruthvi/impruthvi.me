import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, Mail, MapPin, Github, Linkedin } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { experienceData } from '@/lib/experience-data'
import { skillsData } from '@/lib/skills-data'
import { educationData, hackathonData } from '@/lib/education-data'
import { openSourceData } from '@/lib/open-source-data'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume — Pruthvisinh Rajput | Laravel Developer with 4+ years of experience.',
}

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24 print:py-8 print:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-mono text-3xl font-bold tracking-tight">
            {SITE.name}
          </h1>
          <p className="mt-1 text-lg text-laravel">Laravel Developer</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {SITE.location}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" /> {SITE.email}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Link
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <Button
          variant="outline"
          render={<a href="/Pruthvisinh_Rajput.pdf" download />}
          className="print:hidden"
        >
          <Download className="mr-1 h-4 w-4" /> Download PDF
        </Button>
      </div>

      {/* Summary */}
      <div className="mt-10">
        <h2 className="font-mono text-lg font-bold">Professional Summary</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Laravel developer who shipped a healthcare SaaS platform to 3,000+
          patients, reduced API response times from 800ms to 440ms, and had a
          pull request merged by Taylor Otwell into the Laravel React Starter
          Kit. Four years of production experience building scalable backends
          with PHP, Laravel, and modern frontends (React, Vue.js) that serve
          real users at scale — with 99.9% uptime, 95% test coverage, and
          $500K+ in processed transactions.
        </p>
      </div>

      {/* Open Source */}
      <div className="mt-10">
        <h2 className="font-mono text-lg font-bold">
          Open Source Contributions
        </h2>
        <div className="mt-4 space-y-4">
          {openSourceData.map((item) => (
            <div key={item.name}>
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                {item.badge && (
                  <span className="text-xs text-laravel">{item.badge}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-10">
        <h2 className="font-mono text-lg font-bold">Technical Skills</h2>
        <div className="mt-4 space-y-3">
          {skillsData.map((category) => (
            <div key={category.category} className="flex flex-wrap gap-x-1 text-sm">
              <span className="font-medium">{category.category}:</span>
              <span className="text-muted-foreground">
                {category.skills.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mt-10">
        <h2 className="font-mono text-lg font-bold">Work Experience</h2>
        <div className="mt-4 space-y-8">
          {experienceData.map((job) => (
            <div key={job.company}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold">
                    {job.position} — {job.company}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {job.location}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {job.date}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {job.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    &bull; {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-10">
        <h2 className="font-mono text-lg font-bold">Education</h2>
        <div className="mt-4">
          {educationData.map((edu) => (
            <div key={edu.institution}>
              <h3 className="text-sm font-semibold">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground">
                {edu.institution} &middot; {edu.location} &middot; {edu.date}
              </p>
              {edu.gpa && (
                <p className="text-xs text-muted-foreground">
                  GPA: {edu.gpa}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hackathons */}
      <div className="mt-10">
        <h2 className="font-mono text-lg font-bold">Hackathons</h2>
        <div className="mt-4 space-y-2">
          {hackathonData.map((hack) => (
            <p key={hack.event} className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {hack.title}
              </span>{' '}
              — {hack.event}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
