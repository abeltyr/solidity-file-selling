import { ethers, network } from "hardhat";
import { Recording } from "../typechain-types/";
import { Recording__factory } from "../typechain-types/factories/contracts";
import { hashMessage } from "@ethersproject/hash";

const nftAddress = "0x5B17dEcd6b7218Bb77E0af923A02640adab61dB5";
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
      let price = ethers.utils.parseEther("2.0");
      const data = await contract.mint(
        "3",
        "first key",
        "first cid",
        price,
        hash,
        vSignature,
        rSignature,
        sSignature,
      );
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
