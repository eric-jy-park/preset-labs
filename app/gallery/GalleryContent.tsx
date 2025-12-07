"use client"

import { useEffect, useState } from "react"
import { Gallery } from "@/lib/db/schema"
import { PRESETS, applyCSSFilters } from "@/lib/filters/presets"
import { Download, Image as ImageIcon } from "lucide-react"
import { format } from "date-fns"

export function GalleryContent() {
  const [items, setItems] = useState<Gallery[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery")
        if (response.ok) {
          const data = await response.json()
          setItems(data.items)
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGallery()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-slate-400">Loading gallery...</div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center max-w-md">
          <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">No downloads yet</h2>
          <p className="text-slate-400">
            Download edited photos from the editor to see them here in your gallery
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Your Gallery</h1>
          <p className="text-slate-400">{items.length} downloaded {items.length === 1 ? 'photo' : 'photos'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            // Find the preset to reconstruct filters
            const preset = PRESETS.find((p) => p.id === item.presetId)

            // Calculate filters with intensity
            const intensityMultiplier = item.filterIntensity / 100
            const adjustedFilters = preset ? {
              brightness: 1 + (preset.filters.brightness - 1) * intensityMultiplier,
              contrast: 1 + (preset.filters.contrast - 1) * intensityMultiplier,
              saturate: 1 + (preset.filters.saturate - 1) * intensityMultiplier,
              sepia: preset.filters.sepia * intensityMultiplier,
              grayscale: preset.filters.grayscale * intensityMultiplier,
              hueRotate: preset.filters.hueRotate * intensityMultiplier,
            } : undefined

            const filterStyle = adjustedFilters ? applyCSSFilters(adjustedFilters) : ""

            return (
              <div
                key={item.id}
                className="group relative bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all"
              >
                {/* Image */}
                <div className="relative aspect-square bg-slate-900">
                  <img
                    src={item.originalUrl}
                    alt={item.fileName}
                    className="w-full h-full object-cover"
                    style={{ filter: filterStyle }}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <a
                      href={item.originalUrl}
                      download={item.fileName}
                      className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-100 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-white truncate">
                      {item.fileName}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{item.presetName}</span>
                    <span>{item.filterIntensity}%</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {format(new Date(item.downloadedAt), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
