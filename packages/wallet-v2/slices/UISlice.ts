import { create } from 'zustand';

interface UIState {
  isLoading: boolean;
  loadingMessage: string;
  enableLoadingWithMessage: (message: string) => void;
  disableLoading: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  loadingMessage: '',
  enableLoadingWithMessage: (message) => set({ isLoading: true, loadingMessage: message }),
  disableLoading: () => set({ isLoading: false, loadingMessage: '' })
}));
