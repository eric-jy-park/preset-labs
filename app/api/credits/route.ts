import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { userCredits } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user credits
    const credits = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, user.id))
      .limit(1)

    if (credits.length === 0) {
      return NextResponse.json({ error: "User credits not found" }, { status: 404 })
    }

    return NextResponse.json({
      credits: credits[0].credits,
    })
  } catch (error) {
    console.error("Get credits error:", error)
    return NextResponse.json({ error: "Failed to get credits" }, { status: 500 })
  }
}
