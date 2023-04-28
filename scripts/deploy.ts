import { ethers } from "hardhat";

async function main() {
  //deploy Recording
  const Contract = await ethers.getContractFactory("Recording");
  console.log("Deploying contract...");
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log("contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
