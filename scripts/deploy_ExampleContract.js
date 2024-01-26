
const hre = require("hardhat");

async function main() {

  const exampleContract = await hre.ethers.deployContract("exampleContract");

  await exampleContract.waitForDeployment();

  console.log(
    `example contract deployed to ${exampleContract.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
