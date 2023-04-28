import { ethers } from "hardhat";
import { Recording } from "../typechain-types";

const nftAddress = "0x5aAeE8138397D1c4743dC3b4c6B7A78A11615a08";
describe("Token", function () {
  let contract: Recording, contractWithSigner: any;
  describe("Deployment", function () {
    it.skip("token Contract ", async function () {
      const Contract = await ethers.getContractFactory("Recording");
      contract = await Contract.attach(nftAddress);
    });
    it.skip("mint 1", async function () {
      let price = ethers.utils.parseEther("2.0");
      const data = await contract.mint("1", "first key", "first cid", price);
      console.log(data);
    });
    it.skip("token 0 cid ", async function () {
      const cid = await contract.tokenURI(0);

      console.log({
        cid,
      });
    });
    it.skip("token 0 price", async function () {
      const price = await contract.tokenPrice(0);

      console.log({ price });
    });
    it.skip("token 0 sellingAccess", async function () {
      const sellingAccess = await contract.tokenSelling(0);
      console.log({ sellingAccess });
    });
    it.skip("mint 2", async function () {
      let price = ethers.utils.parseEther("4.0");
      const data = await contract.mint(
        "second id",
        "second key",
        "second cid",
        price,
      );
      console.log(data);
    });
    it.skip("mint 3", async function () {
      let price = ethers.utils.parseEther("4.0");
      const data = await contract.mint(
        "third id",
        "third key",
        "third cid",
        price,
      );
      console.log(data);
    });
  });
});
