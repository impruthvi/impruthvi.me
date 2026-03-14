'use server'

import { Resend } from 'resend'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormData) {
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Invalid form data.' }
  }

  try {
    const { name, email, message } = result.data
    const { data: emailData, error } = await resend.emails.send({
      from: 'contact@impruthvi.me',
      to: ['contact@impruthvi.me'],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })

    if (!emailData || error) {
      throw new Error('Failed to send email')
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { error: 'Failed to send message. Please try again.' }
  }
}
