'use client'

import { useState, useEffect } from 'react'
import { create } from 'zustand'
import { Account, Erc20TokenBalance, Transaction } from '@/types'

let ethers: any
if (typeof window !== 'undefined') {
  import('ethers').then((module) => {
    ethers = module
  })
}

export interface WalletState {
  connected: boolean
  isLoading: boolean
  forceReconnect: boolean
  accounts: Account[]
  tokenBalance: Erc20TokenBalance
  transactions: Transaction[]
  transactionDeploy?: Transaction
  provider?: any
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

export const useAvailSnap = () => {
  const [loading, setLoading] = useState(false)
  const {
    setProvider,
    setWalletConnection,
    setForceReconnect,
    setAccounts,
    setErc20TokenBalanceSelected,
    setTransactions,
    resetWallet,
    connected,
    accounts,
    transactions,
    provider,
  } = useWalletStore()

  const snapId =
    process.env.NEXT_PUBLIC_SNAP_ID || 'npm:@avail-project/avail-snap'
  const snapVersion = process.env.NEXT_PUBLIC_SNAP_VERSION || '*'

  useEffect(() => {
    if (typeof window !== 'undefined' && !ethers) {
      import('ethers').then((module) => {
        ethers = module
      })
    }
  }, [])

  const connectToSnap = async () => {
    setLoading(true)
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask is not installed')
      }

      if (!ethers) {
        throw new Error('Ethers library is not loaded')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      // Request account access
      await provider.send('eth_requestAccounts', [])

      // Request Snap installation
      await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: { version: snapVersion },
        },
      })

      setWalletConnection(true)
      setForceReconnect(false)
      console.log('Successfully connected to Avail Snap')
    } catch (error) {
      console.error('Error connecting to Avail Snap:', error)
      setWalletConnection(false)
      throw error // Re-throw the error for the UI to handle
    } finally {
      setLoading(false)
    }
  }

  const getNetworks = async () => {
    return [
      { name: 'turing', displayName: 'Turing Testnet', chainId: '1' },
      { name: 'goldberg', displayName: 'Goldberg Testnet', chainId: '2' },
      { name: 'mainnet', displayName: 'Mainnet', chainId: '3' },
    ]
  }

  const switchNetwork = async (network: number, chainId: string) => {
    setLoading(true)
    try {
      if (!provider) {
        throw new Error('Provider is not initialized')
      }

      const result = await provider.send('wallet_switchEthereumChain', [
        { chainId },
      ])
      console.log(`Switched to network: ${network}, chainId: ${chainId}`)
      return true
    } catch (error) {
      console.error('Error switching network:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const getWalletData = async (networkId: number, updateAccounts: boolean) => {
    try {
      if (updateAccounts) {
        if (!provider) {
          throw new Error('Provider is not initialized')
        }

        const accounts = await provider.listAccounts()
        setAccounts(
          accounts.map((address: string) => ({ address, publicKey: '' }))
        )

        // This is a placeholder - you'll need to implement actual balance fetching
        setErc20TokenBalanceSelected({
          amount: '1000',
          symbol: 'AVAIL',
          decimals: 18,
        })
      }
    } catch (error) {
      console.error('Error getting wallet data:', error)
      throw error
    }
  }

  const initSnap = async () => {
    try {
      const nets = await getNetworks()
      await getWalletData(0, true)
    } catch (error) {
      console.error('Error initializing Snap:', error)
      throw error
    }
  }

  const checkConnection = async () => {
    try {
      if (!provider) {
        setWalletConnection(false)
        return
      }

      const accounts = await provider.listAccounts()
      setWalletConnection(accounts.length > 0)
    } catch (error) {
      console.error('Error checking connection:', error)
      setWalletConnection(false)
    }
  }

  return {
    connectToSnap,
    getNetworks,
    getWalletData,
    initSnap,
    checkConnection,
    switchNetwork,
    loading,
  }
}
