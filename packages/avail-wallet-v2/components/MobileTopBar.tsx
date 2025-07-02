import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, BellDot } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Transaction } from '@/lib/store';

interface MobileTopBarProps {
  connected: boolean;
  setConnected: (connected: boolean) => void;
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
  transactions: Transaction[];
  setExportDialogOpen: (open: boolean) => void;
  address: string;
  handleDisconnect: () => void;
}

const networks = [{ name: 'Avail Mainnet' }, { name: 'Goldberg Testnet' }];

export default function MobileTopBar({
  connected,
  setConnected,
  selectedNetwork,
  setSelectedNetwork,
  transactions,
  setExportDialogOpen,
  address,
  handleDisconnect
}: MobileTopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [networkSheetOpen, setNetworkSheetOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between py-2 px-2  ">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Avail Logo" width={90} height={30} priority />
      </div>
      {/* Center: Address (if connected) */}
      {connected && (
        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-[rgba(255,255,255,0.00)] border border-[rgba(255,255,255,0.32)] rounded-full px-3 py-1 text-white text-xs font-semibold gap-1 max-w-[120px] overflow-x-auto">
            <span className="truncate">{address}</span>
          </div>
        </div>
      )}
      {/* Right: Hamburger menu */}
      <div className="flex items-center gap-2">
        {connected && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2 text-white">
                <BellDot />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#23242B] border border-[#353743] rounded-2xl w-[90vw] max-w-xs p-0 overflow-hidden shadow-xl mt-2"
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-white text-base font-semibold">Transactions</span>
              </div>
              <div className="border-t border-[#353743] mx-2" />
              <div className="p-4 flex flex-col items-center min-h-[120px] max-h-[220px] overflow-y-auto gap-2">
                {transactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center w-full h-full mt-2">
                    <Image src="/empty-box.svg" alt="No transactions" width={50} height={50} />
                    <div className="text-white/40 text-xs mt-2">No transaction found!</div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-full">
                    {transactions.map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-[#2B2D36] rounded-xl px-2 py-2"
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1 text-white text-xs font-semibold">
                            {tx.type === 'Send' ? (
                              <span className="inline-block rotate-45">➤</span>
                            ) : (
                              <span className="inline-block">✍️</span>
                            )}
                            <span>{tx.type}</span>
                          </div>
                          <div className="text-white/60 text-[10px]">
                            {tx.type === 'Send'
                              ? `From ${tx.from} to ${tx.to}`
                              : `Tx hash: ${tx.hash}`}
                          </div>
                        </div>
                        {tx.amount && (
                          <div className="text-white text-xs font-semibold whitespace-nowrap">
                            {tx.amount} AVL
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="p-2 text-white">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#252831] border border-[#303441] rounded-2xl w-[90vw] max-w-xs p-4 overflow-hidden shadow-xl mt-2"
          >
            {connected ? (
              <>
                <DropdownMenuItem
                  className="flex items-center gap-2 px-2 py-2 text-white text-sm font-medium rounded-full cursor-pointer"
                  onSelect={() => setNetworkSheetOpen(true)}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  <span>{selectedNetwork}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.07)] my-2" />
                <DropdownMenuItem
                  className="flex items-center gap-2 px-2 py-2 text-white/80 text-sm font-medium rounded-full cursor-pointer"
                  onSelect={() => setExportDialogOpen(true)}
                >
                  Export private key
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 px-2 py-2 text-[#FF5A5A] text-sm font-medium rounded-full cursor-pointer mt-2"
                  onSelect={handleDisconnect}
                >
                  Disconnect wallet
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-2 text-white text-sm font-medium rounded-full cursor-pointer"
                onSelect={() => setConnected(true)}
              >
                Connect Wallet
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Network selection sheet/modal */}
      {networkSheetOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
          onClick={() => setNetworkSheetOpen(false)}
        >
          <div
            className="w-full max-w-xs bg-[#23242B] rounded-t-2xl p-4 border-t border-[rgba(255,255,255,0.07)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white text-base font-semibold mb-2">Select Network</div>
            {networks.map((n) => (
              <Button
                key={n.name}
                onClick={() => {
                  setSelectedNetwork(n.name);
                  setNetworkSheetOpen(false);
                }}
                className={`w-full mb-2 rounded-full px-3 py-2 text-sm font-semibold transition-all
                  ${
                    selectedNetwork === n.name
                      ? 'bg-[rgba(255,255,255,0.12)] text-white shadow'
                      : 'bg-transparent text-white hover:bg-white/10'
                  }
                `}
                variant="ghost"
              >
                {n.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
