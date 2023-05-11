import { ethers } from "hardhat";

async function main() {
  //deploy Recording
  const Contract = await ethers.getContractFactory("Recording");
  console.log("Deploying contract...");
  const contract = await Contract.deploy(
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    20,
  );
  await contract.deployed();
  console.log("contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
