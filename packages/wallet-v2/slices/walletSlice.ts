import { create } from 'zustand'
import { Account, Erc20TokenBalance, Transaction } from '@/types'

interface WalletState {
  connected: boolean
  isLoading: boolean
  loadingMessage: string
  forceReconnect: boolean
  accounts: string[]
  tokenBalance: Erc20TokenBalance
  transactions: Transaction[]
  transactionDeploy?: Transaction
  provider?: any
  setProvider: (provider: any) => void
  setIsLoading: (isLoading: boolean) => void
  setLoadingMessage: (message: string) => void
  setWalletConnection: (connected: boolean) => void
  setForceReconnect: (reconnect: boolean) => void
  setAccounts: (accounts: Account[] | Account) => void
  setErc20TokenBalances: (balance: Erc20TokenBalance) => void
  setErc20TokenBalanceSelected: (balance: Erc20TokenBalance) => void
  setTransactions: (transactions: Transaction[]) => void
  setTransactionDeploy: (transaction: Transaction) => void
  clearAccounts: () => void
  resetWallet: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  connected: false,
  isLoading: true,
  loadingMessage: '',
  forceReconnect: false,
  accounts: [],
  tokenBalance: {} as Erc20TokenBalance,
  transactions: [],
  transactionDeploy: undefined,
  provider: undefined,
  setProvider: (provider) => set({ provider }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setLoadingMessage: (message) => set({ loadingMessage: message }),
  setWalletConnection: (connected) => set({ connected }),
  setForceReconnect: (forceReconnect) => set({ forceReconnect }),
  setAccounts: (accounts) =>
    set((state) => ({
      accounts: Array.isArray(accounts)
        ? accounts.map((account) => account.address)
        : [...state.accounts, accounts.address],
    })),
  setErc20TokenBalances: (tokenBalance) => set({ tokenBalance }),
  setErc20TokenBalanceSelected: (tokenBalance) => set({ tokenBalance }),
  setTransactions: (transactions) => set({ transactions }),
  setTransactionDeploy: (transactionDeploy) => set({ transactionDeploy }),
  clearAccounts: () => set({ accounts: [] }),
  resetWallet: () =>
    set((state) => ({
      connected: false,
      isLoading: true,
      loadingMessage: '',
      forceReconnect: true,
      accounts: [],
      tokenBalance: {} as Erc20TokenBalance,
      transactions: [],
      transactionDeploy: undefined,
      provider: state.provider,
    })),
}))
