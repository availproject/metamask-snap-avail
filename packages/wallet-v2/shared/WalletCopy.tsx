import { Copy } from 'atomize_icons'
import { shortenAddress } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface Props {
  address: string
}

const WalletCopy: React.FC<Props> = ({ address }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch((err) => {
        console.error('Failed to copy address: ', err)
      })
  }

  return (
    <motion.button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-2 transition-colors duration-200 border rounded-full border-white/32 hover:bg-white/10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Copy wallet address"
    >
      <span className="font-semibold">{shortenAddress(address)}</span>
      <motion.div
        animate={{ rotate: isCopied ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Copy className={`${isCopied ? 'text-green-500' : 'text-white'}`} />
      </motion.div>
    </motion.button>
  )
}

export default WalletCopy
