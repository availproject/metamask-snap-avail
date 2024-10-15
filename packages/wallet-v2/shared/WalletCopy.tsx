import { Input } from '@/components/ui/input';
import { Copy } from "atomize_icons";

const WalletCopy = () => {
  return (
    <div>
      <div className="cursor-pointer border border-[#FFFFFF52] rounded-[100px] px-3 py-2 flex items-center justify-around gap-[6px]">
        <span>0x04b...00dc</span> 
        <Copy className="text-white hover:text-[#FFFFFF52]" />
      </div>
    </div>
  );
};

export default WalletCopy;