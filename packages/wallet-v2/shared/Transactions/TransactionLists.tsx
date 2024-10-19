import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import Transaction from './Transaction'
import { TransactionType } from '@/types'
import EmptyBox from '@/assets/images/empty-box.svg'
import { motion } from 'framer-motion'

interface TransactionListProps {
  transactions: TransactionType[]
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={EmptyBox}
          width={120}
          height={120}
          alt="No transactions"
          className="mb-4"
        />
        <p className="text-white/30 font-semibold">No transactions found!</p>
      </motion.div>
    )
  }

  return (
    <ScrollArea className="h-[300px] max-h-[428px] w-full">
      {transactions.map((tx, index) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Transaction tx={tx} />
        </motion.div>
      ))}
    </ScrollArea>
  )
}

export default TransactionList
