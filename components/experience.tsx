import { experienceData } from '@/lib/experience-data'

export function Experience() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <h2 className="font-mono text-2xl font-bold tracking-tight">
        Experience
      </h2>
      <p className="mt-2 text-muted-foreground">
        4+ years building production Laravel applications.
      </p>

      <div className="mt-8 space-y-10">
        {experienceData.map((job) => (
          <div key={job.company} className="relative pl-6 border-l-2 border-border/50">
            {/* Timeline dot */}
            <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-laravel bg-background" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="font-mono text-base font-semibold">
                  {job.company}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {job.position} &middot; {job.location}
                </p>
              </div>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">
                {job.date}
              </span>
            </div>

            <ul className="mt-3 space-y-2">
              {job.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="mr-2 text-laravel">&bull;</span>
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
