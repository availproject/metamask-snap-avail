import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ArrowRight, Info, Lock, Menu, Stepper, TransactionsFill } from 'atomize_icons';
import Image from 'next/image';
import Key from '@/assets/images/key.svg';
import Logout from '@/assets/images/logout.svg';

const MenuBar = () => {
  return (
    <DropdownMenu>
      <div className='relative'>

        <DropdownMenuTrigger>
          <button className="block border border-gray-600 rounded-full p-2 bg-gray-800 hover:bg-gray-700 transition-colors">
            <Menu className="text-gray-300" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="absolute top-4 -right-5 w-[80vw] max-w-[280px] !bg-[#252831] rounded-xl p-4 border-[3.2px] border-[#303441] shadow-lg">
          {/* Connected Status */}
          <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-white whitespace-nowrap rounded-full transition-colors hover:bg-gray-700 hover:text-white">
            <Stepper className="text-green-500 mr-3 scale-75" />
            Connected to Avail Snap
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2 bg-[#FFFFFF12]" />

          {/* Read more about snaps */}
          <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-gray-300 rounded-full transition-colors hover:bg-gray-700 hover:text-white">
            <TransactionsFill className="mr-3 scale-75" />
            Read more about snaps
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2 bg-[#FFFFFF12]" />

          {/* Export private key */}
          <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-gray-300 rounded-full transition-colors hover:bg-gray-700 hover:text-white">
            <Image src={Key} width={16} height={16} className='mr-3' alt="Export" />
            Export private key
          </DropdownMenuItem>


          {/* Disconnect Wallet */}
          <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-red-400 rounded-full transition-colors hover:bg-gray-700 hover:text-red-300">
            <Image src={Logout} width={16} height={16} className='mr-3' alt="Logout" />
            Disconnect wallet
          </DropdownMenuItem>
        </DropdownMenuContent>

      </div>
    </DropdownMenu>
  );
};

export default MenuBar;
