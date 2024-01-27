const hre = require("hardhat");
require('dotenv').config();

const { entryPointAddress, simpleAccountAddress, eoaPublicKey } = require('../addressesConfig');

async function main() {

    // Create a wallet instance with the private key
    const wallet = new ethers.Wallet(process.env.PRI_KEY);

    // Connect the wallet to the Hardhat network provider
    const signer = wallet.connect(hre.ethers.provider);

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", entryPointAddress, signer);

    const sendFunds = await entryPoint.depositTo(simpleAccountAddress, {
        value: hre.ethers.parseUnits("5000000", "gwei"),
    });
    const receipt1 = await sendFunds.wait();
    console.log(receipt1);

    const tx = {
        to: eoaPublicKey,
        value: hre.ethers.parseUnits("5000000", "gwei")
    };
   
    const transactionResponse = await signer.sendTransaction(tx);
    const receipt2 = await transactionResponse.wait();
    console.log(receipt2);

    
console.log('deposit successful');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
