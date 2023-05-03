import hardhat from "hardhat";
require("dotenv").config({ path: ".env" });
import hre from "@nomiclabs/hardhat-etherscan";

async function main() {
  // Verify the contract after deploying
  await hardhat.run("verify:verify", {
    address: "0xDcC78D130d778b9BaeDb5ff5f9cA03bCCc3683A7",
    constructorArguments: [],
  });
}
// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
