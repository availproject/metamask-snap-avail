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
import useWalletStore from '@/slices/walletSlice';

export const Header = () => {
  const connected = useWalletStore((state) => state.connected); // Get the setProvider function from Zustand
  const accounts = useWalletStore((state) => state.accounts);

  const address =
      accounts?.length > 0 ? (accounts[0] as unknown as string) : '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  
  return (
    <header className="flex flex-wrap items-center justify-between p-4 w-full">
      <div className="flex items-center gap-5">
        <Image src={Logo} width={112} height={33} alt="Logo" className="h-auto" />
        {connected ? <WalletCopy address={address} /> : ''}
      </div>
      {connected ? (
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