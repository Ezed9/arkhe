import React, { useRef, useState } from 'react'
import { Navigation } from './components/Navigation'
import { ArkheHero } from './components/ArkheHero'
import { BottomSection } from './components/BottomSection'
import { Marquee } from './components/Marquee'
import { Stats } from './components/Stats'
import { Gallery } from './components/Gallery'
import { Process } from './components/Process'
import { Lab } from './components/Lab'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { SystemModal, SystemData } from './components/SystemModal'

export function App() {
  const [activeSystem, setActiveSystem] = useState<SystemData | null>(null)
  const contactRef = useRef<HTMLElement>(null)

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <ScrollProgress />
      <SystemModal
        system={activeSystem}
        onClose={() => setActiveSystem(null)}
        onContact={scrollToContact}
      />
      <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden bg-noise selection:bg-white selection:text-black">
        <Navigation onContact={scrollToContact} />
        <ArkheHero />
        <BottomSection />
        <Marquee />
        <Stats />
        <Gallery onView={setActiveSystem} />
        <Process />
        <Lab />
        <Contact contactRef={contactRef} />
        <Footer />
      </main>
    </>
  )
}
