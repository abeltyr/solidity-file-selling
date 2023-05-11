import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";
import fetchAddress from "./utils/address";

describe("Token fee", function () {
  let contract: Recording, wallet: Wallet;
  describe("Deployment", function () {
    it("Contract", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");
      const nftAddress = fetchAddress();
      contract = await Contract.attach(nftAddress);
    });

    it.skip("get fee", async function () {
      const feePercentage = await contract.feePercentage();
      console.log(feePercentage);
    });

    it.skip("fee acceptor", async function () {
      const feeAcceptor = await contract.feeAcceptor();
      console.log(feeAcceptor);
    });
    it.skip("update fee", async function () {
      const updateFee = await contract.updateFee(20);
      console.log(updateFee);
    });
    it.skip("update fee Acceptor", async function () {
      const updateFeeAcceptor = await contract.updateFeeAcceptingAddress(
        "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
      );
      console.log(updateFeeAcceptor);
    });
  });
});
