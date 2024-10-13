import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Cross, Notification } from "atomize_icons";
import { useState } from "react";
import TransactionList from "./TransactionLists";
import { TransactionType } from "@/types";

const TransactionLayout = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([
    { id: '1', date: '2024-09-25', type: 'Send', amount: '0.32 AVL', from: '0xbc24...ds92', to: '0x234h...32ds' },
    { id: '2', date: '2024-09-26', type: 'Sign', txHash: '0xbc24...ds92' },
    { id: '3', date: '2024-09-27', type: 'Send', amount: '0.32 AVL', from: '0xbc24...ds92', to: '0x234h...32ds' },
    { id: '4', date: '2024-09-28', type: 'Send', amount: '0.32 AVL', from: '0xbc24...ds92', to: '0x234h...32ds' },
  ]);

  return (
    <Popover>
      <PopoverTrigger>
        <button className="bg-gray-700 p-2 rounded-full">
          <Notification />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[95vw] max-w-[480px] !bg-gray-800 border-[3.2px] border-gray-700 top-20 !right-5 rounded-[20px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Transaction history</h2>
          <button><Cross className="text-gray-400" /></button>
        </div>
        <Separator className="my-4 bg-gray-700" />
        <TransactionList transactions={transactions} />
      </PopoverContent>
    </Popover>
  );
};

export default TransactionLayout;
