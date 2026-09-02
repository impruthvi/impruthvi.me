import type { ReactNode } from 'react'

interface SectionHeadingProps {
  index: string
  title: string
  mobileLabel?: string
  mobileTitle?: string
  description?: string
  action?: ReactNode
}

export function SectionHeading({
  index,
  title,
  mobileLabel,
  mobileTitle,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={
        action && !description
          ? 'flex items-end justify-between gap-5'
          : 'relative flex flex-col xl:flex-row xl:items-end xl:justify-between xl:gap-12'
      }
    >
      <div className={`flex flex-col gap-2.5 xl:flex-row xl:items-start xl:gap-[18px] ${action && !description ? 'max-w-[250px] xl:max-w-none' : ''}`}>
        <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-laravel xl:pt-2.5 xl:text-xs">
          <span className="xl:hidden">{mobileLabel ?? index}</span>
          <span className="hidden xl:inline">{index}</span>
        </span>
        <h2 className="font-display text-[32px] font-semibold leading-9 tracking-[-0.025em] xl:text-[44px] xl:leading-[48px]">
          <span className="xl:hidden">{mobileTitle ?? title}</span>
          <span className="hidden xl:inline">{title}</span>
        </h2>
      </div>
      {(description || action) && (
        <div
          className={
            description
              ? 'hidden xl:block xl:w-[390px] xl:shrink-0'
              : 'shrink-0'
          }
        >
          {description && (
            <p className="hidden text-sm leading-6 text-muted-foreground xl:block xl:text-[15px]">
              {description}
            </p>
          )}
          {action}
        </div>
      )}
    </div>
  )
}
