// import type { ApiPromise } from '@polkadot/api/';
import type { SignerPayloadJSON } from '@avail-project/metamask-avail-types';
import type { SignerPayloadRaw } from '@polkadot/types/types';
import { hexToU8a, u8aToHex } from '@polkadot/util';
import { signedExtensions, type ApiPromise } from 'avail-js-sdk';

import { getKeyPair } from '../../avail/account';
import { showConfirmationDialog } from '../../util/confirmation';

export async function signPayloadJSON(
  api: ApiPromise,
  payload: SignerPayloadJSON
): Promise<{ signature: string } | void> {
  const keyPair = await getKeyPair();
  const decodedMethod = api.registry.createType('Call', payload.method).toHuman();

  const confirmation = await showConfirmationDialog({
    description: `You are signing a transaction which may transfer funds from your account. Please verify the details below.`,
    prompt: `Sign this transaction?`,
    sender: keyPair.address,
    fee: payload.tip.toString(),
    method: decodedMethod
  });
  if (confirmation) {
    const extrinsic = api.registry.createType('ExtrinsicPayload', payload, {
      version: payload.version,
      signedExtensions: signedExtensions
    });
    return extrinsic.sign(keyPair);
  }
}

export async function signPayloadRaw(
  api: ApiPromise,
  payload: SignerPayloadRaw
): Promise<{ signature: string } | void> {
  const keyPair = await getKeyPair();

  const confirmation = await showConfirmationDialog({
    description: `It will be signed with address: ${keyPair.address}`,
    prompt: `Do you want to sign this message?`
  });

  // return seed if user confirmed action
  if (confirmation) {
    const signedBytes = keyPair.sign(hexToU8a(payload.data));
    return {
      signature: u8aToHex(signedBytes)
    };
  }
}
