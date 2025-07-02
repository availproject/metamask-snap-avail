import useWalletStore from '@/lib/store';
import { toast } from 'sonner';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

interface TransactionError {
  code?: number;
  message?: string;
  stack?: string;
}

export const useTransactions = () => {
  const { api, setTransactions } = useWalletStore();

  const sendTransaction = async (recipient: string, amount: string, networkId: number = 0) => {
    try {
      if (!api) {
        throw new Error('Wallet not connected');
      }

      const amountBN = ethers.utils.parseUnits(amount, 18);
      const txPayload = await api.generateTransactionPayload(
        'balances',
        'transferKeepAlive',
        [recipient, new BigNumber(amountBN.toString()).toString()]
      );

      const signedTx = await api.signPayloadJSON(txPayload.payload);
      await api.send(signedTx, txPayload, networkId);
      
      toast.success('Transaction sent successfully');
      
      const updatedTransactions = await api.getAllTransactions();
      setTransactions(updatedTransactions.filter(tx => tx.network === networkId));
      
      return signedTx;
    } catch (error: unknown) {
      console.error('Error sending transaction:', error);
      const txError = error as TransactionError;
      
      if (txError.code === -32603 && txError.message === 'Failed to fetch') {
        throw new Error('Network error: Unable to connect to the blockchain. Please check your internet connection and try again.');
      }
      
      if (txError.message?.includes('insufficient funds')) {
        throw new Error('Insufficient funds to complete the transaction');
      }
      
      if (txError.message?.includes('user rejected')) {
        throw new Error('Transaction was rejected');
      }
      
      throw new Error(txError.message || 'Failed to send transaction');
    }
  };

  const signMessage = async (message: string, networkId: number = 0) => {
    try {
      if (!api) {
        throw new Error('Wallet not connected');
      }

      // First ensure snap is connected
      await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          'npm:@avail-project/avail-snap': {}
        }
      });

      const txPayload = await api.generateTransactionPayload(
        'system',
        'remark',
        [message]
      );

      const signedTx = await api.signPayloadJSON(txPayload.payload);
      await api.send(signedTx, txPayload, networkId);
      
      toast.success('Message signed successfully');
      
      const updatedTransactions = await api.getAllTransactions();
      setTransactions(updatedTransactions.filter(tx => tx.network === networkId));
      
      return signedTx;
    } catch (error: unknown) {
      console.error('Error signing message:', error);
      const signError = error as TransactionError;
      
      if (signError.message?.includes('failed to respond to the request in time')) {
        throw new Error('Signing timed out. Please try again.');
      }
      
      if (signError.message?.includes('Cannot decode value')) {
        throw new Error('Invalid message format. Please try again with a different message.');
      }
      
      throw new Error(signError.message || 'Failed to sign message');
    }
  };

  const exportSeedPhrase = async () => {
    // try {
      if (!api) {
        throw new Error('Wallet not connected');
      }

      // First ensure snap is connected and enabled
      const snaps = await window.ethereum.request({
        method: 'wallet_getSnaps'
      }) as Record<string, { enabled: boolean }>;

      if (!snaps['npm:@avail-project/avail-snap']?.enabled) {
        console.log('Snap not enabled, requesting connection...');
        await window.ethereum.request({
          method: 'wallet_requestSnaps',
          params: {
            'npm:@avail-project/avail-snap': {}
          }
        });
        console.log('Snap connection requested');
      }

      console.log('Requesting seed export...');
      const seedPhrase = await api.exportSeed();
      console.log('Seed export response:', seedPhrase);
      
      if (!seedPhrase) {
        console.error('Export returned empty seed');
        throw new Error('Failed to export seed phrase');
      }

      return seedPhrase;
    // } catch (error) {
    //   console.error('Error exporting seed phrase:', error);
    //   if (error instanceof Error) {
    //     if (error.message.includes('User rejected')) {
    //       throw new Error('Export cancelled by user');
    //     }
    //     if (error.message.includes('not installed')) {
    //       throw new Error('Please install the Avail Snap first');
    //     }
    //     if (error.message.includes('not authorized')) {
    //       throw new Error('Please authorize the snap to access your wallet');
    //     }
    //     if (error.message.includes('Failed to get private key')) {
    //       throw new Error('Failed to access wallet keys. Please try again.');
    //     }
    //     if (error.message.includes('Failed to generate seed')) {
    //       throw new Error('Failed to generate seed phrase. Please try again.');
    //     }
    //   }
      // throw error;
    // }
  };

  return {
    sendTransaction,
    signMessage,
    exportSeedPhrase
  };
}; 
