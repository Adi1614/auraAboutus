export function CelestialOrbit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer orbit */}
      <ellipse
        cx="200"
        cy="200"
        rx="180"
        ry="180"
        stroke="#d4a373"
        strokeWidth="0.5"
        opacity="0.2"
      />
      {/* Middle orbit */}
      <ellipse
        cx="200"
        cy="200"
        rx="130"
        ry="130"
        stroke="#d4a373"
        strokeWidth="0.5"
        opacity="0.15"
      />
      {/* Inner orbit */}
      <ellipse
        cx="200"
        cy="200"
        rx="80"
        ry="80"
        stroke="#d4a373"
        strokeWidth="0.5"
        opacity="0.1"
      />
      {/* Diagonal orbit */}
      <ellipse
        cx="200"
        cy="200"
        rx="160"
        ry="60"
        stroke="#d4a373"
        strokeWidth="0.5"
        opacity="0.15"
        transform="rotate(35 200 200)"
      />
      {/* Cross lines */}
      <line x1="200" y1="20" x2="200" y2="380" stroke="#d4a373" strokeWidth="0.3" opacity="0.1" />
      <line x1="20" y1="200" x2="380" y2="200" stroke="#d4a373" strokeWidth="0.3" opacity="0.1" />
      {/* Small dots on orbits */}
      <circle cx="200" cy="20" r="3" fill="#d4a373" opacity="0.4" />
      <circle cx="330" cy="200" r="2" fill="#d4a373" opacity="0.3" />
      <circle cx="200" cy="330" r="2.5" fill="#d4a373" opacity="0.35" />
      <circle cx="100" cy="100" r="2" fill="#d4a373" opacity="0.25" />
      {/* Center symbol */}
      <circle cx="200" cy="200" r="8" stroke="#d4a373" strokeWidth="0.8" opacity="0.3" />
      <circle cx="200" cy="200" r="3" fill="#d4a373" opacity="0.4" />
    </svg>
  )
}

export function MoonPhases({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* New Moon */}
      <circle cx="20" cy="20" r="10" stroke="#d4a373" strokeWidth="0.8" opacity="0.4" />
      {/* Waxing Crescent */}
      <circle cx="70" cy="20" r="10" stroke="#d4a373" strokeWidth="0.8" opacity="0.4" />
      <path d="M70 10 A10 10 0 0 1 70 30 A5 10 0 0 0 70 10" fill="#d4a373" opacity="0.3" />
      {/* First Quarter */}
      <circle cx="120" cy="20" r="10" stroke="#d4a373" strokeWidth="0.8" opacity="0.4" />
      <path d="M120 10 A10 10 0 0 1 120 30 L120 10 Z" fill="#d4a373" opacity="0.3" />
      {/* Full Moon */}
      <circle cx="160" cy="20" r="10" fill="#d4a373" opacity="0.35" stroke="#d4a373" strokeWidth="0.8" />
      {/* Last Quarter */}
      <circle cx="200" cy="20" r="10" stroke="#d4a373" strokeWidth="0.8" opacity="0.4" />
      <path d="M200 10 A10 10 0 0 0 200 30 L200 10 Z" fill="#d4a373" opacity="0.3" />
      {/* Waning Crescent */}
      <circle cx="250" cy="20" r="10" stroke="#d4a373" strokeWidth="0.8" opacity="0.4" />
      <path d="M250 10 A10 10 0 0 0 250 30 A5 10 0 0 1 250 10" fill="#d4a373" opacity="0.3" />
      {/* Dark Moon */}
      <circle cx="300" cy="20" r="10" stroke="#d4a373" strokeWidth="0.8" opacity="0.4" fill="#d4a373" fillOpacity="0.05" />
    </svg>
  )
}

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/40" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="#d4a373" opacity="0.6" />
      </svg>
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  )
}
