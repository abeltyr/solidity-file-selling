import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";
import fetchAddress from "./utils/address";

describe("Token Relation", function () {
  let contract: Recording, wallet: Wallet;
  describe("Deployment", function () {
    it.skip("token Contract ", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");

      const nftAddress = fetchAddress();
      contract = await Contract.attach(nftAddress);
    });

    it.skip("get token id '1'", async function () {
      const tokenShare = await contract.getTokenId("c0he08wwd0007410tow88u1b0");
      console.log(tokenShare);
    });

    it.skip("check token id '3'", async function () {
      const checkTokenShare = await contract.checkRecordingId(
        "c0he08wwd0007410tow88u1b0",
      );
      console.log(checkTokenShare);
    });
  });
});
