import type { SnapConfig } from '@availproject/metamask-avail-types';

export const turingConfiguration: SnapConfig = {
  addressPrefix: 42,
  networkName: 'turing',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'AVAIL'
  },
  wsRpcUrl: 'https://turing-rpc.avail.so/ws'
};

export const goldbergConfiguration: SnapConfig = {
  addressPrefix: 43,
  networkName: 'goldberg',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'AVAIL'
  },
  wsRpcUrl: 'https://goldberg-rpc.slowops.xyz/ws'
};

export const mainnetConfiguration: SnapConfig = {
  addressPrefix: 43,
  networkName: 'mainnet',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'AVAIL'
  },
  wsRpcUrl: 'https://mainnet-rpc.avail.so/ws'
};

export const defaultConfiguration: SnapConfig = turingConfiguration;
