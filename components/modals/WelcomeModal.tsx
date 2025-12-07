"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gift, Download } from "lucide-react"

interface WelcomeModalProps {
  open: boolean
  onClose: () => void
}

export function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = async () => {
    setIsClosing(true)

    try {
      // Mark welcome as seen
      await fetch("/api/welcome-seen", { method: "POST" })
    } catch (error) {
      console.error("Failed to mark welcome as seen:", error)
    }

    setIsClosing(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Welcome to PresetLabs!
          </DialogTitle>
          <DialogDescription className="text-center text-slate-300 text-base mt-2">
            You've been given <span className="font-bold text-blue-400">10 free credits</span> to get started
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Each download costs 2 credits
                </h4>
                <p className="text-xs text-slate-400">
                  You can download up to 5 edited photos with your free credits
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            Need more credits? You can purchase them anytime from your account settings
          </div>
        </div>

        <Button
          onClick={handleClose}
          disabled={isClosing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {isClosing ? "Loading..." : "Got it, let's start!"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
