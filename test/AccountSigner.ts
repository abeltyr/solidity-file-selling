import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";
import fetchAddress from "./utils/address";

describe("Account Signer", function () {
  let contract: Recording, wallet: Wallet;
  describe("Deployment", function () {
    it("Contract", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");
      const nftAddress = fetchAddress();
      contract = await Contract.attach(nftAddress);
    });

    it.skip("add signer", async function () {
      const addSigner = await contract.addAccountSigner(
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
        "0xCa2Cf550a04C798456624dD05FFC4A83f28F335A",
      );
      console.log(addSigner);
      console.log(await addSigner.wait());
    });

    it("is signer", async function () {
      const hasAccess = await contract.hasAccountAccess(
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
        "0xCa2Cf550a04C798456624dD05FFC4A83f28F335A",
      );
      console.log(hasAccess);
    });
    it.skip("remove signer", async function () {
      const removeSigner = await contract.removeAccountSigner(
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
        "0xCa2Cf550a04C798456624dD05FFC4A83f28F335A",
      );
      console.log(removeSigner);
    });
  });
});
