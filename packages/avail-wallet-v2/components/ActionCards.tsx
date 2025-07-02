import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, QrCode, Pencil } from 'lucide-react';
import SendModal from '@/components/SendModal';
import ReceiveModal from '@/components/ReceiveModal';
import SignMessageModal from './SignMessageModal';

export default function ActionCards() {
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [signOpen, setSignOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 w-full mt-8">
        <Button
          variant="ghost"
          className="flex-1 flex flex-row items-center justify-center gap-3 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] text-white hover:text-white/70 text-xl font-semibold rounded-2xl border border-[rgba(255,255,255,0.07)] h-20 shadow-none focus:ring-2 focus:ring-[#338FFF] transition-all cursor-pointer"
          aria-label="Send"
          onClick={() => setSendOpen(true)}
        >
          <ArrowRight className="w-6 h-6 -rotate-45" />
          Send
        </Button>
        <Button
          variant="ghost"
          className="flex-1 flex flex-row items-center justify-center gap-3 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] text-white hover:text-white/70 text-xl font-semibold rounded-2xl border border-[rgba(255,255,255,0.07)] h-20 shadow-none focus:ring-2 focus:ring-[#338FFF] transition-all cursor-pointer"
          aria-label="Receive"
          onClick={() => setReceiveOpen(true)}
        >
          <QrCode className="w-6 h-6" />
          Receive
        </Button>
        <Button
          variant="ghost"
          className="flex-1 flex flex-row items-center justify-center gap-3 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] text-white hover:text-white/70 text-xl font-semibold rounded-2xl border border-[rgba(255,255,255,0.07)] h-20 shadow-none focus:ring-2 focus:ring-[#338FFF] transition-all cursor-pointer"
          aria-label="Sign Message"
          onClick={() => setSignOpen(true)}
        >
          <Pencil className="w-6 h-6" />
          Sign Message
        </Button>
      </div>
      <SendModal open={sendOpen} onOpenChange={setSendOpen} />
      <ReceiveModal open={receiveOpen} onOpenChange={setReceiveOpen} />
      <SignMessageModal open={signOpen} onOpenChange={setSignOpen} />
    </>
  );
} 
