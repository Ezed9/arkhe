import React from 'react'
import { motion } from 'framer-motion'

export function BottomSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 1, ease: 'easeOut' }}
      className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-6 md:pb-12 z-30 flex flex-col gap-8 md:gap-12 pointer-events-none"
    >
      <div className="w-full flex justify-center md:justify-end md:pr-[8%]">
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] leading-[1.8] max-w-[520px] text-center md:text-left pointer-events-auto" style={{ color: 'rgba(255,255,255,0.42)' }}>
          We build AI agents that handle your repetitive work —
          <br className="hidden md:block" /> so your team can focus on what only humans can do.
        </p>
      </div>
      <div className="w-full flex justify-center md:justify-end pointer-events-auto">
        <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.30)' }}>
          AI Agent Studio · Est. MMXXVI
        </span>
      </div>
    </motion.div>
  )
}
