import { Meta } from '@storybook/react';
import { Transaction } from '@types';
import { ApiPromise } from 'avail-js-sdk';
import { TransactionListItemView } from './TransactionListItem.view';

export default {
  title: 'Molecule/TransactionListItem',
  component: TransactionListItemView
} as Meta;

const transaction: Transaction = {} as Transaction;
const api = {} as ApiPromise;

export const FullWidth = () => <TransactionListItemView transaction={transaction} api={api} />;

export const HalfWidth = () => {
  return (
    <div style={{ width: '50%' }}>
      <TransactionListItemView transaction={transaction} api={api} />
    </div>
  );
};
