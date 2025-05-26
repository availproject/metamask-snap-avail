'use client';
import Image from 'next/image';
import ConnectWallet from '@/components/ConnectWallet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BellDot, Menu, FileText, KeyRound, LogOut } from 'lucide-react';
import ExportKeyDialog from '@/components/ExportKeyDialog';
import useWalletStore, { Network } from '@/lib/store';
import MobileTopBar from './MobileTopBar';
import { useState } from 'react';
import { toast } from 'sonner';

const NETWORKS = [
  { id: 'turing', name: 'Turing Testnet' },
  { id: 'mainnet', name: 'Mainnet' }
];

export default function TopBar() {
  const {
    connected,
    setConnected,
    selectedNetwork,
    setSelectedNetwork,
    transactions,
    setExportDialogOpen,
    address,
    exportDialogOpen
  } = useWalletStore();

  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
  const { isConnected, activeNetwork, connectWallet, disconnectWallet, switchNetwork } =
    useWalletStore();

  const handleDisconnect = () => setConnected(false);

  const handleNetworkSwitch = async (networkId: string) => {
    try {
      await switchNetwork(networkId);
      setIsNetworkMenuOpen(false);
    } catch (error) {
      console.error('Error switching network:', error);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  return (
    <>
      <ExportKeyDialog isOpen={exportDialogOpen} onClose={() => setExportDialogOpen(false)} />
      {/* Mobile TopBar */}
      <div className="block sm:hidden w-full">
        <MobileTopBar
          connected={connected}
          setConnected={setConnected}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={(n: string) => setSelectedNetwork(n as Network)}
          transactions={transactions}
          setExportDialogOpen={setExportDialogOpen}
          address={address}
          handleDisconnect={handleDisconnect}
        />
      </div>
      {/* Desktop TopBar */}
      <div className="hidden sm:block w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full py-2 gap-4 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center gap-4 sm:gap-8 justify-between w-full sm:w-auto">
            <Image src="/logo.svg" alt="Avail Logo" width={120} height={40} priority />
            {connected && (
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Address box */}
                <div className="flex items-center bg-[rgba(255,255,255,0.00)] border border-[rgba(255,255,255,0.32)] rounded-full px-4 py-2 sm:px-6 text-white text-base sm:text-lg font-semibold gap-2 max-w-[180px] sm:max-w-none overflow-x-auto">
                  <span className="truncate">{formatAddress(address)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyAddress}
                    className="hover:text-[#338FFF] p-0"
                    title="Copy address"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <rect
                        x="7"
                        y="7"
                        width="10"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <rect
                        x="3"
                        y="3"
                        width="10"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity=".3"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </div>
          {/* Right controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
            {connected ? (
              <>
                <div className="flex items-center bg-transparent border border-[rgba(255,255,255,0.07)] rounded-full p-1 gap-1.5 overflow-x-auto">
                  {NETWORKS.map((n) => (
                    <Button
                      key={n.name}
                      onClick={() => handleNetworkSwitch(n.id)}
                      className={`rounded-full px-3 py-2 text-xs sm:text-sm font-semibold transition-all
                        ${
                          activeNetwork === n.id
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

                <div className="flex flex-row gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="px-4 py-4 sm:px-6 sm:py-6 border border-[rgba(255,255,255,0.07)] text-white bg-[rgba(255,255,255,0.02)] hover:bg-white/10 rounded-full"
                      >
                        <BellDot />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-[#23242B] border border-[#353743] rounded-2xl max-w-xl w-[480px] p-0 overflow-hidden shadow-xl"
                    >
                      <div className="flex items-center justify-between px-6 pt-6 pb-3">
                        <span className="text-white text-xl font-semibold">
                          Transaction history
                        </span>
                      </div>
                      <div className="border-t border-[#353743] mx-2" />
                      <div className="p-6 flex flex-col items-center min-h-[220px] max-h-[320px] overflow-y-auto gap-4">
                        {transactions.length === 0 ? (
                          <div className="flex flex-col items-center justify-center w-full h-full mt-4">
                            <Image
                              src="/empty-box.svg"
                              alt="No transactions"
                              width={80}
                              height={80}
                            />
                            <div className="text-white/40 text-base mt-4">
                              No transaction found!
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4 w-full">
                            {transactions.map((tx, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between bg-[#2B2D36] rounded-xl px-4 py-3"
                              >
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-white text-base font-semibold">
                                    {tx.type === 'Send' ? (
                                      <span className="inline-block rotate-45">➤</span>
                                    ) : (
                                      <span className="inline-block">✍️</span>
                                    )}
                                    <span>{tx.type}</span>
                                  </div>
                                  <div className="text-white/60 text-xs">
                                    {tx.type === 'Send'
                                      ? `From ${tx.from} to ${tx.to}`
                                      : `Tx hash: ${tx.hash}`}
                                  </div>
                                </div>
                                {tx.amount && (
                                  <div className="text-white text-base font-semibold whitespace-nowrap">
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="px-4 py-4 sm:px-6 sm:py-6 border border-[rgba(255,255,255,0.07)] text-white bg-[rgba(255,255,255,0.02)] hover:bg-white/10 rounded-full"
                      >
                        <Menu />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-[#252831] border-[3.205px] border-[#303441] rounded-2xl min-w-[240px] p-4 overflow-hidden shadow-[0px_3.205px_70.509px_-12.82px_rgba(5,13,24,0.20)]"
                    >
                      <div className="flex items-center gap-2 px-3 py-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-[rgba(255,255,255,0.76)] text-sm">
                          Connected to Avail Snap
                        </span>
                      </div>
                      <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.07)] my-2" />
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 text-[rgba(255,255,255,0.76)] focus:text-[rgba(255,255,255,0.76)] rounded-full text-sm font-medium focus:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(255,255,255,0.07)] cursor-pointer">
                        <FileText className="w-5 h-5 text-[rgba(255,255,255,0.76)]" />
                        Read more about snaps
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.07)] my-2" />
                      <DropdownMenuItem
                        className="flex items-center gap-3 px-3 py-2 text-[rgba(255,255,255,0.76)] text-sm font-medium focus:text-[rgba(255,255,255,0.76)] focus:bg-[rgba(255,255,255,0.07)] rounded-full cursor-pointer"
                        onSelect={(e) => {
                          e.preventDefault();
                          setExportDialogOpen(true);
                        }}
                      >
                        <KeyRound className="w-5 h-5 text-white/60" />
                        Export private key
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-3 px-3 py-2 mt-3 text-[#FF5A5A] text-sm font-medium focus:text-[#FF5A5A] focus:bg-[rgba(255,90,90,0.07)] rounded-full"
                        onSelect={handleDisconnect}
                      >
                        <LogOut className="w-5 h-5 text-[#FF5A5A]" />
                        Disconnect wallet
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex w-full sm:w-auto justify-end">
                <ConnectWallet onClick={() => setConnected(true)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
