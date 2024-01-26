const hre = require("hardhat");
const { accountFactoryAddress } = require('./addresses');
const { createEOA } = require('./createEoaWallet');

async function main() {

  const SimpleAccountFactory = await hre.ethers.getContractAt("SimpleAccountFactory", accountFactoryAddress);

  const EOA = createEOA()
  
  const createAccount = await SimpleAccountFactory.createAccount(EOA,0);
  // const receipt = await createAccount.wait();
  // console.log('Transaction successful:', receipt);

  const getAccountAddress = await SimpleAccountFactory.createAccount.staticCall(EOA,0);
  console.log('simpleAccountAddress:', getAccountAddress);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
