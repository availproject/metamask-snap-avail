import type { Injected, InjectedAccount, InjectedWindow } from '@polkadot/extension-inject/types';
import type { SnapConfig } from '@avail/metamask-polkadot-types';
import type { SignerPayloadJSON, SignerPayloadRaw, SignerResult } from '@polkadot/types/types';
import type { HexString } from '@polkadot/util/types';
import { enablePolkadotSnap } from '../index';
import { hasMetaMask, isMetamaskSnapsSupported } from '../utils';

interface Web3Window extends InjectedWindow {
  ethereum: unknown;
}

const config: SnapConfig = {
  networkName: 'avail'
};

function transformAccounts(accounts: string[]): InjectedAccount[] {
  return accounts.map((address, i) => ({
    address,
    name: `Polkadot Snap #${i}`,
    type: 'ethereum'
  }));
}

async function injectPolkadotSnap(win: Web3Window): Promise<void> {
  try {
    const snap = (await enablePolkadotSnap(config)).getMetamaskSnapApi();

    win.injectedWeb3.Snap = {
      enable: async (): Promise<Injected> => {
        return {
          accounts: {
            get: async (): Promise<InjectedAccount[]> => {
              try {
                const response = await snap.getAddress();
                return transformAccounts([response]);
              } catch (error) {
                console.error('Error getting address:', error);
                throw error;
              }
            },
            subscribe: (_cb: (accounts: InjectedAccount[]) => void): (() => void) => {
              // Currently there is only available only one account, in that case this method will never return anything
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              return (): void => {};
            }
          },
          signer: {
            signPayload: async (payload: SignerPayloadJSON): Promise<SignerResult> => {
              try {
                const signature = (await snap.signPayloadJSON(payload)) as HexString;
                return { id: 0, signature };
              } catch (error) {
                console.error('Error signing payload:', error);
                throw error;
              }
            },
            signRaw: async (raw: SignerPayloadRaw): Promise<SignerResult> => {
              try {
                const signature = (await snap.signPayloadRaw(raw)) as HexString;
                return { id: 0, signature };
              } catch (error) {
                console.error('Error signing raw payload:', error);
                throw error;
              }
            }
          }
        };
      },
      version: '0'
    };
  } catch (error) {
    console.error('Error injecting Polkadot Snap:', error);
    throw error;
  }
}

export async function initPolkadotSnap(): Promise<boolean> {
  try {
    const win = window as Window & Web3Window;
    win.injectedWeb3 = win.injectedWeb3 || {};

    if (hasMetaMask()) {
      const result = await isMetamaskSnapsSupported();
      if (result) {
        await injectPolkadotSnap(win);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error initializing Polkadot Snap:', error);
    return false;
  }
}
