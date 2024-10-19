import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Cross, Notification } from 'atomize_icons'
import { TransactionType } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import TransactionList from './TransactionLists'

const TransactionLayout: React.FC = () => {
  const [transactions] = useState<TransactionType[]>([
    {
      id: '1',
      date: '2024-09-25',
      type: 'Send',
      amount: '0.32 AVL',
      from: '0xbc24...ds92',
      to: '0x234h...32ds',
    },
    { id: '2', date: '2024-09-26', type: 'Sign', txHash: '0xbc24...ds92' },
    {
      id: '3',
      date: '2024-09-27',
      type: 'Send',
      amount: '0.32 AVL',
      from: '0xbc24...ds92',
      to: '0x234h...32ds',
    },
    // ... (other transactions)
  ])

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.button
          className="p-2 transition-colors duration-200 bg-gray-700 rounded-full hover:bg-gray-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Show transaction history"
        >
          <Notification />
        </motion.button>
      </PopoverTrigger>
      <AnimatePresence>
        {isOpen && (
          <PopoverContent forceMount asChild>
            <motion.div
              className="absolute top-4 -right-5 p-6 w-[480px] max-w-[90vw] !bg-[#252831] !rounded-xl border-[3.2px] border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">
                  Transaction history
                </h2>
                <motion.button
                  className="text-white hover:text-white/80"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close transaction history"
                >
                  <Cross className="text-2xl" />
                </motion.button>
              </div>
              <Separator className="my-4 bg-gray-700" />
              <TransactionList transactions={transactions} />
            </motion.div>
          </PopoverContent>
        )}
      </AnimatePresence>
    </Popover>
  )
}

export default TransactionLayout
