import { create } from "zustand"

interface CreditsState {
  credits: number
  isLoading: boolean
  fetchCredits: () => Promise<void>
  deductCredits: () => Promise<number | null>
  setCredits: (amount: number) => void
}

export const useCreditsStore = create<CreditsState>((set, get) => ({
  credits: 0,
  isLoading: false,

  fetchCredits: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch("/api/credits")
      if (response.ok) {
        const data = await response.json()
        set({ credits: data.credits, isLoading: false })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      console.error("Failed to fetch credits:", error)
      set({ isLoading: false })
    }
  },

  deductCredits: async () => {
    try {
      const response = await fetch("/api/credits/deduct", {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        set({ credits: data.credits })
        return data.credits
      } else {
        const error = await response.json()
        console.error("Failed to deduct credits:", error)
        return null
      }
    } catch (error) {
      console.error("Failed to deduct credits:", error)
      return null
    }
  },

  setCredits: (amount) => set({ credits: amount }),
}))
