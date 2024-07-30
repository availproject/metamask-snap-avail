import { SignerPayloadRaw } from '@Avail/types/types';

export interface GetPublicKeyRequest {
  method: 'getPublicKey';
}

export interface GetAddressRequest {
  method: 'getAddress';
}

export interface ExportSeedRequest {
  method: 'exportSeed';
}

export interface GetTransactionsRequest {
  method: 'getAllTransactions';
}

export interface GetBlockRequest {
  method: 'getBlock';
  params: {
    blockTag?: BlockId;
  };
}

export interface GetBalanceRequest {
  method: 'getBalance';
}

export interface ConfigureSnapRequest {
  method: 'configure';
  params: {
    configuration: SnapConfig;
  };
}

export interface AddAvailAssetRequest {
  method: 'addAvailAsset';
}

export interface GetChainHeadRequest {
  method: 'getChainHead';
}

export interface SignPayloadJSONRequest {
  method: 'signPayloadJSON';
  params: {
    payload: SignerPayloadJSON;
  };
}

export interface SignPayloadRawRequest {
  method: 'signPayloadRaw';
  params: {
    payload: SignerPayloadRaw;
  };
}

export interface GenerateTransactionPayload {
  method: 'generateTransactionPayload';
  params: {
    module: string;
    method: string;
    args: unknown[];
  };
}

export interface AddTransaction {
  method: 'addTransaction';
  params: {
    transaction: Transaction;
  };
}

export interface UpdateTransaction {
  method: 'updateTransaction';
  params: {
    transaction: Transaction;
  };
}

export interface SendUnitRequest {
  method: 'send';
  params: {
    signature: string;
    txPayload: TxPayload;
    network: number;
  };
}

export type MetamaskAvailRpcRequest =
  | GetPublicKeyRequest
  | GetAddressRequest
  | ExportSeedRequest
  | GetTransactionsRequest
  | GetBlockRequest
  | GetBalanceRequest
  | ConfigureSnapRequest
  | AddAvailAssetRequest
  | GetChainHeadRequest
  | SignPayloadJSONRequest
  | SignPayloadRawRequest
  | SendUnitRequest
  | GenerateTransactionPayload
  | AddTransaction
  | UpdateTransaction;

type Method = MetamaskAvailRpcRequest['method'];

export interface WalletEnableRequest {
  method: 'wallet_enable';
  params: object[];
}

export interface GetPluginsRequest {
  method: 'wallet_getPlugins';
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskAvailRpcRequest];
}

export type MetamaskRpcRequest = WalletEnableRequest | GetPluginsRequest | SnapRpcMethodRequest;

export type BlockId = number | string | 'latest';

export interface TxPayload {
  tx: string;
  payload: SignerPayloadJSON;
}

export interface BlockInfo {
  hash: string;
  number: string;
}

export interface UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl?: string;
}

export type SnapNetworks = 'turing' | 'goldberg' | 'mainnet';

export interface SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

// Avail types

export type Callback<T> = (arg: T) => void;

export type AvailEventArgument = Balance;
export type AvailEventCallback = Callback<AvailEventArgument>;

export type TxEventArgument = TxStatus;
export type TxEventCallback = Callback<TxEventArgument>;

export type Balance = string;
export type TxStatus = {
  txHash: string;
};

export type Origin = string;
export type HexHash = string;

export interface Transaction {
  hash: string;
  block: string;
  sender: string;
  extrinsicdata: Extrinsic
  fee: string;
  network: number
}

export type Extrinsic = {
  method: {
    method: string;
    section: string;
    args: unknown[];
  };
  isSigned: boolean;
};

export interface SignerPayloadJSON {
  /**
   * @description The ss-58 encoded address
   */
  address: string;
  /**
   * @description The checkpoint hash of the block, in hex
   */
  blockHash: string;
  /**
   * @description The checkpoint block number, in hex
   */
  blockNumber: string;
  /**
   * @description The era for this transaction, in hex
   */
  era: string;
  /**
   * @description The genesis hash of the chain, in hex
   */
  genesisHash: string;
  /**
   * @description The encoded method (with arguments) in hex
   */
  method: string;
  /**
   * @description The nonce for this transaction, in hex
   */
  nonce: string;
  /**
   * @description The current spec version for the runtime
   */
  specVersion: string;
  /**
   * @description The tip for this transaction, in hex
   */
  tip: string;
  /**
   * @description The current transaction version for the runtime
   */
  transactionVersion: string;
  /**
   * @description The applicable signed extensions for this runtime
   */
  signedExtensions: string[];
  /**
   * @description The version of the extrinsic we are dealing with
   */
  version: number;
}
