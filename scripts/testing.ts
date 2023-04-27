import { ethers } from "hardhat";

const nftAddress = "0xA15BB66138824a1c7167f5E85b957d04Dd34E468";

async function getNetworkTimestamp() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

export async function main() {
  const accounts = await ethers.getSigners();
  const seller = accounts[0];

  const Nft = await ethers.getContractFactory("Nft");
  const nft = Nft.attach(nftAddress);
  // const sellerNft = nft.connect(seller);

  const res = await (await nft.mint("id", "key", "cid")).wait();

  console.log(res);
  const key = await await nft.fetchKey(0);
  const cid = await await nft.fetchCid(0);
  const room = await await nft.fetchToken(0);

  console.log({ key, cid, room });
  // const txRcpt = await (
  //   await sellerNftMarketFixedPrice.list(
  //     nft.address,
  //     tokenId,
  //     233,
  //     (await getNetworkTimestamp()) + 3600 * 24 * 1,
  //     (await getNetworkTimestamp()) + 3600 * 24 * 2
  //   )
  // ).wait();
  // const listEvent = txRcpt.events?.find((ev) => ev.event == "List");
  // const listingId = listEvent?.args?.listingId;
  // console.log({ listingId });
}

main();
