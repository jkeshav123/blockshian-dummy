require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    hardhat: {
      chainId: 1337
    }
  },
  paths: {
    sources: "./ethereum",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};