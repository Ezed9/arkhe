import React from 'react'
import { motion } from 'framer-motion'

// Honest capability metrics — true from day one
const stats = [
  { value: '40hrs', label: 'Saved Per Week',      sub: 'Per Sales Agent deployment'    },
  { value: '24/7',  label: 'Agent Uptime',         sub: 'We handle all monitoring'     },
  { value: '2 Wks', label: 'From Call to Deploy',  sub: 'Guaranteed delivery timeline' },
  { value: '3×',    label: 'Faster Than Manual',    sub: 'Industry benchmark, AI agents'},
]

export function Stats() {
  return (
    <section className="border-t" style={{ borderColor: '#1A1A1A', background: '#0A0A0A' }}>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="px-8 md:px-12 py-12 border-r border-b md:border-b-0 even:border-r-0 md:even:border-r last:border-r-0"
            style={{ borderColor: '#1A1A1A' }}
          >
            <p className="font-sans font-black leading-none mb-2"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', color: '#E8E8E8' }}>
              {s.value}
            </p>
            <p className="font-mono uppercase text-xs mb-1"
              style={{ letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>
              {s.label}
            </p>
            <p className="font-mono text-xs" style={{ letterSpacing: '0.06em', color: 'rgba(255,255,255,0.42)' }}>
              {s.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
