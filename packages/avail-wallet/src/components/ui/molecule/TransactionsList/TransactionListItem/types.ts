/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { shortenAddress } from 'utils/utils';
import { ethers } from 'ethers';
import { Extrinsic } from '@avail-project/metamask-avail-types';
import { LoadingSmall } from 'components/ui/atom/LoadingSmall';
import BigNumber from 'bignumber.js';

export interface Transaction {
  hash: string;
  block: string;
  sender: string;
  extrinsicdata: Extrinsic;
  destination?: string;
  amount?: string | number;
  network: number;
  fee: string;
}

export const getIcon = (transactionName: string): IconProp => {
  switch (transactionName) {
    case 'Send':
      return ['fas', 'long-arrow-alt-up'];
    case 'Receive':
      return ['fas', 'long-arrow-alt-down'];
    case 'Deploy':
    case 'Deploy Account':
    
      return ['fas', 'long-arrow-alt-up'];
      case 'Loading': // Adding a case for the loading state with rotation
      return ['fas', 'spinner'];
    default:
      return ['fas', 'arrow-right-arrow-left'];
  }
};

export const getTxnFee = (transaction: Transaction): string => {
  return transaction.fee;
};

export const getTxnToFromLabel = (transaction: Transaction): string => {
  if (
    transaction.extrinsicdata.method.method === 'transferKeepAlive' &&
    transaction.extrinsicdata.method.section === 'balances'
  ) {
    //@ts-ignore
    return 'To ' + shortenAddress(transaction.extrinsicdata.method.args.dest.Id);
  }
  return 'extrinsic call';
};

export const getTxnValues = (
  transaction: Transaction,
  decimals: number = 18,
  toUsdRate: number = 0
) => {
  if (
    transaction.extrinsicdata.method.method === 'transferKeepAlive' &&
    transaction.extrinsicdata.method.section === 'balances'
  ) {
   const txnValue =
      (
        //@ts-ignore
      Number(transaction.extrinsicdata.method.args.value.replace(/,/g, '')) /
      (10 ** decimals)
    ).toString();
   const txnUsdValue = 'not calculated yet';
    return { txnValue, txnUsdValue };
  } else {
    const txnValue = 'extrinsic call';
    const txnUsdValue = 'extrinsic call';
    return { txnValue, txnUsdValue };
  }
};
