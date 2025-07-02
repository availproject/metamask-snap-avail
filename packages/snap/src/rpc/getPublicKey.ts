import { u8aToHex } from '@polkadot/util';

import { getKeyPair } from '../avail/account';

export async function getPublicKey(): Promise<string> {
  const keyPair = await getKeyPair();
  return u8aToHex(keyPair.publicKey);
}
