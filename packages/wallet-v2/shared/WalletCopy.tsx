import { Input } from '@/components/ui/input';
import { shortenAddress } from '@/lib/utils';
import { Copy } from "atomize_icons";
interface Props {
  address: string;
}
const WalletCopy = ({address}: Props) => {
  return (
    <div>
      <div className="cursor-pointer border border-[#FFFFFF52] rounded-[100px] px-3 py-2 flex items-center justify-around gap-[6px]" onClick={() => {
                navigator.clipboard.writeText(address);
              }}>
        <span className='font-semibold'>{shortenAddress(address)}</span> 
        <Copy className="text-white hover:text-[#FFFFFF52]" />
      </div>
    </div>
  );
};

export default WalletCopy;