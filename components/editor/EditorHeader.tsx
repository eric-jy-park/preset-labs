"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditBadge } from "@/components/credits/CreditBadge"
import { UserButton } from "@/components/auth/UserButton"
import { Image as ImageIcon, Wand2 } from "lucide-react"

interface EditorHeaderProps {
  userName: string
}

export function EditorHeader({ userName }: EditorHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-semibold text-white">PresetLabs</h1>
          <nav className="flex items-center gap-1">
            <Link
              href="/editor"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname === "/editor"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Wand2 className="w-4 h-4" />
              Editor
            </Link>
            <Link
              href="/gallery"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname === "/gallery"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <CreditBadge />
          <span className="text-sm text-slate-400">{userName}</span>
          <UserButton />
        </div>
      </div>
    </header>
  )
}
