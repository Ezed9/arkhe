import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ParticleText } from './ParticleText'

const letters = ['A', 'R', 'K', 'H', 'E']

export function ArkheHero() {
  // Refs used by ParticleText to sample letter pixel positions
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null, null, null])

  return (
    // No overflow-hidden — particles need to travel above/below during entrance
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center">
      {/* Canvas particle system — IS the animation */}
      <ParticleText letterRefs={letterRefs} />

      {/* Eyebrow label fades in early while particles are assembling below */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
        className="font-mono uppercase mb-6 select-none relative"
        style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', zIndex: 30 }}
      >
        [ AI Agent Studio &nbsp;/&nbsp; Est. MMXXVI ]
      </motion.p>

      {/* Invisible letter spans — exist only for getBoundingClientRect in ParticleText */}
      <div
        className="relative flex items-center justify-center w-full px-2 md:px-4 cursor-default"
        style={{ zIndex: 10 }}
      >
        <div className="relative flex items-center justify-center w-full max-w-[1400px]">
          {letters.map((letter, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                marginRight: i !== letters.length - 1 ? '-0.01em' : '0',
                padding: '0.15em 0',
              }}
            >
              <span
                ref={(el) => { letterRefs.current[i] = el }}
                className="font-sans font-black leading-none select-none block"
                style={{
                  fontSize: 'clamp(80px, 22vw, 340px)',
                  letterSpacing: '0.02em',
                  // Invisible: particles are the visual, spans are layout anchors only
                  opacity: 0,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — appears after particles have mostly settled */}
      {/* Outer div handles centering; inner motion.div handles entrance animation */}
      <div className="absolute bottom-36 md:bottom-10 left-1/2 select-none" style={{ transform: 'translateX(-50%)', zIndex: 30 }}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center gap-2"
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to services"
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)' }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 36,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
            }}
          />
        </motion.button>
      </div>
    </div>
  )
}
