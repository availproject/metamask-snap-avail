import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Info, CheckCircle2 } from 'lucide-react';

import { useTransactions } from '@/lib/hooks/useTransactions';
import { toast } from 'sonner';
import { ethers } from 'ethers';
import useWalletStore from '@/lib/store';

interface SendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TransactionError {
  code?: number;
  message?: string;
  stack?: string;
}

type ModalState = 'form' | 'signing' | 'submitting' | 'success';

export default function SendModal({ open, onOpenChange }: SendModalProps) {
  const [modalState, setModalState] = useState<ModalState>('form');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const { sendTransaction } = useTransactions();
  const { balance } = useWalletStore();

  const validateAmount = (value: string) => {
    try {
      const amountBN = ethers.utils.parseUnits(value, 18);
      const balanceBN = ethers.utils.parseUnits(balance, 18);
      return amountBN.lte(balanceBN);
    } catch {
      return false;
    }
  };

  const handleCancel = () => {
    setModalState('form');
    setTo('');
    setAmount('');
    setTxHash('');
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!to || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateAmount(amount)) {
      toast.error('Insufficient balance');
      return;
    }

    try {
      setModalState('signing');
      const signedTx = await sendTransaction(to, amount);
      setModalState('submitting');
      setTxHash(signedTx);
      setModalState('success');
    } catch (error: unknown) {
      console.error('Error sending transaction:', error);
      const txError = error as TransactionError;
      toast.error(txError.message || 'Failed to send transaction');
      setModalState('form');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full rounded-2xl bg-[#23242B] border border-[rgba(255,255,255,0.07)] p-8">
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-2xl font-semibold text-white">Send</DialogTitle>
          <DialogClose asChild>
            <button className="text-white/60 hover:text-white text-2xl p-1 rounded-full focus:outline-none" onClick={handleCancel}>&times;</button>
          </DialogClose>
        </DialogHeader>
        <div className="border-t border-white/10 mb-6" />
        {modalState === 'form' && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white/80 text-base mb-2">To</label>
              <input
                type="text"
                placeholder="Paste recipient address here"
                className="w-full bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base outline-none border-none placeholder:text-white/30 mb-2"
                value={to}
                onChange={e => setTo(e.target.value)}
                required
              />
              <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                <Info className="w-4 h-4" />
                Please only enter a valid Avail address. Sending funds to a different network might result in permanent loss.
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-base mb-2">Amount</label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base outline-none border-none placeholder:text-white/30"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
              {amount && !validateAmount(amount) && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-1">
                  <Info className="w-4 h-4" />
                  Insufficient balance
                </div>
              )}
              <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                <Info className="w-4 h-4" />
                Available balance: {balance} AVL
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-6">
              <Button
                type="button"
                variant="ghost"
                className="flex-1 h-12 rounded-2xl border border-[rgba(255,255,255,0.16)] text-white text-lg font-semibold bg-transparent hover:bg-white/5"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!to || !amount || !validateAmount(amount)}
                className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#338FFF] to-[#5B8CFF] text-white text-lg font-semibold border-none shadow-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </Button>
            </div>
          </form>
        )}
        {modalState === 'signing' && (
          <div className="flex flex-col gap-8 items-center justify-center min-h-[260px]">
            <div className="w-full">
              <div className="block text-white/80 text-base mb-2">To</div>
              <div className="w-full bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base mb-2">{to}</div>
              <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                <Info className="w-4 h-4" />
                Please only enter a valid Avail address. Sending funds to a different network might result in permanent loss.
              </div>
            </div>
            <div className="w-full">
              <div className="block text-white/80 text-base mb-2">Amount</div>
              <div className="w-full bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base">{amount} AVL</div>
            </div>
            <Button
              disabled
              className="w-full h-12 rounded-2xl bg-[#2B2D36] text-white/60 text-lg font-semibold border-none shadow-none cursor-default"
            >
              Please sign transaction
            </Button>
          </div>
        )}
        {modalState === 'submitting' && (
          <div className="flex flex-col gap-8 items-center justify-center min-h-[260px]">
            <div className="w-full">
              <div className="block text-white/80 text-base mb-2">To</div>
              <div className="w-full bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base mb-2">{to}</div>
              <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                <Info className="w-4 h-4" />
                Please only enter a valid Avail address. Sending funds to a different network might result in permanent loss.
              </div>
            </div>
            <div className="w-full">
              <div className="block text-white/80 text-base mb-2">Amount</div>
              <div className="w-full bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base">{amount} AVL</div>
            </div>
            <Button
              disabled
              className="w-full h-12 rounded-2xl bg-[#2B2D36] text-white/60 text-lg font-semibold border-none shadow-none cursor-default"
            >
              Submitting transaction
            </Button>
          </div>
        )}
        {modalState === 'success' && (
          <div className="flex flex-col gap-8 items-center justify-center min-h-[260px]">
            <CheckCircle2 className="w-20 h-20 text-[#6EC1FF] mx-auto" />
            <div className="text-white text-xl font-semibold text-center">Transaction successful</div>
            <a
              href={`https://explorer.avail.dev/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6EC1FF] underline underline-offset-4 text-base font-medium hover:text-[#338FFF]"
            >
              View on Block Explorer
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


