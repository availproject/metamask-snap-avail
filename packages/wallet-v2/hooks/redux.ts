import { create } from 'zustand'

// Define your Zustand store
interface AppState {
  counter: number
  increment: () => void
}

export const useAppStore = create<AppState>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
}))
