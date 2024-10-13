import { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap';
import { enableAvailSnap } from '@avail-project/metamask-avail-adapter';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { SnapNetworks } from '@avail-project/metamask-avail-types';
import { InjectedMetamaskExtension } from '@avail-project/metamask-avail-adapter/build/types';
import { web3EnablePromise } from '@polkadot/extension-dapp';

export const defaultSnapId = 'npm:@avail-project/avail-snap';

export async function isAvailSnapInstalled(): Promise<boolean> {
  return !!(await getInjectedMetamaskExtension());
}

export async function installAvailSnap(): Promise<boolean> {
  const snapId = defaultSnapId;
  try {
    await enableAvailSnap({ networkName: 'turing' }, snapId);
    return true;
  } catch (err) {
    return false;
  }
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

function getMetamaskExtension(
  extensions: InjectedExtension[]
): InjectedMetamaskExtension | undefined {
  return extensions.find((item) => item.name === 'metamask-avail-snap') as unknown as
    | InjectedMetamaskExtension
    | undefined;
}

export async function getInjectedMetamaskExtension(): Promise<InjectedMetamaskExtension | null> {
  const extensions = await web3EnablePromise;
  return getMetamaskExtension(extensions || []) || null;
}
