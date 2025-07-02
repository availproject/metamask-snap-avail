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
  const transactionsArray = state.transactions as unknown as Transaction[];
  const index = transactionsArray.findIndex((tx) => tx.hash === transaction.hash);

  if (index >= 0) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    state.transactions[index] = { ...transaction };
    await snap.request({
      method: 'snap_manageState',
      params: { newState: state, operation: 'update' }
    });
  }
}
