// components/ExportKey.tsx

import React, { useState } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Key from '@/assets/images/key.svg'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Info } from 'atomize_icons'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import DialogLayout from './DialogLayout'

const ExportKey: React.FC<{ onOpen: (open: boolean) => void }> = ({
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    onOpen(false)
  }

  return (
    <>
      <DropdownMenuItem
        className="flex items-center px-4 py-3 text-sm text-gray-300 !rounded-full transition-colors focus:bg-white/10 focus:text-white/75"
        onClick={openDialog}
      >
        <Image src={Key} width={16} height={16} className="mr-3" alt="Export" />
        Export private key
      </DropdownMenuItem>
      {/* <Button
              size="lg"
              className="py-6 w-full bg-gradient-to-tr to-[#2778E9] from-[#439FE7] !rounded-full font-semibold border-none"
            >
              Reveal private key
            </Button> */}
      {/* <Button
              size="lg"
              className="py-6 w-full bg-[#FFFFFF33] !rounded-full font-semibold border-none"
            >
              Please sign transaction
            </Button> */}
      <DialogLayout
        open={isOpen}
        onOpenChange={closeDialog}
        title="Export key"
        trigger={null}
        footerContent={
          <>
            <Button
              size="lg"
              className="py-6 w-full bg-[#F4FBFF66] border border-[#F4FBFF66] !rounded-full font-semibold border-none"
              onClick={closeDialog}
            >
              Cancel
            </Button>
          </>
        }
        closeButton={
          <button
            onClick={closeDialog}
            className="text-white cursor-pointer"
            aria-label="Close"
          >
            <span className="text-xl">&times;</span>
          </button>
        }
      >
        <div className="space-y-5">
          <p>
            The Secret Recovery Phrase (SRP) provides full access to your wallet
            and funds.
          </p>
          <p>
            MetaMask snap is a non-custodial wallet. That means you're the owner
            of your SRP.
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Seed Phrase</h4>
            <span className="cursor-pointer font-semibold">
              {false ? (
                <>
                  <Copy className="inline" /> Copy to clipboard{' '}
                </>
              ) : (
                <span className="text-[#2AE77F]">
                  <CheckCircledIcon className="inline-block" /> Copied
                </span>
              )}
            </span>
          </div>
          <Textarea
            className="inline-block w-full px-5 py-4 !bg-[#FFFFFF12] !rounded-3xl min-h-[7rem] border border-[#FFFFFF33] !text-2xl text-white resize-none"
            disabled
            value="******************************************************************"
          />
          <div className="flex items-center text-[#FF7373]">
            <Info className="mr-2" aria-hidden="true" />
            <p className="text-sm">
              Make sure no one is looking at your screen. MetaMask Support will
              never request this.
            </p>
          </div>
        </div>
      </DialogLayout>
    </>
  )
}

export default ExportKey
