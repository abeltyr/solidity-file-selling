import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";

const nftAddress = "0xDcC78D130d778b9BaeDb5ff5f9cA03bCCc3683A7";
describe("Account Signer", function () {
  let contract: Recording, wallet: Wallet;
  describe("Deployment", function () {
    it.skip("Contract", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");
      contract = await Contract.attach(nftAddress);
    });

    it.skip("add signer", async function () {
      const addSigner = await contract.addAccountSigner(
        "0xA61091A9f5ED26e8dE811725791a0774072355AB",
        // "0xCa2Cf550a04C798456624dD05FFC4A83f28F335A",
      );
      console.log(addSigner);
    });

    it.skip("remove signer", async function () {
      const removeSigner = await contract.removeAccountSigner(
        "0xA61091A9f5ED26e8dE811725791a0774072355AB",
        // "0xCa2Cf550a04C798456624dD05FFC4A83f28F335A",
      );
      console.log(removeSigner);
    });
  });
});
