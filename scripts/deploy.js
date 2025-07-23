
const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Sherlock AI Risk Oracle to BlockDAG Testnet...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "BDAG\n");

  if (balance < ethers.parseEther("0.01")) {
    console.warn("⚠️ Warning: Low balance. Make sure you have enough BDAG for deployment.\n");
  }

  try {
    // Deploy RiskOracle contract
    console.log("📦 Deploying RiskOracle...");
    const RiskOracle = await ethers.getContractFactory("RiskOracle");
    
    // Estimate gas
    const deploymentData = RiskOracle.interface.encodeDeploy([]);
    const gasEstimate = await deployer.estimateGas({
      data: deploymentData
    });
    
    console.log("⛽ Estimated gas:", gasEstimate.toString());
    
    // Deploy with gas limit buffer
    const riskOracle = await RiskOracle.deploy({
      gasLimit: gasEstimate + BigInt(50000) // Add buffer
    });
    
    console.log("⏳ Waiting for deployment confirmation...");
    await riskOracle.waitForDeployment();
    
    const contractAddress = await riskOracle.getAddress();
    console.log("✅ RiskOracle deployed successfully!");
    console.log("📍 Contract address:", contractAddress);
    
    // Wait for a few block confirmations
    console.log("⏳ Waiting for block confirmations...");
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
    
    // Verify deployment by calling a view function
    try {
      const deploymentTime = await riskOracle.deploymentTime();
      console.log("🕐 Contract deployment time:", new Date(Number(deploymentTime) * 1000).toISOString());
      
      const activeOracleCount = await riskOracle.getActiveOracleCount();
      console.log("👥 Active oracles:", activeOracleCount.toString());
      
    } catch (error) {
      console.log("⚠️ Contract deployed but verification calls failed:", error.message);
    }
    
    // Add some initial risk scores for demo
    console.log("\n🎯 Setting up demo risk scores...");
    
    const demoAddresses = [
      {
        address: "0x8a2ef1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
        score: 9,
        reason: "Known malicious contract - token drainer"
      },
      {
        address: "0x1f98431c8ad98523631ae4a59f267346ea31f984", 
        score: 2,
        reason: "Verified Uniswap V3 Router - well audited"
      },
      {
        address: "0x742d35Cc6Eb4326D7B67f11B0d3B63FB5cF4e57B",
        score: 1,
        reason: "Known exchange wallet - verified safe"
      }
    ];
    
    for (const demo of demoAddresses) {
      try {
        console.log(`Setting risk score ${demo.score} for ${demo.address}...`);
        const tx = await riskOracle.updateRiskScore(
          demo.address,
          demo.score,
          demo.reason,
          { gasLimit: 200000 }
        );
        await tx.wait();
        console.log(`✅ Risk score set for ${demo.address}`);
      } catch (error) {
        console.log(`❌ Failed to set risk score for ${demo.address}:`, error.message);
      }
    }
    
    console.log("\n🎉 TESTNET DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("\n📋 BlockDAG Testnet Deployment Summary:");
    console.log("=====================================");
    console.log(`✅ Contract Address: ${contractAddress}`);
    console.log(`✅ Network: BlockDAG Testnet (Chain ID: 8081)`);
    console.log(`✅ RPC URL: https://rpc-testnet.blockdag.network`);
    console.log(`✅ Explorer: https://explorer-testnet.blockdag.network/address/${contractAddress}`);
    console.log(`✅ Deployer: ${deployer.address}`);
    console.log(`✅ TX Hash: ${riskOracle.deploymentTransaction()?.hash}`);
    console.log(`✅ Gas Used: ${gasEstimate.toString()}`);
    console.log("=====================================");
    

    
    console.log("\n🌐 Explore your LIVE contract on BlockDAG:");
    console.log(`https://explorer-testnet.blockdag.network/address/${contractAddress}`);
    
    // Save deployment info for easy access
    const deploymentInfo = {
      contractAddress,
      network: "BlockDAG Testnet",
      chainId: 8081,
      rpcUrl: "https://rpc-testnet.blockdag.network",
      explorerUrl: `https://explorer-testnet.blockdag.network/address/${contractAddress}`,
      deployer: deployer.address,
      deploymentTime: new Date().toISOString(),
      transactionHash: riskOracle.deploymentTransaction()?.hash,
      gasUsed: gasEstimate.toString(),
      status: "LIVE ON TESTNET"
    };
    
    console.log("\n💾 Contract Info for Integration:");
    console.log(JSON.stringify(deploymentInfo, null, 2));
    
  } catch (error) {
    console.error("\n❌ Deployment failed:", error);
    
    if (error.message.includes("insufficient funds")) {
      console.log("\n💡 Solution: Add more BDAG to your wallet:");
      console.log("- Get testnet BDAG from BlockDAG faucet");
      console.log("- Check your wallet balance");
    } else if (error.message.includes("gas")) {
      console.log("\n💡 Solution: Gas-related issue:");
      console.log("- Try increasing gas limit");
      console.log("- Check network congestion");
    } else {
      console.log("\n💡 Check:");
      console.log("- Network connection");
      console.log("- Private key configuration");
      console.log("- RPC endpoint availability");
    }
    
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
