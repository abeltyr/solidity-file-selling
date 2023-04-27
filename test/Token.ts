import { ethers } from "hardhat";
import { Nft__factory } from "../typechain-types/factories/contracts";

const nftAddress = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";
describe("Token", function () {
  let contract: any, owner: any;
  describe("Deployment", function () {
    it("fetch Contract ", async function () {
      const owner = new ethers.Wallet(
        "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
      );
      const Nft = await ethers.getContractFactory("Nft");

      contract = await Nft.deploy();
      await contract.deployed();
    });
    it("mint 1", async function () {
      await contract.mint("new id", "new key", "new cid");
    });
    it("mint 2", async function () {
      await contract.mint("second id", "second key", "second cid");
    });
    it("mint 3", async function () {
      await contract.mint("third id", "third key", "third cid");
    });
    it("fetch 1", async function () {
      const key = await contract.fetchKey(0);
      const cid = await contract.fetchCid(0);
      const room = await contract._roomTokens(0);

      console.log({
        key,
        cid,
        room,
      });
    });
    it("fetch 2", async function () {
      const key = await contract.fetchKey(1);
      const cid = await contract.fetchCid(1);
      const room = await contract._roomTokens(1);

      console.log({
        key,
        cid,
        room,
      });
    });
    it("fetch 3", async function () {
      const key = await contract.fetchKey(2);
      const cid = await contract.fetchCid(2);
      const room = await contract._roomTokens(2);

      console.log({
        key,
        cid,
        room,
      });
    });
  });
});
