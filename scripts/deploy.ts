import { ethers } from "hardhat";
import { Nft } from "../typechain-types/contracts/Nft";

export async function deployNft(): Promise<Nft> {
  const Contract = await ethers.getContractFactory("Nft");
  console.log(`Deploying Nft...`);
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log(`Nft deployed to:`, contract.address);
  return contract;
}

async function main() {
  //deploy Simplecoin
  const Contract = await ethers.getContractFactory("Nft");
  console.log("Deploying contract...");
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log("contract deployed to:", contract.address);

  // await deployNft();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
