import { useAppSelector } from 'hooks/redux';
import { FC, useEffect, useRef } from 'react';
import { Transaction } from '@types';
import { TRANSACTIONS_REFRESH_FREQUENCY } from 'utils/constants';
import { useTransactionStore } from 'store/store';
import { IListProps } from '../List/List.view';
import { TransactionListItem } from './TransactionListItem';
import { Wrapper } from './TransactionsList.style';

interface Props {
  transactions: Transaction[];
}

export const TransactionsListView = () => {
  const networks = useAppSelector((state) => state.networks);
  const wallet = useAppSelector((state) => state.wallet);
  const { loader } = useAppSelector((state: any) => state.UI);
  const metamaskState = useAppSelector((state) => state.metamask);
  const timeoutHandle = useRef(setTimeout(() => {}));
  const { transactions, setTransactions } = useTransactionStore();

  useEffect(() => {
    (async () => {
      if (wallet.transactions.length > 0 && metamaskState.availSnap.snap?.getMetamaskSnapApi()) {
        const allTransactions = await metamaskState.availSnap.snap
          ?.getMetamaskSnapApi()
          .getAllTransactions();
        const filteredTransactions = allTransactions.filter(
          (transaction) => transaction.network === networks.activeNetwork
        );
        setTransactions(filteredTransactions);
      }
    })();
  }, [wallet.transactions]);
  console.log('loader', loader);
  return loader.isLoading ? (
    <></>
  ) : (
    <Wrapper<FC<IListProps<Transaction>>>
      data={transactions.length > 0 ? transactions : transactions}
      render={(transaction) => <TransactionListItem transaction={transaction} />}
      keyExtractor={(transaction) => transaction.hash.toString()}
    />
  );
};
