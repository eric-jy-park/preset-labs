import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { users, userCredits } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1)

    let hasSeenWelcome = false
    let hasGivenFeedback = false

    if (existingUser.length === 0) {
      // Create user
      await db.insert(users).values({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || null,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || null,
        image: user.imageUrl || null,
        kakaoId: null, // Not using Kakao anymore
        hasSeenWelcome: false,
        hasGivenFeedback: false,
      })

      // Create user credits (10 free credits)
      await db.insert(userCredits).values({
        userId: user.id,
        credits: 10,
      })

      hasSeenWelcome = false
      hasGivenFeedback = false
    } else {
      hasSeenWelcome = existingUser[0].hasSeenWelcome
      hasGivenFeedback = existingUser[0].hasGivenFeedback
    }

    // Check if existing user has credits, create if not
    const existingCredits = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, user.id))
      .limit(1)

    if (existingCredits.length === 0) {
      // User exists but doesn't have credits (legacy user)
      await db.insert(userCredits).values({
        userId: user.id,
        credits: 10,
      })
    }

    return NextResponse.json({
      success: true,
      hasSeenWelcome,
      hasGivenFeedback,
    })
  } catch (error) {
    console.error("User sync error:", error)
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 })
  }
}
