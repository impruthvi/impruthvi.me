import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
  return (
    <section className="site-section">
      <div className="rounded-none border border-border bg-surface px-8 py-12 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Looking for a Laravel developer?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Have a project, a question, or want to talk Laravel? Drop a line. I respond within 24 hours.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button nativeButton={false} render={<Link href="/contact" />}>
            Get in Touch <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button nativeButton={false} variant="outline" render={<a href="/Pruthvisinh_Rajput.pdf" download />}>
            <Download className="mr-1 h-4 w-4" /> Download Resume
          </Button>
        </div>
      </div>
    </section>
  )
}
