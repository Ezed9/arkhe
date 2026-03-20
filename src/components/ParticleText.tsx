import React, { useRef, useEffect } from 'react'

// Density & appearance
const STEP = 3            // sample every 3px — dense square dust
const DOT = 2             // 2×2 white square per particle

// Physics
const SPRING = 0.048
const FRICTION = 0.78
const REPEL_R = 130
const REPEL_F = 9

// Entrance scatter
const SCATTER_MIN = 500
const SCATTER_MAX = 900

const LETTERS = ['A', 'R', 'K', 'H', 'E']
const LETTER_DELAY_MS = LETTERS.map((_, i) => (0.6 + i * 0.15) * 1000)

interface Particle {
  x: number; y: number
  hx: number; hy: number
  vx: number; vy: number
  li: number
  t: number
}

interface Props {
  letterRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
}

export function ParticleText({ letterRefs }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999 }

    // Detect touch-only device — disable repel on mobile
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()

    const build = () => {
      particles = []
      const now = Date.now()
      const refs = letterRefs.current

      for (let li = 0; li < LETTERS.length; li++) {
        const el = refs[li]
        if (!el) continue

        const rect = el.getBoundingClientRect()
        const fontSize = parseFloat(getComputedStyle(el).fontSize)
        const isEven = li % 2 === 0

        const PAD = 30
        const W = Math.ceil(rect.width) + PAD * 2
        const H = Math.ceil(rect.height) + PAD * 2
        const off = document.createElement('canvas')
        off.width = W; off.height = H
        const oc = off.getContext('2d', { willReadFrequently: true })!
        oc.fillStyle = '#fff'
        oc.font = `900 ${fontSize}px Inter, sans-serif`
        oc.textAlign = 'center'
        oc.textBaseline = 'middle'
        oc.fillText(LETTERS[li], W / 2, H / 2)

        const { data } = oc.getImageData(0, 0, W, H)
        const activationTime = now + LETTER_DELAY_MS[li]

        for (let oy = 0; oy < H; oy += STEP) {
          for (let ox = 0; ox < W; ox += STEP) {
            if (data[(oy * W + ox) * 4 + 3] > 128) {
              const hx = rect.left + rect.width / 2 + (ox - W / 2)
              const hy = rect.top + rect.height / 2 + (oy - H / 2)

              const scatter = SCATTER_MIN + Math.random() * (SCATTER_MAX - SCATTER_MIN)
              const sy = isEven ? hy - scatter : hy + scatter
              const sx = hx + (Math.random() - 0.5) * 120

              particles.push({
                x: sx, y: sy,
                hx, hy,
                vx: 0, vy: 0,
                li,
                t: activationTime + (Math.random() - 0.5) * 80,
              })
            }
          }
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      const now = Date.now()
      const mx = mouse.x
      const my = mouse.y

      ctx.fillStyle = '#FFFFFF'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (now >= p.t) {
          p.vx += (p.hx - p.x) * SPRING
          p.vy += (p.hy - p.y) * SPRING

          // Cursor repel — only on non-touch devices
          if (!isTouch) {
            const dx = p.x - mx
            const dy = p.y - my
            const d2 = dx * dx + dy * dy
            if (d2 < REPEL_R * REPEL_R && d2 > 0) {
              const d = Math.sqrt(d2)
              const f = (1 - d / REPEL_R) * REPEL_F
              p.vx += (dx / d) * f
              p.vy += (dy / d) * f
            }
          }

          p.vx *= FRICTION
          p.vy *= FRICTION
          p.x += p.vx
          p.y += p.vy
        }

        ctx.fillRect(p.x - 1, p.y - 1, DOT, DOT)
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    let fontsTimer: ReturnType<typeof setTimeout>
    document.fonts.ready.then(() => { fontsTimer = setTimeout(build, 80) })

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    if (!isTouch) {
      window.addEventListener('mousemove', onMove)
      document.addEventListener('mouseleave', onLeave)
    }

    // Track width to ignore iOS address-bar resize (height-only changes)
    let lastWidth = window.innerWidth
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const newWidth = window.innerWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        resize()
        // Only rebuild particles if width actually changed —
        // iOS Safari fires resize on scroll when address bar hides/shows (height-only)
        if (newWidth !== lastWidth) {
          lastWidth = newWidth
          build()
        }
      }, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fontsTimer)
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    />
  )
}
