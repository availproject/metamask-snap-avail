import type { Transaction } from '@avail-project/metamask-avail-types';

import type { MetamaskState } from '../../interfaces';

export async function getTransactions(): Promise<Transaction[]> {
  const state = (await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' }
  })) as MetamaskState;
  return state.transactions as unknown as Transaction[];
}
