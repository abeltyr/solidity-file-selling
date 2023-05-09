import { network } from "hardhat";

const fetchAddress = () => {
  let nftAddress = process.env.TFIL_ADDRESS ?? "";
  if (network.name === "TBSC") nftAddress = process.env.TBSC_ADDRESS ?? "";
  if (network.name === "AGOR") nftAddress = process.env.AGOR_ADDRESS ?? "";
  if (network.name === "TOKT") nftAddress = process.env.TOKT_ADDRESS ?? "";

  return nftAddress;
};

export default fetchAddress;
