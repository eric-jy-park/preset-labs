"use client"

import { useEffect } from "react"
import { Drawer } from "vaul"
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
    <Drawer.Root open={open} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-[100]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 max-h-[90vh] md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[600px] md:max-h-[90vh] overflow-y-auto border-0 bg-slate-950 outline-none shadow-2xl rounded-t-2xl md:rounded-2xl z-[100]">
          {/* Drawer Handle - Mobile only */}
          <div className="md:hidden flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-slate-700 rounded-full" />
          </div>

          <VisuallyHidden>
            <Drawer.Title>다운로드 완료</Drawer.Title>
          </VisuallyHidden>

        {/* Image Preview - Full width */}
        <div className="relative pt-4 sm:pt-8 px-4 sm:px-8 pb-4 sm:pb-6">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800">
            <img
              src={imageUrl}
              alt="Downloaded image"
              className="w-full h-auto object-cover max-h-[40vh] sm:max-h-[50vh]"
            />
            {/* Preset Badge */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-black/80 backdrop-blur-xl rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-white/10">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-white truncate">{presetName} 프리셋</span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 flex-shrink-0">적용됨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Credits Section */}
        <div className="px-4 sm:px-8 pb-4 sm:pb-6">
          <div className="flex items-center justify-between py-3 sm:py-4 px-4 sm:px-5 bg-slate-900/50 border border-slate-800 rounded-lg sm:rounded-xl">
            <div>
              <div className="text-xs sm:text-sm text-slate-400 mb-0.5">크레딧 사용</div>
              <div className="text-xl sm:text-2xl font-bold text-white">-2</div>
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm text-slate-400 mb-0.5">남은 크레딧</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">{creditsRemaining}</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-4 sm:px-8 pb-4 sm:pb-8 space-y-3 sm:space-y-4">
          <div className="text-center py-2.5 sm:py-3 px-3 sm:px-4 bg-slate-900/30 border border-slate-800 rounded-lg">
            <p className="text-xs sm:text-sm text-slate-400">
              PresetLabs를 이용해주셔서 감사합니다 ✨
            </p>
          </div>
          <Button
            onClick={onClose}
            className="w-full h-11 sm:h-12 bg-white hover:bg-slate-100 text-slate-900 font-semibold transition-all"
          >
            확인
          </Button>
        </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
