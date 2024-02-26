// import type { ApiPromise } from '@polkadot/api';
import { ApiPromise } from 'avail-js-sdk';
import { getKeyPair } from '../../avail/account';
import { AccountData } from '@polkadot/types/interfaces';

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
  console.info('QUERY BALANCE FOR ACCOUNT', account);

  return account.data.free.toString();
}
