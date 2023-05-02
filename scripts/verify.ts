import hardhat from "hardhat";
require("dotenv").config({ path: ".env" });
import hre from "@nomiclabs/hardhat-etherscan";

async function main() {
  // Verify the contract after deploying
  await hardhat.run("verify:verify", {
    address: "0x5B17dEcd6b7218Bb77E0af923A02640adab61dB5",
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
