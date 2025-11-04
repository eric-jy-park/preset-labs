"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }, [])

  const handleMouseDown = () => setIsDragging(true)

  const handleMouseMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }, [isDragging, updatePosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      updatePosition(e.clientX)
    }
  }

  // 전역 이벤트 리스너 추가
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        updatePosition(e.clientX)
      }
      const handleGlobalMouseUp = () => {
        setIsDragging(false)
      }

      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove)
        document.removeEventListener('mouseup', handleGlobalMouseUp)
      }
    }
  }, [isDragging, updatePosition])

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-col-resize bg-slate-200 shadow-xl border border-slate-300 select-none"
    >
      {/* After Image (Bottom Layer) - Full width */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=800&q=80"
          alt="After"
          className="w-full h-full object-cover"
          style={{
            filter: "sepia(0.3) saturate(1.2) brightness(1.1) contrast(1.05)",
          }}
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-amber-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
          After
        </div>
      </div>

      {/* Before Image (Top Layer) - Clipped */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=800&q=80"
          alt="Before"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-slate-900/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Before
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-amber-500">
          <div className="flex gap-1.5">
            <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
