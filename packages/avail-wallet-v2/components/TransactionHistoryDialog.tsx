import { useWalletConnection } from '@/lib/hooks/useWallet';

interface TransactionHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionHistoryDialog({ isOpen, onClose }: TransactionHistoryDialogProps) {
  const { transactions } = useWalletConnection();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1C1E26] p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Transaction History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No transactions found
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="bg-[#2A2D3A] rounded-lg p-4 border border-[#3A3D4A]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">Transaction</div>
                      <div className="text-sm text-gray-400 break-all">
                        {tx.hash}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {tx.type === 'transfer' ? 'Transfer' : 'Other'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(tx.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-400">From: </span>
                      <span className="break-all">{tx.from}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">To: </span>
                      <span className="break-all">{tx.to}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">Amount: </span>
                    <span>{tx.amount} AVAIL</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-400">Status: </span>
                    <span className={tx.status === 'success' ? 'text-green-500' : 'text-red-500'}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
