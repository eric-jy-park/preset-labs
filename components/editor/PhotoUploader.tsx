"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePhotosStore } from "@/lib/store/photos-store"
import { useEditorStore } from "@/lib/store/editor-store"
import { toast } from "sonner"

export function PhotoUploader() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addPhoto = usePhotosStore((state) => state.addPhoto)
  const setCurrentPhoto = useEditorStore((state) => state.setCurrentPhoto)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        await uploadFile(files[0])
      }
    },
    []
  )

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        await uploadFile(files[0])
      }
    },
    []
  )

  const uploadFile = async (file: File) => {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPEG, PNG, or WebP image.")
      return
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 10MB.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const { photo } = await response.json()

      // Complete progress
      setUploadProgress(100)

      // Add to store
      addPhoto(photo)
      setCurrentPhoto(photo)

      toast.success("Photo uploaded successfully!")

      // Reset after a short delay
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 500)
    } catch (error) {
      console.error("Upload error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload photo")
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isUploading ? handleClick : undefined}
        className={`
          relative
          border-2 border-dashed rounded-2xl
          transition-all duration-200
          cursor-pointer
          overflow-hidden
          ${
            isDragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-600 hover:border-slate-500 bg-slate-800/30"
          }
          ${isUploading ? "cursor-not-allowed" : ""}
        `}
      >
        <div className="p-6 md:p-12 flex flex-col items-center justify-center text-center">
          {isUploading ? (
            <>
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-lg font-semibold text-white mb-2">Uploading...</p>
              <div className="w-full max-w-xs">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-400 mt-2">{uploadProgress}%</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-4">
                {isDragging ? (
                  <ImageIcon className="w-8 h-8 text-blue-500" />
                ) : (
                  <Upload className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {isDragging ? "Drop your photo here" : "Upload a photo"}
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Drag and drop or click to browse
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded-full">
                  JPEG
                </span>
                <span className="px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded-full">
                  PNG
                </span>
                <span className="px-3 py-1 bg-slate-700 text-xs text-slate-300 rounded-full">
                  WebP
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-3">Maximum file size: 10MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
