'use client';

import { useEffect } from 'react';
import { useInitializationStore } from '../store/initialization';
import useWalletStore from '../store';
import { enableAvailSnap } from '@avail-project/metamask-avail-adapter';
import { toast } from 'sonner';

const defaultSnapId = 'npm:@avail-project/avail-snap';

const hasMetaMask = () => {
  if (typeof window === 'undefined') return false;
  return window.ethereum?.isMetaMask || false;
};

const isMetaMaskFlask = async () => {
  if (typeof window === 'undefined') return false;
  try {
    const clientVersion = await window.ethereum.request({ method: 'web3_clientVersion' }) as string;
    return clientVersion.toLowerCase().includes('flask');
  } catch {
    return false;
  }
};

export const useInitialization = () => {
  const { setInitializing } = useInitializationStore();
  const { api, setApi } = useWalletStore();

  const initializeWallet = async () => {
    try {
      setInitializing(true, 'Initializing wallet...');

      // Check for MetaMask
      if (!hasMetaMask()) {
        throw new Error('MetaMask is not installed');
      }

      // Check for MetaMask Flask
      const isFlask = await isMetaMaskFlask();
      if (!isFlask) {
        throw new Error('Please install MetaMask Flask to use this wallet');
      }

      // Request snap installation
      const snapId = process.env.NEXT_PUBLIC_SNAP_ID || defaultSnapId;
      
      try {
        const metamaskAvailSnap = await enableAvailSnap({ networkName: 'turing' }, snapId);

        if (!metamaskAvailSnap) {
          throw new Error('Failed to initialize Avail Snap');
        }

        // Get the API instance
        const snapApi = metamaskAvailSnap.getMetamaskSnapApi();
        setApi(snapApi);

        // Request wallet permissions
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{
            eth_accounts: {},
          }],
        });

        setInitializing(false);
        return true;
      } catch (error) {
        // If snap is already installed, try to get the API directly
        if (error instanceof Error && error.message.includes('already installed')) {
          const metamaskAvailSnap = await enableAvailSnap({ networkName: 'turing' }, snapId);
          const snapApi = metamaskAvailSnap.getMetamaskSnapApi();
          setApi(snapApi);
          setInitializing(false);
          return true;
        }
        throw error;
      }
    } catch (error) {
      console.error('Error initializing wallet:', error);
      setInitializing(false);
      
      if (error instanceof Error) {
        if (error.message.includes('MetaMask is not installed')) {
          toast.error('Please install MetaMask to use this wallet');
        } else if (error.message.includes('MetaMask Flask')) {
          toast.error('Please install MetaMask Flask to use this wallet');
        } else {
          toast.error('Failed to initialize wallet. Please try again.');
        }
      }
      
      return false;
    }
  };

  useEffect(() => {
    if (!api) {
      initializeWallet();
    }
  }, [api]);

  return {
    initializeWallet
  };
}; 
