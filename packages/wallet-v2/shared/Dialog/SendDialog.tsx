'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Info, Send } from 'atomize_icons'
import DialogLayout from './DialogLayout'

const SendDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const handleSend = () => {
    // Implement send logic here
    console.log('Sending', amount, 'to', recipient)
    closeDialog()
  }

  return (
    <DialogLayout
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Send"
      trigger={
        <Button
          size="lg"
          className="block w-full px-6 py-10 border shadow-none !border-[#FFFFFF12] !bg-[#FFFFFF0A] gap-2 !rounded-2xl"
          onClick={openDialog}
        >
          <Send /> Send
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
            onClick={handleSend}
          >
            Confirm
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
        <div className="space-y-2">
          <h4 className="font-semibold ml-4">To</h4>
          <Input
            className="block w-full px-5 py-7 !bg-[#FFFFFF12] !rounded-full border border-[#FFFFFF33] text-white"
            placeholder="Paste recipient address here"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <div className="flex items-center text-[#FFFFFFC2] space-y-2">
            <Info className="mr-2" aria-hidden="true" />
            <p className="text-sm">
              Please only enter a valid Avail address. Sending funds to a
              different network might result in permanent loss.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold ml-4">Amount</h4>
          <Input
            className="block w-full px-5 py-7 !bg-[#FFFFFF12] !rounded-full border border-[#FFFFFF33] text-white"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </motion.div>
    </DialogLayout>
  )
}

export default SendDialog