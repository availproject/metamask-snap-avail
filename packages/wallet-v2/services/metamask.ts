import { Account, Erc20TokenBalance, Network } from '@/types';
import { enableAvailSnap } from '@avail-project/metamask-avail-adapter';
import { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap';
import { InjectedMetamaskExtension } from '@avail-project/metamask-avail-adapter/build/types';
import { SnapNetworks } from '@avail-project/metamask-avail-types';
import { web3EnablePromise } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import useWalletStore from '../slices/walletSlice';
import { ethers } from 'ethers';
import {useNetworkStore} from '@/slices/networkSlice';
import {useMetamaskStore} from '@/slices/metamaskSlice';
import { useUIStore } from '@/slices/UISlice'

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
    await enableAvailSnap({ networkName: 'mainnet' }, snapId);
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
  const { enableLoadingWithMessage, disableLoading } = useUIStore()
  const loader = useUIStore((state) => state.loader)
  const {
    setWalletConnection,
    setForceReconnect,
    setProvider,
    setAccounts,
    setTransactions,
    setErc20TokenBalances,
    setErc20TokenBalanceSelected,
    resetWallet
  } = useWalletStore();
  const { setNetworks, setActiveNetwork } = useNetworkStore();
  const networkState = useNetworkStore((state) => state.items)
  const { setData, availSnap } = useMetamaskStore();
  const provider = useWalletStore((state) => state.provider);
  const snapId = process.env.REACT_APP_SNAP_ID
    ? process.env.REACT_APP_SNAP_ID
    : 'npm:@avail-project/avail-snap';
  const snapVersion = process.env.REACT_APP_SNAP_VERSION ? process.env.REACT_APP_SNAP_VERSION : '*';
  const debugLevel =
    process.env.REACT_APP_DEBUG_LEVEL !== undefined ? process.env.REACT_APP_DEBUG_LEVEL : 'all';
  const metamaskState = useMetamaskStore((state) => state.availSnap)
  const metamask = useMetamaskStore((state) => state.hasMetaMask)
  const defaultParam = {
    debugLevel
  };

  const connectToSnap = async () => {
    setWalletConnection(true);
    setForceReconnect(false);

    setIsLoading(true);
    enableLoadingWithMessage('Connecting to the wallet...')

    try {
      // Directly access window.ethereum for request method
      provider.request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: { version: snapVersion }
        }
      });

      // On success, update connection state again
      setWalletConnection(true);
      setForceReconnect(false);
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

  const switchNetwork = async (network: number, chainId: string) => {
    enableLoadingWithMessage('Switching Network...')
    if (metamask && metamaskState.isInstalled) {
      await metamaskState?.api?.setConfiguration({
        networkName: networkState[network].name
      });
      disableLoading();
      return true;
    } else {
    disableLoading();
      return false;
    }
  };

  const getCurrentNetwork = async () => {};

  // const getWalletData = async (
  //   networkId: number,
  //   updateAccounts: boolean,
  //   networks?: Network[]
  // ) => {
  //   if (!loader.isLoading && !networks) {
  //     enableLoadingWithMessage('Getting network data ...');
  //     } 
  //   // const { setProvider } = useWalletStore.getState();
    
  //   if (updateAccounts) {
  //     const metamaskState = useMetamaskStore((state) => state.availSnap);
  //     const api = metamaskState.snap?.getMetamaskSnapApi();
  //     const updatedData: any = {
  //       isInstalled: true,
  //       snap: metamaskState.snap,
  //       address: await api?.getAddress(),
  //       publicKey: await api?.getPublicKey(),
  //       balance: await api?.getBalance(),
  //       latestBlock: await api?.getLatestBlock(),
  //       transactions: await api?.getAllTransactions(),
  //       api
  //     };

  //     setAvailSnap(updatedData);
  //   }

  //   const acc = [
  //     {
  //       address: metamaskState.address,
  //       publicKey: metamaskState.publicKey
  //     }
  //   ] as Account[];

  //   // Set networks if provided
  //   if (networks) {
  //     setNetworks(networks);
  //   }

  //   // Update the accounts and transactions
  //   setAccounts(acc);
  //   setTransactions(metamaskState.transactions);

  //   // If there are accounts, set the token balance and show the info modal
  //   if (acc.length > 0) {
  //     setErc20TokenBalanceSelected({
  //       amount: metamaskState.balance,
  //       symbol: 'AVAIL',
  //       decimals: 18
  //     } as Erc20TokenBalance);

  //     // setInfoModalVisible(true);
  //   }

  //   // Stop the loading state
  //   disableLoading();
  // };

  const getWalletData = async (
    networkId: number,
    updateAccounts: boolean,
    networks?: Network[]
  ) => {
    if (!loader.isLoading && !networks) {
      enableLoadingWithMessage('Getting network data ...');
    }
    if (updateAccounts) {
        setData({
          isInstalled: true,
          snap: metamaskState.snap,
          address: await metamaskState.snap?.getMetamaskSnapApi().getAddress(),
          publicKey: await metamaskState.snap?.getMetamaskSnapApi().getPublicKey(),
          balance: await metamaskState.snap?.getMetamaskSnapApi().getBalance(),
          latestBlock: await metamaskState.snap?.getMetamaskSnapApi().getLatestBlock(),
          transactions: await metamaskState.snap
            ?.getMetamaskSnapApi()
            .getAllTransactions(),
          api: metamaskState.snap?.getMetamaskSnapApi()
        })
    }
    console.log({setData, metamaskState, availSnap})
    const acc = [
      {
        address: metamaskState.address,
        publicKey: metamaskState.publicKey
      }
    ] as Account[];

    if (networks) {
      setNetworks(networks);
    }
    setAccounts(acc);
    setTransactions(metamaskState.transactions);
    if (acc.length > 0) {
        setErc20TokenBalanceSelected({
          amount: metamaskState.balance,
          symbol: 'AVAIL',
          decimals: 18
        } as Erc20TokenBalance)
      // dispatch(setInfoModalVisible(true));
    }
    disableLoading();
  };
  const initSnap = async () => {
    if (!loader.isLoading) {
      enableLoadingWithMessage('Initializing wallet ...');
    }

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
      const latestBlock = await snapApi.getLatestBlock();

      // setProvider(installResult.snap);
      // setAccounts([{ address }]);
      // // setErc20TokenBalances(balance);
      // setTransactions(transactions);
      // setWalletConnection(true);

      setData({
        isInstalled: true,
        snap: installResult.snap,
        address: address,
        publicKey: publicKey,
        balance: balance,
        latestBlock: latestBlock,
        transactions: transactions,
        api: snapApi,
      })

      const net = { chainId: '1' };
        const idx = nets.findIndex((e) => e.chainId === net.chainId);
        setActiveNetwork(idx);
        await getWalletData(0, false, nets);
    } catch(err) {
      console.error('Error initializing wallet:', err);
      resetWallet();
    }
    disableLoading()
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
