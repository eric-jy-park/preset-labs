"use client"

import type React from "react"
import { useState, useRef } from "react"

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const newPosition = ((e.touches[0].clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-col-resize bg-slate-200 shadow-xl border border-slate-300"
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=800&q=80"
          alt="Before"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-slate-900/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Before
        </div>
      </div>

      {/* After Image with Golden Overlay */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=800&q=80"
          alt="After"
          className="h-full object-cover"
          style={{
            width: `${100 / (sliderPosition / 100)}%`,
            filter: "sepia(0.3) saturate(1.2) brightness(1.1) contrast(1.05)",
          }}
        />
        <div className="absolute top-4 left-4 bg-amber-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
          After
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-amber-500">
          <div className="flex gap-1.5">
            <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
