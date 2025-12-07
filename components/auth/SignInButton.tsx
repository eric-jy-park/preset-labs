"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface SignInButtonProps {
  children?: React.ReactNode
  className?: string
  callbackUrl?: string
}

export function SignInButton({ children, className, callbackUrl = "/editor" }: SignInButtonProps) {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push(`/sign-in?redirect_url=${encodeURIComponent(callbackUrl)}`)}
      className={className}
    >
      {children || "시작하기"}
    </Button>
  )
}
