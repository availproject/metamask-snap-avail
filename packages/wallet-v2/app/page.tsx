'use client';
import Image from 'next/image';
import Line from '@/assets/images/line.svg';
import Sign from '@/assets/images/signature.svg';
import Qr from '@/assets/images/qr.svg';
import { TextCard } from '@/shared/TextCard';
import { Button } from '@/components/ui/button';
import { Send } from 'atomize_icons';
import SendDialog from '@/shared/Dialog/SendDialog';
import useWalletStore from '@/slices/walletSlice';
import { useEffect } from 'react';
import { useAvailSnap } from '@/services/metamask';
import { useHasMetamask } from '@/hooks/useHasMetamask';
import useNetworkStore from '@/slices/networkSlice';
import { useUIStore } from '@/slices/UISlice';
import LoadingModal from '@/shared/LoadingModal';

export default function Home() {
  const { initSnap, checkConnection, getWalletData } = useAvailSnap();
  const accounts = useWalletStore((state) => state.accounts);
  const balance = useWalletStore((state) => state.tokenBalance);
  const provider = useWalletStore((state) => state.provider);
  const connected = useWalletStore((state) => state.connected);
  const forceReconnect = useWalletStore((state) => state.forceReconnect);
  const networks = useNetworkStore((state) => state.items);
  const activeNetwork = useNetworkStore((state) => state.activeNetwork);
  const { hasMetamask } = useHasMetamask();
  const { loader, enableLoadingWithMessage, disableLoading } = useUIStore();

  const address =
    accounts?.length > 0 ? (accounts[0] as unknown as string) : '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

  useEffect(() => {
    if (!provider) {
      return;
    }

    if (connected) {
      console.log('snnamp');
      initSnap();
    }

    if (hasMetamask && !connected && !forceReconnect) {
      console.log('here');
      checkConnection();
    }
  }, [connected, provider, forceReconnect, hasMetamask]);

  useEffect(() => {
    if (provider && networks.length > 0) {
      const chainId = networks[activeNetwork].chainId;
      getWalletData(chainId, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNetwork, provider, networks]);

  const loading = loader.isLoading;

  return (
    // <div className="py-10 px-4 sm:px-6 md:px-8 lg:px-12">
    <div className="px-4">
      {loading && <LoadingModal />}
      <div className="">
        <Image src={Line} alt="Lines" width={100} height={10} className="w-full relative my-12" />

        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold">-- AVL</h2>
          <p className="mt-3 font-semibold text-lg sm:text-xl text-[#FFFFFF7A]">50,000.00 USD</p>
        </div>

        <Image src={Line} alt="Lines" width={100} height={10} className="w-full relative my-12" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-between">
        {true ? (
          <>
            <SendDialog />
            <Button
              size="lg"
              className="inline-block px-6 py-10 border shadow-none !border-[#FFFFFF12] !bg-[#FFFFFF0A] gap-2 !rounded-2xl"
            >
              <Image src={Qr} width={20} height={20} alt="Receive"  /> Receive
            </Button>
            <Button
              size="lg"
              className="inline-block px-6 py-10 border shadow-none !border-[#FFFFFF12] !bg-[#FFFFFF0A] gap-2 !rounded-2xl"
            >
              <Image src={Sign} width={20} height={20} alt="Receive"  /> Sign
              Message
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
