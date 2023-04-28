import { ethers, network } from "hardhat";
const fa = require("@glif/filecoin-address");

const nftAddress = "0xA15BB66138824a1c7167f5E85b957d04Dd34E468";

async function getNetworkTimestamp() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

export async function main() {
  //create new Wallet object from private key
  const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;

  const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);

  //Convert Ethereum address to f4 address
  const f4Address = fa.newDelegatedEthAddress(deployer.address).toString();
  console.log(
    "Ethereum address (this addresss should work for most tools):",
    deployer.address,
  );
  console.log("f4address (also known as t4 address on testnets):", f4Address);
}

main();
