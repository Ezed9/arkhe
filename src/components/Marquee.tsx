import React from 'react'
import { motion } from 'framer-motion'

const items = [
  'Custom AI Agents',
  'Workflow Automation',
  'Lead Generation',
  'Research & Analysis',
  'Sales Outreach',
  'Operations Automation',

  'Founding Slots Open',
  'Remote or In-Person',
  'Deployed in 2 Weeks',
  'ARKHE · Est. MMXXVI',
]

const track = [...items, ...items]

export function Marquee() {
  return (
    <div className="border-t border-b overflow-hidden py-4" style={{ borderColor: '#1A1A1A' }}>
      <motion.div
        className="flex gap-14 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((item, i) => (
          <span key={i} className="font-mono uppercase flex-shrink-0 flex items-center gap-14"
            style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)' }}>
            {item}
            <span style={{ color: 'rgba(255,255,255,0.08)' }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
