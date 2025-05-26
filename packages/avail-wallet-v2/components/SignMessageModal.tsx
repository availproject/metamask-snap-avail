import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { CheckCircle2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import useWalletStore from '@/lib/store';

interface SignMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SignMessageError {
  message?: string;
  code?: number;
  stack?: string;
}

type ModalState = 'form' | 'signing' | 'confirming' | 'success';

export default function SignMessageModal({ open, onOpenChange }: SignMessageModalProps) {
  const [modalState, setModalState] = useState<ModalState>('form');
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const { api } = useWalletStore();

  const handleCancel = () => {
    setModalState('form');
    setMessage('');
    setSignedMessage('');
    onOpenChange(false);
  };

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message) {
      toast.error('Please enter a message to sign');
      return;
    }

    if (!api) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      setModalState('signing');
      
      // Generate transaction payload for message signing
      const txPayload = await api.generateTransactionPayload(
        'system',
        'remark',
        [message]
      );

      // Sign the payload
      const signedTx = await api.signPayloadJSON(txPayload.payload);
      
      // Send the signed transaction
      await api.send(signedTx, txPayload, 0); // Using network 0 as default
      
      setModalState('confirming');
      setSignedMessage(signedTx);
      setModalState('success');
      
      toast.success('Message signed successfully');
    } catch (error: unknown) {
      console.error('Error signing message:', error);
      const signError = error as SignMessageError;
      
      if (signError.message?.includes('failed to respond to the request in time')) {
        toast.error('Signing timed out. Please try again.');
      } else if (signError.message?.includes('Cannot decode value')) {
        toast.error('Invalid message format. Please try again with a different message.');
      } else {
        toast.error(signError.message || 'Failed to sign message');
      }
      
      setModalState('form');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full rounded-2xl bg-[#23242B] border border-[rgba(255,255,255,0.07)] p-8">
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-2xl font-semibold text-white">Sign Message</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-white/60 hover:text-white text-2xl p-1 rounded-full focus:outline-none"
              onClick={handleCancel}
            >
              &times;
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="border-t border-white/10 mb-6" />
        {modalState === 'form' && (
          <form className="flex flex-col gap-4" onSubmit={handleSign}>
            <div>
              <Textarea
                placeholder="Enter message to sign"
                className="w-full min-h-[196px] bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base outline-none border-none placeholder:text-white/30 resize-none mb-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <div className="text-white/40 text-xs mt-1">
                Enter the message you want to sign. The message will be signed using your wallet.
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
                disabled={!message || !api}
                className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#338FFF] to-[#5B8CFF] text-white text-lg font-semibold border-none shadow-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign
              </Button>
            </div>
          </form>
        )}
        {modalState === 'signing' && (
          <>
            <Textarea
              placeholder="Enter message to sign"
              className="w-full min-h-[196px] bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base outline-none border-none placeholder:text-white/30 resize-none mb-2"
              value={message}
              disabled
            />
            <Button
              disabled
              className="w-full h-12 rounded-2xl bg-[#2B2D36] text-white/60 text-lg font-semibold border-none shadow-none cursor-default mt-8"
            >
              Please sign message
            </Button>
          </>
        )}
        {modalState === 'confirming' && (
          <>
            <Textarea
              placeholder="Enter message to sign"
              className="w-full min-h-[196px] bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base outline-none border-none placeholder:text-white/30 resize-none mb-2"
              value={message}
              disabled
            />
            <Button
              disabled
              className="w-full h-12 rounded-2xl bg-[#2B2D36] text-white/60 text-lg font-semibold border-none shadow-none cursor-default mt-8"
            >
              Confirming signature
            </Button>
          </>
        )}
        {modalState === 'success' && (
          <div className="flex flex-col gap-8 items-center justify-center min-h-[200px]">
            <CheckCircle2 className="w-20 h-20 text-[#6EC1FF] mx-auto" />
            <div className="text-white text-xl font-semibold text-center">
              Message signed successfully
            </div>
            <div className="w-full bg-[#2B2D36] text-white/70 rounded-2xl px-5 py-4 text-base break-all">
              {signedMessage}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


