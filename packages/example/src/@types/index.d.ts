import type { SnapConfig } from '@avail/metamask-polkadot-types';

declare module '@avail/metamask-polkadot-adapter' {
  export function injectMetamaskPolkadotSnapProvider(
    network: 'avail',
    config?: SnapConfig,
    pluginOrigin?: string
  ): void;
}

export type Network = Pick<
  Types.Network,
  'name' | 'chainId' | 'baseUrl' | 'nodeUrl' | 'displayName'
>;
export type Account = Pick<Types.AccContract, 'address' | 'publicKey'>;

export interface Erc20TokenBalance {
  amount: BigNumber;
  symbol: string;
  decimals: number;
}

export interface Erc20Token {
  address: string; // in hex
  name: string;
  symbol: string;
  decimals: number;
  chainId: string; // in hex
}

export type TransactionStatusOptions =
  | 'Received'
  | 'Pending'
  | 'Accepted on L2'
  | 'Accepted on L1'
  | 'Rejected'
  | 'Not Received';

export enum ExplorerTransactionType { // for retrieving txns from Explorer
  DEPLOY = 'deploy',
  DEPLOY_ACCOUNT = 'deploy_account',
  INVOKE = 'invoke'
}

export enum TransactionStatus { // for retrieving txn from Avail feeder gateway
  RECEIVED = 'RECEIVED',
  PENDING = 'PENDING',
  ACCEPTED_ON_L2 = 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1 = 'ACCEPTED_ON_L1',
  NOT_RECEIVED = 'NOT_RECEIVED',
  REJECTED = 'REJECTED'
}

export type { Transaction } from '@avail/metamask-polkadot-types';
