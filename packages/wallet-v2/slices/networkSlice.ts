import { Network } from '@/types';
import { create } from 'zustand';

interface NetworkState {
  items: Network[];
  activeNetwork: number;
  setNetworks: (networks: Network[]) => void;
  setActiveNetwork: (networkIndex: number) => void;
  resetNetwork: () => void;
}

const useNetworkStore = create<NetworkState>((set) => ({
  items: [],
  activeNetwork: 0,

  setNetworks: (networks) => set({ items: networks }),

  setActiveNetwork: (networkIndex) => set({ activeNetwork: networkIndex }),

  resetNetwork: () =>
    set({
      items: [],
      activeNetwork: 0
    })
}));

export default useNetworkStore;
