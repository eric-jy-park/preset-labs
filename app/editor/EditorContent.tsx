"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/lib/store/editor-store";
import { useCreditsStore } from "@/lib/store/credits-store";
import { PhotoUploader } from "@/components/editor/PhotoUploader";
import { FilterGallery } from "@/components/editor/FilterGallery";
import { FilterPreview } from "@/components/editor/FilterPreview";
import { DownloadButton } from "@/components/editor/DownloadButton";
import { WelcomeModal } from "@/components/modals/WelcomeModal";
import { CreditBadge } from "@/components/credits/CreditBadge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function EditorContent() {
  const { currentPhoto, setCurrentPhoto } = useEditorStore();
  const { fetchCredits } = useCreditsStore();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [hasGivenFeedback, setHasGivenFeedback] = useState(true); // Default true to avoid showing modal until we know

  // Sync user to database and fetch credits on mount
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const response = await fetch("/api/sync-user", { method: "POST" });
        const data = await response.json();

        // Show welcome modal if user hasn't seen it
        if (data.hasSeenWelcome === false) {
          setShowWelcomeModal(true);
        }

        // Track feedback status
        setHasGivenFeedback(data.hasGivenFeedback);

        // Fetch credits
        await fetchCredits();
      } catch (err) {
        console.error("Failed to initialize user:", err);
      }
    };

    initializeUser();
  }, []);

  // Refetch credits when page becomes visible (handles navigation and tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchCredits();
      }
    };

    const handleFocus = () => {
      fetchCredits();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchCredits]);

  const handleRemovePhoto = () => {
    setCurrentPhoto(null);
  };

  return (
    <main className="min-h-[calc(100vh-64px)]">
      {!currentPhoto ? (
        // Empty state - No photo uploaded
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-6">
          <div className="max-w-2xl w-full">
            <PhotoUploader />
          </div>
        </div>
      ) : (
        // Main editor - Photo uploaded
        <div className="h-full">
          <div className="flex flex-col md:flex-row gap-0 h-full">
            {/* Left - Preview */}
            <div className="bg-black/20 flex flex-col min-h-[50vh] md:min-h-[calc(100vh-64px)] w-full order-1 border-b md:border-b-0 border-slate-700/50">
              {/* Top toolbar */}
              <div className="px-4 md:px-6 py-3 flex items-center justify-between border-b border-slate-700/30">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemovePhoto}
                  className="text-slate-400 hover:text-white h-8 -ml-2"
                >
                  <X className="w-4 h-4 mr-1.5" />
                  Remove
                </Button>
                <div className="text-xs text-slate-500">
                  {currentPhoto.width} × {currentPhoto.height}
                </div>
              </div>
              {/* Preview area */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-6">
                <div className="w-full max-w-3xl">
                  <FilterPreview />
                </div>
              </div>
            </div>

            {/* Right - Filters & Download */}
            <div className="bg-slate-900/50 border-l-0 md:border-l border-slate-700/50 flex flex-col min-h-[40vh] md:h-[calc(100vh-64px)] order-2">
              {/* Filter gallery */}
              <div className="flex-1 p-3 md:p-4 flex flex-col min-h-0">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex-shrink-0">
                  Filters
                </h3>
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <FilterGallery />
                </div>
              </div>

              {/* Download section - Fixed at bottom */}
              <div className="p-3 md:p-4 border-t border-slate-700/50 flex-shrink-0 space-y-3">
                <div className="flex justify-center">
                  <CreditBadge size="small" />
                </div>
                <DownloadButton
                  hasGivenFeedback={hasGivenFeedback}
                  onFeedbackGiven={() => setHasGivenFeedback(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Modal */}
      <WelcomeModal
        open={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
    </main>
  );
}
