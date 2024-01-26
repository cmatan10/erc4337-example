const hre = require("hardhat");
require('dotenv').config();

const entryPointAddress = '0x0Fb809167a189791d0eD016889Ee6737f8F0bc29';
const simpleAccountAddress = '0x7866f21aBB23A17a7Be69A50D4ca1e7b8a90297B';
const eoaPublicKey = '0x58Ad9D767A16FbA19160ED05E2b6e8bCb0d60911'

async function main() {

    // Create a wallet instance with the private key
    const wallet = new ethers.Wallet(process.env.PRI_KEY);

    // Connect the wallet to the Hardhat network provider
    const signer = wallet.connect(hre.ethers.provider);

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", entryPointAddress, signer);

    const sendFunds = await entryPoint.depositTo(simpleAccountAddress, {
        value: hre.ethers.parseUnits("100000000", "gwei"),
    });
    const receipt1 = await sendFunds.wait();
    console.log(receipt1);

    const tx = {
        to: eoaPublicKey,
        value: hre.ethers.parseUnits("100000000", "gwei")
    };

    const transactionResponse = await signer.sendTransaction(tx);
    const receipt2 = await transactionResponse.wait();
    console.log(receipt2);

    

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
