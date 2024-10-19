'use client'

import Image from 'next/image'
import { ConnectButton } from './ConnectButton'
import WalletCopy from './WalletCopy'
import MainnetTestnetSwitch from './MainnetTestnetSwitch'
import TransactionLayout from './Transactions/TransactionLayout'
import MenuBar from './MenuBar'
import useWalletStore  from '@/slices/walletSlice'
import Logo from '@/assets/images/logo.png'
import { TransactionType } from '@/types'
import { useState } from 'react'

export const Header = () => {
  const connected = useWalletStore((state) => state.connected)
  const accounts = useWalletStore((state) => state.accounts)

  const address =
    accounts?.length > 0
      ? (accounts[0] as string)
      : '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 w-full space-y-4 sm:space-y-0">
      <div className="flex items-center gap-5 w-full sm:w-auto justify-center sm:justify-start">
        <Image
          src={Logo}
          width={112}
          height={33}
          alt="Avail Wallet Logo"
          className="h-auto"
          priority
        />
        {connected && <WalletCopy address={address} />}
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center w-full sm:w-auto">
        {connected ? (
          <>
            <MainnetTestnetSwitch />
            <TransactionLayout />
            <MenuBar />
          </>
        ) : (
          <ConnectButton />
        )}
      </div>
    </header>
  )
}
