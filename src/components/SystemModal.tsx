import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface SystemData {
  id: string
  title: string
  tagline: string
  roi?: string
  description: string
  capabilities: string[]
  specs: { label: string; value: string }[]
  status: string
}

interface Props {
  system: SystemData | null
  onClose: () => void
  onContact: () => void
}

export function SystemModal({ system, onClose, onContact }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (system) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [system])

  return (
    <AnimatePresence>
      {system && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0A0A0A',
              border: '1px solid #1A1A1A',
              width: '100%', maxWidth: '900px',
              maxHeight: '90vh', overflowY: 'auto',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="font-mono text-xs uppercase absolute top-6 right-6"
              style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              [ ESC ]
            </button>

            <div className="p-10 md:p-16">
              {/* Header */}
              <p className="font-mono text-xs uppercase mb-6"
                style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)' }}>
                {system.id}
              </p>

              <h2 className="font-sans font-black leading-none mb-4"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.04em', whiteSpace: 'pre-line' }}>
                {system.title}
              </h2>

              <p className="font-mono text-sm mb-10"
                style={{ letterSpacing: '0.06em', color: 'rgba(0,255,133,0.8)' }}>
                ● {system.status}
              </p>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <p className="font-mono text-xs uppercase mb-4"
                    style={{ letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>
                    Overview
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                    {system.description}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase mb-4"
                    style={{ letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>
                    Core Capabilities
                  </p>
                  <ul style={{ listStyle: 'none' }}>
                    {system.capabilities.map((cap, i) => (
                      <li key={i} className="font-mono text-sm py-2 border-b flex items-center gap-3"
                        style={{ borderColor: '#1A1A1A', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>
                        <span style={{ color: 'rgba(0,255,133,0.6)', fontSize: '0.5rem' }}>■</span>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12"
                style={{ background: '#1A1A1A' }}>
                {system.specs.map((spec, i) => (
                  <div key={i} className="px-6 py-5" style={{ background: '#0A0A0A' }}>
                    <p className="font-sans font-black mb-1"
                      style={{ fontSize: '1.4rem', letterSpacing: '-0.03em', color: '#E8E8E8' }}>
                      {spec.value}
                    </p>
                    <p className="font-mono text-xs uppercase"
                      style={{ letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>
                      {spec.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* ROI callout */}
              {system.roi && (
                <div className="mb-10 px-6 py-5 border-l-2"
                  style={{ borderColor: 'rgba(0,255,133,0.4)', background: 'rgba(0,255,133,0.03)' }}>
                  <p className="font-mono text-xs uppercase mb-2"
                    style={{ letterSpacing: '0.12em', color: 'rgba(0,255,133,0.5)' }}>
                    Estimated Time Saved
                  </p>
                  <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>
                    {system.roi}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => { onContact(); onClose() }}
                  className="font-mono text-xs uppercase px-8 py-4"
                  style={{
                    background: '#FFFFFF', color: '#000000', border: 'none',
                    letterSpacing: '0.14em', cursor: 'pointer',
                    transition: 'transform 0.1s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                >
                  Build This For My Team →
                </button>
                <button
                  onClick={onClose}
                  className="font-mono text-xs uppercase px-8 py-4"
                  style={{
                    background: 'transparent', color: 'rgba(255,255,255,0.5)',
                    border: '1px solid #1A1A1A', letterSpacing: '0.14em', cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
