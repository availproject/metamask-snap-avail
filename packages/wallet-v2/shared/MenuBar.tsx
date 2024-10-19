import React, { useState } from 'react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Menu, Stepper, TransactionsFill } from 'atomize_icons'
import Logout from '@/assets/images/logout.svg'
import ExportKey from './Dialog/ExportKey'
import { Dialog } from '@radix-ui/react-dialog'

const MenuBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <Dialog>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="p-2 transition-colors duration-200 border border-gray-600 rounded-full bg-gray-800 hover:bg-gray-700"
            aria-label="Open menu"
          >
            <Menu className="text-gray-300" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="absolute top-4 -right-5 w-[80vw] max-w-[280px] bg-[#252831]  rounded-xl p-4 border-[3.2px] border-[#303441] shadow-lg">
          <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-white whitespace-nowrap !rounded-full transition-colors focus:bg-white/10 focus:text-white/75">
            <Stepper className="mr-3 text-green-500 scale-75" />
            Connected to Avail Snap
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2 bg-white/10" />

          <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-gray-300 !rounded-full transition-colors focus:bg-white/10 focus:text-white/75">
            <TransactionsFill className="mr-3 scale-75" />
            Read more about snaps
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2 bg-white/10" />

          <ExportKey onOpen={setIsDropdownOpen} />

          <DropdownMenuItem className="flex items-center px-4 py-3 text-sm text-red-400 !rounded-full transition-colors focus:bg-white/10 focus:text-red-300">
            <Image
              src={Logout}
              width={16}
              height={16}
              className="mr-3"
              alt=""
            />
            Disconnect wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}

export default MenuBar
