import '@polkadot/types-augment';
import type { SnapConfig } from '@availproject/metamask-avail-types';
import { MetamaskAvailSnap } from './snap';
import { hasMetaMask, isMetamaskSnapsSupported, isAvailSnapInstalled } from './utils';

const defaultSnapOrigin = 'npm:@availproject/avail-snap';

export type SnapInstallationParamNames = string;

export * from './extension';

export async function enableAvailSnap(
  config: SnapConfig = { networkName: 'avail' },
  snapOrigin?: string,
  snapInstallationParams: Record<SnapInstallationParamNames, unknown> = {}
): Promise<MetamaskAvailSnap> {
  const snapId = snapOrigin ?? defaultSnapOrigin;

  // check all conditions
  if (!hasMetaMask()) {
    throw new Error('Metamask is not installed');
  }
  if (!(await isMetamaskSnapsSupported())) {
    throw new Error("Current Metamask version doesn't support snaps");
  }
  if (!config.networkName) {
    config.networkName = 'avail';
  }

  const isInstalled = await isAvailSnapInstalled(snapId);
  console.info('isInstalled', isInstalled);

  if (!isInstalled) {
    // // enable snap
    await window.ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: { ...snapInstallationParams }
      }
    });
  }

  // create snap describer
  const snap = new MetamaskAvailSnap(snapOrigin || defaultSnapOrigin, config);
  // set initial configuration

  try {
    const snapApi = snap.getMetamaskSnapApi();
    console.info('snapApi', snapApi);
    await snapApi.setConfiguration(config);
  } catch (err) {
    console.error('Failed to set configuration', err);
  }

  return snap;
}
