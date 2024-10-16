// stores/walletStore.ts
import { Account, Erc20TokenBalance, Transaction } from '@/types';
import { create } from 'zustand';

interface WalletState {
  connected: boolean;
  isLoading: boolean;
  loadingMessage: string;  // Add this to keep track of loading messages
  forceReconnect: boolean;
  accounts: string[];
  tokenBalance: Erc20TokenBalance;
  transactions: Transaction[];
  transactionDeploy?: Transaction;
  provider?: any;

  setProvider: (provider: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  setLoadingMessage: (message: string) => void; // New method to set loading message
  setWalletConnection: (connected: boolean) => void;
  setForceReconnect: (reconnect: boolean) => void;
  setAccounts: (accounts: Account[] | Account) => void;
  setErc20TokenBalances: (balance: Erc20TokenBalance) => void;
  setErc20TokenBalanceSelected: (balance: Erc20TokenBalance) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setTransactionDeploy: (transaction: Transaction) => void;
  clearAccounts: () => void;
  resetWallet: () => void;
}

const initialState: Omit<
  WalletState,
  | 'setIsLoading'
  | 'setLoadingMessage'
  | 'setProvider'
  | 'setWalletConnection'
  | 'setForceReconnect'
  | 'setAccounts'
  | 'setErc20TokenBalances'
  | 'setErc20TokenBalanceSelected'
  | 'setTransactions'
  | 'setTransactionDeploy'
  | 'clearAccounts'
  | 'resetWallet'
> = {
  connected: false,
  isLoading: false,
  loadingMessage: '',
  forceReconnect: false,
  accounts: [],
  tokenBalance: {} as Erc20TokenBalance,
  transactions: [],
  transactionDeploy: undefined,
  provider: undefined,
};

const useWalletStore = create<WalletState>((set) => ({
  ...initialState,

  setProvider: (provider) => set({ provider }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setLoadingMessage: (message) => set({ loadingMessage: message }), // New implementation

  setWalletConnection: (connected) => set({ connected }),
  setForceReconnect: (forceReconnect) => set({ forceReconnect }),

  setAccounts: (accounts) => {
    set((state) => ({
      accounts: Array.isArray(accounts)
        ? accounts.map((account) => account.address)
        : [...state.accounts, accounts.address]
    }));
  },

  setErc20TokenBalances: (tokenBalance) => set({ tokenBalance }),

  setErc20TokenBalanceSelected: (tokenBalance) => set({ tokenBalance }),

  setTransactions: (transactions) => set({ transactions }),

  setTransactionDeploy: (transactionDeploy) => set({ transactionDeploy }),

  clearAccounts: () => set({ accounts: [] }),

  resetWallet: () =>
    set((state) => ({
      ...initialState,
      provider: state.provider,
      forceReconnect: true
    })),
}));

export default useWalletStore;
