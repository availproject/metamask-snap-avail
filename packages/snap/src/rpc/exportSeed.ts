import type { JsonSLIP10Node } from '@metamask/key-tree';
import { showConfirmationDialog } from '../util/confirmation';
import { u8aToHex } from '@polkadot/util';
import { stringToU8a } from '@polkadot/util';

export async function exportSeed(): Promise<string | null> {
  console.log('=== SNAP EXPORT SEED START ===');
  try {
    console.log('Showing confirmation dialog...');
    // First show the confirmation dialog
    const confirmation = await showConfirmationDialog({
      prompt: 'Export Seed Phrase',
      description: 'WARNING: This will reveal your seed phrase. Anyone with your seed phrase can access your funds. Make sure you are in a secure location and no one can see your screen.'
    });

    console.log('Confirmation dialog result:', confirmation);

    if (!confirmation) {
      console.log('User rejected the confirmation dialog');
      return null;
    }

    console.log('Getting BIP32 entropy...');
    try {
      // Get the BIP32 entropy using the specific path
      const bip32Node: JsonSLIP10Node = await snap.request({
        method: 'snap_getBip32Entropy',
        params: {
          path: ['m', "44'", "709'", "0'", "0'"],
          curve: 'ed25519'
        }
      });

      console.log('BIP32 node received:', {
        hasNode: !!bip32Node,
        hasPrivateKey: !!bip32Node?.privateKey,
        depth: bip32Node?.depth
      });

      if (!bip32Node || !bip32Node.privateKey) {
        console.error('Failed to get BIP32 private key');
        throw new Error('Failed to get private key');
      }

      console.log('Converting private key to seed...');
      // Convert private key to seed
      const privateKeyU8a = stringToU8a(bip32Node.privateKey);
      const seed = u8aToHex(privateKeyU8a.slice(0, 32));
      
      console.log('Seed generated:', {
        success: !!seed,
        length: seed?.length
      });

      if (!seed) {
        throw new Error('Failed to generate seed');
      }

      console.log('=== SNAP EXPORT SEED END ===');
      return seed;
    } catch (error) {
      console.error('Error getting BIP32 entropy:', error);
      if (error instanceof Error) {
        if (error.message.includes('User rejected')) {
          return null;
        }
        throw error;
      }
      throw new Error('Failed to get BIP32 entropy');
    }
  } catch (error) {
    console.error('Error in exportSeed:', error);
    if (error instanceof Error) {
      if (error.message.includes('User rejected')) {
        return null;
      }
      throw error;
    }
    throw new Error('Failed to export seed');
  } finally {
    console.log('=== SNAP EXPORT SEED END WITH ERROR ===');
  }
}
