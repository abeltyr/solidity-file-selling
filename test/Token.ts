import { ethers, network } from "hardhat";
import { Nft } from "../typechain-types";

const nftAddress = "0xFf2df6c1a1F6D7A53736706766BdDF270f6D40FF";
describe("Token", function () {
  let contract: Nft, contractWithSigner: any;
  describe("Deployment", function () {
    it("token Contract ", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;

      const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);

      const Contract = await ethers.getContractFactory("Nft");

      contract = await Contract.attach(nftAddress);
      // let provider = ethers.getDefaultProvider("http://127.0.0.1:8545/");

      // contract = new ethers.Contract(nftAddress, data.abi, owner);

      // contractWithSigner = contract.connect(owner);
      // const Nft = await ethers.getContractFactory("Nft");

      // contract = await Nft.deploy();
      // await contract.deployed();
    });
    // it("mint 1", async function () {
    //   const data = await contract.mint(
    //     "second id",
    //     "second key",
    //     "second cid",
    //     2,
    //   );
    //   console.log(data);
    //   await data.wait();
    //   console.log();
    // });

    // it("mint 2", async function () {
    //   await contract.mint("second id", "second key", "second cid", 1);
    // });
    // it("mint 3", async function () {
    //   await contract.mint("third id", "third key", "third cid", 2);
    // });

    it("buy 1", async function () {
      const data = await contract.BuyTokenShare(0);
      console.log(data);
      await data.wait();
      console.log(data);
    });
    // it("token 1", async function () {
    //   const room = await contract.getToken(0);
    //   const key = await contract.tokenKey(0);
    //   const cid = await contract.tokenURI(0);
    //   const price = await contract.tokenPrice(0);
    //   const sellingAccess = await contract.tokenSelling(0);

    //   console.log({
    //     key,
    //     cid,
    //     sellingAccess,
    //     price,
    //     room,
    //   });
    // });
    // it("token 2", async function () {
    //   const room = await contract.getToken(1);
    //   const key = await contract.tokenKey(1);
    //   const cid = await contract.tokenURI(1);
    //   const price = await contract.tokenPrice(1);
    //   const sellingAccess = await contract.tokenSelling(1);

    //   console.log({
    //     key,
    //     cid,
    //     sellingAccess,
    //     price,
    //     room,
    //   });
    // });
    // it("token 3", async function () {
    //   const room = await contract.getToken(2);
    //   const key = await contract.tokenKey(2);
    //   const cid = await contract.tokenURI(2);
    //   const price = await contract.tokenPrice(2);
    //   const sellingAccess = await contract.tokenSelling(2);

    //   console.log({
    //     key,
    //     cid,
    //     sellingAccess,
    //     price,
    //     room,
    //   });
    // });
    // it("token 4", async function () {
    //   const room = await contract.getToken(3);
    //   const key = await contract.tokenKey(3);
    //   const cid = await contract.tokenURI(3);
    //   const price = await contract.tokenPrice(3);
    //   const sellingAccess = await contract.tokenSelling(3);

    //   console.log({
    //     key,
    //     cid,
    //     sellingAccess,
    //     price,
    //     room,
    //   });
    // });
  });
});
