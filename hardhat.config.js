require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // BlockDAG Testnet Configuration
    blockdag_testnet: {
      url: "https://rpc-testnet.blockdag.network",
      chainId: 8081,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gas: 8000000,
      gasPrice: 25000000000, // 25 gwei
      timeout: 60000,
    },
    // Development network
    hardhat: {
      chainId: 31337,
    },
    // Localhost for testing
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      blockdag_testnet: "your-blockdag-explorer-api-key", // Add when available
    },
    customChains: [
      {
        network: "blockdag_testnet",
        chainId: 8081,
        urls: {
          apiURL: "https://api-testnet.blockdag.network/api",
          browserURL: "https://explorer-testnet.blockdag.network"
        }
      }
    ]
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 25,
  },
  mocha: {
    timeout: 40000,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};