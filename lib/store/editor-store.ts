import { create } from "zustand";
import type { Photo } from "@/lib/db/schema";
import type { FilterPreset } from "@/lib/filters/presets";

export type PreviewMode = "split" | "side-by-side" | "before" | "after";

interface EditorState {
  // Current state
  currentPhoto: Photo | null;
  selectedPreset: FilterPreset | null;
  filterIntensity: number; // 0-100
  isProcessing: boolean;
  previewMode: PreviewMode;

  // Actions
  setCurrentPhoto: (photo: Photo | null) => void;
  setSelectedPreset: (preset: FilterPreset | null) => void;
  updateFilterIntensity: (intensity: number) => void;
  setProcessing: (isProcessing: boolean) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  resetFilters: () => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Initial state
  currentPhoto: null,
  selectedPreset: null,
  filterIntensity: 50,
  isProcessing: false,
  previewMode: "split",

  // Actions
  setCurrentPhoto: (photo) => set({ currentPhoto: photo }),

  setSelectedPreset: (preset) =>
    set({ selectedPreset: preset, filterIntensity: 50 }),

  updateFilterIntensity: (intensity) =>
    set({ filterIntensity: Math.max(0, Math.min(100, intensity)) }),

  setProcessing: (isProcessing) => set({ isProcessing }),

  setPreviewMode: (mode) => set({ previewMode: mode }),

  resetFilters: () =>
    set({
      selectedPreset: null,
      filterIntensity: 50,
      previewMode: "split",
    }),

  reset: () =>
    set({
      currentPhoto: null,
      selectedPreset: null,
      filterIntensity: 50,
      isProcessing: false,
      previewMode: "split",
    }),
}));
