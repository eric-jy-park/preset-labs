"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send } from "lucide-react";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  userEmail: string;
}

const MIN_FEEDBACK_LENGTH = 5;

// Cookie helper functions
function getCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
}

function setCookieValue(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getUVfromCookie(): string {
  const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
  const existingHash = getCookieValue("user");
  if (!existingHash) {
    setCookieValue("user", hash, 180);
    return hash;
  }
  return existingHash;
}

export function FeedbackModal({
  open,
  onClose,
  userEmail,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidFeedback = feedback.trim().length >= MIN_FEEDBACK_LENGTH;

  const handleSubmit = async () => {
    if (!isValidFeedback) return;

    setIsSubmitting(true);

    try {
      // Submit feedback to Google Sheets
      const GOOGLE_APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyrUmgyyFF-7EJHaI85kCXtmxSsUlJ41nkFttUHxAkpC_HdtW3KKZLEQN11cCQVsopc-w/exec";

      const userId = getUVfromCookie();

      const feedbackData = JSON.stringify({
        id: userId,
        email: userEmail,
        advice: feedback.trim(),
      });

      await fetch(
        `${GOOGLE_APPS_SCRIPT_URL}?action=insert&table=tab_final&data=${feedbackData}`
      );

      onClose();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      // Continue anyway - don't block the download
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={() => {}} modal dismissible={false}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-[100]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 max-h-[96vh] md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md bg-slate-900 border-0 shadow-2xl outline-none rounded-t-2xl md:rounded-2xl z-[100]">
          {/* Drawer Handle - Mobile only */}
          <div className="md:hidden flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-slate-700 rounded-full" />
          </div>

          <VisuallyHidden>
            <Drawer.Title>첫 다운로드 피드백</Drawer.Title>
          </VisuallyHidden>

        {/* Clean Header */}
        <div className="relative px-8 pt-10 pb-8">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
              <Send className="w-7 h-7 text-purple-300" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                첫 다운로드 축하해요!
              </h2>
              <p className="text-slate-400 text-sm">
                PresetLabs를 어떻게 생각하시나요?
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-5">
          {/* Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">
                솔직한 피드백을 남겨주세요
              </label>
              <span
                className={`text-xs font-medium transition-colors ${
                  isValidFeedback
                    ? "text-green-400"
                    : feedback.length > 0
                    ? "text-amber-400"
                    : "text-slate-500"
                }`}
              >
                {feedback.length}/{MIN_FEEDBACK_LENGTH}
              </span>
            </div>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="좋았던 점, 아쉬운 점, 개선이 필요한 부분 등 무엇이든 좋아요..."
              className="min-h-[120px] resize-none bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
              disabled={isSubmitting}
              autoFocus
            />
            {!isValidFeedback && feedback.length > 0 && (
              <p className="text-xs text-amber-400">
                최소 {MIN_FEEDBACK_LENGTH}자 이상 입력해주세요
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-400 leading-relaxed">
              익명으로 수집되며, 서비스 개선에만 사용됩니다
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!isValidFeedback || isSubmitting}
            className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                제출 중...
              </span>
            ) : (
              "제출하고 다운로드"
            )}
          </Button>
        </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
