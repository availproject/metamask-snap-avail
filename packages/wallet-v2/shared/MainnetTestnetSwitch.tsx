import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MainnetTestnetSwitch: React.FC = () => {
  return (
    <Tabs
      defaultValue="mainnet"
      className="border-4 py-1 border-white/10 rounded-full"
    >
      <TabsList className="bg-transparent w-full justify-between">
        <TabsTrigger
          value="mainnet"
          className="px-3 py-2 rounded-full transition-all duration-300 font-semibold data-[state=active]:bg-white/12 data-[state=active]:text-white"
        >
          Avail Mainnet
        </TabsTrigger>
        <TabsTrigger
          value="testnet"
          className="px-3 py-2 rounded-full transition-all duration-300 font-semibold data-[state=active]:bg-white/12 data-[state=active]:text-white"
        >
          Goldberg Testnet
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default MainnetTestnetSwitch
