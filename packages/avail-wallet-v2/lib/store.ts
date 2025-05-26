import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { enableAvailSnap } from '@avail-project/metamask-avail-adapter';
import { MetamaskAvailSnap } from '@avail-project/metamask-avail-adapter/build/snap';
import { MetamaskSnapApi } from '@avail-project/metamask-avail-adapter/build/types';
import { toast } from 'sonner';
import { SnapNetworks, Transaction } from '@avail-project/metamask-avail-types';
import { ethers } from 'ethers';

// Constants
const AVAIL_DECIMALS = 18;
const PRICE_UPDATE_INTERVAL = 60000; // 1 minute in milliseconds

// Helper functions
const formatBalance = (balance: string): string => {
  try {
    // Handle both string and BigNumber inputs
    const balanceStr = balance.toString();
    const formattedBalance = ethers.utils.formatUnits(balanceStr, AVAIL_DECIMALS);
    // Format to 4 decimal places and remove trailing zeros
    return Number(formattedBalance).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  } catch (error) {
    console.error('Error formatting balance:', error);
    return '0.00';
  }
};

const calculateUsdBalance = (balance: string, price: number): string => {
  try {
    const balanceStr = balance.toString();
    const formattedBalance = ethers.utils.formatUnits(balanceStr, AVAIL_DECIMALS);
    const usdValue = Number(formattedBalance) * price;
    return usdValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'USD'
    });
  } catch (error) {
    console.error('Error calculating USD balance:', error);
    return '$0.00';
  }
};

export type Network = 'turing' | 'mainnet';

interface WalletState {
  connected: boolean;
  address: string;
  selectedNetwork: Network;
  activeNetwork: Network;
  transactions: Transaction[];
  exportDialogOpen: boolean;
  revealed: boolean;
  copied: boolean;
  canReveal: boolean;
  signing: boolean;
  seed: string;
  balance: string;
  usdBalance: string;
  snap: MetamaskAvailSnap | null;
  api: MetamaskSnapApi | null;
  publicKey: string;
  availPrice: number;
  blockNumber: number;
  blockHash: string;
  setConnected: (connected: boolean) => void;
  setAddress: (address: string) => void;
  setSelectedNetwork: (network: Network) => void;
  setActiveNetwork: (network: Network) => void;
  setTransactions: (txs: Transaction[]) => void;
  addTransaction: (tx: Transaction) => void;
  setExportDialogOpen: (open: boolean) => void;
  setRevealed: (revealed: boolean) => void;
  setCopied: (copied: boolean) => void;
  setCanReveal: (canReveal: boolean) => void;
  setSigning: (signing: boolean) => void;
  setSeed: (seed: string) => void;
  resetExportDialog: () => void;
  setBalance: (balance: string) => void;
  setUsdBalance: (usdBalance: string) => void;
  setSnap: (snap: MetamaskAvailSnap | null) => void;
  setApi: (api: MetamaskSnapApi | null) => void;
  setPublicKey: (publicKey: string) => void;
  setAvailPrice: (price: number) => void;
  setBlockInfo: (blockNumber: number, blockHash: string) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: string) => Promise<void>;
  refreshBalance: () => Promise<void>;
  refreshBlockInfo: () => Promise<void>;
}

const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      connected: false,
      address: '',
      selectedNetwork: 'turing',
      activeNetwork: 'turing',
      transactions: [],
      exportDialogOpen: false,
      revealed: false,
      copied: false,
      canReveal: true,
      signing: false,
      seed: '',
      balance: '0',
      usdBalance: '0.00',
      snap: null,
      api: null,
      publicKey: '',
      availPrice: 0,
      blockNumber: 0,
      blockHash: '',
      setConnected: (connected) => set({ connected }),
      setAddress: (address) => set({ address }),
      setSelectedNetwork: (selectedNetwork) => set({ selectedNetwork }),
      setActiveNetwork: (activeNetwork) => set({ activeNetwork }),
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (tx) => set({ transactions: [...get().transactions, tx] }),
      setExportDialogOpen: (exportDialogOpen) => set({ exportDialogOpen }),
      setRevealed: (revealed) => set({ revealed }),
      setCopied: (copied) => set({ copied }),
      setCanReveal: (canReveal) => set({ canReveal }),
      setSigning: (signing) => set({ signing }),
      setSeed: (seed) => set({ seed }),
      resetExportDialog: () => set({ revealed: false, copied: false, canReveal: true, signing: false }),
      setBalance: (balance) => set({ 
        balance: formatBalance(balance),
        usdBalance: calculateUsdBalance(balance, get().availPrice)
      }),
      setUsdBalance: (usdBalance) => set({ usdBalance }),
      setSnap: (snap) => set({ snap }),
      setApi: (api) => set({ api }),
      setPublicKey: (publicKey) => set({ publicKey }),
      setAvailPrice: (price) => set({ availPrice: price }),
      setBlockInfo: (blockNumber, blockHash) => set({ blockNumber, blockHash }),
      connectWallet: async () => {
        try {
          const result = await enableAvailSnap(
            { networkName: get().activeNetwork as SnapNetworks },
            'npm:@avail-project/avail-snap'
          );
          if (result) {
            const snapApi = result.getMetamaskSnapApi();
            if (snapApi) {
              const rawBalance = await snapApi.getBalance();
              const blockInfo = await snapApi.getLatestBlock();
              set({ 
                snap: result,
                api: snapApi,
                address: await snapApi.getAddress(),
                publicKey: await snapApi.getPublicKey(),
                balance: formatBalance(rawBalance),
                usdBalance: calculateUsdBalance(rawBalance, get().availPrice),
                transactions: await snapApi.getAllTransactions(),
                blockNumber: Number(blockInfo.number),
                blockHash: blockInfo.hash,
                connected: true
              });
              toast.success('Wallet connected successfully');
            }
          } else {
            toast.error('Failed to install Avail Snap');
          }
        } catch (error) {
          console.error('Error connecting wallet:', error);
          toast.error('Failed to connect wallet');
        }
      },
      disconnectWallet: () => {
        set({
          connected: false,
          address: '',
          balance: '0',
          publicKey: '',
          snap: null,
          api: null,
          transactions: [],
          activeNetwork: 'turing',
          selectedNetwork: 'turing'
        });
        toast.success('Wallet disconnected');
      },
      switchNetwork: async (network: string) => {
        try {
          const { api } = get();
          if (api) {
            await api.setConfiguration({ networkName: network as SnapNetworks });
            set({
              activeNetwork: network as Network,
              selectedNetwork: network as Network,
              balance: await api.getBalance(),
              transactions: await api.getAllTransactions()
            });
            toast.success(`Switched to ${network} network`);
          }
        } catch (error) {
          console.error('Error switching network:', error);
          toast.error('Failed to switch network');
        }
      },
      refreshBalance: async () => {
        try {
          const { api } = get();
          if (api) {
            const rawBalance = await api.getBalance();
            set({ 
              balance: formatBalance(rawBalance),
              usdBalance: calculateUsdBalance(rawBalance, get().availPrice)
            });
          }
        } catch (error) {
          console.error('Error refreshing balance:', error);
        }
      },
      refreshBlockInfo: async () => {
        try {
          const { api } = get();
          if (api) {
            const blockInfo = await api.getLatestBlock();
            set({ 
              blockNumber: Number(blockInfo.number),
              blockHash: blockInfo.hash
            });
          }
        } catch (error) {
          console.error('Error refreshing block info:', error);
        }
      }
    }),
    {
      name: 'wallet-store',
      partialize: (state) => ({
        connected: state.connected,
        address: state.address,
        selectedNetwork: state.selectedNetwork,
        activeNetwork: state.activeNetwork,
        transactions: state.transactions,
        seed: state.seed,
        balance: state.balance,
        usdBalance: state.usdBalance,
        availPrice: state.availPrice,
        blockNumber: state.blockNumber,
        blockHash: state.blockHash,
      }),
    }
  )
);

// Price fetching function
const fetchAvailPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=avail&vs_currencies=usd');
    const data = await response.json();
    const price = data.avail?.usd || 0;
    useWalletStore.getState().setAvailPrice(price);
  } catch (error) {
    console.error('Error fetching AVAIL price:', error);
  }
};

// Initial price fetch
fetchAvailPrice();

// Set up periodic price updates
if (typeof window !== 'undefined') {
  setInterval(fetchAvailPrice, PRICE_UPDATE_INTERVAL);
}

// Set up periodic block info updates
if (typeof window !== 'undefined') {
  setInterval(() => {
    const store = useWalletStore.getState();
    if (store.connected) {
      store.refreshBlockInfo();
    }
  }, 10000); // Update every 10 seconds
}

export default useWalletStore; 
