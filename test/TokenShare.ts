import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";
import fetchAddress from "./utils/address";

describe("Token Share", function () {
  let contract: Recording, wallet: Wallet;
  describe("Deployment", function () {
    it("token Contract ", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");
      const nftAddress = fetchAddress();
      contract = await Contract.attach(nftAddress);
    });

    it.skip("buy 0", async function () {
      // let price = ethers.utils.parseEther("2.0");
      let price = ethers.utils.parseEther("0.00001");

      const data = await contract.buyTokenShare(4, { value: price });
      console.log(data);
      console.log(await data.wait());
    });

    it.skip("get token 0 share holder", async function () {
      const tokenShare = await contract.getTokenShare(
        4,
        wallet.address,
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
      );
      console.log(tokenShare);
    });
    it.skip("check token 0 share holder", async function () {
      const checkTokenShare = await contract.checkTokenShare(
        4,
        wallet.address,
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
      );
      console.log(checkTokenShare);
    });
    it.skip("token 3 room", async function () {
      const room = await contract.getToken(4);
      console.log({
        room,
      });
    });
    it.skip("token 3 key ", async function () {
      const key = await contract.tokenKey(4);
      console.log({
        key,
      });
    });
  });
});
