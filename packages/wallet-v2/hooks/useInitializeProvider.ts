'use client'
import { useEffect } from 'react'
import { ethers } from 'ethers'
import { useWalletStore } from '@/slices/walletSlice'

// Custom hook to initialize the provider
export const useInitializeProvider = () => {
  const setProvider = useWalletStore((state) => state.setProvider) // Get the setProvider function from Zustand

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider) // Store the provider in Zustand
      } else {
        console.error('No Ethereum provider found')
      }
    }

    initializeProvider() // Call the function inside useEffect to avoid invalid hook call
  }, [setProvider]) // Effect depends on setProvider, so it will only re-run if setProvider changes
}
