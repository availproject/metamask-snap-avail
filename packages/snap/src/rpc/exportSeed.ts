import type { JsonBIP44CoinTypeNode } from '@metamask/key-tree';

import { showConfirmationDialog } from '../util/confirmation';

const kusamaCoinType: number = 709;

export async function exportSeed(): Promise<string | null> {
  try {
    // ask for confirmation
    const confirmation: boolean = await showConfirmationDialog({
      prompt: 'Do you want to export your seed?'
    });

    // return seed if user confirmed action
    if (confirmation) {
      const bip44Node: JsonBIP44CoinTypeNode = await snap.request({
        method: 'snap_getBip44Entropy',
        params: { coinType: kusamaCoinType }
      });
      return bip44Node.privateKey.slice(0, 32);
    }
    return null;
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    return null;
  }
}
