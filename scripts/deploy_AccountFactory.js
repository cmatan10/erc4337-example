const hre = require("hardhat");
const { entryPointAddress } = require('./addresses');

async function main() {

  const SimpleAccountFactory = await hre.ethers.deployContract("SimpleAccountFactory",[entryPointAddress]);
  
  await SimpleAccountFactory.waitForDeployment();

  console.log(
    `AccountFactory deployed to ${SimpleAccountFactory.target}` 
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
