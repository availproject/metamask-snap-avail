import { Erc20Token, Erc20TokenBalance, Network } from '@types';
import { ApiPromise, initialize, isValidAddress as isValidAvailAddress } from 'avail-js-sdk';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import { KeyboardEvent } from 'react';

import {
  DECIMALS_DISPLAYED_MAX_LENGTH,
  TURING_TESTNET_EXPLORER,
  TIMEOUT_DURATION,
  GOLDBERG_TESTNET_EXPLORER,
  MAINNET_EXPLORER
} from './constants';

export const shortenAddress = (address: string, num = 3) => {
  if (!address) return '';
  return (
    !!address && `${address.substring(0, num + 2)}...${address.substring(address.length - num - 1)}`
  );
};

export async function initializeApi(endpoint: string) {
  try {
    const api = await initialize(endpoint);
    console.log('Api connected successfully');
    return api;
  } catch (error) {
    console.error('Error initializing Api :', error);
    setTimeout(initializeApi, 5000);
  }
}

export const getRpcEndpoint = (chainId: number) => {
  switch (chainId) {
    case 0: // turing
      return 'wss://turing-rpc.avail.so/ws';
    case 1: // goldberg
      return 'wss://goldberg-rpc.slowops.xyz/ws';
    case 2: // mainnet
      return 'wss://mainnet-rpc.avail.so/ws';
    default:
      throw new Error('Unsupported chain ID');
  }
};

export const openExplorerTab = (address: string, type: string, chainId: number) => {
  let explorerUrl = TURING_TESTNET_EXPLORER;
  switch (chainId) {
    case 0:
      explorerUrl = TURING_TESTNET_EXPLORER;
      break;
    case 1:
      explorerUrl = GOLDBERG_TESTNET_EXPLORER;
      break;
    case 2:
      explorerUrl = MAINNET_EXPLORER;
      break;
  }
  window.open(explorerUrl + type + '/' + address, '_blank')?.focus();
};

export const isValidAddress = (toCheck: string) => {
  if (isValidAvailAddress(toCheck)) {
    return true;
  } else {
    return false;
  }
};

export const addMissingPropertiesToToken = (
  token: Erc20Token,
  balance?: string,
  usdPrice?: number
): Erc20TokenBalance => {
  return {
    ...token,
    amount: new BigNumber(balance ? balance : '0')
  };
};

export const getHumanReadableAmount = (asset: Erc20TokenBalance) => {
  // const amountStr = assetAmount
  //   ? assetAmount
  //   : ethers.utils.formatUnits(asset.amount, asset.decimals);
  if (asset.amount.gt(0)) {
    const amountStr = ethers.utils.formatUnits(asset.amount.toString(), asset.decimals);
    const indexDecimal = amountStr.indexOf('.');
    const integerPart = amountStr.substring(0, indexDecimal);
    let decimalPart = amountStr.substring(indexDecimal + 1, indexDecimal + 5 - integerPart.length);
    if (integerPart === '0') {
      decimalPart = amountStr.substring(indexDecimal + 1);
    }
    const decimalPartArray = decimalPart.split('');
    const firstNonZeroIndex = decimalPartArray.findIndex((char) => char !== '0');
    if (firstNonZeroIndex === -1) {
      return integerPart;
    }

    return amountStr.substring(0, indexDecimal + firstNonZeroIndex + 3);
  } else {
    return '0';
  }
};

export const getMaxDecimalsReadable = (asset: Erc20TokenBalance, assetAmount?: string) => {
  const amountStr = assetAmount
    ? assetAmount
    : ethers.utils.formatUnits(asset.amount.toString(), asset.decimals);
  const indexDecimal = amountStr.indexOf('.');
  const decimalPart = amountStr.substring(indexDecimal + 1).split('');
  const firstNonZeroIndexReverse = decimalPart.reverse().findIndex((char) => char !== '0');
  if (firstNonZeroIndexReverse !== -1) {
    let lastNonZeroIndex = amountStr.length - firstNonZeroIndexReverse;
    if (lastNonZeroIndex - indexDecimal > DECIMALS_DISPLAYED_MAX_LENGTH) {
      lastNonZeroIndex = indexDecimal + 1 + DECIMALS_DISPLAYED_MAX_LENGTH;
    }
    return amountStr.substring(0, lastNonZeroIndex);
  }
  return amountStr.substring(0, indexDecimal);
};

export const getAmountPrice = (asset: Erc20TokenBalance, assetAmount: number, usdMode: boolean) => {
  // if (asset.usdPrice) {
  //   if (!usdMode) {
  //     const result = asset.usdPrice * assetAmount;
  //     return result.toFixed(2).toString();
  //   } else {
  //     const result = assetAmount / asset.usdPrice;
  //     return result.toFixed(getMaxDecimals(asset)).toString();
  //   }
  // }
  return '';
};

export const getMaxDecimals = (asset: Erc20TokenBalance) => {
  const MAX_DECIMALS = 6;
  if (asset.decimals > MAX_DECIMALS) {
    return MAX_DECIMALS;
  }
  return asset.decimals;
};

export const isSpecialInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
  return (
    event.key === 'Backspace' ||
    event.ctrlKey ||
    event.key === 'ArrowRight' ||
    event.key === 'ArrowLeft' ||
    event.metaKey
  );
};

export const fetchWithTimeout = async (
  resource: string,
  options = { timeout: TIMEOUT_DURATION }
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), options.timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
};
