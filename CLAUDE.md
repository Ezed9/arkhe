# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server → http://localhost:5173
npm run build      # TypeScript check + production build → dist/
npm run preview    # Serve production build → http://localhost:4173
node screenshot.js # AQA screenshot (requires `npx serve dist -p 5999` running first)
```

## Architecture

Single-page React 18 + TypeScript site built with Vite. No router — all sections render vertically in `App.tsx` as a scroll-based experience.

**Section render order in App.tsx:**
Hero → BottomSection → Marquee → Stats → SocialProof → Gallery → Process → Lab → Contact → Footer

**Key architectural patterns:**
- `Gallery.tsx` defines agent data (research/sales/operations) and passes selected agent to `SystemModal.tsx` via `App.tsx` state (`activeSystem`/`setActiveSystem`)
- `SystemData` interface (exported from `SystemModal.tsx`) is the shared type for agent cards — includes `roi?` field for savings display
- Contact form uses `EmailJS` (no backend) via `src/lib/email.ts` — requires `.env.local` with `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- `ParticleText.tsx` renders the hero "ARKHE" via Canvas 2D API with physics-based particle animation (mouse repel disabled on touch)
- All sections use Framer Motion `whileInView` with `once: true` for scroll-triggered entrance animations

**Section numbering convention:** Each major section has a monospace label like `003 / What We Build`. These are hardcoded strings — when adding/removing sections, update all subsequent numbers.

## Design System (Non-Negotiable)

- **Palette:** Pure black `#000000` background, white `#FFFFFF` text, borders `#1A1A1A`. Green `#00FF85` accent only for status dots, founding client card border, and ROI text lines.
- **Typography:** Inter Black (font-weight 900) for headings with tight tracking (`-0.03em` to `-0.04em`), fluid sizing via `clamp()`. JetBrains Mono for labels/data — uppercase, wide tracking (`0.10em`–`0.18em`).
- **Animations:** Framer Motion `whileInView` with easing `[0.16, 1, 0.3, 1]`, staggered `0.1s` delays, `once: true`. Same pattern across all sections.
- **Spacing:** Large vertical padding (`py-20` to `py-36`). Horizontal: `px-8` mobile, `px-16` desktop.
- **No new npm packages** unless absolutely necessary.

## AQA (Aesthetic Quality Assurance) Loop

After visual changes: build → serve → screenshot → critique the `render.png`:
```bash
npm run build && npx serve dist -p 5999 &
sleep 3 && node screenshot.js
```
The screenshot scrolls through the page to trigger all `whileInView` animations before capture.
