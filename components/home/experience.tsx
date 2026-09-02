import { experienceData } from '@/lib/experience-data'
import { homepageCapabilities, homepageSkillNames } from '@/lib/homepage-data'
import { skillsData } from '@/lib/skills-data'
import { SectionHeading } from '@/components/home/section-heading'

function compactDate(date: string, mobile = false) {
  const years = date.match(/\d{4}/g)
  if (!years?.length) return date
  if (date.includes('Present')) return mobile ? 'NOW' : `${years[0]} / NOW`
  return mobile ? `${years[0]}–${years[1].slice(2)}` : years.join(' / ')
}

export function HomeExperience() {
  const jobs = experienceData.slice(0, 3)
  const knownSkills = new Set([
    ...skillsData.flatMap((group) => group.skills),
    ...experienceData.flatMap((job) => job.techStack),
  ])
  const skills = homepageSkillNames.filter((skill) => knownSkills.has(skill))

  return (
    <section className="site-container border-b border-border py-[72px] xl:py-[120px]">
      <SectionHeading
        index="03"
        mobileLabel="EXPERIENCE"
        title="Experience, compressed"
        mobileTitle="Built across product stages."
        description="The homepage shows trajectory and operating range. The resume keeps the full chronology."
      />

      <div className="mt-9 grid gap-8 xl:mt-16 xl:grid-cols-[minmax(0,660px)_minmax(0,420px)] xl:items-start xl:gap-[88px]">
        <div className="border-t border-border">
          {jobs.map((job, index) => (
            <article key={job.company} className="border-b border-border py-5 xl:flex xl:min-h-[120px] xl:items-start xl:py-[26px]">
              <p className={`hidden w-[120px] shrink-0 font-mono text-[10px] tracking-[0.08em] xl:block ${index === 0 ? 'text-laravel' : 'text-muted-foreground'}`}>
                {compactDate(job.date)}
              </p>
              <div className="flex items-start justify-between gap-4 xl:w-[190px] xl:shrink-0 xl:block">
                <div>
                  <h3 className="text-sm font-semibold leading-5 xl:hidden">{job.position} · {job.company}</h3>
                  <h3 className="hidden text-[15px] font-semibold leading-[21px] xl:block">{job.company}</h3>
                  <p className="mt-1 hidden text-xs leading-[18px] text-muted-foreground xl:block">{job.position}</p>
                </div>
                <span className="shrink-0 font-mono text-[9px] leading-[14px] text-muted-foreground xl:hidden">
                  {compactDate(job.date, true)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-[19px] text-muted-foreground xl:mt-0 xl:flex-1 xl:text-[13px] xl:leading-[21px]">
                {job.homepageSummary ?? job.highlights[0]}
              </p>
            </article>
          ))}
        </div>

        <aside className="hidden border border-border bg-surface p-[30px] xl:block">
          <div className="flex items-center justify-between border-b border-border pb-[26px]">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">What I bring</h3>
            <span className="font-mono text-[10px] tracking-[0.08em] text-laravel">03 CAPABILITIES</span>
          </div>
          {homepageCapabilities.map((capability, index) => (
            <div key={capability.title} className={`flex gap-[18px] py-6 ${index !== homepageCapabilities.length - 1 ? 'border-b border-border' : ''}`}>
              <span className="w-7 shrink-0 font-mono text-[10px] text-laravel">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h4 className="text-[15px] font-semibold leading-[21px]">{capability.title}</h4>
                <p className="mt-2 text-[13px] leading-[21px] text-muted-foreground">{capability.description}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>

      <div className="mt-[26px] flex flex-wrap gap-2 xl:hidden">
        {skills.map((skill) => (
          <span key={skill} className="rounded-full border border-border px-2.5 py-2 font-mono text-[9px] uppercase leading-3 text-muted-foreground">
            {skill.startsWith('AWS') ? 'AWS' : skill}
          </span>
        ))}
      </div>

    </section>
  )
}
