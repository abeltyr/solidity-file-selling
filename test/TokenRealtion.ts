import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";

const nftAddress = "0x5aAeE8138397D1c4743dC3b4c6B7A78A11615a08";
describe("Token", function () {
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
