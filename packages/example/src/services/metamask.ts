import { web3EnablePromise } from '@polkadot/extension-dapp';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Network, Erc20TokenBalance, Account } from '@types';
import type { InjectedMetamaskExtension } from '@avail/metamask-polkadot-adapter/src/types';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { enablePolkadotSnap } from '@avail/metamask-polkadot-adapter';
import type { MetamaskPolkadotSnap } from '@avail/metamask-polkadot-adapter/build/snap';
import Toastr from 'toastr2';
import { setData } from 'slices/metamaskSlice';
import { setInfoModalVisible } from 'slices/modalSlice';
import {
  setForceReconnect,
  setWalletConnection,
  setAccounts,
  setErc20TokenBalanceSelected
} from 'slices/walletSlice';
import { disableLoading, enableLoadingWithMessage } from 'slices/UISlice';
import { setNetworks, setActiveNetwork } from 'slices/networkSlice';
import type { SnapNetworks } from '@avail/metamask-polkadot-types';

export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

export const defaultSnapId = 'local:http://localhost:8081';

export async function installPolkadotSnap(): Promise<boolean> {
  const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId;
  try {
    await enablePolkadotSnap({ networkName: 'avail' }, snapId);
    return true;
  } catch (err) {
    return false;
  }
}

export async function isPolkadotSnapInstalled(): Promise<boolean> {
  return !!(await getInjectedMetamaskExtension());
}

export async function getInjectedMetamaskExtension(): Promise<InjectedMetamaskExtension | null> {
  const extensions = await web3EnablePromise;
  return getMetamaskExtension(extensions || []) || null;
}

function getMetamaskExtension(
  extensions: InjectedExtension[]
): InjectedMetamaskExtension | undefined {
  return extensions.find((item) => item.name === 'metamask-polkadot-snap') as unknown as
    | InjectedMetamaskExtension
    | undefined;
}

export interface SnapInitializationResponse {
  isSnapInstalled: boolean;
  snap?: MetamaskPolkadotSnap;
}

export async function initiatePolkadotSnap(
  network: SnapNetworks
): Promise<SnapInitializationResponse> {
  const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId;

  try {
    const metamaskPolkadotSnap = await enablePolkadotSnap({ networkName: network }, snapId);
    return { isSnapInstalled: true, snap: metamaskPolkadotSnap };
  } catch (e) {
    return { isSnapInstalled: false };
  }
}

export const useAvailSnap = () => {
  const dispatch = useAppDispatch();
  const { loader } = useAppSelector((state: any) => state.UI);
  const { accounts, transactions, provider } = useAppSelector((state) => state.wallet);
  const metamaskState = useAppSelector((state) => state.metamask);
  const networkState = useAppSelector((state) => state.networks);
  const snapId = process.env.REACT_APP_SNAP_ID
    ? process.env.REACT_APP_SNAP_ID
    : 'local:http://localhost:8081/';
  const snapVersion = process.env.REACT_APP_SNAP_VERSION ? process.env.REACT_APP_SNAP_VERSION : '*';
  const debugLevel =
    process.env.REACT_APP_DEBUG_LEVEL !== undefined ? process.env.REACT_APP_DEBUG_LEVEL : 'all';

  const defaultParam = {
    debugLevel
  };

  const connectToSnap = () => {
    dispatch(setWalletConnection(true));
    dispatch(setForceReconnect(false));
    // dispatch(enableLoadingWithMessage('Connecting...'));
    // provider
    //   .request({
    //     method: 'wallet_requestSnaps',
    //     params: {
    //       [snapId]: { version: snapVersion }
    //     }
    //   })
    //   .then(() => {
    //     dispatch(setWalletConnection(true));
    //     dispatch(setForceReconnect(false));
    //   })
    //   .catch(() => {
    //     dispatch(setWalletConnection(false));
    //     dispatch(disableLoading());
    //   });
  };

  const getNetworks = async () => {
    return [
      {
        name: 'avail',
        displayName: 'Goldberg Testnet',
        chainId: '1'
      }
    ] as Network[];
  };

  const switchNetwork = async (network: number, chainId: string) => {
    dispatch(enableLoadingWithMessage('Switching Network...'));
    if (metamaskState.hasMetaMask && metamaskState.polkadotSnap.isInstalled) {
      await metamaskState?.polkadotSnap?.api?.setConfiguration({
        networkName: networkState.items[network].name
      });
      dispatch(disableLoading());
      return true;
    } else {
      dispatch(disableLoading());
      return false;
    }
  };

  const getCurrentNetwork = async () => {
    return networkState.items[networkState.activeNetwork];
  };

  const getWalletData = async (
    networkId: number,
    updateAccounts: boolean,
    networks?: Network[]
  ) => {
    if (!loader.isLoading && !networks) {
      dispatch(enableLoadingWithMessage('Getting network data ...'));
    }
    if (updateAccounts) {
      dispatch(
        setData({
          isInstalled: true,
          snap: metamaskState.polkadotSnap.snap,
          address: await metamaskState.polkadotSnap.snap?.getMetamaskSnapApi().getAddress(),
          publicKey: await metamaskState.polkadotSnap.snap?.getMetamaskSnapApi().getPublicKey(),
          balance: await metamaskState.polkadotSnap.snap?.getMetamaskSnapApi().getBalance(),
          latestBlock: await metamaskState.polkadotSnap.snap?.getMetamaskSnapApi().getLatestBlock(),
          transactions: await metamaskState.polkadotSnap.snap
            ?.getMetamaskSnapApi()
            .getAllTransactions(),
          api: metamaskState.polkadotSnap.snap?.getMetamaskSnapApi()
        })
      );
    }
    const acc = [
      {
        address: metamaskState.polkadotSnap.address,
        publicKey: metamaskState.polkadotSnap.publicKey
      }
    ] as Account[];

    if (networks) {
      dispatch(setNetworks(networks));
    }
    dispatch(setAccounts(acc));
    if (acc.length > 0) {
      dispatch(
        setErc20TokenBalanceSelected({
          amount: metamaskState.polkadotSnap.balance,
          symbol: 'AVL',
          decimals: 18
        } as Erc20TokenBalance)
      );
      dispatch(setInfoModalVisible(true));
    }
    dispatch(disableLoading());
  };

  const initSnap = async () => {
    if (!loader.isLoading) {
      dispatch(enableLoadingWithMessage('Initializing wallet ...'));
    }
    const nets = await getNetworks();
    if (nets.length === 0) {
      return;
    }
    const installResult = await initiatePolkadotSnap(nets[0].name);
    if (!installResult.isSnapInstalled) {
      dispatch(
        setData({
          isInstalled: false,
          message: 'Please accept snap installation prompt'
        })
      );
    } else {
      dispatch(
        setData({
          isInstalled: true,
          snap: installResult.snap,
          address: await installResult.snap?.getMetamaskSnapApi().getAddress(),
          publicKey: await installResult.snap?.getMetamaskSnapApi().getPublicKey(),
          balance: await installResult.snap?.getMetamaskSnapApi().getBalance(),
          latestBlock: await installResult.snap?.getMetamaskSnapApi().getLatestBlock(),
          transactions: await installResult.snap?.getMetamaskSnapApi().getAllTransactions(),
          api: installResult.snap?.getMetamaskSnapApi()
        })
      );
      try {
        const net = { chainId: '1' };
        const idx = nets.findIndex((e) => e.chainId === net.chainId);
        dispatch(setActiveNetwork(idx));
        const chainId = net.chainId;
        await getWalletData(0, false, nets);
      } catch (err: any) {
        if (err.code && err.code === 4100) {
          const toastr = new Toastr();
          toastr.error('Snap is unaccessible or unauthorized');
          dispatch(setWalletConnection(false));
        }
        //eslint-disable-next-line no-console
        console.error('Error while Initializing wallet', err);
      } finally {
        dispatch(disableLoading());
      }
    }
  };

  const checkConnection = async () => {
    dispatch(enableLoadingWithMessage('Connecting...'));
    const isInstalled = await isPolkadotSnapInstalled();
    if (isInstalled) {
      dispatch(setWalletConnection(true));
    } else {
      dispatch(setWalletConnection(false));
      dispatch(disableLoading());
    }
  };

  const getPrivateKeyFromAddress = async () => {
    if (!metamaskState.polkadotSnap.snap) return;
    const api = metamaskState.polkadotSnap.snap.getMetamaskSnapApi();
    const privateKey = await api.exportSeed();
    alert(privateKey);
  };

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
