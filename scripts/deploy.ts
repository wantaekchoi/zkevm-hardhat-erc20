import { ethers } from "hardhat";

async function main() {
  const WantaekToken = await ethers.getContractFactory("WantaekToken");
  const wantaekToken = await WantaekToken.deploy();

  await wantaekToken.deployed();

  console.log(JSON.stringify(wantaekToken.deployTransaction, null, 2));

  console.log(`WantaekToken deployed to ${wantaekToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
