import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3";
import { network } from "hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {

    },
    zkEVMTestnet: {
      url: 'https://rpc.public.zkevm-test.net',
      chainId: 1442,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      zkEVMTestnet: process.env.API_KEY,
    },
    customChains: [
      {
        network: 'zkEVMTestnet',
        chainId: 1442,
        urls: {
          apiURL: 'https://api-testnet-zkevm.polygonscan.com/api',
          browserURL: 'https://testnet-zkevm.polygonscan.com',
        },
      }]
  }
};

export default config;
