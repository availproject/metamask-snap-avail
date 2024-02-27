import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { shortenAddress } from 'utils/utils';
import { BigNumber, ethers } from 'ethers';

interface Transaction {
  hash: string;
  block: string;
  sender: string;
  destination: string;
  amount: string | number;
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
    default:
      return ['fas', 'arrow-right-arrow-left'];
  }
};

export const getTxnFee = (transaction: Transaction): string => {
  return transaction.fee;
};

export const getTxnToFromLabel = (transaction: Transaction): string => {
  return 'To ' + shortenAddress(transaction.destination.toString());
};

export const getTxnValues = (
  transaction: Transaction,
  decimals: number = 18,
  toUsdRate: number = 0
) => {
  let txnValue = '0';
  let txnUsdValue = '0';

  txnValue = ethers.utils.formatUnits(transaction.amount, decimals);
  txnUsdValue = (parseFloat(txnValue) * toUsdRate).toFixed(2);

  return { txnValue, txnUsdValue };
};
