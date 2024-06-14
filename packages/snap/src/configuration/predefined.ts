import type { SnapConfig } from '@availproject/metamask-avail-types';

export const availConfiguration: SnapConfig = {
  addressPrefix: 42,
  networkName: 'turing',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'AVAIL'
  },
  wsRpcUrl: 'https://turing-rpc.avail.so/ws'
};

export const defaultConfiguration: SnapConfig = availConfiguration;
