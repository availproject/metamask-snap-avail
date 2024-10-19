'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/slices/UISlice'
import Image from 'next/image'
import Logo from '@/assets/images/fav.svg'

export default function LoadingScreen() {
  const { loader } = useUIStore()
  const [prevMessage, setPrevMessage] = useState(
    loader.loadingMessage || 'Please wait while we process your request.'
  )

  useEffect(() => {
    if (loader.loadingMessage !== prevMessage) {
      setPrevMessage(
        loader.loadingMessage || 'Please wait while we process your request.'
      )
    }
  }, [loader.loadingMessage, prevMessage])

  if (!loader.isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1E26]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={Logo}
            alt="Loading"
            width={100}
            height={100}
            className="w-24 h-24"
          />
        </motion.div>
        <div className="overflow-hidden h-12 w-64">
          <AnimatePresence mode="wait">
            <motion.p
              key={prevMessage}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-white text-center font-black text-xl"
            >
              {prevMessage}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}