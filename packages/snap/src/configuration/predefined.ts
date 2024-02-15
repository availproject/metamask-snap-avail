import type { SnapConfig } from '@avail/metamask-polkadot-types';

export const availConfiguration: SnapConfig = {
  addressPrefix: 42,
  networkName: 'avail',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'AVL'
  },
  wsRpcUrl: 'https://goldberg.avail.tools/api'
};

export const westendConfiguration: SnapConfig = {
  addressPrefix: 42,
  networkName: 'westend',
  unit: {
    decimals: 12,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'WND'
  },
  wsRpcUrl: 'https://westend-rpc.polkadot.io/'
};

export const defaultConfiguration: SnapConfig = availConfiguration;
