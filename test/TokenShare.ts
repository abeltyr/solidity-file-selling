import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types";
import { Wallet } from "ethers";

const nftAddress = "0x5aAeE8138397D1c4743dC3b4c6B7A78A11615a08";
describe("Token", function () {
  let contract: Recording, wallet: Wallet;
  describe("Deployment", function () {
    it("token Contract ", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");
      contract = await Contract.attach(nftAddress);
    });

    it.skip("buy 0", async function () {
      let price = ethers.utils.parseEther("2.0");

      const data = await contract.buyTokenShare(0, { value: price });
      console.log(data);
    });

    it("get token 0 share holder", async function () {
      const tokenShare = await contract.getTokenShare(
        0,
        wallet.address,
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
      );
      console.log(tokenShare);
    });
    it("check token 0 share holder", async function () {
      const checkTokenShare = await contract.checkTokenShare(
        0,
        wallet.address,
        // "0xA61091A9f5ED26e8dE811725791a0774072355AB",
      );
      console.log(checkTokenShare);
    });
    it("token 0 room", async function () {
      const room = await contract.getToken(0);
      console.log({
        room,
      });
    });
    it("token 0 key ", async function () {
      const key = await contract.tokenKey(0);
      console.log({
        key,
      });
    });
  });
});
