import { Button } from "@/components/ui/button";
import useWalletStore from '@/lib/store';

const ConnectWallet = () => {
  const { connectWallet } = useWalletStore();
  return (
    <Button
      onClick={connectWallet}
      className="px-8 py-6 text-white font-semibold rounded-full focus:outline-none transition-all shadow-none bg-gradient-to-r from-[#5ABEFF] to-[#338FFF] hover:from-[#53b3f2] hover:to-[#65a1eb] cursor-pointer"
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
