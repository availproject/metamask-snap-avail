import type { SnapConfig } from '@avail-project/metamask-avail-types';

export const turingConfiguration: SnapConfig = {
  addressPrefix: 42,
  networkName: 'turing',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'AVAIL'
  },
  wsRpcUrl: 'https://rpc.ankr.com/avail_turing_testnet/'
};

export const mainnetConfiguration: SnapConfig = {
  addressPrefix: 43,
  networkName: 'mainnet',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'AVAIL'
  },
  wsRpcUrl: 'https://mainnet.avail-rpc.com/'
};

export const defaultConfiguration: SnapConfig = mainnetConfiguration;
