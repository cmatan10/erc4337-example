require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

module.exports = {
  solidity: {
    version: "0.8.22"
    ,
    settings: {
      evmVersion: 'shanghai',
      optimizer: {
        enabled: true,
        runs: 200 
      }
    }
  },
  networks: {
      hardhat: {
          chainId: 31337
      },
      mumbai: {
          url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
          accounts: [process.env.PRI_KEY],
          chainId: 80001,
      },    
  },

  etherscan: {
      apiKey: process.env.POLYGONSCAN_API_KEY,
  },

};
