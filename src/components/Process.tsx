import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Discover',
    heading: 'We listen first.',
    body: 'A free 30-minute call — no pitch, no pressure. We ask about your workflow, find where time is being wasted, and tell you honestly whether an AI agent can fix it. You leave with a clear answer, not a sales deck.',
    tag: 'Free · No Commitment',
  },
  {
    num: '02',
    title: 'Build',
    heading: 'We build it. You approve it.',
    body: 'We design, build, and test a custom agent for your exact workflow in two weeks. You review every step, give feedback, and we refine it until it works exactly how you need it to — before anything goes live.',
    tag: '2-Week Delivery · Zero Risk',
  },
  {
    num: '03',
    title: 'Deploy',
    heading: 'It runs. You scale.',
    body: 'Your agent goes live and works 24/7 without your team lifting a finger. We handle all technical maintenance and send you a weekly report — every task completed, how long it would have taken manually, and what\'s queued next.',
    tag: 'Fully Managed',
  },
]

export function Process() {
  return (
    <section id="process" className="py-36 border-t" style={{ borderColor: '#1A1A1A', background: '#0A0A0A' }}>
      <div className="px-8 md:px-16 mb-20">
        <p className="font-mono uppercase mb-5 flex items-center gap-3"
          style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)' }}>
          <span style={{ width: 22, height: 1, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />
          004 &nbsp;/&nbsp; How It Works
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black leading-none"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 7rem)', letterSpacing: '-0.04em' }}
        >
          Simple to Start.<br />Powerful to Scale.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid #1A1A1A' }}>
        {steps.map((step, i) => (
          <motion.div key={step.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            className="relative px-12 py-14"
            style={{ borderRight: i < steps.length - 1 ? '1px solid #1A1A1A' : 'none' }}
          >
            {/* Step number — huge background */}
            <span className="font-sans font-black absolute top-8 right-10 select-none"
              style={{ fontSize: '6rem', letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>
              {step.num}
            </span>

            <p className="font-mono uppercase text-xs mb-8"
              style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)' }}>
              Step {step.num} — {step.title}
            </p>

            <h3 className="font-sans font-black leading-tight mb-5"
              style={{ fontSize: 'clamp(1.5rem, 2vw, 1.9rem)', letterSpacing: '-0.03em' }}>
              {step.heading}
            </h3>

            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, fontSize: '0.9rem' }}>
              {step.body}
            </p>

            <div className="mt-10 inline-block">
              <span className="font-mono uppercase text-xs px-3 py-1.5 border"
                style={{ letterSpacing: '0.12em', borderColor: 'rgba(0,255,133,0.25)', color: 'rgba(0,255,133,0.6)' }}>
                {step.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
