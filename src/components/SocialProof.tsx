import React from 'react'
import { motion } from 'framer-motion'

const benchmarks = [
  {
    value: '$300K+',
    label: 'Annual Savings',
    sub: 'Avg per company deploying AI agents',
    source: 'Source: Klarna / 2025',
  },
  {
    value: '97%',
    label: 'Faster Response',
    sub: 'Reduction in first response time',
    source: 'Source: Pylon / 2025',
  },
  {
    value: '70%',
    label: 'Tasks Automated',
    sub: 'Repetitive tasks handled without error',
    source: 'Source: Bizbot / 2025',
  },
]

export function SocialProof() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="border-t" style={{ borderColor: '#1A1A1A' }}>
      {/* Benchmark Stats */}
      <div className="px-8 md:px-16 pt-16 pb-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="font-mono uppercase flex items-center gap-3"
          style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.30)' }}
        >
          <span style={{ width: 22, height: 1, background: 'rgba(255,255,255,0.14)', display: 'inline-block' }} />
          [ INDUSTRY BENCHMARKS · VERIFIED DATA ]
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid #1A1A1A' }}>
        {benchmarks.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="px-8 md:px-12 py-12 border-r border-b md:border-b-0 last:border-r-0"
            style={{ borderColor: '#1A1A1A' }}
          >
            <p
              className="font-sans font-black leading-none mb-2"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', color: '#E8E8E8' }}
            >
              {b.value}
            </p>
            <p
              className="font-mono uppercase text-xs mb-1"
              style={{ letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}
            >
              {b.label}
            </p>
            <p
              className="font-mono text-xs mb-3"
              style={{ letterSpacing: '0.06em', color: 'rgba(255,255,255,0.30)' }}
            >
              {b.sub}
            </p>
            <p
              className="font-mono"
              style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.28)' }}
            >
              {b.source}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Founding Clients Card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="mx-8 md:mx-16 mb-16 mt-10"
        style={{
          background: '#080808',
          border: '1px solid #1A1A1A',
          borderLeft: '3px solid #00FF85',
          padding: '48px',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="font-mono text-xs"
                style={{ color: 'rgba(0,255,133,0.9)', letterSpacing: '0.1em' }}
              >
                ●
              </motion.span>
              <span
                className="font-mono uppercase text-xs"
                style={{ letterSpacing: '0.16em', color: 'rgba(0,255,133,0.6)' }}
              >
                Founding Slots Open
              </span>
            </div>

            <h3
              className="font-sans font-black leading-none mb-5"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '-0.04em',
              }}
            >
              Work With Us First.
            </h3>

            <p
              className="font-mono"
              style={{
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.9,
                letterSpacing: '0.04em',
                maxWidth: 480,
              }}
            >
              We're accepting 3 founding clients this quarter. You get priority access and a
              dedicated build. We publish the results as a public case study.
            </p>

            <p
              className="font-mono text-xs mt-5"
              style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em' }}
            >
              [ 3 of 3 slots remaining ]
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => scrollTo('contact')}
              className="font-mono font-bold uppercase text-xs px-8 py-4"
              style={{
                border: 'none',
                background: '#fff',
                color: '#000',
                letterSpacing: '0.14em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(0.97)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Claim a Slot →
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
