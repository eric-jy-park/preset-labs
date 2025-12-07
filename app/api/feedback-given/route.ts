import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

// POST /api/feedback-given - Mark user as having given feedback
export async function POST() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mark user as having given feedback
    await db
      .update(users)
      .set({ hasGivenFeedback: true })
      .where(eq(users.id, user.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Mark feedback given error:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
