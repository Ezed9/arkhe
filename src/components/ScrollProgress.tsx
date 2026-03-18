import React, { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: '1px',
      width: `${pct}%`, background: 'rgba(255,255,255,0.5)',
      zIndex: 9999, transition: 'width 0.05s linear',
    }} />
  )
}
