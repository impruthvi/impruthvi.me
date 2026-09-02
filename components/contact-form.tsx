'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas'
import { sendEmail } from '@/actions/contact'
import { Button } from '@/components/ui/button'

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
        <label htmlFor="name" className="text-[13px] font-semibold leading-[18px]">
          Name{' '}
          <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          aria-required="true"
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
          aria-invalid={errors.name ? 'true' : undefined}
          className="field-control mt-2 h-[50px]"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-[13px] font-semibold leading-[18px]">
          Email{' '}
          <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
          aria-invalid={errors.email ? 'true' : undefined}
          className="field-control mt-2 h-[50px]"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-[13px] font-semibold leading-[18px]">
          Message{' '}
          <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project or question..."
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : undefined}
          className="field-control mt-2 h-[174px] resize-none py-[15px] leading-[22px]"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="brand"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
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
