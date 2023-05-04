import hardhat from "hardhat";
require("dotenv").config({ path: ".env" });
import hre from "@nomiclabs/hardhat-etherscan";

async function main() {
  // Verify the contract after deploying
  await hardhat.run("verify:verify", {
    address: "0x68BE38A1844F8De928f535A7D2f6420d97c8ceAf",
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
