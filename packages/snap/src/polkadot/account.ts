// import { Keyring } from '@polkadot/keyring';
import { stringToU8a } from '@polkadot/util';
import type { JsonBIP44CoinTypeNode } from '@metamask/key-tree';
import type { SnapNetworks } from '@chainsafe/metamask-polkadot-types';
import { getConfiguration } from '../configuration';
import { KeyringPair } from '@polkadot/keyring/types';
import { getKeyringFromSeed } from 'avail-js-sdk';

/**
 * Returns KeyringPair if one is saved in wallet state, creates new one otherwise
 */
export async function getKeyPair(): Promise<KeyringPair> {
  const config = await getConfiguration();
  console.log('Network', getCoinTypeByNetwork(config.networkName));

  const bip44Node = (await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: getCoinTypeByNetwork(config.networkName)
    }
  })) as JsonBIP44CoinTypeNode;
  // generate keys
  const seed = bip44Node.privateKey;
  console.log('SEED', seed);
  const keyring = getKeyringFromSeed(seed);
  return keyring;
  // return keyring.addFromSeed(stringToU8a(seed));
}

const getCoinTypeByNetwork = (network: SnapNetworks): number => {
  console.log('Network at coin TYPE', network);

  switch (network) {
    case 'kusama':
    case 'westend':
      return 434;
    case 'avail':
      return 1284;
    case 'polkadot':
      return 354;
  }
};
