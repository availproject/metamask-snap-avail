import { useState, useCallback, useEffect } from 'react'
import { Account, Erc20TokenBalance, Network } from '@/types'
import { enableAvailSnap } from '@avail-project/metamask-avail-adapter'
import { web3EnablePromise } from '@polkadot/extension-dapp'
import { useUIStore } from '@/slices/UISlice'
import { useWalletStore } from '@/slices/walletSlice'
import { useNetworkStore } from '@/slices/networkSlice'
import { useMetamaskStore } from '@/slices/metamaskSlice'

const defaultSnapId = 'npm:@avail-project/avail-snap'
const snapId = process.env.REACT_APP_SNAP_ID || defaultSnapId
const snapVersion = process.env.REACT_APP_SNAP_VERSION || '*'

export const useAvailSnap = () => {
  const { enableLoadingWithMessage, disableLoading } = useUIStore()
  const {
    setWalletConnection,
    setForceReconnect,
    setAccounts,
    setTransactions,
    setErc20TokenBalances,
    resetWallet,
    setIsLoading,
    setLoadingMessage,
  } = useWalletStore()
  const { setNetworks, setActiveNetwork } = useNetworkStore()
  const { setData } = useMetamaskStore()
  const [snapApi, setSnapApi] = useState<any>(null)

  const connectToSnap = useCallback(async () => {
    setIsLoading(true)
    enableLoadingWithMessage('Connecting to the wallet...')

    try {
      await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: { [snapId]: { version: snapVersion } },
      })
      setWalletConnection(true)
      setForceReconnect(false)
    } catch (error) {
      console.error('Error connecting to snap:', error)
      setWalletConnection(false)
      setLoadingMessage('Failed to connect to the wallet. Please try again.')
    } finally {
      setIsLoading(false)
      disableLoading()
    }
  }, [
    setWalletConnection,
    setForceReconnect,
    setIsLoading,
    enableLoadingWithMessage,
    disableLoading,
    setLoadingMessage,
  ])

  const getNetworks = useCallback(async (): Promise<Network[]> => {
    return [
      {
        name: 'turing',
        displayName: 'Turing Testnet',
        chainId: '1',
        baseUrl: undefined,
        nodeUrl: undefined,
      },
      {
        name: 'goldberg',
        displayName: 'Goldberg Testnet',
        chainId: '2',
        baseUrl: undefined,
        nodeUrl: undefined,
      },
      {
        name: 'mainnet',
        displayName: 'Mainnet',
        chainId: '3',
        baseUrl: undefined,
        nodeUrl: undefined,
      },
    ]
  }, [])

  const getWalletData = useCallback(
    async (
      networkId: number,
      updateAccounts: boolean,
      networks?: Network[]
    ) => {
      if (!snapApi) {
        console.error('Metamask Snap API is not available.')
        return
      }

      enableLoadingWithMessage('Getting network data ...')

      try {
        const [address, publicKey, balance, latestBlock, transactions] =
          await Promise.all([
            snapApi.getAddress(),
            snapApi.getPublicKey(),
            snapApi.getBalance(),
            snapApi.getLatestBlock(),
            snapApi.getAllTransactions(),
          ])

        setData({
          isInstalled: true,
          snap: snapApi,
          address,
          publicKey,
          balance,
          latestBlock,
          transactions,
          api: snapApi,
          message: '',
          network: 'turing',
        })

        const accounts = [{ address, publicKey }] as Account[]

        if (networks) {
          setNetworks(networks)
        }

        setAccounts(accounts)
        setTransactions(transactions)

        if (accounts.length > 0) {
          setErc20TokenBalances({
            amount: balance,
            symbol: 'AVAIL',
            decimals: 18,
          } as Erc20TokenBalance)
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error)
      } finally {
        disableLoading()
      }
    },
    [
      snapApi,
      setData,
      setNetworks,
      setAccounts,
      setTransactions,
      setErc20TokenBalances,
      enableLoadingWithMessage,
      disableLoading,
    ]
  )

  const initSnap = useCallback(async () => {
    enableLoadingWithMessage('Initializing wallet ...')

    try {
      const nets = await getNetworks()
      if (nets.length === 0) {
        throw new Error('No networks available.')
      }

      const installResult = await enableAvailSnap(
        { networkName: nets[0].name },
        snapId
      )
      if (!installResult) {
        resetWallet()
        throw new Error('Snap installation not accepted.')
      }

      const newSnapApi = installResult.getMetamaskSnapApi()
      if (!newSnapApi) {
        throw new Error('Failed to initialize Snap API.')
      }

      setSnapApi(newSnapApi)
      console.log({ newSnapApi })

      const [address, publicKey, balance, transactions, latestBlock] =
        await Promise.all([
          newSnapApi.getAddress(),
          newSnapApi.getPublicKey(),
          newSnapApi.getBalance(),
          newSnapApi.getAllTransactions(),
          newSnapApi.getLatestBlock(),
        ])

      setData({
        isInstalled: true,
        snap: installResult,
        address,
        publicKey,
        balance,
        latestBlock,
        transactions,
        api: newSnapApi,
        message: '',
        network: 'turing',
      })

      const net = { chainId: '1' }
      const idx = nets.findIndex((e) => e.chainId === net.chainId)
      setActiveNetwork(idx)
      await getWalletData(0, false, nets)
    } catch (err) {
      console.error('Error initializing wallet:', err)
      resetWallet()
    } finally {
      disableLoading()
    }
  }, [
    getNetworks,
    resetWallet,
    setData,
    setActiveNetwork,
    getWalletData,
    enableLoadingWithMessage,
    disableLoading,
  ])

  const checkConnection = useCallback(async () => {
    enableLoadingWithMessage('Connecting ...')
    let isInstalled = false

    if (web3EnablePromise) {
      const extensions = await web3EnablePromise
      isInstalled = !!extensions.find(
        (ext) => ext.name === 'metamask-avail-snap'
      )
    }

    setWalletConnection(isInstalled)
    if (!isInstalled) {
      disableLoading()
    }
  }, [setWalletConnection, enableLoadingWithMessage, disableLoading])

  useEffect(() => {
    checkConnection()
  }, [checkConnection])

  return {
    connectToSnap,
    getNetworks,
    getWalletData,
    initSnap,
    checkConnection,
  }
}

export default useAvailSnap
