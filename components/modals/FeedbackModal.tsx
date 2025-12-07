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
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"

interface FeedbackModalProps {
  open: boolean
  onClose: (feedback?: string) => void
  userEmail: string
}

export function FeedbackModal({ open, onClose, userEmail }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Submit feedback to Google Sheets
      const GOOGLE_APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyrUmgyyFF-7EJHaI85kCXtmxSsUlJ41nkFttUHxAkpC_HdtW3KKZLEQN11cCQVsopc-w/exec"

      const feedbackData = JSON.stringify({
        email: userEmail,
        feedback: feedback || "No feedback provided",
        timestamp: new Date().toISOString(),
      })

      await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=insert&table=tab_feedback&data=${feedbackData}`)

      onClose(feedback)
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      // Continue anyway - don't block the download
      onClose(feedback)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleSkip}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            첫 다운로드를 축하합니다!
          </DialogTitle>
          <DialogDescription className="text-center text-slate-300 text-base mt-2">
            PresetLabs를 더 좋게 만들기 위해 여러분의 의견이 필요합니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              어떤 점이 좋았나요? 또는 개선이 필요한 부분이 있나요?
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="자유롭게 의견을 남겨주세요... (선택사항)"
              className="min-h-[120px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400 text-center">
              피드백은 익명으로 수집되며, 서비스 개선에만 사용됩니다
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white"
          >
            {isSubmitting ? "제출 중..." : "피드백 제출하고 다운로드"}
          </Button>
          <Button
            onClick={handleSkip}
            disabled={isSubmitting}
            variant="ghost"
            className="w-full text-slate-400 hover:text-white"
          >
            건너뛰기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
