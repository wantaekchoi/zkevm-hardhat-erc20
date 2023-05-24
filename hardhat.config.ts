import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3";

const { PRIVATE_KEY, ALCHEMY_API_KEY, ETHERSCAN_API_KEY, POLYSCAN_API_KEY } = process.env;

interface NetworkConfig {
  url: string;
  accounts: string[];
  chainId?: number;
}

const networks: Record<string, NetworkConfig> = {};

const addAlchemyNetworks = (privateKey: string, alchemyApiKey: string) => {
  const alchemyNetworks = ['goerli', 'sepolia'].map(name => ({
    [name]: {
      url: `https://eth-${name}.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: [privateKey],
    },
  }));

  return Object.assign({}, ...alchemyNetworks);
};

const addZkEVMTestnetNetwork = (privateKey: string) => ({
  zkEVMTestnet: {
    url: 'https://rpc.public.zkevm-test.net',
    chainId: 1442,
    accounts: [privateKey],
  },
});

if (PRIVATE_KEY) {
  if (ALCHEMY_API_KEY) {
    Object.assign(networks, addAlchemyNetworks(PRIVATE_KEY, ALCHEMY_API_KEY));
  }
  Object.assign(networks, addZkEVMTestnetNetwork(PRIVATE_KEY));
}

const apiKey: Record<string, string> = {};
if (ETHERSCAN_API_KEY) {
  ['goerli', 'sepolia'].forEach(networkName => {
    apiKey[networkName] = ETHERSCAN_API_KEY;
  });
}
if (POLYSCAN_API_KEY) {
  apiKey['zkEVMTestnet'] = POLYSCAN_API_KEY;
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks,
  etherscan: {
    apiKey,
    customChains: [
      {
        network: 'zkEVMTestnet',
        chainId: 1442,
        urls: {
          apiURL: 'https://api-testnet-zkevm.polygonscan.com/api',
          browserURL: 'https://testnet-zkevm.polygonscan.com',
        },
      },
    ],
  },
};

export default config;
