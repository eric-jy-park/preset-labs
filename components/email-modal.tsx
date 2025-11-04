"use client"

import type React from "react"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EmailModalProps {
  presetName: string | null
  email: string
  setEmail: (email: string) => void
  advice: string
  setAdvice: (advice: string) => void
  isLoading: boolean
  onSubmit: (e: React.FormEvent) => Promise<void>
  onClose: () => void
}

export function EmailModal({
  presetName,
  email,
  setEmail,
  advice,
  setAdvice,
  isLoading,
  onSubmit,
  onClose,
}: EmailModalProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(e)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in scale-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="inline-block p-2 bg-orange-100 rounded-lg mb-3">
              <span className="text-2xl">🎨</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {presetName ? `${presetName} 프리셋을` : "프리셋을"}
            </h2>
            <p className="text-gray-600">체험해보시겠어요?</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600">
            이메일을 남겨주시면, 출시 즉시 무료 체험권과 50% 할인 쿠폰을 드립니다.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">이메일 주소</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 border-gray-300"
                required
              />
            </div>

            {/* Advice */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">의견 및 제안사항</label>
              <Textarea
                placeholder="서비스에 대한 의견이나 바라는 기능을 알려주세요..."
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                rows={3}
                className="border-gray-300 text-gray-900 placeholder:text-gray-500 resize-none"
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg font-semibold"
            >
              {isLoading ? "제출 중..." : "무료로 시작하기"}
            </Button>
          </form>

          {/* Social Proof */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">"9,482명이 이미 등록했습니다"</p>
          </div>
        </div>
      </div>
    </div>
  )
}
