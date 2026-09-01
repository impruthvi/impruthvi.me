import { skillsData } from '@/lib/skills-data'

const PRIMARY_CATEGORY = 'Core Stack'

export function Skills() {
  const primary = skillsData.find((c) => c.category === PRIMARY_CATEGORY)
  const secondary = skillsData.filter((c) => c.category !== PRIMARY_CATEGORY)

  return (
    <section className="site-section">
      <h2 className="font-display text-2xl font-bold tracking-tight">
        The Stack I Reach For
      </h2>
      <p className="mt-2 text-muted-foreground">
        Primary technologies across 5+ years of production work.
      </p>

      <div className="mt-8">
        {primary && (
          <div className="flex flex-wrap gap-2">
            {primary.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border/50 bg-muted/50 px-3 py-1.5 text-sm transition-colors hover:border-laravel/50 hover:text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 space-y-2">
          {secondary.map((cat) => (
            <p key={cat.category} className="text-sm">
              <span className="text-muted-foreground">{cat.category}:</span>{' '}
              <span className="text-muted-foreground">
                {cat.skills.join(', ')}
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
