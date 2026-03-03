import { useState } from "react"

interface SecretaryCardProps {
  name: string
  title: string
  description: string
  tier: 1 | 2 | 3
  image?: string
}

export function SecretaryCard({ name, title, description, tier, image }: SecretaryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    1: "w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-60 lg:h-60",
    2: "w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52",
    3: "w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44",
  }

  const borderOpacity = {
    1: "border-primary/60",
    2: "border-primary/40",
    3: "border-primary/25",
  }

  return (
    <div
      className="group flex flex-col items-center gap-4 transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar circle with gradient border wrapper */}
      <div className="relative">
        <div
          className="rounded-full p-0.5 bg-gradient-to-r from-yellow-400 via-primary to-yellow-400 transition-all duration-500"
        >
          <div
            className={`${sizeClasses[tier]} rounded-full bg-secondary/50 flex items-center justify-center overflow-hidden transition-all duration-500 ${
              isHovered ? "shadow-[0_0_100px_rgba(200,149,108,0.33)]" : ""
            }`}
          >
          {/* show image when available, lazy load it, otherwise fallback to initials */}
          {image ? (
            <img
              src={image}
              loading="lazy"
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold text-primary/80">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1 tracking-widest uppercase">
                Photo
              </span>
            </div>
          )}
          {/* Decorative rings - gradient dashed + inner glow */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="98"
              stroke="url(#ringGradient)"
              strokeWidth="1"
              opacity={isHovered ? "0.6" : "0.25"}
              strokeDasharray="6 6"
              className="transition-opacity duration-500"
            />
            <circle
              cx="100"
              cy="100"
              r="92"
              stroke="#d4a373"
              strokeWidth="0.5"
              opacity={isHovered ? "0.3" : "0.1"}
              strokeDasharray="4 4"
              className="transition-opacity duration-500"
            />
          </svg>
        </div>
        {/* Glow on hover */}
        <div
          className={`absolute inset-0 rounded-full bg-primary/5 blur-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        </div> {/* close gradient border wrapper */}
      </div>
      {/* Info */}
      <div className="text-center w-full">
        <h3 className="text-base md:text-lg font-semibold text-foreground tracking-wide">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-primary tracking-[0.2em] uppercase mt-1">
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-2 max-w-[200px] leading-relaxed mx-auto">
          {description}
        </p>
      </div>
    </div>
  )
}
