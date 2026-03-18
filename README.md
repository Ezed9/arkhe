# ARKHE — AI Agent Studio

A premium agency website for ARKHE, an AI agent studio that builds custom automation agents for businesses.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v3** — styling
- **Framer Motion** — animations
- **EmailJS** — contact form (no backend required)
- **Google Fonts** — Inter Black + JetBrains Mono

## Features

- Canvas-based particle disintegration hero (letters assemble from square dust on load, scatter on hover)
- Animated terminal demo cycling between agent simulations
- Full agency sections: Services, How It Works, Demo, Contact, Footer
- EmailJS contact form with validation and error handling
- Mobile-responsive, touch-safe (particle repel disabled on touch devices)
- Retina/HiDPI canvas rendering via `devicePixelRatio`
- Scroll progress indicator, marquee ticker, stats bar

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Ezed9/arkhe.git
cd arkhe
npm install
```

### 2. Configure EmailJS

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

Get your keys from [emailjs.com](https://www.emailjs.com):

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

Your EmailJS template should use these variables:
- `{{name}}` — sender's name
- `{{company}}` — sender's company
- `{{email}}` — sender's email (set as Reply-To)
- `{{automate}}` — what they want to automate
- `{{title}}` — auto-generated subject line

### 3. Run

```bash
npm run dev      # development server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build → http://localhost:4173
```

## Project Structure

```
src/
├── components/
│   ├── ArkheHero.tsx       # Particle hero section
│   ├── ParticleText.tsx    # Canvas particle engine
│   ├── Navigation.tsx      # Fixed top nav
│   ├── BottomSection.tsx   # Hero subtitle overlay
│   ├── Marquee.tsx         # Infinite scroll ticker
│   ├── Stats.tsx           # Capability metrics bar
│   ├── Gallery.tsx         # Services / agent cards
│   ├── SystemModal.tsx     # Full-screen agent detail modal
│   ├── Process.tsx         # How it works — 3 steps
│   ├── Lab.tsx             # Animated terminal demo
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Site footer
│   └── ScrollProgress.tsx  # 1px top scroll bar
├── lib/
│   └── email.ts            # EmailJS integration
├── App.tsx
├── index.tsx
└── index.css               # Tailwind + Google Fonts + noise texture
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## License

MIT
