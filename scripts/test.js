const hre = require("hardhat");

const { exampleContractAddress } = require('../addressesConfig');

async function main() {

    const exampleContract = await hre.ethers.getContractAt("exampleContract", exampleContractAddress);

    const num = await exampleContract.num();
    console.log(num);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
