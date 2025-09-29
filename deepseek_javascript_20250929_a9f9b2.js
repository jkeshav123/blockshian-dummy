async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("🚀 Deploying Blockshian Dummy Token...");
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy BlockshianToken
  const BlockshianToken = await ethers.getContractFactory("BlockshianToken");
  const token = await BlockshianToken.deploy(1000000); // 1 million tokens
  
  await token.deployed();
  
  console.log("✅ BlockshianToken deployed to:", token.address);
  console.log("Token name:", await token.name());
  console.log("Token symbol:", await token.symbol());
  console.log("Total supply:", (await token.totalSupply()).toString());
  console.log("Owner:", await token.owner());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });