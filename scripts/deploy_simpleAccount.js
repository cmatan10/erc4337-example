const hre = require("hardhat");
const { createEOA } = require('./createEoaWallet');

const accountFactoryAddress = "0xe64fbbB8dC2E9893E7044A15B21D4DB87C2ff8c7";

async function main() {

  const SimpleAccountFactory = await hre.ethers.getContractAt("SimpleAccountFactory", accountFactoryAddress);

  const EOA = createEOA()
  
  const createAccount = await SimpleAccountFactory.createAccount(EOA,0);
  // const receipt = await createAccount.wait();
  // console.log('Transaction successful:', receipt);

  const getAccountAddress = await SimpleAccountFactory.createAccount.staticCall(EOA,0);
  console.log('AccountAddress:', getAccountAddress);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
