import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onContact: () => void
}

export function Navigation({ onContact }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
        borderBottom: '1px solid #1A1A1A',
        background: scrolled ? 'rgba(0,0,0,0.96)' : 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Left */}
      <span className="font-mono uppercase hidden md:block"
        style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)' }}>
        Est. MMXXVI
      </span>

      {/* Center */}
      <div className="flex items-center gap-8">
        {[
          { label: 'Services', id: 'services' },
          { label: 'How It Works', id: 'process' },
          { label: 'Demo', id: 'demo' },

          { label: 'Contact', id: 'contact' },
        ].map(({ label, id }) => (
          <button key={id} onClick={() => scrollTo(id)}
            className="font-mono uppercase hidden md:block"
            style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.38)' }}>
            {label}
          </button>
        ))}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono font-bold uppercase"
          style={{ fontSize: '0.75rem', letterSpacing: '0.22em', color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
          ARKHE
        </button>
      </div>

      {/* Right CTA */}
      <motion.button
        whileHover={{ scale: 0.97 }} whileTap={{ scale: 0.94 }}
        onClick={onContact}
        className="font-mono font-bold uppercase"
        style={{
          padding: '0.5rem 1.3rem',
          background: '#fff', color: '#000', border: 'none',
          fontSize: '0.6rem', letterSpacing: '0.14em', cursor: 'pointer',
        }}>
        Start a Project →
      </motion.button>
    </motion.nav>
  )
}
