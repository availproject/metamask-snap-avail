import { create } from 'zustand';
import { Network } from '@/types';

interface NetworkState {
  networks: Network[];
  activeNetwork: number;
  setNetworks: (networks: Network[]) => void;
  setActiveNetwork: (networkIndex: number) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  networks: [],
  activeNetwork: 0,
  setNetworks: (networks) => set({ networks }),
  setActiveNetwork: (networkIndex) => set({ activeNetwork: networkIndex }),
}));
