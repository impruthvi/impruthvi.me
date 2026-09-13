import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowUpRight, Label } from "@/components/ui";

/**
 * One row of the work index. Columns are fixed-width lanes on desktop so the
 * stack, metric and arrow line up across every row regardless of title length
 * — gap alone would let them drift.
 */
export function WorkRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group border-rule grid grid-cols-1 items-start gap-x-8 gap-y-3.5 border-b py-6 lg:grid-cols-[3.5rem_1fr_17rem_12.5rem_1.5rem] lg:items-center lg:py-9"
    >
      <Label className="lg:self-center">
        {String(index + 1).padStart(2, "0")}
      </Label>

      <div className="flex flex-col gap-2">
        <h3 className="text-h3 font-bold tracking-[-0.025em]">{project.name}</h3>
        <p className="text-muted text-base leading-6">{project.summary}</p>
      </div>

      <Label className="lg:self-center">{project.stack.join(" · ")}</Label>

      {project.metric ? (
        <div className="flex items-baseline gap-2.5 lg:flex-col lg:items-start lg:gap-1">
          <span className="text-[1.75rem] leading-8 font-bold tracking-[-0.02em]">
            {project.metric.value}
          </span>
          <Label>{project.metric.label}</Label>
        </div>
      ) : (
        <span className="hidden lg:block" aria-hidden />
      )}

      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 max-lg:hidden" />
    </Link>
  );
}
