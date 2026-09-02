import Link from 'next/link'
import { openSourceData } from '@/lib/open-source-data'
import { SectionHeading } from '@/components/home/section-heading'

function contributionAction(item: (typeof openSourceData)[number]) {
  if (item.prUrl) return item.name.includes('4 PRs') ? 'View PRs' : 'View PR'
  if (item.websiteUrl) return 'Website'
  return 'GitHub'
}

function ContributionRow({
  item,
  index,
  mobile = false,
}: {
  item: (typeof openSourceData)[number]
  index: number
  mobile?: boolean
}) {
  const href = item.prUrl ?? item.websiteUrl ?? item.url
  const stat = item.badge
    ?.replace(' Merged', '')
    .replace(' weekly downloads', '/wk')

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-[72px] items-center gap-3 border-b border-border py-[18px] transition-colors hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring xl:gap-0 xl:py-0"
    >
      <span className="w-[58px] shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-laravel xl:w-16">
        {mobile ? stat : String(index + 1).padStart(2, '0')}
      </span>
      <span className="min-w-0 flex-1 xl:w-[340px] xl:flex-none">
        <span className="block text-[13px] font-semibold leading-4 text-foreground xl:text-sm xl:leading-5">
          {mobile ? item.homepage?.title ?? item.name : item.name}
        </span>
        {mobile && (
          <span className="mt-1 block text-[11px] leading-[17px] text-muted-foreground">
            {item.homepage?.description ?? item.description}
          </span>
        )}
      </span>
      {!mobile && (
        <span className="hidden min-w-0 flex-1 pr-6 text-[13px] leading-5 text-muted-foreground xl:block">
          {item.homepage?.description ?? item.description}
        </span>
      )}
      <span className="w-8 shrink-0 text-right text-base text-foreground xl:w-[84px] xl:text-xs xl:font-medium">
        {mobile ? <span aria-hidden="true">↗</span> : `${contributionAction(item)} →`}
      </span>
    </Link>
  )
}

export function HomeOpenSource() {
  const [signature, ...contributions] = openSourceData
  const signatureProof = signature.homepage
  const mobileContributions = contributions.filter(
    (item) => item.name.includes('Laravel Boost') || item.name.includes('nodemail')
  )

  return (
    <section id="open-source" className="site-container scroll-mt-24 border-b border-border py-[72px] xl:py-[120px]">
      <SectionHeading
        index="02"
        mobileLabel="OPEN SOURCE"
        title="Shipped in the open"
        mobileTitle="Contributions that shipped."
        description="External proof from the Laravel ecosystem, ordered by signal rather than recency."
      />

      <div className="mt-9 grid gap-7 xl:mt-16 xl:grid-cols-[minmax(0,700px)_minmax(0,420px)] xl:items-center xl:gap-16">
        <Link
          href={signature.prUrl ?? signature.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group overflow-hidden rounded-lg border border-border p-[18px] transition-colors hover:border-laravel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring xl:min-h-[330px] xl:rounded-md xl:border-0 xl:bg-[#f6f8fa] xl:p-0"
        >
          <div className="flex items-center justify-between xl:h-[54px] xl:border-b xl:border-[#d0d7de] xl:px-[22px]">
            <span className="font-mono text-[9px] tracking-[0.08em] text-muted-foreground xl:font-sans xl:text-[13px] xl:font-semibold xl:normal-case xl:tracking-normal xl:text-[#0969da]">
              <span className="xl:hidden">{signatureProof?.repository?.toUpperCase()}</span>
              <span className="hidden xl:inline">{signatureProof?.repository}</span>
            </span>
            <span className="rounded-full bg-emerald-950 px-2 py-1 font-mono text-[9px] text-emerald-300 xl:bg-transparent xl:p-0 xl:font-sans xl:text-[13px] xl:text-[#57606a]">
              <span className="xl:hidden">MERGED</span>
              <span className="hidden xl:inline">Pull request #{signatureProof?.number}</span>
            </span>
          </div>
          <div className="mt-[18px] xl:mt-0 xl:px-7 xl:pb-[22px] xl:pt-7">
            <p className="font-display text-2xl font-semibold leading-7 xl:font-sans xl:font-medium xl:leading-8 xl:text-[#1f2328]">
              <span className="xl:hidden">PR #{signatureProof?.number}</span>
              <span className="hidden xl:inline">{signatureProof?.title} #{signatureProof?.number}</span>
            </p>
            <div className="mt-2 flex items-center gap-2.5 xl:mt-[18px]">
              <span className="hidden rounded-full bg-[#8250df] px-3 py-1.5 text-xs font-semibold text-white xl:inline">Merged</span>
              <span className="text-xs text-foreground xl:text-[13px] xl:text-[#57606a]">Merged by {signatureProof?.mergedBy}</span>
            </div>
          </div>
          <div className="mt-[18px] flex items-center justify-between border-t border-border pt-3.5 xl:mx-7 xl:mb-7 xl:mt-0 xl:rounded-sm xl:border xl:border-[#d0d7de] xl:bg-white xl:p-[18px]">
            <p className="max-w-[470px] text-[13px] leading-5 text-muted-foreground xl:text-[#1f2328]">
              {signatureProof?.description ?? signature.description}
            </p>
            <span className="ml-4 shrink-0 text-base group-hover:text-laravel xl:hidden" aria-hidden="true">↗</span>
            <span className="hidden shrink-0 font-mono text-[10px] text-[#57606a] xl:block">TYPESCRIPT · REACT</span>
          </div>
        </Link>

        <div className="hidden xl:block">
          <p className="font-mono text-[11px] font-semibold tracking-[0.1em] text-laravel">SIGNATURE PROOF / LARAVEL</p>
          <h3 className="mt-[18px] font-display text-4xl font-semibold leading-10 tracking-[-0.025em]">Merged into Laravel&apos;s official starter kit.</h3>
          <p className="mt-5 text-base leading-[26px] text-muted-foreground">
            A small fix with a high-trust review surface: submitted to an official Laravel repository and merged by {signatureProof?.mergedBy}.
          </p>
          <Link
            href={signature.prUrl ?? signature.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[30px] inline-flex py-2 text-sm font-semibold transition-colors hover:text-laravel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Inspect pull request #{signatureProof?.number} <span className="ml-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="mt-[26px] border-t border-border xl:hidden">
        {mobileContributions.map((item, index) => (
          <ContributionRow key={item.name} item={item} index={index} mobile />
        ))}
      </div>
      <div className="mt-16 hidden border-t border-border xl:block">
        {contributions.map((item, index) => (
          <ContributionRow key={item.name} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
