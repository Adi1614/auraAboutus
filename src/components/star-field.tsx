import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  color: string
}

interface Nebula {
  x: number
  y: number
  radiusX: number
  radiusY: number
  colors: { hue: number; saturation: number; lightness: number }[]
  opacity: number
  rotation: number
}

interface Galaxy {
  x: number
  y: number
  radius: number
  armCount: number
  rotation: number
  hue: number
  opacity: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  angle: number
  active: boolean
  timer: number
  maxOpacity: number
  fadeInTimer: number
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const W = canvas.width
    const H = canvas.height

    // Stars -- mix of warm and cool tinted stars
    const starColors = [
      "rgba(237, 230, 216,",  // warm white
      "rgba(200, 180, 255,",  // cool blue-violet
      "rgba(255, 210, 160,",  // warm gold
      "rgba(180, 220, 255,",  // blue-white
    ]
    const stars: Star[] = []
    for (let i = 0; i < 550; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 2.2 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.8 + 0.2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      })
    }

    // Bright nebula clouds -- vivid and visible
    const nebulas: Nebula[] = [
      {
        x: W * 0.18,
        y: H * 0.1,
        radiusX: 350,
        radiusY: 250,
        colors: [
          { hue: 280, saturation: 70, lightness: 45 },
          { hue: 310, saturation: 60, lightness: 40 },
          { hue: 260, saturation: 50, lightness: 35 },
        ],
        opacity: 0.22,
        rotation: 0.3,
      },
      {
        x: W * 0.82,
        y: H * 0.22,
        radiusX: 320,
        radiusY: 280,
        colors: [
          { hue: 220, saturation: 65, lightness: 50 },
          { hue: 240, saturation: 55, lightness: 45 },
          { hue: 200, saturation: 50, lightness: 40 },
        ],
        opacity: 0.2,
        rotation: -0.25,
      },
      {
        x: W * 0.3,
        y: H * 0.65,
        radiusX: 300,
        radiusY: 200,
        colors: [
          { hue: 20, saturation: 70, lightness: 50 },
          { hue: 40, saturation: 60, lightness: 45 },
          { hue: 0, saturation: 50, lightness: 40 },
        ],
        opacity: 0.18,
        rotation: 0.4,
      },
      {
        x: W * 0.65,
        y: H * 0.35,
        radiusX: 280,
        radiusY: 320,
        colors: [
          { hue: 300, saturation: 80, lightness: 48 },
          { hue: 320, saturation: 70, lightness: 42 },
          { hue: 280, saturation: 60, lightness: 38 },
        ],
        opacity: 0.16,
        rotation: 0.5,
      },
      {
        x: W * 0.12,
        y: H * 0.5,
        radiusX: 320,
        radiusY: 240,
        colors: [
          { hue: 180, saturation: 75, lightness: 52 },
          { hue: 200, saturation: 65, lightness: 47 },
          { hue: 160, saturation: 55, lightness: 42 },
        ],
        opacity: 0.15,
        rotation: -0.3,
      },
      {
        x: W * 0.88,
        y: H * 0.75,
        radiusX: 300,
        radiusY: 250,
        colors: [
          { hue: 340, saturation: 85, lightness: 50 },
          { hue: 10, saturation: 75, lightness: 45 },
          { hue: 320, saturation: 65, lightness: 40 },
        ],
        opacity: 0.14,
        rotation: 0.2,
      },
    ]

    // Galaxies with spiral arms
    const galaxies: Galaxy[] = [
      {
        x: W * 0.75,
        y: H * 0.7,
        radius: 220,
        armCount: 4,
        rotation: 0,
        hue: 280,
        opacity: 0.22,
      },
      {
        x: W * 0.2,
        y: H * 0.3,
        radius: 180,
        armCount: 5,
        rotation: 0,
        hue: 200,
        opacity: 0.2,
      },
      {
        x: W * 0.5,
        y: H * 0.62,
        radius: 200,
        armCount: 3,
        rotation: 0,
        hue: 270,
        opacity: 0.19,
      },
      {
        x: W * 0.15,
        y: H * 0.78,
        radius: 160,
        armCount: 4,
        rotation: 0,
        hue: 320,
        opacity: 0.18,
      },
      {
        x: W * 0.85,
        y: H * 0.45,
        radius: 190,
        armCount: 3,
        rotation: 0,
        hue: 240,
        opacity: 0.2,
      },
    ]

    // Shooting stars - diagonal trajectory (left-to-right, top-to-bottom)
    const shootingStars: ShootingStar[] = []
    for (let i = 0; i < 6; i++) {
      shootingStars.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.5,
        length: Math.random() * 200 + 100,
        speed: Math.random() * 3 + 2,
        opacity: 0,
        angle: Math.PI * 0.25,
        active: false,
        timer: 0,
        maxOpacity: Math.random() * 0.4 + 0.6,
        fadeInTimer: 0,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, W, H)

      // Draw stars with twinkling
      stars.forEach((star) => {
        star.opacity += (Math.random() - 0.5) * 0.02
        star.opacity = Math.max(0.1, Math.min(0.9, star.opacity))

        ctx.fillStyle = star.color + star.opacity + ")"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw nebulas with layered gradients for depth and glow
      nebulas.forEach((nebula) => {
        nebula.rotation += 0.0001
        ctx.save()
        ctx.translate(nebula.x, nebula.y)
        ctx.rotate(nebula.rotation)

        // Multiple layers for richer visuals
        for (let layerIndex = 0; layerIndex < 3; layerIndex++) {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(nebula.radiusX, nebula.radiusY))

          if (layerIndex === 0) {
            // Bright core layer
            gradient.addColorStop(0, `hsla(${nebula.colors[0].hue}, ${nebula.colors[0].saturation + 20}%, 70%, ${nebula.opacity * 0.8})`)
            gradient.addColorStop(0.3, `hsla(${nebula.colors[1].hue}, ${nebula.colors[1].saturation}%, 50%, ${nebula.opacity * 0.5})`)
            gradient.addColorStop(1, `hsla(${nebula.colors[2].hue}, ${nebula.colors[2].saturation}%, 30%, 0)`)
          } else if (layerIndex === 1) {
            // Mid layer with color shift
            const shiftedHue = (nebula.colors[1].hue + 15) % 360
            gradient.addColorStop(0, `hsla(${shiftedHue}, 80%, 55%, 0)`)
            gradient.addColorStop(0.4, `hsla(${nebula.colors[1].hue}, ${nebula.colors[1].saturation}%, 40%, ${nebula.opacity * 0.3})`)
            gradient.addColorStop(1, `hsla(${nebula.colors[2].hue}, ${nebula.colors[2].saturation - 20}%, 20%, 0)`)
          } else {
            // Outer glow layer
            gradient.addColorStop(0, `hsla(${nebula.colors[0].hue}, ${nebula.colors[0].saturation - 10}%, 45%, 0)`)
            gradient.addColorStop(0.5, `hsla(${nebula.colors[1].hue}, ${nebula.colors[1].saturation - 20}%, 25%, ${nebula.opacity * 0.15})`)
            gradient.addColorStop(1, `hsla(${nebula.colors[2].hue}, 30%, 15%, 0)`)
          }

          ctx.fillStyle = gradient
          ctx.globalCompositeOperation = "screen"
          ctx.scale(
            1 + layerIndex * 0.3,
            1 + layerIndex * 0.2
          )
          ctx.beginPath()
          ctx.ellipse(0, 0, nebula.radiusX, nebula.radiusY, 0, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.globalCompositeOperation = "source-over"
        ctx.restore()
      })

      // Draw galaxies with better visual depth
      galaxies.forEach((galaxy) => {
        galaxy.rotation += 0.0002
        for (let arm = 0; arm < galaxy.armCount; arm++) {
          const armAngle = (arm / galaxy.armCount) * Math.PI * 2 + galaxy.rotation
          
          // Draw galaxy arm with brightness gradient
          for (let i = 0; i < 150; i++) {
            const progress = i / 150
            const r = progress * galaxy.radius
            
            // Create spiral curvature
            const spiralTwist = armAngle + r * 0.008
            const x = galaxy.x + Math.cos(spiralTwist) * r
            const y = galaxy.y + Math.sin(spiralTwist) * r
            
            // Size and brightness vary along the arm - more vibrant
            const brightness = Math.max(45, 80 - progress * 25)
            const size = Math.max(0.5, 2.5 - progress * 2)
            const glow = 1 + (1 - progress) * 0.6
            
            // Twinkling effect for stars in galaxies
            const twinkleFactor = 0.7 + Math.sin(Date.now() * 0.001 + x + y) * 0.3
            
            // Draw multiple points for smoother arms - more saturated and bright
            ctx.fillStyle = `hsla(${galaxy.hue}, 90%, ${brightness}%, ${galaxy.opacity * (1 - progress * 0.7) * twinkleFactor})`
            ctx.globalAlpha = (1 - progress * 0.4) * twinkleFactor
            ctx.beginPath()
            ctx.arc(x, y, size * glow, 0, Math.PI * 2)
            ctx.fill()
            
            // Add brighter core points with twinkling - even more vibrant
            ctx.fillStyle = `hsla(${galaxy.hue}, 95%, ${brightness + 20}%, ${galaxy.opacity * (1 - progress * 0.8) * twinkleFactor})`
            ctx.globalAlpha = (1 - progress) * 0.7 * twinkleFactor
            ctx.beginPath()
            ctx.arc(x, y, size * 0.6, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        
        // Draw bright galactic core
        ctx.globalAlpha = galaxy.opacity * 2
        const coreGradient = ctx.createRadialGradient(galaxy.x, galaxy.y, 0, galaxy.x, galaxy.y, galaxy.radius * 0.3)
        coreGradient.addColorStop(0, `hsla(${galaxy.hue}, 100%, 85%, 0.9)`)
        coreGradient.addColorStop(0.5, `hsla(${galaxy.hue}, 90%, 65%, 0.4)`)
        coreGradient.addColorStop(1, `hsla(${galaxy.hue}, 80%, 45%, 0)`)
        ctx.fillStyle = coreGradient
        ctx.beginPath()
        ctx.arc(galaxy.x, galaxy.y, galaxy.radius * 0.25, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.globalAlpha = 1.0
      })

      // Animate shooting stars
      shootingStars.forEach((star) => {
        if (Math.random() < 0.003) {
          star.x = Math.random() * W
          star.y = Math.random() * H * 0.5
          star.angle = Math.PI * 0.25 // Fixed diagonal angle
          star.active = true
          star.opacity = 0 // Start with 0 opacity for gradual fade-in
          star.timer = 0
          star.fadeInTimer = 0
          star.maxOpacity = Math.random() * 0.4 + 0.6 // Random peak brightness between 0.6-1.0
        }

        if (star.active) {
          star.x += Math.cos(star.angle) * star.speed
          star.y += Math.sin(star.angle) * star.speed
          star.timer++
          star.fadeInTimer++

          // Gradual fade-in over first 20 frames
          if (star.fadeInTimer < 20) {
            star.opacity = (star.fadeInTimer / 20) * star.maxOpacity
          } else {
            // Then gradually fade out
            star.opacity = star.maxOpacity * Math.max(0, 1 - (star.timer - 20) * 0.015)
          }

          if (star.opacity <= 0) {
            star.active = false
          }

          // Realistic tail that grows with the star's age
          const tailGrowth = Math.min(1, star.fadeInTimer / 15)
          const tailLength = star.length * tailGrowth

          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - Math.cos(star.angle) * tailLength,
            star.y - Math.sin(star.angle) * tailLength
          )
          
          // Gradient that fades realistically along the tail
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.9})`)
          gradient.addColorStop(0.3, `rgba(255, 255, 200, ${star.opacity * 0.6})`)
          gradient.addColorStop(0.7, `rgba(200, 220, 255, ${star.opacity * 0.2})`)
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 2.5 + Math.sin(Date.now() * 0.005) * 0.5
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(
            star.x - Math.cos(star.angle) * tailLength,
            star.y - Math.sin(star.angle) * tailLength
          )
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
