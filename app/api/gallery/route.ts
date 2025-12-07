import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { gallery } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

// GET /api/gallery - Fetch user's gallery items
export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all gallery items for user, ordered by most recent first
    const items = await db
      .select()
      .from(gallery)
      .where(eq(gallery.userId, user.id))
      .orderBy(desc(gallery.downloadedAt))

    return NextResponse.json({ items })
  } catch (error) {
    console.error("Get gallery error:", error)
    return NextResponse.json({ error: "Failed to get gallery" }, { status: 500 })
  }
}

// POST /api/gallery - Save downloaded photo to gallery
export async function POST(req: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { originalUrl, fileName, width, height, presetId, presetName, filterIntensity } = body

    // Validate required fields
    if (!originalUrl || !fileName || !width || !height || !presetId || !presetName || filterIntensity === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Save to gallery
    const [item] = await db
      .insert(gallery)
      .values({
        userId: user.id,
        originalUrl,
        fileName,
        width,
        height,
        presetId,
        presetName,
        filterIntensity,
      })
      .returning()

    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error("Save to gallery error:", error)
    return NextResponse.json({ error: "Failed to save to gallery" }, { status: 500 })
  }
}
