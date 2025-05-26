import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Copy, CheckCircle2, Info } from 'lucide-react';
import { useState } from 'react';
import { useTransactions } from '@/lib/hooks/useTransactions';
import { toast } from 'sonner';

interface ExportKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportKeyDialog({ isOpen, onClose }: ExportKeyDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [copied, setCopied] = useState(false);
  const { exportSeedPhrase } = useTransactions();

  const handleExport = async () => {
    try {
      console.log('=== EXPORT SEED DIALOG START ===');
      console.log('Dialog state:', { isOpen, isLoading, hasSeedPhrase: !!seedPhrase });
      
      setIsLoading(true);
      console.log('Calling exportSeedPhrase...');
      const seed = await exportSeedPhrase();
      console.log('Export result:', { success: !!seed, length: seed?.length });
      
      if (seed) {
        setSeedPhrase(seed);
        toast.success('Seed phrase exported successfully');
      }
    } catch (error) {
      console.error('Error in handleExport:', error);
      if (error instanceof Error) {
        if (error.message === 'Export cancelled by user') {
          toast.info('Export cancelled');
          onClose();
        } else if (error.message === 'Please install the Avail Snap first') {
          toast.error('Please install the Avail Snap first');
          onClose();
        } else if (error.message === 'Please authorize the snap to access your wallet') {
          toast.error('Please authorize the snap to access your wallet');
          onClose();
        } else {
          toast.error(error.message || 'Failed to export seed phrase. Please try again.');
        }
      } else {
        toast.error('Failed to export seed phrase. Please try again.');
      }
    } finally {
      setIsLoading(false);
      console.log('=== EXPORT SEED DIALOG END ===');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(seedPhrase);
      setCopied(true);
      toast.success('Seed phrase copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying seed phrase:', error);
      toast.error('Failed to copy seed phrase');
    }
  };

  const handleCancel = () => {
    setSeedPhrase('');
    setCopied(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#23242B] border border-[#353743] rounded-2xl min-w-[360px] max-w-[480px] w-full p-0 overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <span className="text-white text-2xl font-semibold">Export key</span>
          <DialogClose asChild>
            <button className="text-white/70 hover:text-white text-2xl p-2 rounded-full focus:outline-none">
              <X />
            </button>
          </DialogClose>
        </div>
        <div className="border-t border-[#353743] mx-2" />
        <div className="px-8 pt-8 pb-4 max-h-[70vh] overflow-y-auto">
          <div className="text-white/60 text-sm mb-4">
            The Secret Recovery Phrase (SRP) provides full access to your wallet and funds.
            <br />
            <br />
            MetaMask snap is a non-custodial wallet. That means you&apos;re the owner of your SRP.
          </div>
          
          <div className="mb-2 flex items-center justify-between">
            <span className="text-white font-semibold text-lg">Seed Phrase</span>
            {seedPhrase && (
              <button
                className="flex items-center gap-2 text-white/80 font-semibold text-base hover:text-white focus:outline-none"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" /> Copy to clipboard
                  </>
                )}
              </button>
            )}
          </div>

          <div className="bg-[#292B33] rounded-xl p-4 text-white/80 text-lg font-mono min-h-[80px] mb-4 whitespace-normal">
            {seedPhrase || '**************************************\n********************'}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Info className="w-5 h-5 text-[#FF5A5A]" />
            <span className="text-[#FF5A5A] text-xs">
              Make sure no one is looking at your screen. MetaMask Support will never request this
            </span>
          </div>

          {!seedPhrase && (
            <Button
              onClick={handleExport}
              disabled={isLoading}
              className="w-full rounded-full bg-gradient-to-r from-[#2778E9] to-[#439FE7] text-white text-lg font-semibold py-6 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Exporting...' : 'Reveal seed phrase'}
            </Button>
          )}

          {seedPhrase && (
            <Button
              className="w-full rounded-full border border-white/20 text-white text-lg font-semibold py-6 mt-4 bg-transparent hover:bg-white/10"
              variant="outline"
              onClick={handleCancel}
            >
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


  
