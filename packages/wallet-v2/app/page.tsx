"use client"
import Image from 'next/image';
import Line from '@/assets/images/line.svg';
import Sign from '@/assets/images/signature.svg';
import Qr from '@/assets/images/qr.svg';
import { TextCard } from '@/shared/TextCard';
import { Button } from '@/components/ui/button';
import { Send } from 'atomize_icons';
import SendDialog from '@/shared/Dialog/SendDialog';
import { useWalletStore } from '@/store/store';

export default function Home() {
  const balance = useWalletStore((state) => state.balance);
  return (
    // <div className="py-10 px-4 sm:px-6 md:px-8 lg:px-12">
    <div className="px-4">
      <div className="">
        <Image src={Line} alt="Lines" width={100} height={10} className="w-full relative my-12" />

        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold">-- AVL</h2>
          <p className="mt-3 font-semibold text-lg sm:text-xl text-[#FFFFFF7A]">50,000.00 {balance} USD</p>
        </div>

        <Image src={Line} alt="Lines" width={100} height={10} className="w-full relative my-12" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-between">
        {true ? (
          <>
            <SendDialog />
            <Button size="lg" className="inline-block px-6 py-10 border shadow-none !border-[#FFFFFF12] !bg-[#FFFFFF0A] gap-2 !rounded-2xl">
              <Image src={Qr} width={20} height={20} alt='Receive' /> Receive
            </Button>
            <Button size="lg" className="inline-block px-6 py-10 border shadow-none !border-[#FFFFFF12] !bg-[#FFFFFF0A] gap-2 !rounded-2xl">
              <Image src={Sign} width={20} height={20} alt='Receive' />  Sign Message
            </Button>
          </>
        ) : (
          <>
            <TextCard
              title="What is snap?"
              content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
              link="#"
            />
            <TextCard
              title="Learn more about Avail?"
              content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
              link="#"
            />
            <TextCard
              title="Get testnet tokens"
              content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
              link="#"
            />
          </>
        )}
      </div>
    </div>
  );
}
