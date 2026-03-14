import { GraduationCap, Trophy } from 'lucide-react'
import { educationData, hackathonData } from '@/lib/education-data'

export function Education() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <h2 className="font-mono text-2xl font-bold tracking-tight">
        Education & Hackathons
      </h2>

      {/* Education */}
      <div className="mt-8 space-y-4">
        {educationData.map((edu) => (
          <div
            key={edu.institution}
            className="flex items-start gap-4 rounded-lg border border-border/50 bg-muted/30 p-5"
          >
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-laravel" />
            <div>
              <h3 className="font-mono text-sm font-semibold">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground">
                {edu.institution} &middot; {edu.location}
              </p>
              <p className="text-xs text-muted-foreground">{edu.date}</p>
              {edu.gpa && (
                <p className="mt-1 text-xs font-medium text-foreground">
                  GPA: {edu.gpa}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hackathons */}
      <div className="mt-6 space-y-3">
        {hackathonData.map((hack) => (
          <div
            key={hack.event}
            className="flex items-start gap-4 rounded-lg border border-border/50 bg-muted/30 p-4"
          >
            <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-laravel" />
            <div>
              <p className="text-sm">
                <span className="font-semibold">{hack.title}</span>
                {' — '}
                <span className="text-muted-foreground">{hack.event}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
