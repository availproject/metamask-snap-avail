import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MainnetTestnetSwitch = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="bg-transparent border-4 py-1 border-[#FFFFFF12] rounded-full">
        <TabsList className="bg-transparent w-full justify-between">
          <TabsTrigger 
            value="account" 
            className="px-3 py-2 !rounded-full transition-all duration-300 font-semibold data-[state=active]:bg-[rgba(255,255,255,0.07)] data-[state=active]:!text-[#FFFFFF]"
            style={{ boxShadow: '0px 3px 4px -2px rgba(17, 12, 34, 0.1)' }}>
            Avail Mainnet
          </TabsTrigger>
          <TabsTrigger 
            value="password" 
            className="px-3 py-2 !rounded-full transition-all duration-300 font-semibold data-[state=active]:bg-[#FFFFFF12] data-[state=active]:!text-[#FFFFFF]"
            style={{ boxShadow: '0px 3px 4px -2px rgba(17, 12, 34, 0.1)' }}>
            Goldberg Testnet
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MainnetTestnetSwitch;