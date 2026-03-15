import { skillsData } from '@/lib/skills-data'

export function Skills() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <h2 className="font-mono text-2xl font-bold tracking-tight">
        Technical Skills
      </h2>
      <p className="mt-2 text-muted-foreground">
        Technologies I use daily to build scalable applications.
      </p>

      <div className="mt-8 space-y-6">
        {skillsData.map((category) => (
          <div key={category.category}>
            <h3 className="text-sm font-medium text-muted-foreground">
              {category.category}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border/50 bg-muted/50 px-3 py-1.5 text-sm transition-colors hover:border-laravel/50 hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
