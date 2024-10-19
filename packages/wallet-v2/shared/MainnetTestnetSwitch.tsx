import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAvailSnap } from '@/services/metamask';
import { useNetworkStore } from '@/slices/networkSlice';
import useWalletStore from '@/slices/walletSlice';

const MainnetTuringSwitch: React.FC = () => {
  const { switchNetwork } = useAvailSnap();
  const { clearAccounts } = useWalletStore();
  const { setActiveNetwork } = useNetworkStore();

  const networks = useNetworkStore((state) => state.items);
  const activeNetwork = useNetworkStore((state) => state.activeNetwork);

  const changeNetwork = async (networkIndex: number) => {
    const selectedNetwork = networks[networkIndex];
    const { chainId } = selectedNetwork;

    console.log('Switching to network:', selectedNetwork.name, 'with chain ID:', chainId);

    let result = false;
    if (activeNetwork !== networkIndex) {
      result = await switchNetwork(networkIndex, chainId);
    }

    if (result) {
      clearAccounts();
      setActiveNetwork(networkIndex);
    }
  };

  return (
    <Tabs
      defaultValue="mainnet"
      className="border-4 py-1 border-white/10 rounded-full"
    >
      <TabsList className="bg-transparent w-full justify-between">
        <TabsTrigger
          value="mainnet"
          onClick={() => changeNetwork(2)} // Assuming mainnet is at index 2
          className={`px-3 py-2 rounded-full transition-all duration-300 font-semibold ${activeNetwork === 2 ? 'bg-white/12 text-white' : ''}`}
        >
          Avail Mainnet
        </TabsTrigger>
        <TabsTrigger
          value="turing"
          onClick={() => changeNetwork(0)} // Turing at index 0
          className={`px-3 py-2 rounded-full transition-all duration-300 font-semibold ${activeNetwork === 0 ? 'bg-white/12 text-white' : ''}`}
        >
          Turing Testnet
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MainnetTuringSwitch;
