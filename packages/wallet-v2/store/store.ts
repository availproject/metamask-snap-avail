import { Transaction } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Wallet State
interface WalletState {
  forceReconnect: boolean;
  setForceReconnect: (value: boolean) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      forceReconnect: false,
      setForceReconnect: (value) => set({ forceReconnect: value }),
    }),
    { name: 'wallet-storage' } // Specify the storage key for wallet state
  )
);

// Network State
interface NetworkState {
  activeNetwork: string;
  setActiveNetwork: (network: string) => void;
}

export const useNetworkStore = create<NetworkState>()(
  persist(
    (set) => ({
      activeNetwork: 'mainnet',
      setActiveNetwork: (network) => set({ activeNetwork: network }),
    }),
    { name: 'network-storage' } // Specify the storage key for network state
  )
);

// Modal State
interface ModalState {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

// UI State (if you need it)
interface UIState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));

// Metamask State (if necessary)
interface MetamaskState {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
}

export const useMetamaskStore = create((set) => ({
    isInstalled: false,
    snap: null,
    address: null,
    publicKey: null,
    balance: null,
    transactions: [],
    api: null,
    setData: (data: any) => set((state: any) => ({ ...state, ...data })),
  }));

// Transaction State
interface TransactionStore {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  loading?: boolean;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  loading: false,
}));

