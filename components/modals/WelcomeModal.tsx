"use client"

import { useState } from "react"
import { Drawer } from "vaul"
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
    <Drawer.Root open={open} onOpenChange={handleClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-[100]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 max-h-[96vh] md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 outline-none p-6 rounded-t-2xl md:rounded-2xl z-[100]">
          {/* Drawer Handle - Mobile only */}
          <div className="md:hidden flex justify-center -mt-3 mb-3">
            <div className="w-12 h-1.5 bg-slate-600 rounded-full" />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <Drawer.Title className="text-2xl font-bold text-center text-white">
              Welcome to PresetLabs!
            </Drawer.Title>
            <Drawer.Description className="text-center text-slate-300 text-base mt-2">
              You've been given <span className="font-bold text-blue-400">10 free credits</span> to get started
            </Drawer.Description>
          </div>

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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
