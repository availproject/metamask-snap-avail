import type { JsonBIP44CoinTypeNode } from '@metamask/key-tree';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import { hexToU8a, u8aToHex } from '@polkadot/util';
import { Keyring } from 'avail-js-sdk';

import { getKeyPair } from '../avail/account';
import { showConfirmationDialog } from '../util/confirmation';

const availCoinType: number = 709;

export async function exportSeed(): Promise<{
  keyPair: {
    address: string;
    publicKey: Uint8Array;
    json: KeyringPair$Json;
    rawSeedHex: string;
  };
} | null> {
  try {
    // ask for confirmation
    console.log('showing confirmation dialog');
    const keyPair = await getKeyPair();
    const confirmation = await showConfirmationDialog({
      description:
        'You are about to export your **raw private key** and “JSON” backup. ' +
        'Anyone who sees these can steal your funds. Your **password** to unlock the json is your substrate address',
      prompt: 'Continue?',
      sender: keyPair.address,
      fee: '0'
    });

    if (confirmation) {
      const bip44Node: JsonBIP44CoinTypeNode = await snap.request({
        method: 'snap_getBip44Entropy',
        params: { coinType: availCoinType }
      });

      const miniSecret = hexToU8a(bip44Node.privateKey).subarray(0, 32);
      const pair = new Keyring({ type: 'sr25519' }).addFromSeed(miniSecret);

      return {
        keyPair: {
          address: pair.address,
          publicKey: pair.publicKey,
          json: pair.toJson(pair.address),
          rawSeedHex: u8aToHex(miniSecret)
        }
      };
    }
    return null;
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    return null;
  }
}
