"use client"

import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

interface CongratsModalProps {
  open: boolean
  onClose: () => void
  imageUrl: string
  presetName: string
  creditsRemaining: number
}

export function CongratsModal({
  open,
  onClose,
  imageUrl,
  presetName,
  creditsRemaining,
}: CongratsModalProps) {
  useEffect(() => {
    if (open) {
      // Trigger confetti when modal opens
      const duration = 3000
      const end = Date.now() + duration

      const colors = ["#a78bfa", "#ec4899", "#f59e0b", "#10b981"]

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] border-0 bg-slate-950 p-0 gap-0 overflow-hidden shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>다운로드 완료</DialogTitle>
        </VisuallyHidden>

        {/* Image Preview - Full width */}
        <div className="relative pt-8 px-8 pb-6">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800">
            <img
              src={imageUrl}
              alt="Downloaded image"
              className="w-full h-auto object-cover"
            />
            {/* Preset Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">{presetName} 프리셋</span>
                </div>
                <span className="text-xs text-slate-400">적용됨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Credits Section */}
        <div className="px-8 pb-6">
          <div className="flex items-center justify-between py-4 px-5 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div>
              <div className="text-sm text-slate-400 mb-0.5">크레딧 사용</div>
              <div className="text-2xl font-bold text-white">-2</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-0.5">남은 크레딧</div>
              <div className="text-2xl font-bold text-emerald-400">{creditsRemaining}</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-8 pb-8 space-y-4">
          <div className="text-center py-3 px-4 bg-slate-900/30 border border-slate-800 rounded-lg">
            <p className="text-sm text-slate-400">
              PresetLabs를 이용해주셔서 감사합니다 ✨
            </p>
          </div>
          <Button
            onClick={onClose}
            className="w-full h-12 bg-white hover:bg-slate-100 text-slate-900 font-semibold transition-all"
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
