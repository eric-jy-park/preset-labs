import { NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { put } from "@vercel/blob"
import { db } from "@/lib/db"
import { photos } from "@/lib/db/schema"

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      )
    }

    // Get image dimensions
    const buffer = await file.arrayBuffer()
    const dimensions = await getImageDimensions(buffer, file.type)

    if (!dimensions) {
      return NextResponse.json(
        { error: "Could not read image dimensions" },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob
    const blob = await put(
      `uploads/${user.id}/${Date.now()}-${file.name}`,
      file,
      {
        access: "public",
        contentType: file.type,
      }
    )

    // Create photo object
    const photo = {
      id: crypto.randomUUID(),
      userId: user.id,
      originalUrl: blob.url,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      width: dimensions.width,
      height: dimensions.height,
      uploadedAt: new Date(),
      deletedAt: null,
    }

    // Try to save to database (optional - app works without DB)
    try {
      await db.insert(photos).values(photo)
    } catch (dbError) {
      console.warn("Database save failed (not critical):", dbError)
      // Continue without DB - the photo is already uploaded to Blob storage
    }

    return NextResponse.json({ photo })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    )
  }
}

// Helper function to get image dimensions from buffer
async function getImageDimensions(
  buffer: ArrayBuffer,
  mimeType: string
): Promise<{ width: number; height: number } | null> {
  try {
    // Convert ArrayBuffer to Buffer
    const buf = Buffer.from(buffer)

    // Parse image based on type
    if (mimeType === "image/png") {
      return parsePNG(buf)
    } else if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
      return parseJPEG(buf)
    } else if (mimeType === "image/webp") {
      return parseWebP(buf)
    }

    return null
  } catch (error) {
    console.error("Error parsing image:", error)
    return null
  }
}

// PNG parser
function parsePNG(buffer: Buffer): { width: number; height: number } | null {
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  if (buffer.length < 24) return null

  // IHDR chunk starts at byte 16
  const width = buffer.readUInt32BE(16)
  const height = buffer.readUInt32BE(20)

  return { width, height }
}

// JPEG parser
function parseJPEG(buffer: Buffer): { width: number; height: number } | null {
  let offset = 2 // Skip SOI marker

  while (offset < buffer.length) {
    // Check for valid JPEG marker
    if (buffer[offset] !== 0xff) return null

    const marker = buffer[offset + 1]
    offset += 2

    // SOF markers (Start of Frame)
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      // Skip 3 bytes to get to dimensions
      const height = buffer.readUInt16BE(offset + 3)
      const width = buffer.readUInt16BE(offset + 5)
      return { width, height }
    }

    // Read segment length and skip to next marker
    const segmentLength = buffer.readUInt16BE(offset)
    offset += segmentLength
  }

  return null
}

// WebP parser
function parseWebP(buffer: Buffer): { width: number; height: number } | null {
  // WebP signature: "RIFF" ... "WEBP"
  if (buffer.length < 30) return null

  // Check for VP8 or VP8L format
  const format = buffer.toString("utf8", 12, 16)

  if (format === "VP8 ") {
    // VP8 bitstream format
    const width = buffer.readUInt16LE(26) & 0x3fff
    const height = buffer.readUInt16LE(28) & 0x3fff
    return { width, height }
  } else if (format === "VP8L") {
    // VP8L (lossless) format
    const bits = buffer.readUInt32LE(21)
    const width = ((bits & 0x3fff) + 1)
    const height = (((bits >> 14) & 0x3fff) + 1)
    return { width, height }
  }

  return null
}
