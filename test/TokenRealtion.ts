import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";

const nftAddress = "0xDcC78D130d778b9BaeDb5ff5f9cA03bCCc3683A7";
describe("Token Relation", function () {
  let contract: Recording, wallet: Wallet;
  describe("Deployment", function () {
    it.skip("token Contract ", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");
      contract = await Contract.attach(nftAddress);
    });

    it.skip("get token id '1'", async function () {
      const tokenShare = await contract.getTokenId("1");
      console.log(tokenShare);
    });

    it.skip("check token id '1'", async function () {
      const checkTokenShare = await contract.checkRecordingId("1");
      console.log(checkTokenShare);
    });
  });
});
