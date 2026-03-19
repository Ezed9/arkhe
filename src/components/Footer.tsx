import React from 'react'

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'How It Works', id: 'process' },
  { label: 'Demo', id: 'demo' },

  { label: 'Contact', id: 'contact' },
]

export function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="border-t" style={{ borderColor: '#1A1A1A' }}>
      {/* Main footer body */}
      <div className="px-8 md:px-16 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 border-b" style={{ borderColor: '#1A1A1A' }}>

        {/* Brand */}
        <div>
          <p className="font-sans font-black mb-4" style={{ fontSize: '1.75rem', letterSpacing: '-0.04em' }}>ARKHE</p>
          <p className="font-mono text-xs mb-6" style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 2, letterSpacing: '0.05em', maxWidth: 260 }}>
            We build AI agents that handle your repetitive work — so your team can focus on what only humans can do.
          </p>
          <span className="font-mono text-xs uppercase" style={{ letterSpacing: '0.12em', color: 'rgba(255,255,255,0.18)' }}>
            AI Agent Studio · Est. MMXXVI
          </span>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-mono uppercase text-xs mb-6" style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.22)' }}>
            Navigate
          </p>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              className="block font-mono text-xs mb-4"
              style={{
                letterSpacing: '0.1em', color: 'rgba(255,255,255,0.48)',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.2s ease', textAlign: 'left', padding: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.42)' }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Status + CTA */}
        <div>
          <p className="font-mono uppercase text-xs mb-6" style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.22)' }}>
            System Status
          </p>
          <p className="font-mono text-xs mb-2" style={{ color: 'rgba(0,255,133,0.7)', letterSpacing: '0.08em' }}>
            ● All Agents Operational
          </p>
          <p className="font-mono text-xs mb-8" style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em' }}>
            3 Founding Slots Open · Claim Yours
          </p>

          <button onClick={() => scrollTo('contact')}
            className="font-mono font-bold uppercase text-xs px-6 py-3"
            style={{
              background: '#fff', color: '#000', border: 'none',
              letterSpacing: '0.14em', cursor: 'pointer', transition: 'transform 0.1s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            Start a Project →
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 md:px-16 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <span className="font-mono text-xs" style={{ letterSpacing: '0.1em', color: 'rgba(255,255,255,0.32)' }}>
          © MMXXVI ARKHE. All rights reserved.
        </span>
        <span className="font-mono text-xs" style={{ letterSpacing: '0.1em', color: 'rgba(255,255,255,0.32)' }}>
          Privacy Policy &nbsp;·&nbsp; Terms of Service
        </span>
      </div>
    </footer>
  )
}
