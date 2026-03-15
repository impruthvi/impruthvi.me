import type { Metadata } from 'next'
import { Mail, MapPin, Clock, Briefcase } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch — Pruthvisinh Rajput | Open to full-time Laravel developer opportunities.',
}

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <h1 className="font-mono text-3xl font-bold tracking-tight">
        Get in Touch
      </h1>
      <p className="mt-2 text-muted-foreground">
        Have a project in mind or an opportunity to discuss? I&apos;d love to
        hear from you.
      </p>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        {/* Info */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-laravel/10 px-4 py-1.5 text-sm font-medium text-laravel">
            <Briefcase className="h-3.5 w-3.5" />
            Currently open to opportunities
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {SITE.location} &middot; Open to Remote
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Availability</p>
                <p className="text-sm text-muted-foreground">
                  {SITE.availability}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{SITE.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Response Time</p>
                <p className="text-sm text-muted-foreground">
                  I typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  )
}
