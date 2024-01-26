const { ethers } = require('ethers');

function createEOA() {
    // Create a wallet instance
    const wallet = ethers.Wallet.createRandom();

    // Display the EOA details
    console.log("Address: " + wallet.address);
    console.log("Private Key: " + wallet.privateKey);

    // Return the private key
    return wallet.address;
}

module.exports = { createEOA };
