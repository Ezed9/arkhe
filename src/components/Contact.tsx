import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '../lib/email'

const enquiryTypes = ['Research Agent', 'Sales Agent', 'Operations Agent', 'Custom Agent']

const baseFields = [
  { name: 'name',    label: '> Your Name',      type: 'text',  placeholder: 'Full name',               delay: 0    },
  { name: 'company', label: '> Company',         type: 'text',  placeholder: 'Company or project name',  delay: 0.07 },
  { name: 'email',   label: '> Email Address',   type: 'email', placeholder: 'you@company.com',          delay: 0.14 },
]

function TerminalField({ field }: { field: typeof baseFields[0] }) {
  const [focused, setFocused] = useState(false)
  const inputId = `field-${field.name}`
  const base: React.CSSProperties = {
    background: 'transparent', border: 'none', outline: 'none',
    color: '#fff', fontSize: '0.875rem', width: '100%',
    fontFamily: '"JetBrains Mono", monospace',
    caretColor: 'rgba(255,255,255,0.6)',
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: field.delay }}
      className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 border-b py-5"
      style={{ borderColor: focused ? 'rgba(255,255,255,0.1)' : '#1A1A1A', transition: 'border-color 0.2s ease' }}
    >
      <label
        htmlFor={inputId}
        className="font-mono text-sm shrink-0 pt-0.5 select-none"
        style={{
          color: focused ? 'rgba(0,255,133,1)' : 'rgba(255,255,255,0.32)',
          transition: 'color 0.2s ease', letterSpacing: '0.04em',
        }}
      >
        {field.label}
      </label>
      <input
        id={inputId} type={field.type} name={field.name} placeholder={field.placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={base}
      />
    </motion.div>
  )
}

function TextareaField({ placeholder }: { placeholder: string }) {
  const [focused, setFocused] = useState(false)
  const base: React.CSSProperties = {
    background: 'transparent', border: 'none', outline: 'none',
    color: '#fff', fontSize: '0.875rem', width: '100%',
    fontFamily: '"JetBrains Mono", monospace',
    caretColor: 'rgba(255,255,255,0.6)',
    resize: 'none', lineHeight: 1.7,
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.21 }}
      className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 border-b py-5"
      style={{ borderColor: focused ? 'rgba(255,255,255,0.1)' : '#1A1A1A', transition: 'border-color 0.2s ease' }}
    >
      <label
        className="font-mono text-sm shrink-0 pt-0.5 select-none"
        style={{
          color: focused ? 'rgba(0,255,133,1)' : 'rgba(255,255,255,0.32)',
          transition: 'color 0.2s ease', letterSpacing: '0.04em',
        }}
      >
        &gt; What to Automate
      </label>
      <textarea
        name="automate" rows={4} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={base}
      />
    </motion.div>
  )
}

interface Props { contactRef?: React.RefObject<HTMLElement> }

export function Contact({ contactRef }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [validationError, setValidationError] = useState('')
  const [enquiryType, setEnquiryType] = useState('Research Agent')

  const textareaPlaceholder = enquiryType === 'Custom Agent'
    ? 'Tell us your team size, industry, and which tasks you\'d like to automate first.'
    : 'Describe the task or workflow you want to automate. More detail = better fit.'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError('')
    const fd = new FormData(e.currentTarget)
    const name     = ((fd.get('name')     ?? '') as string).trim()
    const company  = ((fd.get('company')  ?? '') as string).trim()
    const email    = ((fd.get('email')    ?? '') as string).trim()
    const automate = ((fd.get('automate') ?? '') as string).trim()

    if (!name || !email || !automate) {
      setValidationError('Please fill in your name, email, and what you want to automate.')
      return
    }

    setStatus('sending')
    try {
      await submitContact({ name, company, email, automate, type: enquiryType })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      ref={contactRef as React.RefObject<HTMLElement>}
      className="py-36 px-8 md:px-16 border-t"
      style={{ borderColor: '#1A1A1A', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <p className="font-mono uppercase mb-5 flex items-center gap-3"
        style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)' }}>
        <span style={{ width: 22, height: 1, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />
        006 &nbsp;/&nbsp; Get Started
      </p>

      <motion.h2
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans font-black leading-none mb-5"
        style={{ fontSize: 'clamp(2.8rem, 7vw, 8rem)', letterSpacing: '-0.04em' }}
      >
        Tell Us What<br />to Automate.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono mb-10 max-w-lg"
        style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, letterSpacing: '0.04em' }}
      >
        Describe what's eating your team's time. We'll reply within 24 hours with a clear plan — no fluff, no obligation.
      </motion.p>

      {/* Enquiry Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-12"
      >
        <p className="font-mono text-xs mb-4" style={{ color: 'rgba(255,255,255,0.32)', letterSpacing: '0.08em' }}>
          &gt; Enquiry Type
        </p>
        <div className="flex flex-wrap gap-3">
          {enquiryTypes.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setEnquiryType(type)}
              className="font-mono uppercase text-xs px-4 py-2"
              style={{
                letterSpacing: '0.1em',
                border: '1px solid',
                borderColor: enquiryType === type ? '#fff' : '#2A2A2A',
                background: enquiryType === type ? '#fff' : 'transparent',
                color: enquiryType === type ? '#000' : 'rgba(255,255,255,0.38)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </motion.div>

      {status === 'done' ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="max-w-3xl py-20 border" style={{ borderColor: '#1A1A1A' }}>
          <div className="px-12">
            <p className="font-mono text-xs uppercase mb-4" style={{ color: 'rgba(0,255,133,0.7)', letterSpacing: '0.14em' }}>
              ● Message Received
            </p>
            <h3 className="font-sans font-black mb-4" style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>
              We'll be in touch within 24 hours.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontSize: '0.9rem' }}>
              While you wait, check out the demo above to see how our agents work.
            </p>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl" noValidate>
          {baseFields.map(f => <TerminalField key={f.name} field={f} />)}
          <TextareaField placeholder={textareaPlaceholder} />

          {validationError && (
            <p role="alert" className="font-mono text-xs mt-4"
              style={{ color: '#ff4444', letterSpacing: '0.06em' }}>
              ✕ {validationError}
            </p>
          )}

          {status === 'error' && (
            <p role="alert" className="font-mono text-xs mt-4"
              style={{ color: '#ff4444', letterSpacing: '0.06em' }}>
              ✕ Something went wrong. Please try again or email us directly.
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="pt-12 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <button
              type="submit"
              disabled={status === 'sending'}
              className="font-mono font-bold uppercase text-xs px-10 py-5"
              style={{
                letterSpacing: '0.14em',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                border: 'none',
                color: '#000',
                background: '#fff',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                if (status === 'idle') {
                  e.currentTarget.style.transform = 'scale(0.97)'
                }
              }}
              onMouseLeave={e => {
                if (status === 'idle') {
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Request My Build Plan →'}
            </button>
            <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
              We reply within 24 hours.
            </span>
          </motion.div>
        </form>
      )}
    </section>
  )
}
