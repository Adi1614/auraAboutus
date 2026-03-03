"use client"

import { useState } from "react"

interface SecretaryCardProps {
  name: string
  title: string
  description: string
  tier: 1 | 2 | 3
}

export function SecretaryCard({ name, title, description, tier }: SecretaryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    1: "w-52 h-52 md:w-60 md:h-60",
    2: "w-44 h-44 md:w-52 md:h-52",
    3: "w-40 h-40 md:w-44 md:h-44",
  }

  const borderOpacity = {
    1: "border-primary/60",
    2: "border-primary/40",
    3: "border-primary/25",
  }

  return (
    <div
      className="group flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar circle */}
      <div className="relative">
        <div
          className={`${sizeClasses[tier]} rounded-full border ${borderOpacity[tier]} bg-secondary/50 flex items-center justify-center overflow-hidden transition-all duration-500 ${
            isHovered ? "border-primary shadow-[0_0_30px_rgba(200,149,108,0.15)]" : ""
          }`}
        >
          {/* Placeholder avatar with initials */}
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
          {/* Decorative ring */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="98"
              stroke="#d4a373"
              strokeWidth="0.5"
              opacity={isHovered ? "0.4" : "0.15"}
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
      </div>
      {/* Info */}
      <div className="text-center">
        <h3 className="text-base md:text-lg font-semibold text-foreground tracking-wide">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-primary tracking-[0.2em] uppercase mt-1">
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-2 max-w-[200px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
