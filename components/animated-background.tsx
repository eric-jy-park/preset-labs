"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationFrameId: number
    const time = { value: 0 }

    const animate = () => {
      time.value += 0.0005

      ctx.fillStyle = "rgba(2, 6, 23, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Animated orbs
      const orbs = [
        { x: 0.2, y: 0.3, size: 300, color: "rgba(59, 130, 246, 0.15)" }, // Blue
        { x: 0.7, y: 0.7, size: 250, color: "rgba(168, 85, 247, 0.1)" }, // Purple
        { x: 0.5, y: 0.1, size: 200, color: "rgba(236, 72, 153, 0.08)" }, // Pink
      ]

      orbs.forEach((orb, index) => {
        const x = orb.x * canvas.width + Math.sin(time.value + index) * 50
        const y = orb.y * canvas.height + Math.cos(time.value + index * 0.7) * 50

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.size)
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(x - orb.size, y - orb.size, orb.size * 2, orb.size * 2)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
