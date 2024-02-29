import { Meta } from '@storybook/react';
import { Transaction } from '@types';
import { TransactionListItemView } from './TransactionListItem.view';

export default {
  title: 'Molecule/TransactionListItem',
  component: TransactionListItemView
} as Meta;

const transaction: Transaction = {} as Transaction;

export const FullWidth = () => <TransactionListItemView transaction={transaction} />;

export const HalfWidth = () => {
  return (
    <div style={{ width: '50%' }}>
      <TransactionListItemView transaction={transaction} />
    </div>
  );
};
