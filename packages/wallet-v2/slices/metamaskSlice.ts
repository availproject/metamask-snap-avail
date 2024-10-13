import { create } from 'zustand';
import { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap';

interface MetamaskState {
  isInstalled: boolean;
  snap: MetamaskAvailSnap | null;
  setSnap: (snap: MetamaskAvailSnap) => void;
  setIsInstalled: (isInstalled: boolean) => void;
}

export const useMetamaskStore = create<MetamaskState>((set) => ({
  isInstalled: false,
  snap: null,
  setSnap: (snap) => set({ snap }),
  setIsInstalled: (isInstalled) => set({ isInstalled }),
}));
