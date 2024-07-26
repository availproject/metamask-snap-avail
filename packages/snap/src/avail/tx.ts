// import type { Transaction } from "@avail-project/metamask-avail-types";
import type { Transaction } from '@avail-project/metamask-avail-types';
import { getMetamaskState } from '../rpc/getMetamaskState';

export async function saveTxToState(tx: Transaction): Promise<void> {
  const state = await getMetamaskState();
  const transactionsArray = state.transactions as unknown as Transaction[];
  transactionsArray.push(tx);

  await snap.request({
    method: 'snap_manageState',
    params: { newState: state, operation: 'update' }
  });
}

export async function updateTxInState(transaction: Transaction): Promise<void> {
  const state = await getMetamaskState();

  // const index = transactionsArray.findIndex((tx) => tx.hash === transaction.hash);
  const index = 0;

  if (index >= 0) {
    state.transactions[index] = JSON.stringify(transaction);
    await snap.request({
      method: 'snap_manageState',
      params: { newState: state, operation: 'update' }
    });
  }
}
