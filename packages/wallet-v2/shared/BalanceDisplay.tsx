import React from 'react'
import { motion } from 'framer-motion'
import { SeperatorDot } from './SeperatorDot'
import useWalletStore from '@/slices/walletSlice'

export const BalanceDisplay: React.FC = () => {
  const connected = useWalletStore((state) => state.connected)
  const balance = useWalletStore((state) => state.tokenBalance)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const formatBalance = (balance: number | undefined): string => {
    return balance ? balance.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '--'
  }

  const calculateUSDValue = (balance: number | undefined): string => {
    const rate = 0.1324 // Example exchange rate, replace with actual rate
    return balance ? (balance * rate).toLocaleString('en-US', { maximumFractionDigits: 2 }) : '--'
  }

  return (
    <motion.div
      className="m-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <SeperatorDot />
      </motion.div>
      <motion.div
        className="flex flex-col items-center justify-center space-y-2"
        variants={itemVariants}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
          {formatBalance(balance.amount)} AVL
        </h2>
        <p className="font-semibold text-lg sm:text-xl text-white/48">
          {calculateUSDValue(balance.amount)} USD
        </p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <SeperatorDot />
      </motion.div>
    </motion.div>
  )
}