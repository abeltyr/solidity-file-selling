import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";
import fetchAddress from "./utils/address";

describe("Token Share", function () {
  let contract: Recording, wallet: Wallet;
  describe("Deployment", function () {
    it.skip("token Contract ", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");
      const nftAddress = fetchAddress();
      contract = await Contract.attach(nftAddress);
    });

    it.skip("buy 5", async function () {
      // let price = ethers.utils.parseEther("0.0");
      let price = ethers.utils.parseEther("200");

      const data = await contract.buyTokenShare(5, { value: price });
      console.log(data);
      console.log(await data.wait());
    });

    it.skip("get token 5 share holder", async function () {
      const tokenShare = await contract.getTokenShare(
        5,
        wallet.address,
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
      );
      console.log(tokenShare);
    });
    it.skip("check token 5 share holder", async function () {
      const checkTokenShare = await contract.checkTokenShare(
        5,
        wallet.address,
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
      );
      console.log(checkTokenShare);
    });
    it.skip("token 5 room", async function () {
      const room = await contract.getToken(5);
      console.log({
        room,
      });
    });
    it.skip("token 5 key ", async function () {
      const key = await contract.tokenKey(5);
      console.log({
        key,
      });
    });
  });
});
