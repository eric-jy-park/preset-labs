"use client"

import { useState } from "react"
import { Download, Loader2, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/lib/store/editor-store"
import { useCreditsStore } from "@/lib/store/credits-store"
import { applyCSSFilters } from "@/lib/filters/presets"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import { FeedbackModal } from "@/components/modals/FeedbackModal"
import { CongratsModal } from "@/components/modals/CongratsModal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

type Quality = "high" | "medium" | "low"
type Format = "jpeg" | "png"

const DOWNLOAD_COST = 2

interface DownloadButtonProps {
  hasGivenFeedback: boolean
  onFeedbackGiven: () => void
}

export function DownloadButton({ hasGivenFeedback, onFeedbackGiven }: DownloadButtonProps) {
  const { currentPhoto, selectedPreset, filterIntensity } = useEditorStore()
  const { credits, deductCredits, fetchCredits } = useCreditsStore()
  const { user } = useUser()
  const [isExporting, setIsExporting] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showCongratsModal, setShowCongratsModal] = useState(false)
  const [pendingDownload, setPendingDownload] = useState<{ quality: Quality; format: Format } | null>(null)
  const [downloadedImageUrl, setDownloadedImageUrl] = useState("")
  const [downloadedCreditsRemaining, setDownloadedCreditsRemaining] = useState(0)

  const canDownload = currentPhoto && selectedPreset
  const hasEnoughCredits = credits >= DOWNLOAD_COST

  const handleCongratsModalClose = () => {
    setShowCongratsModal(false)
    // Refetch credits to ensure we have the latest value
    fetchCredits()
  }

  const handleDownloadClick = (quality: Quality, format: Format) => {
    // Check if user needs to give feedback first
    if (!hasGivenFeedback) {
      setPendingDownload({ quality, format })
      setShowFeedbackModal(true)
      return
    }

    // Proceed with download directly
    executeDownload(quality, format)
  }

  const handleFeedbackComplete = async () => {
    setShowFeedbackModal(false)

    // Mark user as having given feedback
    try {
      await fetch("/api/feedback-given", { method: "POST" })
      onFeedbackGiven()
    } catch (err) {
      console.error("Failed to mark feedback as given:", err)
    }

    // Proceed with the pending download
    if (pendingDownload) {
      executeDownload(pendingDownload.quality, pendingDownload.format)
      setPendingDownload(null)
    }
  }

  const executeDownload = async (quality: Quality, format: Format) => {
    if (!currentPhoto || !selectedPreset) {
      toast.error("No photo or filter selected")
      return
    }

    // Check credits before proceeding
    if (!hasEnoughCredits) {
      toast.error(`Insufficient credits. You need ${DOWNLOAD_COST} credits to download.`)
      return
    }

    setIsExporting(true)

    // Deduct credits first
    const newCredits = await deductCredits()
    if (newCredits === null) {
      toast.error("Failed to deduct credits. Please try again.")
      setIsExporting(false)
      return
    }

    try {
      // Calculate adjusted filters
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

      // Load the original image
      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = currentPhoto.originalUrl
      })

      // Create canvas with original dimensions
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      canvas.width = img.width
      canvas.height = img.height

      // Apply CSS filters to canvas context
      ctx.filter = applyCSSFilters(adjustedFilters)

      // Draw the image with filters
      ctx.drawImage(img, 0, 0)

      // Determine quality value
      const qualityValue = quality === "high" ? 0.95 : quality === "medium" ? 0.85 : 0.7

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob)
            else reject(new Error("Failed to create blob"))
          },
          format === "png" ? "image/png" : "image/jpeg",
          qualityValue
        )
      })

      // Create download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${currentPhoto.fileName.split(".")[0]}-${selectedPreset.id}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Store the filtered image URL for congrats modal (don't revoke yet)
      const filteredImageUrl = url

      // Save to gallery
      try {
        await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            originalUrl: currentPhoto.originalUrl,
            fileName: currentPhoto.fileName,
            width: currentPhoto.width,
            height: currentPhoto.height,
            presetId: selectedPreset.id,
            presetName: selectedPreset.displayName,
            filterIntensity,
          }),
        })
      } catch (err) {
        console.error("Failed to save to gallery:", err)
        // Don't show error to user - download still succeeded
      }

      // Show congrats modal with filtered image
      setDownloadedImageUrl(filteredImageUrl)
      setDownloadedCreditsRemaining(newCredits)
      setShowCongratsModal(true)

      // Clean up the blob URL after modal is closed (5 seconds delay)
      setTimeout(() => URL.revokeObjectURL(filteredImageUrl), 5000)

      toast.success(`Photo downloaded! ${newCredits} credits remaining`)
    } catch (error) {
      console.error("Export error:", error)
      toast.error("Failed to export photo")
    } finally {
      setIsExporting(false)
    }
  }

  if (!canDownload) {
    return (
      <Button disabled className="w-full">
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    )
  }

  if (!hasEnoughCredits) {
    return (
      <Button disabled className="w-full" variant="outline">
        <Coins className="w-4 h-4 mr-2" />
        Insufficient Credits ({DOWNLOAD_COST} required)
      </Button>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full" disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Photo
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full md:w-56 max-w-[calc(100vw-2rem)]">
          <div className="px-2 py-2 text-xs bg-amber-500/10 border border-amber-500/30 rounded-md mx-2 my-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-medium mb-1">
              <Coins className="w-3.5 h-3.5" />
              <span>2 credits will be used</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-tight">
              Downloading will deduct 2 credits from your account
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>JPEG Format</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleDownloadClick("high", "jpeg")}>
            <div className="flex flex-col">
              <span className="font-medium">High Quality</span>
              <span className="text-xs text-slate-500">JPEG - 95% quality</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownloadClick("medium", "jpeg")}>
            <div className="flex flex-col">
              <span className="font-medium">Medium Quality</span>
              <span className="text-xs text-slate-500">JPEG - 85% quality</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownloadClick("low", "jpeg")}>
            <div className="flex flex-col">
              <span className="font-medium">Low Quality</span>
              <span className="text-xs text-slate-500">JPEG - 70% quality</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>PNG Format</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleDownloadClick("high", "png")}>
            <div className="flex flex-col">
              <span className="font-medium">PNG (Lossless)</span>
              <span className="text-xs text-slate-500">Larger file size</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Feedback Modal */}
      {user && (
        <FeedbackModal
          open={showFeedbackModal}
          onClose={handleFeedbackComplete}
          userEmail={user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress || ""}
        />
      )}

      {/* Congrats Modal */}
      {currentPhoto && selectedPreset && downloadedImageUrl && (
        <CongratsModal
          open={showCongratsModal}
          onClose={handleCongratsModalClose}
          imageUrl={downloadedImageUrl}
          presetName={selectedPreset.displayName}
          creditsRemaining={downloadedCreditsRemaining}
        />
      )}
    </>
  )
}
