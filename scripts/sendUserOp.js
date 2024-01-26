const hre = require("hardhat");

const eoaPublicKey = '0x58Ad9D767A16FbA19160ED05E2b6e8bCb0d60911';
const eoaPrivateKey = '0xd540e2f708479c932745c3c35f73f0b6fe0914e4cc90a4cbb45940579c402869';
const simpleAccountAddress = '0x7866f21aBB23A17a7Be69A50D4ca1e7b8a90297B';

const entryPointAddress = '0x0Fb809167a189791d0eD016889Ee6737f8F0bc29';
const exampleContractAddress = '0x7Ff1658208548086046E1a5796E2944c8Ad29090';

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
