import '@polkadot/types-augment';
import type { SnapConfig } from '@avail-project/metamask-avail-types';
import { MetamaskAvailSnap } from './snap';
import { hasMetaMask, isMetamaskSnapsSupported, isAvailSnapInstalled } from './utils';

const defaultSnapOrigin = 'npm:@avail-project/avail-snap';

export type SnapInstallationParamNames = string;

export * from './extension';

export async function enableAvailSnap(
  config: SnapConfig = { networkName: 'turing' },
  snapOrigin?: string,
  snapInstallationParams: Record<SnapInstallationParamNames, unknown> = {}
): Promise<MetamaskAvailSnap> {
  const snapId = snapOrigin ?? defaultSnapOrigin;

  try {
    console.log('Enabling Avail Snap with ID:', snapId);
    
    // check all conditions
    if (!hasMetaMask()) {
      throw new Error('MetaMask is not installed');
    }

    // Add delay to ensure MetaMask is fully initialized
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!(await isMetamaskSnapsSupported())) {
      throw new Error("Current MetaMask version doesn't support snaps. Please make sure you're using MetaMask Flask.");
    }

    if (!config.networkName) {
      config.networkName = 'turing';
    }

    const isInstalled = await isAvailSnapInstalled(snapId);
    console.info('Snap installation status:', { isInstalled, snapId });

    if (!isInstalled) {
      try {
        console.log('Requesting snap installation...');
        const result = await window.ethereum.request({
          method: 'wallet_requestSnaps',
          params: {
            [snapId]: { ...snapInstallationParams }
          }
        });
        console.log('Snap installation result:', result);
      } catch (error: any) {
        console.error('Snap installation error:', error);
        if (error.code === -32603) {
          throw new Error('Failed to connect to MetaMask. Please try refreshing the page and ensure you\'re connected to the correct network.');
        }
        throw error;
      }
    }

    // create snap describer
    const snap = new MetamaskAvailSnap(snapOrigin || defaultSnapOrigin, config);

    try {
      const snapApi = snap.getMetamaskSnapApi();
      console.info('Snap API initialized:', snapApi);
      await snapApi.setConfiguration(config);
      console.log('Snap configuration set successfully');
    } catch (err) {
      console.error('Failed to set configuration:', err);
      throw new Error('Failed to configure the snap. Please try refreshing the page.');
    }

    return snap;
  } catch (error: any) {
    console.error('Error in enableAvailSnap:', error);
    throw new Error(`Failed to enable Avail Snap: ${error.message}`);
  }
}
