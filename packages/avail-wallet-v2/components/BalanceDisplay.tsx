import Image from 'next/image';
import useWalletStore from '@/lib/store';

export default function BalanceDisplay() {
  const { balance, usdBalance } = useWalletStore();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Image src="/dash-line.svg" alt="AVL" width={100} height={100} className="w-full my-6" />
      <div className="text-5xl font-bold text-white tracking-wide my-6">
        {balance} <span className="">AVL</span>
      </div>
      <div className="text-lg text-white/60 font-mono mb-6">
        {usdBalance}
      </div>
      <Image src="/dash-line.svg" alt="AVL" width={100} height={100} className="w-full my-6" />
    </div>
  );
}
