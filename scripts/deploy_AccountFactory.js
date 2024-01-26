const hre = require("hardhat");
const { createEOA } = require('./createEoaWallet');

const entryPointAddress = "0x0Fb809167a189791d0eD016889Ee6737f8F0bc29";

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
