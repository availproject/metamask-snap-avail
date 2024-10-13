import { Input } from '@/components/ui/input';
import { Copy } from "atomize_icons";

const WalletCopy = () => {
  return (
    <div>
      <div className="border border-[#FFFFFF52] rounded-full py-2 px-4 flex items-center justify-center w-36">
        <Input className="border-none py-0 px-0 m-0" disabled value="0x04b...00dc" />
        <Copy className="text-white hover:text-[#FFFFFF52]" />
      </div>
    </div>
  );
};

export default WalletCopy;