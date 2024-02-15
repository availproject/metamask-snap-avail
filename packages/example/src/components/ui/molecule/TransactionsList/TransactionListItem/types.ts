import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { shortenAddress } from 'utils/utils';
import { ethers } from 'ethers';

enum ExplorerTransactionType { // for retrieving txns from Explorer
  DEPLOY = 'deploy',
  DEPLOY_ACCOUNT = 'deploy_account',
  INVOKE = 'invoke'
}

enum TransactionStatus { // for retrieving txn from Avail feeder gateway
  RECEIVED = 'RECEIVED',
  PENDING = 'PENDING',
  ACCEPTED_ON_L2 = 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1 = 'ACCEPTED_ON_L1',
  NOT_RECEIVED = 'NOT_RECEIVED',
  REJECTED = 'REJECTED'
}

interface Transaction {
  // hash: string;
  // block: string;
  // sender: string;
  // destination: string;
  // amount: string | number;
  // fee: string;
  txnHash: string; // in hex
  txnType: ExplorerTransactionType | string;
  chainId: string; // in hex
  senderAddress: string; // in hex
  contractAddress: string; // in hex
  contractFuncName: string;
  contractCallData: any;
  status?: TransactionStatus | string;
  executionStatus?: TransactionStatus | string;
  finalityStatus?: TransactionStatus | string;
  failureReason: string;
  eventIds: string[];
  timestamp: number;
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

export const getTxnName = (transaction: Transaction): string => {
  if (transaction.txnType.toLowerCase() === ExplorerTransactionType.INVOKE) {
    if (transaction.contractFuncName.toLowerCase() === 'transfer') {
      return 'Send';
    }
  } else if (transaction.txnType.toLowerCase() === ExplorerTransactionType.DEPLOY) {
    return 'Deploy';
  } else if (transaction.txnType.toLowerCase() === ExplorerTransactionType.DEPLOY_ACCOUNT) {
    return 'Deploy Account';
  }
  return 'Unknown';
};

export const getTxnDate = (transaction: Transaction): string => {
  return new Date(transaction.timestamp * 1000).toDateString().split(' ').slice(1, 3).join(' ');
};

export const getTxnStatus = (transaction: Transaction): string => {
  const statusStr = [];
  if (transaction.finalityStatus === transaction.executionStatus) {
    return transaction.finalityStatus ? formatStatus(transaction.finalityStatus) : '';
  }
  if (transaction.finalityStatus) {
    statusStr.push(formatStatus(transaction.finalityStatus));
  }
  if (transaction.executionStatus) {
    statusStr.push(formatStatus(transaction.executionStatus));
  }
  return statusStr.join(' / ');
};

export const formatStatus = (status: string): string => {
  return status
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => {
      word = word.toLowerCase();
      if (word !== 'on') {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
};

export const getTxnToFromLabel = (transaction: Transaction): string => {
  const txnName = getTxnName(transaction);
  switch (txnName) {
    case 'Send':
      return 'To ' + shortenAddress(transaction.contractCallData[0].toString());
    case 'Receive':
      return 'From ' + shortenAddress(transaction.senderAddress);
    case 'Deploy':
      return 'To ' + shortenAddress(transaction.contractAddress);
    default:
      return '';
  }
};

export const getTxnFailureReason = (transaction: Transaction): string => {
  return transaction.executionStatus &&
    transaction.executionStatus.toLowerCase() === TransactionStatus.REJECTED.toLowerCase() &&
    transaction?.failureReason
    ? ` (${transaction.failureReason})`
    : '';
};

export const getTxnValues = (
  transaction: Transaction,
  decimals: number = 18,
  toUsdRate: number = 0
) => {
  let txnValue = '0';
  let txnUsdValue = '0';

  const txnName = getTxnName(transaction);
  switch (txnName) {
    case 'Send':
    case 'Receive':
      txnValue = ethers.utils.formatUnits(transaction.contractCallData[1].toString(), decimals);
      txnUsdValue = (parseFloat(txnValue) * toUsdRate).toFixed(2);
      break;
    default:
      break;
  }

  return { txnValue, txnUsdValue };
};
