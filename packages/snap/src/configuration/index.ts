import type { SnapConfig } from '@avail/metamask-polkadot-types';
import { getMetamaskState } from '../rpc/getMetamaskState';
import { availConfiguration, defaultConfiguration } from './predefined';

export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case 'avail':
      return availConfiguration;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(): Promise<SnapConfig> {
  try {
    const state = await getMetamaskState();

    if (!state || !state.config) {
      return defaultConfiguration;
    }
    return JSON.parse(<string>state.config) as SnapConfig;
  } catch (error) {
    console.error('Failed to fetch configuration:', error);
    return defaultConfiguration;
  }
}
