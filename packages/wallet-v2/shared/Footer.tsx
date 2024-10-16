"use client"
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Green from '@/assets/images/green.svg';
import Discord from '@/assets/images/discord.svg';
import Twitter from '@/assets/images/twitter.svg';
import Linkedin from '@/assets/images/linkedin.svg';
import Github from '@/assets/images/github.svg';
import useMetamaskStore from '@/slices/metamaskSlice';
import { shortenAddress } from '@/lib/utils';

const Footer = () => {
  const availSnap = useMetamaskStore((state) => state.availSnap);
  return (
    <footer className="absolute bottom-0 left-0 right-0 border-t border-[#FFFFFF12]">
      <div className="flex justify-between items-center px-6 py-3 ">
        <div className="flex justify-center items-center gap-1">
          <Image src={Green} alt="green" width={16} height={16} />
          <p>
            <strong className="font-bold mr-3">Latest Data:</strong> Block number: {availSnap.latestBlock.number} | Block
            Hash: {shortenAddress(availSnap.latestBlock.hash)}
          </p>
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          <Image src={Discord} width={16} height={16} alt="discord logo" />
          <Image src={Github} width={16} height={16} alt="github logo" />
          <Image src={Twitter} width={16} height={16} alt="twitter logo" />
          <Image src={Linkedin} width={16} height={16} alt="linkedin logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
