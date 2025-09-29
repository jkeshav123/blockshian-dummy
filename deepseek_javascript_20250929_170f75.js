import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mock blockchain data
const blockchainStats = {
  totalTransactions: 1247,
  activeUsers: 892,
  tokenPrice: 0.0015,
  marketCap: 1500000,
  lastBlock: 18453219,
  network: "Ethereum Local"
};

// Routes
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: blockchainStats,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/token', (req, res) => {
  res.json({
    name: "Blockshian Dummy Token",
    symbol: "BDT",
    totalSupply: "1000000",
    decimals: 18,
    contractAddress: "Update after deployment",
    owner: "Deployer Address"
  });
});

app.post('/api/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  
  const mockTransaction = {
    txHash: "0x" + Math.random().toString(16).substr(2, 64),
    from: from,
    to: to,
    amount: amount,
    status: "pending",
    blockNumber: blockchainStats.lastBlock + 1,
    timestamp: new Date().toISOString(),
    gasUsed: "21000",
    confirmations: 1
  };
  
  res.json({
    success: true,
    message: "Transfer simulated successfully",
    transaction: mockTransaction
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: '✅ OK', 
    service: 'Blockshian Backend API',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Blockshian backend running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`❤️ Health: http://localhost:${PORT}/health`);
});