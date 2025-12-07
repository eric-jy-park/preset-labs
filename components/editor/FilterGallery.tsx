"use client"

import { PRESETS, applyCSSFilters } from "@/lib/filters/presets"
import { useEditorStore } from "@/lib/store/editor-store"
import { Check } from "lucide-react"
import Image from "next/image"

export function FilterGallery() {
  const { selectedPreset, setSelectedPreset } = useEditorStore()

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {PRESETS.map((preset) => {
          const isSelected = selectedPreset?.id === preset.id

          return (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(preset)}
              className={`
                group relative
                rounded-md overflow-hidden
                transition-all duration-150
                ${
                  isSelected
                    ? "ring-2 ring-blue-500"
                    : "hover:ring-1 hover:ring-slate-600"
                }
              `}
            >
              {/* Preview Image */}
              <div className="relative aspect-square bg-slate-800">
                <img
                  src={preset.previewImage}
                  alt={preset.displayName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Selected Check */}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Preset Name */}
                <div className="absolute bottom-0 left-0 right-0 p-1.5">
                  <h3 className="text-white font-medium text-[10px] leading-tight">
                    {preset.displayName}
                  </h3>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
