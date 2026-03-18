import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

export interface ContactSubmission {
  name: string
  company: string
  email: string
  automate: string
}

export async function submitContact(data: ContactSubmission) {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      // Variable names must match your EmailJS template exactly
      name:     data.name,
      company:  data.company,
      email:    data.email,
      automate: data.automate,
      title:    `New inquiry from ${data.name}`,
    },
    PUBLIC_KEY,
  )
}
