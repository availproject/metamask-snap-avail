import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Info, Lock, Menu, Stepper } from 'atomize_icons';

const MenuBar = () => {
  const [isConnected] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="block border border-gray-600 rounded-full p-2 bg-gray-800 hover:bg-gray-700 transition-colors">
          <Menu className="text-gray-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[80vw] max-w-[300px] !bg-gray-800 rounded-xl p-[3.2px] border-none">
        <div className="!bg-[#252831] rounded-xl space-y-2 p-3">
          <DropdownMenuItem className="flex items-center px-2 py-2 text-sm text-white">
            <Stepper className="text-green-500 mr-2" />
            Connected to Avail Snap
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded transition-colors">
            <Info className="mr-2 h-4 w-4" />
            Read more about snaps
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded transition-colors">
            <Lock className="mr-2 h-4 w-4" />
            Export private key
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center px-2 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 rounded transition-colors">
            <Lock className="mr-2 h-4 w-4" />
            Disconnect wallet
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuBar;
