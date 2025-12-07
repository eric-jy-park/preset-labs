import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { userCredits } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"

const DOWNLOAD_COST = 2

export async function POST() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get current credits
    const credits = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, user.id))
      .limit(1)

    if (credits.length === 0) {
      return NextResponse.json({ error: "User credits not found" }, { status: 404 })
    }

    const currentCredits = credits[0].credits

    // Check if user has enough credits
    if (currentCredits < DOWNLOAD_COST) {
      return NextResponse.json(
        { error: "Insufficient credits", required: DOWNLOAD_COST, current: currentCredits },
        { status: 400 }
      )
    }

    // Deduct credits
    const newCredits = currentCredits - DOWNLOAD_COST

    await db
      .update(userCredits)
      .set({
        credits: newCredits,
        lastUpdated: new Date(),
      })
      .where(eq(userCredits.userId, user.id))

    return NextResponse.json({
      success: true,
      credits: newCredits,
      deducted: DOWNLOAD_COST,
    })
  } catch (error) {
    console.error("Deduct credits error:", error)
    return NextResponse.json({ error: "Failed to deduct credits" }, { status: 500 })
  }
}
