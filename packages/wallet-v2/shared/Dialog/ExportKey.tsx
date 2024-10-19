import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, Info } from 'atomize_icons'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import DialogLayout from './DialogLayout'
import Key from '@/assets/images/key.svg'
import { useAvailSnap } from '@/services/metamask'


interface ExportKeyProps {
  onOpen: (open: boolean) => void
}

const ExportKey: React.FC<ExportKeyProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const {getPrivateKeyFromAddress} = useAvailSnap()

  const openDialog = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    onOpen(false)
  }

  const copyToClipboard = () => {
    getPrivateKeyFromAddress()
    navigator.clipboard.writeText("Your secret recovery phrase here")
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 3000)
      })
      .catch(err => console.error('Failed to copy text: ', err))
  }

  return (
    <>
      <DropdownMenuItem
        className="flex items-center px-4 py-3 text-sm text-gray-300 !rounded-full transition-colors focus:bg-white/10 focus:text-white/75"
        onClick={openDialog}
      >
        <Image src={Key} width={16} height={16} className="mr-3" alt="Export key icon" />
        Export private key
      </DropdownMenuItem>
      <DialogLayout
        open={true}
        onOpenChange={closeDialog}
        title="Export key"
        trigger={null}
        footerContent={
          <Button
            size="lg"
            className="py-6 w-full bg-[#F4FBFF66] border border-[#F4FBFF66] !rounded-full font-semibold"
            onClick={closeDialog}
          >
            Cancel
          </Button>
        }
        closeButton={
          <button
            onClick={closeDialog}
            className="text-white cursor-pointer"
            aria-label="Close dialog"
          >
            <span className="text-xl">&times;</span>
          </button>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <p>
            The Secret Recovery Phrase (SRP) provides full access to your wallet
            and funds.
          </p>
          <p>
            MetaMask snap is a non-custodial wallet. That means you're the owner
            of your SRP.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Seed Phrase</h4>
            <motion.span
              className="cursor-pointer font-semibold"
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {!isCopied ? (
                <>
                  <Copy className="inline mr-1" /> Copy to clipboard
                </>
              ) : (
                <span className="text-[#2AE77F]">
                  <CheckCircledIcon className="inline-block mr-1" /> Copied
                </span>
              )}
            </motion.span>
          </div>
          <Textarea
            className="inline-block w-full px-5 py-4 !bg-[#FFFFFF12] !rounded-3xl min-h-[7rem] border border-[#FFFFFF33] !text-2xl text-white resize-none"
            disabled
            value="******************************************************************"
          />
          <div className="flex items-center text-[#FF7373] mt-2">
            <Info className="mr-2" aria-hidden="true" />
            <p className="text-sm">
              Make sure no one is looking at your screen. MetaMask Support will
              never request this.
            </p>
          </div>
        </motion.div>
      </DialogLayout>
    </>
  )
}

export default ExportKey