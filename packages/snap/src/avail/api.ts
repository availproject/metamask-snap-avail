import { ApiPromise, signedExtensions, types, rpc } from 'avail-js-sdk';
import { getConfiguration } from '../configuration';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { HttpProvider } from '@polkadot/rpc-provider/http';

let api: ApiPromise;
let provider: HttpProvider;
let isConnecting: boolean;

/**
 * Initialize substrate api and awaits for it to be ready
 */
async function initApi(rpcUrl: string): Promise<ApiPromise> {
  try {
    await cryptoWaitReady();
    provider = new HttpProvider(rpcUrl)
    const opt = {
      provider: provider,
      noInitWarn: true,
      types,
      rpc,
      signedExtensions
    }
    api = await ApiPromise.create(opt)
    console.info('Api is ready', api);
    return api
  } catch (error) {
    console.error('Error on provider creation', error);
    throw error;
  }
}

export const resetApi = async (): Promise<void> => {
  if (api && provider) {
    try {
      await api.disconnect();
    } catch (e) {
      console.error('Error on api disconnect.');
    }
    api = null;
    provider = null;
  }
};

export const getApi = async (): Promise<ApiPromise> => {
  console.info('Getting api');
  if (!api) {
    // api not initialized or configuration changed
    const config = await getConfiguration();
    console.info('Config API', config);
    console.info('Connecting to', config.wsRpcUrl);
    api = await initApi(config.wsRpcUrl);
    console.info('API', api);
    isConnecting = false;
  } else {
    while (isConnecting) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (!provider.isConnected) {
      isConnecting = true;
      await provider.connect();
      isConnecting = false;
    }
  }
  return api;
};
