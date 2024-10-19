'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/slices/UISlice'

export default function LoadingModal() {
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

  return (
    <Dialog open={loader.isLoading} onOpenChange={() => {}}>
      <DialogContent className="bg-white border-none rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          <div className="overflow-hidden h-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={prevMessage}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 text-center"
              >
                {prevMessage}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
