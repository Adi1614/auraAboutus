"use client"

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
      canvas.height = document.documentElement.scrollHeight
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
    for (let i = 0; i < 350; i++) {
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
        opacity: 0.18,
        rotation: 0.3,
      },
      {
        x: W * 0.82,
        y: H * 0.22,
        radiusX: 300,
        radiusY: 400,
        colors: [
          { hue: 210, saturation: 65, lightness: 45 },
          { hue: 230, saturation: 55, lightness: 40 },
          { hue: 190, saturation: 50, lightness: 50 },
        ],
        opacity: 0.16,
        rotation: -0.4,
      },
      {
        x: W * 0.5,
        y: H * 0.45,
        radiusX: 450,
        radiusY: 280,
        colors: [
          { hue: 20, saturation: 65, lightness: 45 },
          { hue: 35, saturation: 55, lightness: 40 },
          { hue: 10, saturation: 50, lightness: 35 },
        ],
        opacity: 0.14,
        rotation: 0.15,
      },
      {
        x: W * 0.12,
        y: H * 0.65,
        radiusX: 280,
        radiusY: 350,
        colors: [
          { hue: 270, saturation: 60, lightness: 50 },
          { hue: 290, saturation: 55, lightness: 40 },
          { hue: 250, saturation: 45, lightness: 45 },
        ],
        opacity: 0.15,
        rotation: -0.3,
      },
      {
        x: W * 0.78,
        y: H * 0.75,
        radiusX: 380,
        radiusY: 240,
        colors: [
          { hue: 200, saturation: 60, lightness: 50 },
          { hue: 220, saturation: 50, lightness: 45 },
          { hue: 180, saturation: 55, lightness: 40 },
        ],
        opacity: 0.13,
        rotation: 0.5,
      },
      {
        x: W * 0.45,
        y: H * 0.88,
        radiusX: 320,
        radiusY: 200,
        colors: [
          { hue: 300, saturation: 55, lightness: 42 },
          { hue: 320, saturation: 50, lightness: 38 },
          { hue: 280, saturation: 45, lightness: 45 },
        ],
        opacity: 0.12,
        rotation: -0.2,
      },
    ]

    // Spiral galaxy shapes
    const galaxies: Galaxy[] = [
      { x: W * 0.72, y: H * 0.12, radius: 80, armCount: 3, rotation: 0.8, hue: 30, opacity: 0.2 },
      { x: W * 0.28, y: H * 0.42, radius: 60, armCount: 2, rotation: -0.5, hue: 260, opacity: 0.15 },
      { x: W * 0.6, y: H * 0.62, radius: 70, armCount: 3, rotation: 0.3, hue: 210, opacity: 0.18 },
    ]

    // Shooting stars
    const shootingStars: ShootingStar[] = Array.from({ length: 3 }, () => ({
      x: 0,
      y: 0,
      length: 90 + Math.random() * 70,
      speed: 5 + Math.random() * 7,
      opacity: 0,
      angle: Math.PI * 0.2 + Math.random() * 0.2,
      active: false,
      timer: Math.random() * 500 + 150,
    }))

    function drawNebula(ctx: CanvasRenderingContext2D, n: Nebula) {
      ctx.save()
      ctx.translate(n.x, n.y)
      ctx.rotate(n.rotation)

      for (let layer = 0; layer < n.colors.length; layer++) {
        const c = n.colors[layer]
        const offsetX = (layer - 1) * 50
        const offsetY = (layer - 1) * 35
        const rX = n.radiusX * (1 - layer * 0.12)
        const rY = n.radiusY * (1 - layer * 0.12)

        const grad = ctx.createRadialGradient(offsetX, offsetY, 0, offsetX, offsetY, Math.max(rX, rY))
        grad.addColorStop(0, `hsla(${c.hue}, ${c.saturation}%, ${c.lightness}%, ${n.opacity * 1.8})`)
        grad.addColorStop(0.3, `hsla(${c.hue + 10}, ${c.saturation - 5}%, ${c.lightness - 5}%, ${n.opacity * 1.2})`)
        grad.addColorStop(0.6, `hsla(${c.hue - 10}, ${c.saturation - 10}%, ${c.lightness - 10}%, ${n.opacity * 0.5})`)
        grad.addColorStop(1, `hsla(${c.hue}, ${c.saturation}%, 10%, 0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.ellipse(offsetX, offsetY, rX, rY, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    function drawGalaxy(ctx: CanvasRenderingContext2D, g: Galaxy) {
      ctx.save()
      ctx.translate(g.x, g.y)
      ctx.rotate(g.rotation)

      // Core glow
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.radius * 0.3)
      coreGrad.addColorStop(0, `hsla(${g.hue}, 50%, 70%, ${g.opacity * 1.5})`)
      coreGrad.addColorStop(0.5, `hsla(${g.hue}, 40%, 50%, ${g.opacity * 0.8})`)
      coreGrad.addColorStop(1, `hsla(${g.hue}, 30%, 30%, 0)`)
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(0, 0, g.radius * 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Spiral arms
      for (let arm = 0; arm < g.armCount; arm++) {
        const armOffset = (arm / g.armCount) * Math.PI * 2
        ctx.strokeStyle = `hsla(${g.hue + arm * 20}, 45%, 55%, ${g.opacity * 0.6})`
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let t = 0; t < 100; t++) {
          const angle = armOffset + t * 0.08
          const r = t * (g.radius / 100)
          const x = Math.cos(angle) * r
          const y = Math.sin(angle) * r
          if (t === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Scatter tiny stars around the galaxy
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * g.radius * 0.9
        const sx = Math.cos(angle) * dist
        const sy = Math.sin(angle) * dist
        const sSize = Math.random() * 1.2 + 0.2
        ctx.beginPath()
        ctx.arc(sx, sy, sSize, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${g.hue + Math.random() * 40 - 20}, 40%, 75%, ${g.opacity * (1 - dist / g.radius)})`
        ctx.fill()
      }

      ctx.restore()
    }

    function activateShootingStar(s: ShootingStar) {
      s.x = Math.random() * W * 0.8
      s.y = Math.random() * H * 0.4
      s.opacity = 1
      s.active = true
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, W, H)

      // Nebulas (background)
      nebulas.forEach((n) => drawNebula(ctx, n))

      // Galaxies
      galaxies.forEach((g) => drawGalaxy(ctx, g))

      // Stars with twinkle
      const time = Date.now()
      stars.forEach((star) => {
        const flicker = Math.sin(time * 0.001 * star.speed + star.x) * 0.2
        const alpha = Math.max(0.1, Math.min(1, star.opacity + flicker))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `${star.color}${alpha})`
        ctx.fill()

        // Glow halo for larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3.5, 0, Math.PI * 2)
          ctx.fillStyle = `${star.color}${alpha * 0.06})`
          ctx.fill()
        }
      })

      // Shooting stars
      shootingStars.forEach((s) => {
        if (!s.active) {
          s.timer--
          if (s.timer <= 0) {
            activateShootingStar(s)
            s.timer = Math.random() * 700 + 250
          }
          return
        }

        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.opacity -= 0.01

        if (s.opacity <= 0 || s.x > W || s.y > H) {
          s.active = false
          s.timer = Math.random() * 700 + 250
          return
        }

        const tailX = s.x - Math.cos(s.angle) * s.length
        const tailY = s.y - Math.sin(s.angle) * s.length
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        grad.addColorStop(0, `rgba(212, 163, 115, 0)`)
        grad.addColorStop(0.6, `rgba(237, 230, 216, ${s.opacity * 0.3})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.8
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`
        ctx.fill()
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
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
