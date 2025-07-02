import { create } from 'zustand';

interface InitializationState {
  isInitializing: boolean;
  initializationMessage: string;
  setInitializing: (isInitializing: boolean, message?: string) => void;
}

export const useInitializationStore = create<InitializationState>((set) => ({
  isInitializing: false,
  initializationMessage: '',
  setInitializing: (isInitializing: boolean, message: string = '') => 
    set({ isInitializing, initializationMessage: message }),
})); 
