import { create } from 'zustand';

interface LoaderState {
  loader: { isLoading: boolean; loadingMessage: string };
  enableLoadingWithMessage: (message: string) => void;
  disableLoading: () => void;
}

export const useUIStore = create<LoaderState>((set) => ({
  loader: { isLoading: false, loadingMessage: '' },
  enableLoadingWithMessage: (message: string) =>
    set((state) => ({
      loader: { ...state.loader, isLoading: true, loadingMessage: message }
    })),
  disableLoading: () =>
    set((state) => ({
      loader: { ...state.loader, isLoading: false, loadingMessage: '' }
    }))
}));
