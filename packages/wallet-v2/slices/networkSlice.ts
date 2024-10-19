import { create } from 'zustand';
import { Network } from '@/types';

export interface NetworkState {
  items: Network[];
  activeNetwork: number;
  setNetworks: (networks: Network[]) => void;
  setActiveNetwork: (index: number) => void;
  resetNetwork: () => void;
}

const initialState: Omit<NetworkState, 'setNetworks' | 'setActiveNetwork' | 'resetNetwork'> = {
  items: [],
  activeNetwork: 0,
};

export const useNetworkStore = create<NetworkState>((set) => ({
  ...initialState,
  setNetworks: (networks) => set({ items: networks }),
  setActiveNetwork: (index) => set({ activeNetwork: index }),
  resetNetwork: () => set({ ...initialState }),
}));
