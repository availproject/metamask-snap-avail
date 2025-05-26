import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Copy, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import useWalletStore from '@/lib/store';

interface ReceiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReceiveModal({ open, onOpenChange }: ReceiveModalProps) {
  const address = useWalletStore((state) => state.address);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.custom(
      (id: string | number) => (
        <div className="flex items-center justify-between bg-[#131313] rounded-2xl px-6 py-3 shadow-lg border border-[rgba(255,255,255,0.12)] min-w-[320px]">
          <span className="text-white text-xl font-semibold">Address Copied</span>
          <Button
            onClick={() => toast.dismiss(id)}
            className="ml-6 text-white/60 hover:text-white text-2xl"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      ),
      { duration: 2000 }
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full rounded-2xl bg-[#23242B] border border-[rgba(255,255,255,0.07)] p-8">
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-2xl font-semibold text-white">Receive Message</DialogTitle>
          <DialogClose asChild>
            <button className="text-white/60 hover:text-white text-2xl p-1 rounded-full focus:outline-none">
              &times;
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="border-t border-white/10 mb-6" />
        <div className="flex flex-col items-center gap-6">
          <QRCodeSVG
            value={address}
            size={200}
            bgColor="#23242B"
            fgColor="#fff"
            level="H"
            style={{ borderRadius: 16 }}
          />
          <div className="w-full">
            <div className="w-full bg-[#18191C] text-white/80 rounded-2xl px-5 py-3 text-base font-mono text-center select-all overflow-x-auto">
              {address}
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-6 w-full">
            <Button
              type="button"
              variant="ghost"
              className="flex-1 h-12 rounded-2xl border border-[rgba(255,255,255,0.16)] text-white text-lg font-semibold bg-transparent hover:bg-white/5"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#338FFF] to-[#5B8CFF] text-white text-lg font-semibold border-none shadow-none hover:opacity-90 flex items-center justify-center gap-2"
              onClick={handleCopy}
            >
              <Copy className="w-5 h-5" />
              {copied ? 'Copied!' : 'Copy address'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
