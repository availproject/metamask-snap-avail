// import type { ApiPromise } from '@polkadot/api';
import type { ApiPromise } from 'avail-js-sdk';
import type { AccountData } from '@polkadot/types/interfaces';
import { getKeyPair } from '../../avail/account';

/**
 * Returns balance as BN
 * @param api
 * @param address
 */
export async function getBalance(api: ApiPromise, address?: string): Promise<string> {
  if (!address) {
    address = (await getKeyPair()).address;
  }

  const account = (await api.query.system.account(address)) as unknown as { data: AccountData };

  return account.data.free.toString();
}
