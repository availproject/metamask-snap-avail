import { createSlice } from '@reduxjs/toolkit';
import { Network } from '@types';
import type { MetamaskPolkadotSnap } from '@avail/metamask-polkadot-adapter/build/snap';
import type {
  BlockInfo,
  SnapConfig,
  SnapRpcMethodRequest,
  Transaction,
  TxPayload,
  SnapNetworks
} from '@avail/metamask-polkadot-types';
import type { MetamaskSnapApi } from '@avail/metamask-polkadot-adapter/src/types';
import { hasMetaMask } from '../services/metamask';

interface IPolkadotSnap {
  isInstalled: boolean;
  message: string;
  snap?: MetamaskPolkadotSnap;
  balance: string;
  address: string;
  publicKey: string;
  latestBlock: BlockInfo;
  transactions: Transaction[];
  network: SnapNetworks;
  api: MetamaskSnapApi | null;
}

export interface MetamaskState {
  polkadotSnap: IPolkadotSnap;
  hasMetaMask: boolean;
}

const initialState: MetamaskState = {
  hasMetaMask: hasMetaMask(),
  polkadotSnap: {
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
    network: 'avail',
    api: null
  }
};

export const metamaskSlice = createSlice({
  name: 'metamask',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.polkadotSnap = action.payload;
    }
  }
});

export const { setData } = metamaskSlice.actions;

export default metamaskSlice.reducer;
