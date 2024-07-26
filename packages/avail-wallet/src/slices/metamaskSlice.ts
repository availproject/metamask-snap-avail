import { createSlice } from '@reduxjs/toolkit';
import { Network } from '@types';
import type { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap';
import type {
  BlockInfo,
  SnapConfig,
  SnapRpcMethodRequest,
  Transaction,
  TxPayload,
  SnapNetworks
} from '@avail-project/metamask-avail-types';
import type { MetamaskSnapApi } from '@avail-project/metamask-avail-adapter/build/types';
import { hasMetaMask } from '../services/metamask';

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

export interface MetamaskState {
  availSnap: IAvailSnap;
  hasMetaMask: boolean;
}

const initialState: MetamaskState = {
  hasMetaMask: hasMetaMask(),
  availSnap: {
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
  }
};

export const metamaskSlice = createSlice({
  name: 'metamask',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.availSnap = action.payload;
    }
  }
});

export const { setData } = metamaskSlice.actions;

export default metamaskSlice.reducer;
