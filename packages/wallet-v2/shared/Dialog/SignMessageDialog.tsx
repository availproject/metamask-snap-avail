'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import Sign from '@/assets/images/signature.svg'
import useWalletStore from '@/slices/walletSlice'
import DialogLayout from './DialogLayout'
import { CheckCircledIcon } from '@radix-ui/react-icons'

const SignMessageDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [signingState, setSigningState] = useState<'idle' | 'signing' | 'success'>('idle')
  const { toast } = useToast()
  const account = useWalletStore((state) => state.accounts[0])

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => {
    setIsOpen(false)
    setMessage('')
    setSigningState('idle')
  }

  const handleSign = useCallback(async () => {
    if (!message) {
      toast({
        title: "Error",
        description: "Please enter a message to sign.",
        variant: "destructive",
      })
      return
    }

    setSigningState('signing')
    
    // Simulating the signing process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSigningState('success')
    
    // In a real application, you would use a wallet provider to sign the message
    // For example, with ethers.js:
    // const signature = await signer.signMessage(message);
    
  }, [message, toast])

  return (
    <DialogLayout
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Sign Message"
      trigger={
        <Button
          size="lg"
          className="block w-full px-6 py-10 border shadow-none !border-[#FFFFFF12] !bg-[#FFFFFF0A] gap-2 !rounded-2xl"
          onClick={openDialog}
        >
          <Image src={Sign} width={20} height={20} alt="Sign icon" />
          Sign Message
        </Button>
      }
      footerContent={
        signingState === 'success' ? (
          <Button
            size="lg"
            className="py-4 w-full bg-[#F4FBFF66] border border-[#F4FBFF66] !rounded-full font-semibold"
            onClick={closeDialog}
          >
            Close
          </Button>
        ) : (
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
              onClick={handleSign}
              disabled={signingState === 'signing'}
            >
              Sign
            </Button>
          </>
        )
      }
    >
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {signingState === 'success' ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <CheckCircledIcon className="w-16 h-16 text-green-500" />
            <h2 className="text-xl font-semibold">Transaction successful</h2>
            <Button
              variant="link"
              className="text-blue-500 hover:text-blue-600"
              onClick={() => {
                // In a real application, you would open the block explorer with the transaction hash
                window.open('https://example.com/block-explorer', '_blank')
              }}
            >
              View on Block Explorer
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea
              placeholder="Enter message to sign"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 !bg-[#ffffff01] !border-[#F4FBFF66] !rounded-xl text-white"
            />
            {signingState === 'signing' && (
              <div className="text-center text-gray-400">
                {account ? 'Please sign transaction' : 'Confirming transaction'}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </DialogLayout>
  )
}

export default SignMessageDialog