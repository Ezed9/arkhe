import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Hardware',
    heading: 'You purchase a Mac Mini M4.',
    body: '~$600 one-time. Yours forever. No subscriptions, no per-message fees, no vendor lock-in. The hardware sits in your office and belongs entirely to you.',
    tag: 'You Own It',
  },
  {
    num: '02',
    title: 'Setup',
    heading: 'We configure everything.',
    body: 'In-person if you\'re local, fully remote if you\'re not. Two days. We install, configure, and train the agent on your exact workflows — emails, documents, tools, and integrations.',
    tag: 'In-Person or Remote',
  },
  {
    num: '03',
    title: 'Result',
    heading: 'Your AI runs 24/7.',
    body: 'Answers emails, researches topics, automates tasks, and learns your preferences — every hour of every day, without salary, sick days, or attrition. Your team focuses on what only humans can do.',
    tag: 'Forever',
  },
]

const capabilities = [
  ['Reads + replies to emails', 'Researches any topic in seconds'],
  ['Manages your calendar', 'Processes invoices + documents'],
  ['Automates Slack / WhatsApp workflows', 'Runs custom scripts on schedule'],
  ['Generates weekly reports', 'Integrates with your existing tools'],
  ['Learns your preferences over time', 'Works across 40+ languages'],
]

const badges = [
  'Data Never Leaves',
  'No Cloud Fees',
  'Open Source',
  'You Own It',
]

const viewVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
}

export function ClawdBot() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="onpremise" className="py-36 px-8 md:px-16 border-t" style={{ borderColor: '#1A1A1A' }}>
      {/* Section label */}
      <p
        className="font-mono uppercase mb-5 flex items-center gap-3"
        style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)' }}
      >
        <span style={{ width: 22, height: 1, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />
        006 &nbsp;/&nbsp; On-Premise AI
      </p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans font-black leading-none"
        style={{ fontSize: 'clamp(2.8rem, 6.5vw, 7rem)', letterSpacing: '-0.04em' }}
      >
        Your AI. Your Office.<br />Your Data.
      </motion.h2>

      {/* Subline */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="font-mono mt-6 mb-20 max-w-2xl"
        style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.9, letterSpacing: '0.04em' }}
      >
        We install a 24/7 AI agent on a dedicated Mac Mini — in your office or remotely.
        No cloud subscriptions. No data leaving your building. No per-message fees. Ever.
      </motion.p>

      {/* 3-Column Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid #1A1A1A' }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
            variants={viewVariant}
            className="relative px-12 py-14"
            style={{ borderRight: i < steps.length - 1 ? '1px solid #1A1A1A' : 'none' }}
          >
            <span
              className="font-sans font-black absolute top-8 right-10 select-none"
              style={{ fontSize: '6rem', letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}
            >
              {step.num}
            </span>

            <p
              className="font-mono uppercase text-xs mb-8"
              style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)' }}
            >
              Step {step.num} — {step.title}
            </p>

            <h3
              className="font-sans font-black leading-tight mb-5"
              style={{ fontSize: 'clamp(1.5rem, 2vw, 1.9rem)', letterSpacing: '-0.03em' }}
            >
              {step.heading}
            </h3>

            <p style={{ color: 'rgba(255,255,255,0.48)', lineHeight: 1.85, fontSize: '0.9rem' }}>
              {step.body}
            </p>

            <div className="mt-10 inline-block">
              <span
                className="font-mono uppercase text-xs px-3 py-1.5 border"
                style={{ letterSpacing: '0.12em', borderColor: '#222', color: 'rgba(255,255,255,0.3)' }}
              >
                {step.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Math Is Simple — Callout Card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0"
        style={{ border: '1px solid #1A1A1A' }}
      >
        <div className="p-12 md:p-16" style={{ borderRight: '1px solid #1A1A1A' }}>
          <p
            className="font-mono uppercase text-xs mb-8"
            style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.25)' }}
          >
            The Math Is Simple
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, fontSize: '0.95rem' }}>
            An employee costs $800–$2,000/month.
            This setup costs less than 2 months' salary —
            and works 24 hours a day, 7 days a week,
            without sick days, raises, or attrition.
          </p>
        </div>
        <div className="p-12 md:p-16 flex flex-col justify-center">
          <p
            className="font-sans font-black leading-none mb-3"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '-0.04em', color: '#E8E8E8' }}
          >
            $8,000–$22,000+
          </p>
          <p
            className="font-mono uppercase text-xs mb-1"
            style={{ letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}
          >
            First-year savings estimate
          </p>
          <p
            className="font-mono text-xs"
            style={{ letterSpacing: '0.06em', color: 'rgba(255,255,255,0.2)' }}
          >
            vs. one full-time hire
          </p>
        </div>
      </motion.div>

      {/* What It Can Do — Capability Grid */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20"
      >
        <p
          className="font-mono uppercase text-xs mb-8"
          style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)' }}
        >
          What It Can Do
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: '1px solid #1A1A1A' }}>
          {capabilities.map(([left, right], i) => (
            <React.Fragment key={i}>
              <div
                className="font-mono text-xs py-4 border-b flex items-center gap-3"
                style={{
                  borderColor: '#141414',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.05em',
                  borderRight: '1px solid #141414',
                  paddingRight: '2rem',
                }}
              >
                <span style={{ color: 'rgba(0,255,133,0.4)', flexShrink: 0 }}>&gt;</span>
                {left}
              </div>
              <div
                className="font-mono text-xs py-4 border-b flex items-center gap-3"
                style={{
                  borderColor: '#141414',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.05em',
                  paddingLeft: '2rem',
                }}
              >
                <span style={{ color: 'rgba(0,255,133,0.4)', flexShrink: 0 }}>&gt;</span>
                {right}
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Trust Block */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 px-8 py-8"
        style={{ border: '1px solid #1A1A1A' }}
      >
        <p
          className="font-mono uppercase text-xs mb-5"
          style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)' }}
        >
          How We Protect Your Data
        </p>
        <p
          className="font-mono"
          style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.42)',
            lineHeight: 2,
            letterSpacing: '0.04em',
            maxWidth: 700,
          }}
        >
          We create a dedicated, isolated account for the agent. It never touches your personal email,
          financial accounts, or existing files unless you explicitly permit it. You review and approve
          every permission before go-live. The source code is fully open — anyone can audit it.
        </p>
      </motion.div>

      {/* Privacy Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {badges.map(badge => (
          <span
            key={badge}
            className="font-mono uppercase"
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              border: '1px solid #222',
              color: 'rgba(255,255,255,0.3)',
              padding: '6px 14px',
            }}
          >
            {badge}
          </span>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-16 flex flex-wrap gap-4"
      >
        <button
          onClick={() => scrollTo('contact')}
          className="font-mono uppercase text-xs px-10 py-5"
          style={{
            background: '#fff',
            color: '#000',
            border: 'none',
            letterSpacing: '0.14em',
            cursor: 'pointer',
            transition: 'transform 0.1s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          Claim a Founding Slot →
        </button>
        <button
          onClick={() => scrollTo('process')}
          className="font-mono uppercase text-xs px-8 py-5"
          style={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.45)',
            border: '1px solid #1A1A1A',
            letterSpacing: '0.14em',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
        >
          How It Works ↑
        </button>
      </motion.div>
    </section>
  )
}
