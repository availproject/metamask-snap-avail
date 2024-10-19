'use client'

import { ethers } from 'ethers'
import { useState } from 'react'
import { create } from 'zustand'
import { Account, Erc20TokenBalance, Transaction } from '@/types'

export interface WalletState {
  connected: boolean
  isLoading: boolean
  forceReconnect: boolean
  accounts: Account[]
  tokenBalance: Erc20TokenBalance
  transactions: Transaction[]
  transactionDeploy?: Transaction
  provider?: any // TODO: Metamask SDK does not export types
  metamaskState: any
  setProvider: (provider: any) => void
  setWalletConnection: (connected: boolean) => void
  setForceReconnect: (forceReconnect: boolean) => void
  setAccounts: (accounts: Account[] | Account) => void
  setErc20TokenBalances: (balance: Erc20TokenBalance) => void
  setErc20TokenBalanceSelected: (balance: Erc20TokenBalance) => void
  setTransactions: (transactions: Transaction[]) => void
  setTransactionDeploy: (transaction: Transaction) => void
  clearAccounts: () => void
  resetWallet: () => void
}

const initialState = {
  connected: false,
  isLoading: false,
  forceReconnect: false,
  accounts: [],
  tokenBalance: {} as Erc20TokenBalance,
  transactions: [],
  transactionDeploy: undefined,
  provider: undefined,
  metamaskState: {},
}

export const useWalletStore = create<WalletState>((set) => ({
  ...initialState,
  setProvider: (provider: any) => set({ provider }),
  setWalletConnection: (connected: boolean) => set({ connected }),
  setForceReconnect: (forceReconnect: boolean) => set({ forceReconnect }),
  setAccounts: (accounts: Account[] | Account) =>
    set((state) => {
      if (Array.isArray(accounts)) {
        return { accounts: accounts.map((account) => account) }
      }
      return { accounts: [...state.accounts, accounts] }
    }),
  setErc20TokenBalances: (balance: Erc20TokenBalance) =>
    set({ tokenBalance: balance }),
  setErc20TokenBalanceSelected: (balance: Erc20TokenBalance) =>
    set({ tokenBalance: balance }),
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  setTransactionDeploy: (transaction: Transaction) =>
    set({ transactionDeploy: transaction }),
  clearAccounts: () => set({ accounts: [] }),
  resetWallet: () =>
    set((state) => ({
      ...initialState,
      provider: state.provider,
      forceReconnect: true,
    })),
}))
