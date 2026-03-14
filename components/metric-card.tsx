'use client'

import { useEffect, useRef, useState } from 'react'

interface MetricCardProps {
  value: string
  label: string
  subtext: string
}

export function MetricCard({ value, label, subtext }: MetricCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`rounded-lg border border-border/50 bg-muted/50 px-4 py-3 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <p className="font-mono text-xl font-bold text-laravel">{value}</p>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{subtext}</p>
    </div>
  )
}
