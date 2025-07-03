import type {
  BlockInfo,
  MetamaskAvailRpcRequest,
  SignPayloadJSONRequest,
  SignPayloadRawRequest,
  SnapConfig,
  Transaction,
  TxPayload
} from '@avail-project/metamask-avail-types';
import type { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import type { MetamaskAvailSnap } from './snap';

async function sendSnapMethod(request: MetamaskAvailRpcRequest, snapId: string): Promise<unknown> {
  try {
    console.info('sendSnapMethod', request, snapId);
    const result = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        request,
        snapId
      }
    });
    console.info('result', request, result);
    return result;
  } catch (error) {
    console.error('Error sending snap method:', error);
    throw error;
  }
}

async function sign(
  this: MetamaskAvailSnap,
  method: 'signPayloadJSON' | 'signPayloadRaw',
  payload: SignerPayloadJSON | SignerPayloadRaw
): Promise<{ signature: string }> {
  return (await sendSnapMethod(
    {
      method,
      params: {
        payload
      }
    } as SignPayloadJSONRequest | SignPayloadRawRequest,
    this.snapId
  )) as { signature: string };
}

export async function signPayloadJSON(
  this: MetamaskAvailSnap,
  payload: SignerPayloadJSON
): Promise<string> {
  return (await sign.bind(this)('signPayloadJSON', payload)).signature;
}

export async function signPayloadRaw(
  this: MetamaskAvailSnap,
  payload: SignerPayloadRaw
): Promise<string> {
  return (await sign.bind(this)('signPayloadRaw', payload)).signature;
}

export async function getBalance(this: MetamaskAvailSnap): Promise<string> {
  return (await sendSnapMethod({ method: 'getBalance' }, this.snapId)) as string;
}

export async function getAddress(this: MetamaskAvailSnap): Promise<string> {
  return (await sendSnapMethod({ method: 'getAddress' }, this.snapId)) as string;
}

export async function getPublicKey(this: MetamaskAvailSnap): Promise<string> {
  return (await sendSnapMethod({ method: 'getPublicKey' }, this.snapId)) as string;
}

export async function exportSeed(this: MetamaskAvailSnap): Promise<{
  keyPair: {
    address: string;
    publicKey: Uint8Array;
    json: KeyringPair$Json;
    rawSeedHex: string;
  };
} | null> {
  return (await sendSnapMethod({ method: 'exportSeed' }, this.snapId)) as {
    keyPair: {
      address: string;
      publicKey: Uint8Array;
      json: KeyringPair$Json;
      rawSeedHex: string;
    };
  } | null;
}

export async function setConfiguration(this: MetamaskAvailSnap, config: SnapConfig): Promise<void> {
  await sendSnapMethod({ method: 'configure', params: { configuration: config } }, this.snapId);
}

export async function getLatestBlock(this: MetamaskAvailSnap): Promise<BlockInfo> {
  try {
    return (await sendSnapMethod(
      { method: 'getBlock', params: { blockTag: 'latest' } },
      this.snapId
    )) as BlockInfo;
  } catch (error) {
    console.error('Unable to fetch latest block:', error);
    return { hash: '', number: '' };
  }
}

export async function addTransaction(
  this: MetamaskAvailSnap,
  transaction: Transaction
): Promise<void> {
  await sendSnapMethod({ method: 'addTransaction', params: { transaction } }, this.snapId);
}

export async function updateTransaction(
  this: MetamaskAvailSnap,
  transaction: Transaction
): Promise<void> {
  await sendSnapMethod({ method: 'updateTransaction', params: { transaction } }, this.snapId);
}

export async function getAllTransactions(this: MetamaskAvailSnap): Promise<Transaction[]> {
  return (await sendSnapMethod({ method: 'getAllTransactions' }, this.snapId)) as Transaction[];
}

export async function sendSignedData(
  this: MetamaskAvailSnap,
  signature: string,
  txPayload: TxPayload,
  network: number
): Promise<Transaction> {
  const response = await sendSnapMethod(
    {
      method: 'send',
      params: {
        signature,
        txPayload,
        network
      }
    },
    this.snapId
  );
  return response as Transaction;
}

export async function generateTransactionPayload(
  this: MetamaskAvailSnap,
  module: string,
  method: string,
  args: unknown[]
): Promise<TxPayload> {
  return (await sendSnapMethod(
    { method: 'generateTransactionPayload', params: { module, method, args } },
    this.snapId
  )) as TxPayload;
}
