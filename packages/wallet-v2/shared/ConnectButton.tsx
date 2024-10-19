'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAvailSnap } from '@/services/metamask'
import { useInitializeProvider } from '@/hooks/useInitializeProvider'

export const ConnectButton = () => {
  const { connectToSnap } = useAvailSnap()
  // useInitializeProvider()

  return (
    <Button
      className="px-7 py-6 text-white !rounded-full text-base font-semibold"
      style={{
        background: 'linear-gradient(270deg, #2778E9 0%, #439FE7 100.18%)',
        lineHeight: '20.8px',
      }}
      onClick={connectToSnap}
    >
      Connect Wallet
    </Button>
  )
}
