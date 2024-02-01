const hre = require("hardhat");
const { entryPointAddress } = require('../addressesConfig');

async function main() {

  const AccountFactory = await hre.ethers.deployContract("AccountFactory",[entryPointAddress]);
  
  await AccountFactory.waitForDeployment();

  console.log(
    `AccountFactory deployed to ${AccountFactory.target}` 
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
