import { create } from "zustand"
import type { Photo, SavedEdit } from "@/lib/db/schema"

interface PhotosState {
  // State
  photos: Photo[]
  savedEdits: SavedEdit[]
  isLoading: boolean

  // Actions
  setPhotos: (photos: Photo[]) => void
  addPhoto: (photo: Photo) => void
  deletePhoto: (id: string) => void
  setSavedEdits: (edits: SavedEdit[]) => void
  addSavedEdit: (edit: SavedEdit) => void
  toggleFavorite: (editId: string) => void
  setLoading: (isLoading: boolean) => void
  reset: () => void
}

export const usePhotosStore = create<PhotosState>((set) => ({
  // Initial state
  photos: [],
  savedEdits: [],
  isLoading: false,

  // Actions
  setPhotos: (photos) => set({ photos }),

  addPhoto: (photo) =>
    set((state) => ({
      photos: [photo, ...state.photos],
    })),

  deletePhoto: (id) =>
    set((state) => ({
      photos: state.photos.filter((p) => p.id !== id),
    })),

  setSavedEdits: (edits) => set({ savedEdits: edits }),

  addSavedEdit: (edit) =>
    set((state) => ({
      savedEdits: [edit, ...state.savedEdits],
    })),

  toggleFavorite: (editId) =>
    set((state) => ({
      savedEdits: state.savedEdits.map((edit) =>
        edit.id === editId ? { ...edit, isFavorite: !edit.isFavorite } : edit
      ),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  reset: () =>
    set({
      photos: [],
      savedEdits: [],
      isLoading: false,
    }),
}))
