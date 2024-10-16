import { create } from 'zustand';
import type { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap';
import type {
  BlockInfo,
  SnapRpcMethodRequest,
  Transaction,
  TxPayload,
  SnapNetworks,
} from '@avail-project/metamask-avail-types';
import type { MetamaskSnapApi } from '@avail-project/metamask-avail-adapter/build/types';
import { hasMetaMask as checkMetaMask } from '../services/metamask';

interface IAvailSnap {
  isInstalled: boolean;
  message: string;
  snap?: MetamaskAvailSnap;
  balance: string;
  address: string;
  publicKey: string;
  latestBlock: BlockInfo;
  transactions: Transaction[];
  network: SnapNetworks;
  api: MetamaskSnapApi | null;
}

interface MetamaskState {
  availSnap: IAvailSnap;
  hasMetaMask: boolean;
  setAvailSnap: (data: IAvailSnap) => void;
}

const initialAvailSnap: IAvailSnap = {
  isInstalled: false,
  message: '',
  balance: '0',
  address: '',
  publicKey: '',
  latestBlock: {
    hash: '',
    number: ''
  },
  transactions: [],
  network: 'turing',
  api: null
};

const useMetamaskStore = create<MetamaskState>((set) => ({
  availSnap: initialAvailSnap,
  hasMetaMask: checkMetaMask(),

  setAvailSnap: (data: IAvailSnap) => set((state) => ({
    availSnap: { ...state.availSnap, ...data }
  })),
}));

export default useMetamaskStore;
