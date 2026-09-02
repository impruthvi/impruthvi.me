import type { Metadata } from 'next'
import { Mail, MapPin, Clock, Briefcase } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Pruthvisinh Rajput, Laravel and Node.js engineer. Projects, questions, and Laravel discussions welcome.',
}

export default function ContactPage() {
  return (
    <section className="site-section">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Get in Touch
      </h1>
      <p className="mt-2 text-muted-foreground">
        Got a project to ship or a question about Laravel? I read every message.
      </p>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        {/* Info */}
        <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {SITE.location} &middot; Remote
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

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  )
}
