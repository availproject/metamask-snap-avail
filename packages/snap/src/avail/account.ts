/* eslint-disable import/order */
// import { Keyring } from '@polkadot/keyring';
import type { SnapNetworks } from '@avail-project/metamask-avail-types';
import { getConfiguration } from '../configuration';
import type { KeyringPair } from '@polkadot/keyring/types';
import { getKeyringFromSeed } from 'avail-js-sdk';

/**
 * Returns KeyringPair if one is saved in wallet state, creates new one otherwise
 */
export async function getKeyPair(): Promise<KeyringPair> {
  try {
    const config = await getConfiguration();

    const bip44Node = await snap.request({
      method: 'snap_getBip44Entropy',
      params: {
        coinType: getCoinTypeByNetwork(config.networkName)
      }
    });
    // generate keys
    const seed = bip44Node.privateKey;
    const keyring = getKeyringFromSeed(seed);
    return keyring;
    // return keyring.addFromSeed(stringToU8a(seed));
  } catch (error) {
    console.error('Error in getKeyPair:', error);
    throw error;
  }
}

const getCoinTypeByNetwork = (network: SnapNetworks): number => {
  switch (network) {
    case 'turing':
      return 709;
    default:
      return 709;
  }
};
