'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import { ConnectButton } from './ConnectButton';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import WalletCopy from './WalletCopy';
import MainnetTestnetSwitch from './MainnetTestnetSwitch';
import TransactionLayout from './Transactions/TransactionLayout';
import MenuBar from './MenuBar';

export const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  return (
    <header className="flex flex-wrap items-center justify-between p-4 w-full">
      <div className="flex items-center gap-5">
        <Image src={Logo} width={112} height={33} alt="Logo" className="h-auto" />
        <WalletCopy />
      </div>
      {isWalletConnected ? (
        <div className="flex items-center gap-2 flex-wrap justify-center sm:flex-nowrap">
          <MainnetTestnetSwitch />
          <TransactionLayout />
          <MenuBar />
        </div>
      ) : (
        <ConnectButton />
      )}
    </header>
  );
};