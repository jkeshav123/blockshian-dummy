import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [contract, setContract] = useState(null);
  const [tokenInfo, setTokenInfo] = useState({});

  // Update this after contract deployment
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  const contractABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
    "function owner() view returns (address)"
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);

        const tokenContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(tokenContract);

        // Get token info
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        const balance = await tokenContract.balanceOf(account);
        
        setTokenInfo({ name, symbol });
        setBalance(ethers.utils.formatEther(balance));
        
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this dApp!");
    }
  };

  const sendTokens = async () => {
    if (contract && account) {
      try {
        const tx = await contract.transfer("0x000000000000000000000000000000000000dEaD", 
          ethers.utils.parseEther("10"));
        await tx.wait();
        alert("✅ Transfer successful!");
        
        // Update balance
        const newBalance = await contract.balanceOf(account);
        setBalance(ethers.utils.formatEther(newBalance));
      } catch (error) {
        console.error("Transfer failed:", error);
        alert("❌ Transfer failed: " + error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏗️ Blockshian Dummy Platform</h1>
        <p>Your complete blockchain development stack</p>
        
        {!account ? (
          <button className="connect-btn" onClick={connectWallet}>
            🔗 Connect MetaMask
          </button>
        ) : (
          <div className="wallet-info">
            <div className="connected-badge">
              ✅ Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </div>
            
            <div className="balance-card">
              <h3>💰 Your Balance</h3>
              <p className="balance-amount">{balance} {tokenInfo.symbol || 'BDT'}</p>
              <small>{tokenInfo.name || 'Blockshian Dummy Token'}</small>
            </div>
            
            <div className="actions">
              <button onClick={sendTokens} className="action-btn">
                🔥 Burn 10 Tokens
              </button>
            </div>
          </div>
        )}

        <div className="features-grid">
          <h2>✨ Features Included</h2>
          <div className="features">
            <div className="feature-card">✅ Ethereum Smart Contracts</div>
            <div className="feature-card">✅ React Frontend</div>
            <div className="feature-card">✅ Token Management</div>
            <div className="feature-card">✅ Wallet Integration</div>
            <div className="feature-card">✅ Backend API</div>
            <div className="feature-card">✅ Multi-chain Ready</div>
          </div>
        </div>

        <div className="instructions">
          <h3>🚀 Getting Started</h3>
          <ol>
            <li>Run: <code>npm run install:all</code></li>
            <li>Start local blockchain: <code>npx hardhat node</code></li>
            <li>Deploy contracts: <code>npm run deploy:contracts</code></li>
            <li>Update contract address in App.js</li>
            <li>Start frontend & backend</li>
          </ol>
        </div>
      </header>
    </div>
  );
}

export default App;