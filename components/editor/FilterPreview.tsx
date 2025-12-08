"use client"

import { useState, useRef, useEffect } from "react"
import { useEditorStore } from "@/lib/store/editor-store"
import { applyCSSFilters } from "@/lib/filters/presets"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

export function FilterPreview() {
  const {
    currentPhoto,
    selectedPreset,
    filterIntensity,
    updateFilterIntensity,
    previewMode,
    setPreviewMode,
  } = useEditorStore()

  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle slider drag
  const handleMouseDown = () => setIsDragging(true)

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      updateSliderPosition(e.clientX)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      updateSliderPosition(e.touches[0].clientX)
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)

    document.body.style.cursor = "ew-resize"
    document.body.style.userSelect = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging])

  if (!currentPhoto) {
    return (
      <div className="w-full h-96 bg-slate-800/30 border-2 border-dashed border-slate-600 rounded-2xl flex items-center justify-center">
        <p className="text-slate-400">Upload a photo to get started</p>
      </div>
    )
  }

  if (!selectedPreset) {
    return (
      <div className="w-full space-y-4">
        <div className="relative w-full max-h-[40vh] md:max-h-[calc(100vh-280px)] flex items-center justify-center">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 max-w-full max-h-full">
            <img
              src={currentPhoto.originalUrl}
              alt={currentPhoto.fileName}
              className="max-w-full max-h-[40vh] md:max-h-[calc(100vh-280px)] object-contain"
            />
          </div>
        </div>
        <p className="text-slate-400 text-center">Select a filter preset to preview</p>
      </div>
    )
  }

  // Calculate filter strength based on intensity
  // At 0% = original image (all neutral values), at 100% = full preset effect
  const intensityMultiplier = filterIntensity / 100
  const adjustedFilters = {
    brightness: 1 + (selectedPreset.filters.brightness - 1) * intensityMultiplier,
    contrast: 1 + (selectedPreset.filters.contrast - 1) * intensityMultiplier,
    saturate: 1 + (selectedPreset.filters.saturate - 1) * intensityMultiplier,
    sepia: selectedPreset.filters.sepia * intensityMultiplier,
    grayscale: selectedPreset.filters.grayscale * intensityMultiplier,
    hueRotate: selectedPreset.filters.hueRotate * intensityMultiplier,
  }

  const filterStyle = applyCSSFilters(adjustedFilters)

  return (
    <div className="w-full space-y-4">
      {/* Preview Mode Toggle */}
      <div className="flex items-center justify-end gap-1.5 md:gap-2">
        <Button
          variant={previewMode === "split" ? "default" : "outline"}
          size="sm"
          onClick={() => setPreviewMode("split")}
        >
          Split View
        </Button>
        <Button
          variant={previewMode === "full" ? "default" : "outline"}
          size="sm"
          onClick={() => setPreviewMode("full")}
        >
          Full View
        </Button>
      </div>

      {/* Image Preview */}
      {previewMode === "split" ? (
        <div className="relative w-full max-h-[40vh] md:max-h-[calc(100vh-280px)] flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden bg-slate-900 select-none max-w-full max-h-full"
          >
            {/* Original Image */}
            <img
              src={currentPhoto.originalUrl}
              alt="Original"
              className="max-w-full max-h-[40vh] md:max-h-[calc(100vh-280px)] object-contain block"
              draggable={false}
            />

            {/* Filtered Image Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={currentPhoto.originalUrl}
                alt="Filtered"
                className="w-full h-full object-cover"
                style={{ filter: filterStyle }}
                draggable={false}
              />
            </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 md:w-0.5 bg-white cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-slate-900" />
                <div className="w-0.5 h-4 bg-slate-900" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-white text-xs">
            {selectedPreset.displayName}
          </div>
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-white text-xs">
            Original
          </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-h-[40vh] md:max-h-[calc(100vh-280px)] flex items-center justify-center">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 max-w-full max-h-full">
            <img
              src={currentPhoto.originalUrl}
              alt="Filtered"
              className="max-w-full max-h-[40vh] md:max-h-[calc(100vh-280px)] object-contain"
              style={{ filter: filterStyle }}
            />
            {selectedPreset && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-white text-xs">
                {selectedPreset.displayName}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Intensity Control */}
      {selectedPreset && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-400">Intensity</label>
            <span className="text-sm text-white font-medium">{filterIntensity}%</span>
          </div>
          <Slider
            value={[filterIntensity]}
            onValueChange={(value) => {
              updateFilterIntensity(value[0])

              // Debounced tracking (only track when user stops dragging)
              clearTimeout((window as any).intensityTrackTimeout)
              ;(window as any).intensityTrackTimeout = setTimeout(async () => {
                if (selectedPreset) {
                  await trackEvent({
                    eventType: "intensity_changed",
                    presetId: selectedPreset.id,
                    presetName: selectedPreset.displayName,
                    intensity: value[0],
                  })
                }
              }, 1000) // 1초 debounce
            }}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      )}
    </div>
  )
}
