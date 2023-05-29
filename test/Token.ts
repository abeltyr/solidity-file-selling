import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types/";
import { hashMessage } from "@ethersproject/hash";
import fetchAddress from "./utils/address";

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

      const nftAddress = fetchAddress();

      contract = await Contract.attach(nftAddress);
    });
    it("token hash ", async function () {
      hash = hashMessage(wallet.address);
      const signature = await wallet.signMessage(wallet.address);

      rSignature = signature.slice(0, 66);
      sSignature = "0x" + signature.slice(66, 130);
      vSignature = parseInt(signature.slice(130, 132), 16);
    });

    it.skip("mint 1", async function () {
      let price = ethers.utils.parseEther("200");
      const data = await contract.mint(
        "cvac0popld0007410towo8ipb2",
        "wV681/FvQGysmpgCpEpuDQ0PXr9Xq/A/",
        "bafybeietsgcwfupwftwj6e2bldjzajseqjpgcpttrlvftckixwd3qhs2wm/6e5380b37ae6e745b613",
        price,
        // "0xdb73e66be0e3ad3ff6295e255734e57d560fa502273c1e8392959a1c212b1b12",
        // 28,
        // "0xd701d1e699ab79c381690ad3f0b51a0f6a2aa1ba6369656b00ca4241132080b7",
        // "0x0d7420615ad240bc05ba51b49737c35808b3c466da7f90139766ae7e44a37f08",
        hash,
        vSignature,
        rSignature,
        sSignature,
      );
      console.log(data);
      console.log(await data.wait());
    });
    it.skip("update1token bool", async function () {
      const data = await contract.updateTokenSell(3, true);
      console.log(data);
    });
    it.skip("token 0 cid ", async function () {
      const cid = await contract.tokenURI(0);
      console.log({
        cid,
      });
    });
    it.skip("token 0 price", async function () {
      const price = await contract.tokenPrice(5);

      console.log({ price });
    });
    it.skip("token 0 sellingAccess", async function () {
      const sellingAccess = await contract.tokenSelling(0);
      console.log({ sellingAccess });
    });
    it.skip("mint 0", async function () {
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
