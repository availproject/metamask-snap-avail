// import { FaDiscord, FaTwitter, FaLinkedin } from "react-icons/fa";

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Green from '@/assets/images/green.svg';

const Footer = () => {
  return (
    <footer className=' border-s border-[#cf535312]'>
      <Separator className='bg-[#FFFFFF1F]' />
      <div className="flex justify-between items-center p-2">
        <div className="flex">
          <Image src={Green} alt="green" width={16} height={16} />
          <p><strong className='font-bold'>Latest Data:</strong> Block number: 650000 | Block Hash: 0000...3d07</p>
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          {/* <FaDiscord className="text-white" />
        <FaTwitter className="text-white" /> */}
          {/* <FaLinkedin className="text-white" /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
