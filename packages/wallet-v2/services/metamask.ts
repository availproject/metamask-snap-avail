import { Network } from '@/types';
import { enableAvailSnap } from '@avail-project/metamask-avail-adapter';
import { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap';
import { InjectedMetamaskExtension } from '@avail-project/metamask-avail-adapter/build/types';
import { SnapNetworks } from '@avail-project/metamask-avail-types';
import { web3EnablePromise } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';

export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

export const defaultSnapId = 'npm:@avail-project/avail-snap';

export async function installAvailSnap(): Promise<boolean> {
  const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId;
  try {
    await enableAvailSnap({ networkName: 'turing' }, snapId);
    return true;
  } catch (err) {
    return false;
  }
}

export async function isAvailSnapInstalled(): Promise<boolean> {
  return !!(await getInjectedMetamaskExtension());
}

export async function getInjectedMetamaskExtension(): Promise<InjectedMetamaskExtension | null> {
  const extensions = await web3EnablePromise;
  return getMetamaskExtension(extensions || []) || null;
}

function getMetamaskExtension(
  extensions: InjectedExtension[]
): InjectedMetamaskExtension | undefined {
  return extensions.find((item) => item.name === 'metamask-avail-snap') as unknown as
    | InjectedMetamaskExtension
    | undefined;
}

export interface SnapInitializationResponse {
  isSnapInstalled: boolean;
  snap?: MetamaskAvailSnap;
}

export async function initiateAvailSnap(
  network: SnapNetworks
): Promise<SnapInitializationResponse> {
  const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId;

  try {
    const metamaskAvailSnap = await enableAvailSnap({ networkName: network }, snapId);
    return { isSnapInstalled: true, snap: metamaskAvailSnap };
  } catch (e) {
    return { isSnapInstalled: false };
  }
}

export const useAvailSnap = () => {
  const snapId = process.env.REACT_APP_SNAP_ID
    ? process.env.REACT_APP_SNAP_ID
    : 'npm:@avail-project/avail-snap';
  const snapVersion = process.env.REACT_APP_SNAP_VERSION ? process.env.REACT_APP_SNAP_VERSION : '*';
  const debugLevel =
    process.env.REACT_APP_DEBUG_LEVEL !== undefined ? process.env.REACT_APP_DEBUG_LEVEL : 'all';

  const defaultParam = {
    debugLevel
  };

  const connectToSnap = () => {};

  const getNetworks = async () => {
    return [
      {
        name: 'turing',
        displayName: 'Turing Testnet',
        chainId: '1'
      },
      {
        name: 'goldberg',
        displayName: 'Goldberg Testnet',
        chainId: '2'
      },
      {
        name: 'mainnet',
        displayName: 'Mainnet',
        chainId: '3'
      }
    ] as Network[];
  };

  const switchNetwork = async (network: number, chainId: string) => {};

  const getCurrentNetwork = async () => {};

  const getWalletData = async (
    networkId: number,
    updateAccounts: boolean,
    networks?: Network[]
  ) => {};

  const initSnap = async () => {};

  const checkConnection = async () => {};

  const getPrivateKeyFromAddress = async () => {};

  return {
    connectToSnap,
    getNetworks,
    getCurrentNetwork,
    getWalletData,
    initSnap,
    checkConnection,
    getPrivateKeyFromAddress,
    switchNetwork
  };
};
