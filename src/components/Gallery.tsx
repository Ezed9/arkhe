import React from 'react'
import { motion } from 'framer-motion'
import { SystemData } from './SystemModal'

const agents: SystemData[] = [
  {
    id: 'AGENT_01',
    title: 'Research &\nAnalysis Agent',
    tagline: 'Turn hours of research into minutes',
    roi: '> Saves ~12 hrs/week per analyst. ~600 hrs/yr reclaimed.',
    description:
      'This agent scans thousands of sources — news, competitor sites, academic papers, social media — and delivers a clean, structured report. You give it a question or topic; it comes back with ranked insights, source links, and a summary you can act on immediately. No more hours lost to manual research.',
    capabilities: [
      'Scans 1,000+ sources in under 60 seconds',
      'Summarises findings into clear, structured reports',
      'Tracks competitors and flags changes automatically',
      'Monitors industry news and sends daily briefings',
      'Integrates with Slack, Notion, and Google Docs',
    ],
    specs: [
      { label: 'Sources scanned', value: '1,200+' },
      { label: 'Report time', value: '<60s' },
      { label: 'Accuracy', value: '94%' },
      { label: 'Languages', value: '40+' },
    ],
    status: 'AVAILABLE NOW',
  },
  {
    id: 'AGENT_02',
    title: 'Sales &\nOutreach Agent',
    tagline: 'Books meetings while you sleep',
    roi: '> Saves ~40 hrs/week. 500+ leads/day on autopilot.',
    description:
      'This agent finds leads that match your ideal customer, writes personalised outreach for each one, sends emails and follow-ups on schedule, and hands off warm conversations to your team. It does the repetitive work of a full sales team — 24 hours a day, 7 days a week — in a fraction of the time.',
    capabilities: [
      'Finds and qualifies leads based on your ICP',
      'Writes personalised emails for each prospect',
      'Sends follow-up sequences automatically',
      'Books meetings directly into your calendar',
      'Syncs all activity to your CRM in real time',
    ],
    specs: [
      { label: 'Leads/day',      value: '500+'          },
      { label: 'Reply rate',     value: '15–25%'        },
      { label: 'Pipeline cap.',  value: '3× manual'     },
      { label: 'Time saved',     value: '40hrs/wk'      },
    ],
    status: 'AVAILABLE NOW',
  },
  {
    id: 'AGENT_03',
    title: 'Operations &\nWorkflow Agent',
    tagline: 'Automate your entire back-office',
    roi: '> Eliminates 200+ manual tasks/week. <0.1% error rate.',
    description:
      'This agent handles the repetitive tasks that slow your team down — routing support tickets, processing invoices, scheduling meetings, updating project boards, sending status reports. You define the rules once; the agent runs the process forever, without errors or delays.',
    capabilities: [
      'Routes and resolves support tickets automatically',
      'Processes and categorises invoices and documents',
      'Schedules meetings and sends smart reminders',
      'Updates project boards and notifies stakeholders',
      'Generates weekly status reports without being asked',
    ],
    specs: [
      { label: 'Tasks automated', value: '200+'       },
      { label: 'Target error rate', value: '<0.1%'   },
      { label: 'Uptime',           value: '24/7'     },
      { label: 'Setup time',       value: '2 weeks'  },
    ],
    status: 'AVAILABLE NOW',
  },
]

interface Props {
  onView: (system: SystemData) => void
}

function AgentCard({ agent, index, onView }: { agent: SystemData; index: number; onView: (s: SystemData) => void }) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative flex flex-col justify-between"
      style={{
        padding: '48px',
        minHeight: '560px',
        background: '#080808',
        border: '1px solid #222',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        borderColor: '#333',
        boxShadow: '0 0 40px rgba(0,255,133,0.04), inset 0 0 80px rgba(0,255,133,0.02)',
      }}
      onClick={() => onView(agent)}
    >
      {/* Mouse-tracking gradient spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,133,0.06), transparent 60%)`,
        }}
      />

      {/* Top edge glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,133,0.3) 50%, transparent)' }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono uppercase text-xs"
            style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)' }}>
            {agent.id}
          </span>
          <span className="font-mono text-xs"
            style={{ color: 'rgba(0,255,133,0.6)', letterSpacing: '0.08em' }}>
            ● Available Now
          </span>
        </div>

        <h3 className="font-sans font-black leading-none mb-4"
          style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', letterSpacing: '-0.03em', whiteSpace: 'pre-line' }}>
          {agent.title}
        </h3>

        <p className="font-mono text-xs mb-3"
          style={{ letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)' }}>
          {agent.tagline}
        </p>

        <p className="font-mono text-xs mb-8"
          style={{ color: 'rgba(0,255,133,0.65)', letterSpacing: '0.07em' }}>
          {agent.roi}
        </p>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {agent.capabilities.slice(0, 3).map((cap, i) => (
            <li key={i} className="font-mono text-xs py-3 border-b flex items-start gap-3"
              style={{ borderColor: '#1A1A1A', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', lineHeight: 1.6 }}>
              <span style={{ color: 'rgba(0,255,133,0.5)', fontSize: '0.45rem', flexShrink: 0, marginTop: 3 }}>■</span>
              {cap}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onView(agent) }}
        className="font-mono uppercase text-xs self-start mt-10 relative z-10"
        style={{
          letterSpacing: '0.14em', padding: '12px 28px',
          border: '1px solid #333', background: 'transparent', color: '#fff', cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#fff'
          e.currentTarget.style.color = '#000'
          e.currentTarget.style.borderColor = '#fff'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#fff'
          e.currentTarget.style.borderColor = '#333'
        }}
        onPointerDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
        onPointerUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
        onPointerLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        See Full Details →
      </button>
    </motion.article>
  )
}

export function Gallery({ onView }: Props) {
  return (
    <section id="services" className="py-36 border-t" style={{ borderColor: '#1A1A1A' }}>
      <div className="px-8 md:px-16 mb-16">
        <p className="font-mono uppercase mb-5 flex items-center gap-3"
          style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)' }}>
          <span style={{ width: 22, height: 1, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />
          003 &nbsp;/&nbsp; What We Build
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black leading-none"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 7rem)', letterSpacing: '-0.04em' }}
        >
          AI Agents That<br />Do the Work.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-mono mt-6 max-w-xl"
          style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, letterSpacing: '0.04em' }}
        >
          Each agent is custom-built for your business. Click any card to see exactly what it does and the time it saves.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ borderTop: '1px solid #1A1A1A', background: '#1A1A1A' }}>
        {agents.map((a, i) => (
          <AgentCard key={a.id} agent={a} index={i} onView={onView} />
        ))}
      </div>
    </section>
  )
}
