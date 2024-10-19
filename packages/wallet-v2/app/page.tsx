'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TextCard } from '@/shared/TextCard'
import SendDialog from '@/shared/Dialog/SendDialog'
import LoadingModal from '@/shared/LoadingModal'
import { useAvailSnap } from '@/services/metamask'
import { useHasMetamask } from '@/hooks/useHasMetamask'
import  useWalletStore from '@/slices/walletSlice'
import  {useNetworkStore}  from '@/slices/networkSlice'
import { useUIStore } from '@/slices/UISlice'
import Line from '@/assets/images/line.svg'
import Sign from '@/assets/images/signature.svg'
import Qr from '@/assets/images/qr.svg'
import { GET_FAUCENT_URL, SNAPS_DOC_URL } from '@/utils/constants'
import { BalanceDisplay } from '@/shared/BalanceDisplay'

export default function Home(): JSX.Element {
  const { initSnap, checkConnection, getWalletData } = useAvailSnap()
  const accounts = useWalletStore((state) => state.accounts)
  const _balance = useWalletStore((state) => state.tokenBalance) // Unused but prefixed
  const provider = useWalletStore((state) => state.provider)
  const connected = useWalletStore((state) => state.connected)
  const forceReconnect = useWalletStore((state) => state.forceReconnect)
  const networks = useNetworkStore((state) => state.items)
  const activeNetwork = useNetworkStore((state) => state.activeNetwork)
  const { hasMetamask } = useHasMetamask()
  const { loader } = useUIStore()
  const address =
    accounts?.length > 0
      ? (accounts[0] as string)
      : '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  useEffect(() => {
    if (!provider) return

    if (connected) {
      initSnap()
    }

    if (hasMetamask && !connected && !forceReconnect) {
      checkConnection()
    }
  }, [connected, forceReconnect, hasMetamask, provider]);


  useEffect(() => {
    if (provider && networks.length > 0) {
      const chainId = networks[activeNetwork].chainId
      getWalletData(chainId, true)
    }
  }, [activeNetwork, provider, networks])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12">
      {loader.isLoading && <LoadingModal />}
      {/* <motion.div {...fadeInUp} className="space-y-12">
        <Image
          src={Line}
          alt="Decorative line"
          width={100}
          height={10}
          className="w-full"
        />
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold">
            {connected ? '35875' : '--'} AVL
          </h2>
          <p className="mt-3 font-semibold text-lg sm:text-xl text-white/48">
            4748.45 USD
          </p>
        </div>
        <Image
          src={Line}
          alt="Decorative line"
          width={100}
          height={10}
          className="w-full"
        />
      </motion.div> */}
<BalanceDisplay />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="initial"
        animate="animate"
      >
        {connected ? (
          <>
            <motion.div variants={fadeInUp}>
              <SendDialog />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="w-full px-6 py-10 border shadow-none border-white/10 bg-white/5 gap-2 rounded-2xl hover:bg-white/10 transition-colors duration-300"
              >
                <Image src={Qr} width={20} height={20} alt="Receive icon" />{' '}
                Receive
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="w-full px-6 py-10 border shadow-none border-white/10 bg-white/5 gap-2 rounded-2xl hover:bg-white/10 transition-colors duration-300"
              >
                <Image src={Sign} width={20} height={20} alt="Sign icon" /> Sign
                Message
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={fadeInUp}>
              <TextCard
                title="What is snap?"
                content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
                link="#"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <TextCard
                title="Learn more about Avail?"
                content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
                link={SNAPS_DOC_URL}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <TextCard
                title="Get testnet tokens"
                content="Snaps extend the capabilities of MetaMask by adding new functionalities. This Snap allows MetaMask to be compatible with Avail and manage your keys."
                link={GET_FAUCENT_URL}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  )
}
