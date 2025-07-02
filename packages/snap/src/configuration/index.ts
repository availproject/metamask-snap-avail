import type { SnapConfig } from '@avail-project/metamask-avail-types';

import { getMetamaskState } from '../rpc/getMetamaskState';

import {
  turingConfiguration,
  defaultConfiguration,
  goldbergConfiguration,
  mainnetConfiguration
} from './predefined';

export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case 'turing':
      return turingConfiguration;
    case 'goldberg':
      return goldbergConfiguration;
    case 'mainnet':
      return mainnetConfiguration;
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
