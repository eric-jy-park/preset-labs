"use client"

import { useEffect } from "react"
import { CheckCircle, X } from "lucide-react"

interface SuccessModalProps {
  onClose: () => void
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in scale-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-400 transition">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-400/20">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">감사합니다!</h2>

          <p className="text-gray-400 mb-2">이제는 우리는 같은 배를 탔습니다.</p>

          <p className="text-gray-500 text-sm">런칭 소식을 가장 먼저 전해드리겠습니다.</p>

          <div className="mt-6 flex items-center gap-2 text-xs text-gray-600 bg-white/5 rounded-lg px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span>이메일이 등록되었습니다</span>
          </div>
        </div>
      </div>
    </div>
  )
}
