const hre = require("hardhat");


const { eoaPublicKey } = require('./addresses');
const { eoaPrivateKey } = require('./addresses');
const { simpleAccountAddress } = require('./addresses');
const { entryPointAddress } = require('./addresses');
const { exampleContractAddress } = require('./addresses');

async function main() {

    const wallet = new ethers.Wallet(eoaPrivateKey);
    const signer = wallet.connect(hre.ethers.provider);

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", entryPointAddress, signer);
    const simpleAccount = await hre.ethers.getContractAt("SimpleAccount", simpleAccountAddress, signer);
    const exampleContract = await hre.ethers.getContractAt("exampleContract", exampleContractAddress, signer);

    const balanceWei = await hre.ethers.provider.getBalance(signer.address);
    console.log(`The balance of the signer is: ${balanceWei} Wei`);

    const accountBalance = await entryPoint.deposits(simpleAccountAddress);
    console.log(`The balance of the simpleAccount is: ${accountBalance}`);

    const funcTargetData = exampleContract.interface.encodeFunctionData('exec2')

    const data = simpleAccount.interface.encodeFunctionData('execute', [exampleContractAddress, 0 ,funcTargetData])

    const userOp = {
        sender: simpleAccountAddress,
        nonce: await entryPoint.getNonce(simpleAccountAddress, 0),
        initCode: '0x',
        callData: data,
        callGasLimit: '10000', 
        verificationGasLimit: '100000', 
        preVerificationGas: '0x10edc8',
        maxFeePerGas: '0x0973e0',
        maxPriorityFeePerGas: '0x59682f10',
        paymasterAndData: '0x', 
        signature: '0x'
    };

    const hash = await entryPoint.getUserOpHash(userOp);
    console.log("hash",hash);

    userOp.signature = await signer.signMessage(hre.ethers.getBytes(hash));
    try {    
        const tx = await entryPoint.handleOps([userOp], eoaPublicKey, {
            gasLimit: 20000000
        });
        const receipt = await tx.wait();
        console.log('Transaction successful:', receipt);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
