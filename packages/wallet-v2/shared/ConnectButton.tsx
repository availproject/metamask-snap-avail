'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAvailSnap } from '@/services/metamask'

export const ConnectButton: React.FC = () => {
  const { connectToSnap } = useAvailSnap()
  const [isHovered, setIsHovered] = useState(false)

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      <Button
        className="px-7 py-6 text-white !rounded-full text-base font-semibold transition-colors duration-300"
        style={{
          background: isHovered
            ? 'linear-gradient(270deg, #439FE7 0%, #2778E9 100.18%)'
            : 'linear-gradient(270deg, #2778E9 0%, #439FE7 100.18%)',
          lineHeight: '20.8px',
        }}
        onClick={connectToSnap}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Connect Wallet
      </Button>
    </motion.div>
  )
}