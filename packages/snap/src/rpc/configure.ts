import type { SnapConfig } from '@avail-project/metamask-avail-types';
import deepmerge from 'deepmerge';

import { getDefaultConfiguration } from '../configuration';

import { getMetamaskState } from './getMetamaskState';

export async function configure(networkName: string, overrides: unknown): Promise<SnapConfig> {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = deepmerge(defaultConfig, overrides) as SnapConfig;

  const state = await getMetamaskState();

  await snap.request({
    method: 'snap_manageState',
    params: {
      newState: { ...state, config: JSON.stringify(configuration) },
      operation: 'update'
    }
  });

  return configuration;
}
