import { Account, Erc20TokenBalance, Network } from '@/types';
import { enableAvailSnap } from '@avail-project/metamask-avail-adapter';
import { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap';
import { InjectedMetamaskExtension } from '@avail-project/metamask-avail-adapter/build/types';
import { SnapNetworks } from '@avail-project/metamask-avail-types';
import { web3EnablePromise } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import useWalletStore from '../slices/walletSlice';
import { ethers } from 'ethers';
import useNetworkStore from '@/slices/networkSlice';
import useMetamaskStore from '@/slices/metamaskSlice';
const { setIsLoading, setLoadingMessage, setWalletConnection } = useWalletStore.getState();

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
  const {
    setWalletConnection,
    setForceReconnect,
    setProvider,
    setAccounts,
    setTransactions,
    setErc20TokenBalances,
    resetWallet
  } = useWalletStore();
  const provider = useWalletStore((state) => state.provider);
  const snapId = process.env.REACT_APP_SNAP_ID
    ? process.env.REACT_APP_SNAP_ID
    : 'npm:@avail-project/avail-snap';
  const snapVersion = process.env.REACT_APP_SNAP_VERSION ? process.env.REACT_APP_SNAP_VERSION : '*';
  const debugLevel =
    process.env.REACT_APP_DEBUG_LEVEL !== undefined ? process.env.REACT_APP_DEBUG_LEVEL : 'all';
  // const metamaskState = useMetamaskStore((state) => state.)
  const defaultParam = {
    debugLevel
  };

  const connectToSnap = async () => {
    setWalletConnection(true);
    setForceReconnect(false);

    setIsLoading(true);
    setLoadingMessage('Connecting to the wallet...');

    try {
      // Directly access window.ethereum for request method
      await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: { version: snapVersion }
        }
      });

      // On success, update connection state again
      setWalletConnection(true);
      setForceReconnect(false);
      console.log('connecting');
    } catch (error) {
      console.error('Error connecting to snap:', error);
      setWalletConnection(false);
      setLoadingMessage('Failed to connect to the wallet. Please try again.'); // Update message on error
    } finally {
      setIsLoading(false);
    }
  };

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
  ) => {
    const { setProvider } = useWalletStore.getState();
    const metamaskState = useMetamaskStore((state) => state.availSnap);
    const setAvailSnap = useMetamaskStore((state) => state.setAvailSnap);
    const setNetworks = useNetworkStore((state) => state.setNetworks);
    const setAccounts = useWalletStore((state) => state.setAccounts);
    const setTransactions = useWalletStore((state) => state.setTransactions);
    const setErc20TokenBalanceSelected = useWalletStore(
      (state) => state.setErc20TokenBalanceSelected
    );
    // const enableLoadingWithMessage = useLoaderStore((state) => state.enableLoadingWithMessage);
    // const disableLoading = useLoaderStore((state) => state.disableLoading);
    // const setInfoModalVisible = useModalStore((state) => state.setInfoModalVisible);  // Assumes you have a modal store

    // Start by showing the loading state
    // if (!loader.isLoading && !networks) {
    //   enableLoadingWithMessage('Getting network data ...');
    // }

    if (updateAccounts) {
      const api = metamaskState.snap?.getMetamaskSnapApi();
      const updatedData = {
        isInstalled: true,
        snap: metamaskState.snap,
        address: await api?.getAddress(),
        publicKey: await api?.getPublicKey(),
        balance: await api?.getBalance(),
        latestBlock: await api?.getLatestBlock(),
        transactions: await api?.getAllTransactions(),
        api
      };

      setAvailSnap({
        isInstalled: true,
        snap: metamaskState.snap,
        address: await api?.getAddress(),
        publicKey: await api?.getPublicKey(),
        balance: await api?.getBalance(),
        latestBlock: await api?.getLatestBlock(),
        transactions: await api?.getAllTransactions(),
        api
      });
    }

    const acc = [
      {
        address: metamaskState.address,
        publicKey: metamaskState.publicKey
      }
    ] as Account[];

    // Set networks if provided
    if (networks) {
      setNetworks(networks);
    }

    // Update the accounts and transactions
    setAccounts(acc);
    setTransactions(metamaskState.transactions);

    // If there are accounts, set the token balance and show the info modal
    if (acc.length > 0) {
      setErc20TokenBalanceSelected({
        amount: metamaskState.balance,
        symbol: 'AVAIL',
        decimals: 18
      } as Erc20TokenBalance);

      // setInfoModalVisible(true);
    }

    // Stop the loading state
    // disableLoading();
  };

  const initSnap = async () => {
    try {
      const nets = await getNetworks();
      if (nets.length === 0) {
        throw new Error('No networks available.');
      }
      const installResult = await initiateAvailSnap(nets[0].name);
      if (!installResult.isSnapInstalled) {
        resetWallet();
        throw new Error('Snap installation not accepted.');
      }

      const snapApi = installResult.snap?.getMetamaskSnapApi();
      if (!snapApi) {
        throw new Error('Failed to initialize Snap API.');
      }

      const address = await snapApi.getAddress();
      const publicKey = await snapApi.getPublicKey();
      const balance = await snapApi.getBalance();
      const transactions = await snapApi.getAllTransactions();

      setProvider(installResult.snap);
      setAccounts([{ address }]);
      setErc20TokenBalances(balance);
      setTransactions(transactions);
      setWalletConnection(true);
    } catch {
      console.error('Error initializing wallet:', err);
      resetWallet();
    }
  };

  const checkConnection = async () => {
    const isInstalled = await isAvailSnapInstalled();
    if (isInstalled) {
      setWalletConnection(true);
    } else {
      setWalletConnection(false);
    }
  };

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
