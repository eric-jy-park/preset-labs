import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update hasSeenWelcome to true
    await db
      .update(users)
      .set({ hasSeenWelcome: true })
      .where(eq(users.id, user.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Mark welcome seen error:", error)
    return NextResponse.json({ error: "Failed to mark welcome as seen" }, { status: 500 })
  }
}
