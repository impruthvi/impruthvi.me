import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { ArrowUpRight, Label } from "@/components/ui";

/**
 * One row of the work index. Columns are fixed-width lanes on desktop so the
 * stack, metric and arrow line up across every row regardless of title length
 * — gap alone would let them drift.
 *
 * The headline metric is the first entry in the case study's `metrics` list,
 * so ordering that list in the MDX frontmatter picks what shows here.
 */
export function WorkRow({ study, index }: { study: CaseStudy; index: number }) {
  const metric = study.metrics[0];

  return (
    <Link
      href={`/work/${study.slug}`}
      className="group border-rule grid grid-cols-1 items-start gap-x-6 gap-y-3.5 border-b py-6 lg:grid-cols-[2.5rem_minmax(0,1fr)_9rem_9rem_1.5rem] lg:items-center lg:py-9 xl:grid-cols-[3.5rem_minmax(0,1fr)_14rem_12.5rem_1.5rem]"
    >
      <Label className="lg:self-center">
        {String(index + 1).padStart(2, "0")}
      </Label>

      <div className="flex flex-col gap-2">
        <h3 className="text-h3 font-bold tracking-[-0.025em]">{study.title}</h3>
        <p className="text-muted text-base leading-6">{study.tagline}</p>
      </div>

      {/* Three is what the lane fits; the rest live on the case study page. */}
      <Label className="lg:self-center">
        {study.techStack.slice(0, 3).join(" · ")}
      </Label>

      {metric ? (
        <div className="flex flex-wrap items-baseline gap-2.5 lg:flex-col lg:items-start lg:gap-1">
          <span className="text-[1.75rem] leading-8 font-bold tracking-[-0.02em]">
            {metric.value}
          </span>
          <Label>{metric.label}</Label>
        </div>
      ) : (
        <span className="hidden lg:block" aria-hidden />
      )}

      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 max-lg:hidden" />
    </Link>
  );
}
