import { create } from 'zustand'
import { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap'
import { SnapNetworks, Transaction } from '@avail-project/metamask-avail-types'

export interface IAvailSnap {
  isInstalled: boolean
  message: string
  snap?: MetamaskAvailSnap
  balance: string
  address: string
  publicKey: string
  latestBlock: { hash: string; number: string }
  transactions: Transaction[]
  network: SnapNetworks
  api: any | null
}

interface MetamaskState {
  availSnap: IAvailSnap
  hasMetaMask: boolean
  setData: (data: Partial<IAvailSnap>) => void
}

const hasMetaMask = (): boolean => window.ethereum?.isMetaMask ?? false

export const useMetamaskStore = create<MetamaskState>((set) => ({
  hasMetaMask: hasMetaMask(),
  availSnap: {
    isInstalled: false,
    message: '',
    balance: '0',
    address: '',
    publicKey: '',
    latestBlock: { hash: '', number: '' },
    transactions: [],
    network: 'turing',
    api: null,
  },
  setData: (data: Partial<IAvailSnap>) =>
    set((state) => ({
      availSnap: { ...state.availSnap, ...data },
    })),
}))
