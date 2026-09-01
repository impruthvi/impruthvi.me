'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas'
import { sendEmail } from '@/actions/contact'
import { Button } from '@/components/ui/button'

const inputClass =
  'mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormData) {
    const result = await sendEmail(data)
    if (result.success) {
      toast.success("Message sent! I'll get back to you within 24 hours.")
      reset()
    } else {
      toast.error(result.error || 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-xs text-muted-foreground">
        <span aria-hidden="true" className="text-destructive">*</span>{' '}
        Required fields
      </p>

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name{' '}
          <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          aria-required="true"
          {...register('name')}
          className={inputClass}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email{' '}
          <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          aria-required="true"
          {...register('email')}
          className={inputClass}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message{' '}
          <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project or question..."
          aria-required="true"
          {...register('message')}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-1 h-4 w-4 animate-spin motion-reduce:animate-none" />{' '}
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-1 h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  )
}
