# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## zkEVMTestnet

```shell
npx hardhat compile
NODE_TLS_REJECT_UNAUTHORIZED=0 PRIVATE_KEY=<your private key> API_KEY=<your api key> npx hardhat run scripts/deploy.ts --network zkEVMTestnet
NODE_TLS_REJECT_UNAUTHORIZED=0 PRIVATE_KEY=<your private key> API_KEY=<your api key> npx hardhat verify --contract contracts/WantaekToken.sol:WantaekToken --network zkEVMTestnet <your contract address>
```