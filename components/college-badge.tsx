export function CollegeBadge() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Badge / Emblem */}
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 h-32 md:w-40 md:h-40"
          aria-label="College emblem"
        >
          {/* Outer circle */}
          <circle cx="100" cy="100" r="95" stroke="#d4a373" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="88" stroke="#d4a373" strokeWidth="0.5" opacity="0.5" />
          {/* Inner circle */}
          <circle cx="100" cy="100" r="70" stroke="#d4a373" strokeWidth="0.8" opacity="0.6" />
          {/* Shield shape */}
          <path
            d="M100 40 L140 60 L140 110 Q140 145 100 165 Q60 145 60 110 L60 60 Z"
            stroke="#d4a373"
            strokeWidth="1"
            fill="none"
            opacity="0.8"
          />
          {/* Star at top */}
          <path
            d="M100 50 L103 58 L112 58 L105 63 L108 72 L100 67 L92 72 L95 63 L88 58 L97 58 Z"
            fill="#d4a373"
            opacity="0.7"
          />
          {/* Book symbol */}
          <rect x="85" y="80" width="30" height="22" rx="1" stroke="#d4a373" strokeWidth="0.8" opacity="0.6" />
          <line x1="100" y1="80" x2="100" y2="102" stroke="#d4a373" strokeWidth="0.8" opacity="0.6" />
          {/* Torch / Knowledge */}
          <line x1="100" y1="108" x2="100" y2="140" stroke="#d4a373" strokeWidth="1" opacity="0.5" />
          <path
            d="M95 108 Q100 100 105 108"
            stroke="#d4a373"
            strokeWidth="0.8"
            fill="#d4a373"
            opacity="0.4"
          />
          {/* Corner decorations */}
          <circle cx="100" cy="5" r="2" fill="#d4a373" opacity="0.4" />
          <circle cx="195" cy="100" r="2" fill="#d4a373" opacity="0.3" />
          <circle cx="100" cy="195" r="2" fill="#d4a373" opacity="0.4" />
          <circle cx="5" cy="100" r="2" fill="#d4a373" opacity="0.3" />
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl" />
      </div>
      {/* Placeholder college name */}
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Est. 1970
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-wider text-balance">
          Your College Name
        </h1>
        <p className="mt-3 text-primary text-sm md:text-base tracking-[0.25em] uppercase">
          Department of Excellence
        </p>
      </div>
    </div>
  )
}
