import React, { useState } from 'react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Menu, Stepper, TransactionsFill } from 'atomize_icons';
import Logout from '@/assets/images/logout.svg';
import ExportKey from './Dialog/ExportKey';

const MenuBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 transition-colors duration-200 border border-gray-600 rounded-full bg-gray-800 hover:bg-gray-700"
          aria-label="Open menu"
        >
          <Menu className="text-gray-300" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[80vw] max-w-[280px] bg-[#252831] rounded-xl p-4 border-[3.2px] border-[#303441] shadow-lg">
        <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-white whitespace-nowrap rounded-full transition-colors hover:bg-gray-700">
          <Stepper className="mr-3 text-green-500 scale-75" />
          Connected to Avail Snap
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-white/7" />

        <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-gray-300 rounded-full transition-colors hover:bg-gray-700 hover:text-white">
          <TransactionsFill className="mr-3 scale-75" />
          Read more about snaps
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-white/7" />

        <ExportKey onOpen={setIsDropdownOpen} />

        <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-red-400 rounded-full transition-colors hover:bg-gray-700 hover:text-red-300">
          <Image src={Logout} width={16} height={16} className="mr-3" alt="" />
          Disconnect wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuBar;
