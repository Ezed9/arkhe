import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Each "run" cycles through these terminal lines with typing animation
const runs = [
  {
    label: 'Research Agent',
    color: '#00FF85',
    lines: [
      { text: 'arkhe@agent:~$ run research-agent --query="Q1 competitor analysis"', delay: 0 },
      { text: '> Initialising Research Agent v2.4...', delay: 600 },
      { text: '> Loading knowledge base — 84,000 indexed sources', delay: 1100 },
      { text: '> Scanning 1,247 competitor pages...', delay: 1700 },
      { text: '> Processing 18,400 data points...', delay: 2400 },
      { text: '> Cross-referencing pricing, features, positioning...', delay: 3200 },
      { text: '', delay: 3900 },
      { text: '  FINDINGS ─────────────────────────────────────', delay: 4000, highlight: true },
      { text: '  ■ Competitors analysed      14', delay: 4200 },
      { text: '  ■ Market gaps identified     3', delay: 4500 },
      { text: '  ■ Pricing opportunity        +22% headroom', delay: 4800 },
      { text: '  ■ Confidence score           94.2 / 100', delay: 5100 },
      { text: '  ─────────────────────────────────────────────', delay: 5300, highlight: true },
      { text: '', delay: 5400 },
      { text: '> Report exported → competitor_analysis_Q1_2026.pdf', delay: 5600 },
      { text: '> Sent to #strategy in Slack ✓', delay: 6200 },
      { text: '> Time elapsed: 0:00:52', delay: 6800 },
      { text: '', delay: 7000 },
      { text: 'arkhe@agent:~$ _', delay: 7200, cursor: true },
    ],
  },
  {
    label: 'Sales Agent',
    color: '#00FF85',
    lines: [
      { text: 'arkhe@agent:~$ run sales-agent --mode=outreach', delay: 0 },
      { text: '> Initialising Sales Agent v3.1...', delay: 600 },
      { text: '> Pulling lead list from CRM — 2,847 contacts', delay: 1100 },
      { text: '> Scoring leads against ICP...', delay: 1700 },
      { text: '> 89 high-priority leads identified', delay: 2400 },
      { text: '> Generating personalised emails...', delay: 3000 },
      { text: '', delay: 3700 },
      { text: '  OUTREACH SUMMARY ────────────────────────────', delay: 3800, highlight: true },
      { text: '  ■ Emails drafted             89', delay: 4000 },
      { text: '  ■ Follow-up sequences        3-touch, 7-day', delay: 4300 },
      { text: '  ■ Avg personalisation score  9.1 / 10', delay: 4600 },
      { text: '  ■ Predicted reply rate       18 – 24%', delay: 4900 },
      { text: '  ────────────────────────────────────────────', delay: 5100, highlight: true },
      { text: '', delay: 5200 },
      { text: '> Queued for sending — Mon 9:00 AM local time', delay: 5400 },
      { text: '> Calendar blocks reserved for meetings ✓', delay: 6100 },
      { text: '> CRM updated ✓', delay: 6600 },
      { text: '', delay: 7000 },
      { text: 'arkhe@agent:~$ _', delay: 7200, cursor: true },
    ],
  },
]

function TerminalLine({ text, highlight, cursor }: { text: string; highlight?: boolean; cursor?: boolean }) {
  return (
    <div className="font-mono text-xs leading-relaxed flex items-center gap-1"
      style={{
        color: highlight ? 'rgba(0,255,133,0.7)' : 'rgba(255,255,255,0.65)',
        letterSpacing: '0.05em',
        whiteSpace: 'pre',
        fontFamily: '"JetBrains Mono", monospace',
      }}>
      {text}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ display: 'inline-block', width: 7, height: 13, background: 'rgba(255,255,255,0.7)', marginLeft: 2 }}
        />
      )}
    </div>
  )
}

export function Lab() {
  const [runIndex, setRunIndex] = useState(0)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const run = runs[runIndex]

  useEffect(() => {
    setVisibleLines([])
    const timers: ReturnType<typeof setTimeout>[] = []
    run.lines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      }, line.delay))
    })
    // Auto-cycle to next run after all lines are shown + pause
    const lastDelay = run.lines[run.lines.length - 1].delay + 3000
    timers.push(setTimeout(() => {
      setRunIndex(idx => (idx + 1) % runs.length)
    }, lastDelay))
    return () => timers.forEach(clearTimeout)
  }, [runIndex])

  return (
    <section id="demo" className="py-36 px-8 md:px-16 border-t" style={{ borderColor: '#1A1A1A' }}>
      <p className="font-mono uppercase mb-5 flex items-center gap-3"
        style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)' }}>
        <span style={{ width: 22, height: 1, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />
        004 &nbsp;/&nbsp; See It Work
      </p>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans font-black leading-none mb-6"
        style={{ fontSize: 'clamp(2.8rem, 6.5vw, 7rem)', letterSpacing: '-0.04em' }}
      >
        Watch an Agent<br />Run a Task.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="font-mono mb-16 max-w-lg"
        style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.9, letterSpacing: '0.04em' }}
      >
        This is a live simulation of how our agents work. Each one takes a task, executes it step-by-step, and delivers a result — in under a minute.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ border: '1px solid #1A1A1A', background: '#080808' }}
      >
        {/* Terminal top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: '#1A1A1A' }}>
          <div className="flex items-center gap-2">
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#333', display: 'inline-block' }} />
          </div>
          <span className="font-mono uppercase text-xs"
            style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)' }}>
            ARKHE Agent Terminal — {run.label}
          </span>
          <span className="font-mono text-xs" style={{ color: 'rgba(0,255,133,0.6)', letterSpacing: '0.1em' }}>
            ● Running
          </span>
        </div>

        {/* Terminal body */}
        <div ref={containerRef}
          style={{ padding: '28px 32px', height: '340px', overflowY: 'auto', scrollBehavior: 'smooth' }}>
          {run.lines.map((line, i) => (
            visibleLines.includes(i) ? (
              <motion.div key={`${runIndex}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}>
                <TerminalLine text={line.text} highlight={(line as any).highlight} cursor={(line as any).cursor} />
              </motion.div>
            ) : null
          ))}
        </div>

        {/* Agent switcher */}
        <div className="flex items-center gap-4 px-5 py-3 border-t" style={{ borderColor: '#1A1A1A' }}>
          <span className="font-mono uppercase text-xs" style={{ letterSpacing: '0.1em', color: 'rgba(255,255,255,0.22)' }}>
            Switch demo:
          </span>
          {runs.map((r, i) => (
            <button key={i} onClick={() => setRunIndex(i)}
              className="font-mono uppercase text-xs px-3 py-1"
              style={{
                letterSpacing: '0.1em', cursor: 'pointer', border: '1px solid',
                borderColor: runIndex === i ? 'rgba(0,255,133,0.5)' : '#222',
                color: runIndex === i ? 'rgba(0,255,133,0.9)' : 'rgba(255,255,255,0.3)',
                background: 'transparent', transition: 'all 0.2s ease',
              }}>
              {r.label}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
