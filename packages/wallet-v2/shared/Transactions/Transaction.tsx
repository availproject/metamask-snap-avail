import { Send } from "atomize_icons"
import { TransactionType } from "@/types"

interface TransactionProps {
  tx: TransactionType
}

const Transaction: React.FC<TransactionProps> = ({ tx }) => {
  return (
    <div className="p-3 mb-2 bg-white/7 rounded-xl">
      <div className="flex items-center mb-2">
        <Send className="mr-1 text-white" />
        <span className="font-semibold text-white">{tx.type}</span>
        {tx.amount && <span className="ml-auto font-semibold text-white">{tx.amount}</span>}
      </div>
      {tx.from && (
        <p className="text-sm text-white/76">
          From <span className="font-semibold text-white">{tx.from}</span> to <span className="font-semibold text-white">{tx.to}</span>
        </p>
      )}
      {tx.txHash && (
        <p className="text-sm text-white/76">
          Tx hash: <span className="font-semibold text-white">{tx.txHash}</span>
        </p>
      )}
    </div>
  )
}

export default Transaction