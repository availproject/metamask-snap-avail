'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toast } from '@/components/ui/toast'
import Image from 'next/image'
import Qr from '@/assets/images/qr.svg'
import useWalletStore from '@/slices/walletSlice'
import DialogLayout from './DialogLayout'
import { useToast } from '@/hooks/use-toast'

const ReceiveDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const account = useWalletStore((state) => state.accounts[0])

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const copyToClipboard = useCallback(() => {
    if (account) {
      navigator.clipboard.writeText(account).then(() => {
        toast({
          title: "Address Copied",
          description: "The address has been copied to your clipboard.",
          
        })
      }).catch((err) => {
        console.error('Failed to copy: ', err)
        toast({
          title: "Copy Failed",
          description: "Failed to copy the address. Please try again.",
          variant: "destructive",
        })
      })
    }
  }, [account, toast])

  return (
    <DialogLayout
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Receive"
      trigger={
        <Button
          size="lg"
          className="block w-full px-6 py-10 border shadow-none !border-[#FFFFFF12] !bg-[#FFFFFF0A] gap-2 !rounded-2xl"
          onClick={openDialog}
        >
          <Image src={Qr} width={20} height={20} alt="Receive icon" />
          Receive
        </Button>
      }
      footerContent={
        <>
          <Button
            size="lg"
            className="py-4 w-full bg-[#F4FBFF66] border border-[#F4FBFF66] !rounded-full font-semibold"
            onClick={closeDialog}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            className="py-4 w-full bg-gradient-to-tr from-[#2778E9] to-[#439FE7] text-white !rounded-full"
            onClick={copyToClipboard}
          >
            Copy address
          </Button>
        </>
      }
    >
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4">
          <div className="mx-auto w-[259px] h-[259px] bg-white p-4 rounded-lg">
            <QRCodeSVG
              value={account || ''}
              size={227}
              level="L"
              marginSize={0}
            />
          </div>
          <Input
            className="block w-full px-5 py-7 !bg-[#FFFFFF12] !rounded-full border border-[#FFFFFF33] text-white cursor-pointer"
            readOnly
            value={account || ''}
            onClick={copyToClipboard}
          />
        </div>
      </motion.div>
    </DialogLayout>
  )
}

export default ReceiveDialog