"use client"

import { Coins } from "lucide-react"
import { useCreditsStore } from "@/lib/store/credits-store"
import { cn } from "@/lib/utils"

interface CreditBadgeProps {
  size?: "small" | "medium"
}

export function CreditBadge({ size = "medium" }: CreditBadgeProps) {
  const { credits, isLoading } = useCreditsStore()

  const isLow = credits < 2

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        size === "small" ? "text-xs" : "text-sm",
        isLow
          ? "bg-red-500/10 text-red-400 border border-red-500/30"
          : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
      )}
    >
      <Coins className={size === "small" ? "w-3 h-3" : "w-4 h-4"} />
      {isLoading ? (
        <span className="animate-pulse">...</span>
      ) : (
        <span className="font-medium">{credits} credits</span>
      )}
    </div>
  )
}
