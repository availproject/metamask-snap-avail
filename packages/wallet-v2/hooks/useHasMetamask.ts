import { useUIStore } from '@/slices/UISlice';
import {useWalletStore} from '@/slices/walletSlice';
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react';

export const useHasMetamask = () => {
  const { enableLoadingWithMessage, disableLoading } = useUIStore();
  const { setProvider } = useWalletStore();
  const [hasMetamask, setHasMetamask] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        enableLoadingWithMessage('Detecting Metamask...');
        
        // Check if MetaMask is installed
        if (await detectMetamask()) {
          const _provider = await getProvider();
          setProvider(_provider);
          setHasMetamask(_provider != null);
        } else {
          setProvider(null);
          setHasMetamask(false);
        }
      } catch (err) {
        setProvider(null);
        setHasMetamask(false);
      } finally {
        disableLoading();
      }
    };

    init();
  }, [setProvider, enableLoadingWithMessage, disableLoading]);

  return {
    hasMetamask,
  };
};

// Detect if MetaMask is installed
export const detectMetamask = async () => {
  try {
    const hasMetamask = await detectEthereumProvider({ mustBeMetaMask: true });
    return !!hasMetamask;
  } catch (e) {
    console.error('Error', e);
    return false;
  }
};

// Get the Ethereum provider (MetaMask or others)
export const getProvider = async () => {
  const { ethereum } = window as any;
  let providers = [ethereum];

  if ('detected' in ethereum) {
    providers = ethereum['detected'];
  } else if ('providers' in ethereum) {
    providers = ethereum['providers'];
  }

  // Detect provider by sending request
  for (const provider of providers) {
    if (provider && (await isSupportSnap(provider))) {
      window.ethereum = provider;
      return window.ethereum;
    }
  }

  return null;
};

// Check if the provider supports Snap
const isSupportSnap = async (provider: any) => {
  try {
    await provider.request({
      method: 'wallet_getSnaps',
    });
    return true;
  } catch {
    return false;
  }
};
