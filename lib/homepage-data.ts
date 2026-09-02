export const selectedCaseStudySlugs = ['brandarc', 'everflex-plus'] as const

export type SelectedCaseStudySlug = (typeof selectedCaseStudySlugs)[number]

export const selectedCaseStudyDetails: Record<
  SelectedCaseStudySlug,
  {
    eyebrow: string
    headline: string
    summary: string
    decision: string
  }
> = {
  brandarc: {
    eyebrow: 'AI / SaaS',
    headline: 'Four AI agents. One cohesive brand pipeline.',
    summary:
      'A queue-driven Laravel workflow with structured outputs, retries, and concurrent generation.',
    decision:
      'Run palette and typography work concurrently after strategy while keeping cancellation and retries safe.',
  },
  'everflex-plus': {
    eyebrow: 'Healthcare',
    headline: 'Making healthcare software faster and safer to ship.',
    summary:
      'Performance profiling, resilient notifications, and a test foundation for 3,000+ patients.',
    decision:
      'Use SQS fan-out for fault-isolated notification channels and Redis for fast dashboard reads.',
  },
}

export const homepageCapabilities = [
  {
    title: 'Backend systems',
    description: 'Laravel, Node.js, APIs, queues, data modeling, and payments.',
  },
  {
    title: 'Product delivery',
    description: 'Requirements through production, with tradeoffs made explicit.',
  },
  {
    title: 'Reliability',
    description: 'Performance profiling, testing strategy, CI/CD, and observability.',
  },
] as const

export const homepageSkillNames = [
  'Laravel',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'AWS (EC2, S3, RDS, Lambda)',
  'Pest',
] as const
