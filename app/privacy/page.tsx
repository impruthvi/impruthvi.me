import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for impruthvi.me',
}

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <h1 className="font-mono text-3xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="font-mono text-base font-semibold text-foreground">
            Overview
          </h2>
          <p className="mt-2">
            This website ({SITE.url}) is a personal portfolio and blog operated
            by {SITE.name}. I respect your privacy and am committed to
            protecting any information you share.
          </p>
        </div>

        <div>
          <h2 className="font-mono text-base font-semibold text-foreground">
            Information Collected
          </h2>
          <p className="mt-2">
            <strong className="text-foreground">Contact Form:</strong> When you
            submit the contact form, I collect your name, email address, and
            message. This information is used solely to respond to your inquiry
            and is not shared with third parties.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Analytics:</strong> This site
            uses Vercel Analytics to collect anonymous usage data such as page
            views and referral sources. No personally identifiable information
            is collected through analytics.
          </p>
        </div>

        <div>
          <h2 className="font-mono text-base font-semibold text-foreground">
            Cookies
          </h2>
          <p className="mt-2">
            This site uses minimal cookies for theme preference (dark/light
            mode). No tracking cookies are used.
          </p>
        </div>

        <div>
          <h2 className="font-mono text-base font-semibold text-foreground">
            Third-Party Services
          </h2>
          <p className="mt-2">
            This site uses Resend for email delivery and Vercel for hosting and
            analytics. Please refer to their respective privacy policies for
            more information.
          </p>
        </div>

        <div>
          <h2 className="font-mono text-base font-semibold text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            If you have any questions about this privacy policy, please contact
            me at {SITE.email}.
          </p>
        </div>
      </div>
    </section>
  )
}
