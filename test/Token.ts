import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types/";
import { hashMessage } from "@ethersproject/hash";

const nftAddress =
  // "0xae6644a9B0419b4cD3127Cf9994Dc349d29B536b";
  "0x44FD9290A3dd405436cEaa6249b4CA7aE8852DA7";

describe("Token", function () {
  let contract: Recording,
    wallet: any,
    hash: string,
    rSignature: string,
    sSignature: string,
    vSignature: number;
  describe("Deployment", function () {
    it("token Contract ", async function () {
      const DEPLOYER_PRIVATE_KEY: any = network.config.accounts;
      wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY[0]);
      const Contract = await ethers.getContractFactory("Recording");
      contract = await Contract.attach(nftAddress);
    });
    it("token Contract ", async function () {
      hash = hashMessage(wallet.address);
      const signature = await wallet.signMessage(wallet.address);

      rSignature = signature.slice(0, 66);
      sSignature = "0x" + signature.slice(66, 130);
      vSignature = parseInt(signature.slice(130, 132), 16);
    });

    it("mint 1", async function () {
      let price = ethers.utils.parseEther("3.0");
      const data = await contract.mint(
        "clhes8wwd0007410tow88u1b9",
        "wV681/FvQGysmpgCpEpuDQ0PXr9Xq/A/",
        "bafybeietsgcwfupwftwj6e2bldjzajseqjpgcpttrlvftckixwd3qhs2wm/6e5380b37ae6e745b613",
        price,
        // "0x47e6061e90024ab11c1e030b2e319e633030f5d44dac152b83e7d0936e08ef57",
        // 27,
        // "0x47e6061e90024ab11c1e030b2e319e633030f5d44dac152b83e7d0936e08ef57",
        // "0x2b97b3e3d2295621c1b2c7a2b5dadd0c947b2edcf37979e63ff01519cb88ea49",
        hash,
        vSignature,
        rSignature,
        sSignature,
      );
      console.log(data);
    });
    it.skip("update1token bool", async function () {
      const data = await contract.updateTokenSell(0, true);
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
        hash,
        vSignature,
        rSignature,
        sSignature,
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
        hash,
        vSignature,
        rSignature,
        sSignature,
      );
      console.log(data);
    });
  });
});
