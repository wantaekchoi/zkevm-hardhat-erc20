# ERC20 (Polygon zkEVM)

erc20 contract for Polygon zkEVM

## build and deploy, verify
```shell
$ nvm use OR asdf current
$ npm install
$ npx hardhat compile
$ PRIVATE_KEY=<your private key> npx hardhat run scripts/deploy.ts --network zkEVMTestnet
$ PRIVATE_KEY=<your private key> POLYSCAN_API_KEY=<your polyscan api key> npx hardhat verify --contract contracts/WantaekToken.sol:WantaekToken --network zkEVMTestnet <your contract address>
```

## deployed contract

- contract address: [0x357d7445c03cb0d33a95077b426bb7c25feb4d87](https://testnet-zkevm.polygonscan.com/address/0x357d7445c03cb0d33a95077b426bb7c25feb4d87)
- contract creation transaction: [0x7ec6fcd2869bab1cbff4dd95e9ac92f7c7a53ad4aae95a5c7637166e6d791208](https://testnet-zkevm.polygonscan.com/tx/0x7ec6fcd2869bab1cbff4dd95e9ac92f7c7a53ad4aae95a5c7637166e6d791208)
- L2 (Polygon zkEVM Testnet) Transaction Hash: [0x7ec6fcd2869bab1cbff4dd95e9ac92f7c7a53ad4aae95a5c7637166e6d791208](https://testnet-zkevm.polygonscan.com/tx/0x7ec6fcd2869bab1cbff4dd95e9ac92f7c7a53ad4aae95a5c7637166e6d791208)
- L2 (Polygon zkEVM Testnet) Block: [964273](https://testnet-zkevm.polygonscan.com/block/694273)
- L1 (Ethereum Goerli) Txn Batch Index: [45136](https://testnet-zkevm.polygonscan.com/batch/45136)
- L1 (Ethereum Goerli) Sequence Hash: [0xb3d81e92942f4f95a62c7c39b2cc5e130255d514349e84907de966c95705565b](https://goerli.etherscan.io/tx/0xb3d81e92942f4f95a62c7c39b2cc5e130255d514349e84907de966c95705565b)
    - Function: ``sequenceBatches(tuple[] batches,address l2Coinbase)``
    - From ``0x33d89d...55BF35e7`` To ``0xa997cf...a27a4c7A`` For 2 Matic Token(MATIC)
- L1 Verify Batch Hash: [0xa9237df98dd4dd39bb793059f5de8ba9dbb9fd8c434b401967c52a69a03dd5bc](https://goerli.etherscan.io/tx/0xa9237df98dd4dd39bb793059f5de8ba9dbb9fd8c434b401967c52a69a03dd5bc)
    - Function: verifyBatchesTrustedAggregator(uint64 pendingStateNum,uint64 initNumBatch,uint64 finalNewBatch,bytes32 newLocalExitRoot,bytes32 newStateRoot,bytes proof)
    - From ``0xa997cf...a27a4c7A`` To ``0x85dd7E...7104D1FA`` For 10 Matic Token(MATIC)
- ``0xa997cf...a27a4c7A`` is sequencer and ``0x85dd7E...7104D1FA`` is aggregator.
