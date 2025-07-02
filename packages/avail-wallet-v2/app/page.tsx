'use client';
import TopBar from '@/components/TopBar';
import BalanceDisplay from '@/components/BalanceDisplay';
import InfoCards from '@/components/InfoCards';
import ActionCards from '@/components/ActionCards';
import useWalletStore from '@/lib/store';

export default function Home() {
  const connected = useWalletStore((state) => state.connected);
  return (
    <div className="flex flex-col min-h-screen items-center w-full p-6 lg:p-16">
      <div className="w-full flex-1  rounded-2xl border-[5px] border-[rgba(255,255,255,0.10)] bg-[#232735] p-6 lg:p-8 shadow-lg">
        <TopBar />
        <BalanceDisplay />
        {connected ? <ActionCards /> : <InfoCards />}
      </div>
    </div>
  );
}
