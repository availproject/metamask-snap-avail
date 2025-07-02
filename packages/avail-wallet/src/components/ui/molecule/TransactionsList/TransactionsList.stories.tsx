import { Meta } from '@storybook/react';
import { Transaction } from '@types';

import { TransactionsListView } from './TransactionsList.view';

export default {
  title: 'Molecule/TransactionsList',
  component: TransactionsListView
} as Meta;

const transactions: Transaction[] = [];

export const FullWidth = () => <TransactionsListView />;

export const HalfWidth = () => {
  return (
    <div style={{ width: '50%' }}>
      <TransactionsListView />
    </div>
  );
};
