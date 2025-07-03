/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BlockInfo,
  SnapConfig,
  SnapRpcMethodRequest,
  Transaction,
  TxPayload,
  SignerPayloadJSON
} from '@avail-project/metamask-avail-types';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import type { SignerPayloadRaw } from '@polkadot/types/types/extrinsic';

export interface MetamaskSnapApi {
  getAddress(): Promise<string>;

  getPublicKey(): Promise<string>;

  getBalance(): Promise<string>;

  exportSeed(): Promise<{
    keyPair: {
      address: string;
      publicKey: Uint8Array;
      json: KeyringPair$Json;
      rawSeedHex: string;
    };
  } | null>;

  getLatestBlock(): Promise<BlockInfo>;

  setConfiguration(configuration: SnapConfig): Promise<void>;

  getAllTransactions(): Promise<Transaction[]>;

  signPayloadJSON(payload: SignerPayloadJSON): Promise<string>;

  signPayloadRaw(payload: SignerPayloadRaw): Promise<string>;

  send(signature: string, txPayload: TxPayload, network: number): Promise<Transaction>;

  generateTransactionPayload(module: string, method: string, args: unknown[]): Promise<TxPayload>;

  addTransaction(transaction: Transaction): Promise<void>;

  updateTransaction(transaction: Transaction): Promise<void>;
}

export interface InjectedMetamaskExtension extends InjectedExtension {
  getMetamaskSnapApi: () => Promise<MetamaskSnapApi>;
}

declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;

      send: (
        request: SnapRpcMethodRequest | { method: string; params?: never[] }
      ) => Promise<unknown>;
      on: (eventName: unknown, callback: unknown) => unknown;
      request: <T>(request: SnapRpcMethodRequest | { method: string; params?: any }) => Promise<T>;
    };
  }
}
