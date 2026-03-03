import { StarField } from "@/components/star-field"
import { CelestialOrbit, MoonPhases, Divider } from "@/components/celestial-decorations"
import { CollegeBadge } from "@/components/college-badge"
import { HierarchySection } from "@/components/hierarchy-section"

export default function App() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Star field with nebulas */}
      <StarField />

      {/* Static CSS nebula glow layers for extra depth */}
      <div
        className="fixed top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full pointer-events-none opacity-60 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(120,50,180,0.35) 0%, rgba(80,30,150,0.15) 40%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="fixed top-[15%] right-[-15%] w-[50vw] h-[50vw] rounded-full pointer-events-none opacity-50 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(50,90,200,0.3) 0%, rgba(30,60,180,0.12) 45%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full pointer-events-none opacity-45 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(200,100,50,0.25) 0%, rgba(180,70,30,0.1) 40%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[25%] right-[0%] w-[40vw] h-[40vw] rounded-full pointer-events-none opacity-40 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(100,40,170,0.3) 0%, rgba(70,20,140,0.12) 45%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="fixed top-[45%] left-[30%] w-[35vw] h-[35vw] rounded-full pointer-events-none opacity-35 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(40,100,180,0.2) 0%, rgba(20,70,150,0.08) 50%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Background celestial orbit decoration */}
      <CelestialOrbit className="absolute top-20 -right-40 w-[500px] h-[500px] opacity-20 pointer-events-none" />
      <CelestialOrbit className="absolute bottom-40 -left-60 w-[600px] h-[600px] opacity-15 pointer-events-none rotate-45" />

      {/* Main content */}
      <main className="relative z-10 space-y-2">
        {/* Navigation hint */}
        <nav className="flex justify-center py-2 md:py-3">
          <div className="flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2L12 7.5L18 10L12 12.5L10 18L8 12.5L2 10L8 7.5L10 2Z" fill="#d4a373" opacity="0.6" />
            </svg>
            <span className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
              About Us
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2L12 7.5L18 10L12 12.5L10 18L8 12.5L2 10L8 7.5L10 2Z" fill="#d4a373" opacity="0.6" />
            </svg>
          </div>
        </nav>

        {/* Hero / College Badge Section */}
        <section className="flex flex-col items-center px-4 pt-6 md:pt-12 pb-3">
          <CollegeBadge />

          {/* Moon phases decoration */}
          <div className="mt-2 opacity-60">
            <MoonPhases className="w-64 md:w-80" />
          </div>
        </section>

        {/* About text */}
        <section className="max-w-2xl mx-auto px-6 text-center py-2">
          <Divider />
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
           KLS Gogte Institute of Technology (KLS GIT), the flagship Institute of Karnataka Law Society, Belagavi was incepted in the year 1979. 

KLS GIT is approved by AICTE and UGC and is an Autonomous Institution under Visvesvarya Technological University, Belagavi. The Institute also carries the distinction of getting A+ Accreditation from NAAC in the first and second cycle and conferred with NBA accreditation in 2004, 2008, 2015, 2021 and 2023.
          </p>
          <Divider />
        </section>

        {/* Hierarchy Section */}
        <div className="max-w-6xl mx-auto px-4">
          <HierarchySection />
        </div>

        {/* Footer */}
        <footer className="relative py-8 md:py-12 text-center">
          <div className="flex justify-center mb-4 opacity-50">
            <MoonPhases className="w-48" />
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Made by a 🐈
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            KLS Gogte Institute of Technology &middot; Aura 2026
          </p>
        </footer>
      </main>
    </div>
  )
}
