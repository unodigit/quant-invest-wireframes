// Mock Data for Quant-Driven Crypto Investment Platform
// All entities: User, Portfolio, Strategy, Transaction, BankAccount

export const mockData = {
  // T004: User entities
  users: [
    {
      id: "user-001",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      phone: "+61412345678",
      language: "en",
      kycStatus: "approved",
      twoFactorEnabled: true
    },
    {
      id: "user-002",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+61423456789",
      language: "en",
      kycStatus: "pending",
      twoFactorEnabled: false
    }
  ],

  // T005: Portfolio entities
  portfolios: [
    {
      userId: "user-001",
      totalValueAUD: 15234.56,
      performanceHistory: [
        // 30 days of data (1 month)
        { date: "2025-09-07T00:00:00Z", value: 14850.00 },
        { date: "2025-09-08T00:00:00Z", value: 14920.30 },
        { date: "2025-09-09T00:00:00Z", value: 14880.50 },
        { date: "2025-09-10T00:00:00Z", value: 14950.75 },
        { date: "2025-09-11T00:00:00Z", value: 15020.40 },
        { date: "2025-09-12T00:00:00Z", value: 14990.20 },
        { date: "2025-09-13T00:00:00Z", value: 15050.80 },
        { date: "2025-09-14T00:00:00Z", value: 15100.45 },
        { date: "2025-09-15T00:00:00Z", value: 15080.60 },
        { date: "2025-09-16T00:00:00Z", value: 15120.30 },
        { date: "2025-09-17T00:00:00Z", value: 15090.50 },
        { date: "2025-09-18T00:00:00Z", value: 15150.70 },
        { date: "2025-09-19T00:00:00Z", value: 15180.90 },
        { date: "2025-09-20T00:00:00Z", value: 15200.40 },
        { date: "2025-09-21T00:00:00Z", value: 15175.20 },
        { date: "2025-09-22T00:00:00Z", value: 15140.60 },
        { date: "2025-09-23T00:00:00Z", value: 15110.80 },
        { date: "2025-09-24T00:00:00Z", value: 15095.50 },
        { date: "2025-09-25T00:00:00Z", value: 15120.70 },
        { date: "2025-09-26T00:00:00Z", value: 15085.40 },
        { date: "2025-09-27T00:00:00Z", value: 15050.20 },
        { date: "2025-09-28T00:00:00Z", value: 15075.90 },
        { date: "2025-09-29T00:00:00Z", value: 15100.30 },
        { date: "2025-09-30T00:00:00Z", value: 15135.60 },
        { date: "2025-10-01T00:00:00Z", value: 15160.80 },
        { date: "2025-10-02T00:00:00Z", value: 15190.40 },
        { date: "2025-10-03T00:00:00Z", value: 15210.90 },
        { date: "2025-10-04T00:00:00Z", value: 15234.56 },
        { date: "2025-10-05T00:00:00Z", value: 15250.20 },
        { date: "2025-10-06T00:00:00Z", value: 15234.56 }
      ],
      strategies: ["strat-001", "strat-002"]
    },
    {
      userId: "user-002",
      totalValueAUD: 0.00,
      performanceHistory: [],
      strategies: []
    }
  ],

  // T006: Strategy entities
  strategies: [
    {
      id: "strat-001",
      name: "Momentum Alpha",
      description: "Trend-following strategy focusing on high-momentum cryptocurrencies with 30-day rebalancing.",
      riskLevel: "Medium",
      minimumInvestment: 1000.00,
      returnTotal: 12.5,
      returnAnnualized: 18.2,
      returnSinceInception: 45.7,
      volatility: 0.15,
      sharpeRatio: 1.8,
      maxDrawdown: -8.3,
      allocatedAmount: 8000.00,
      allocationHistory: [
        { date: "2025-08-01T10:00:00Z", action: "allocated", amount: 3000.00, balance: 3000.00 },
        { date: "2025-09-15T14:30:00Z", action: "allocated", amount: 5000.00, balance: 8000.00 }
      ],
      drawdownHistory: [
        { date: "2025-08-01T00:00:00Z", value: 0.0 },
        { date: "2025-08-15T00:00:00Z", value: -2.1 },
        { date: "2025-09-01T00:00:00Z", value: -5.4 },
        { date: "2025-09-15T00:00:00Z", value: -8.3 },
        { date: "2025-10-01T00:00:00Z", value: -3.2 },
        { date: "2025-10-06T00:00:00Z", value: -1.0 }
      ]
    },
    {
      id: "strat-002",
      name: "Value Mean Reversion",
      description: "Statistical arbitrage strategy exploiting temporary mispricings in established crypto assets.",
      riskLevel: "Low",
      minimumInvestment: 500.00,
      returnTotal: 8.7,
      returnAnnualized: 12.4,
      returnSinceInception: 32.1,
      volatility: 0.10,
      sharpeRatio: 2.1,
      maxDrawdown: -5.6,
      allocatedAmount: 7234.56,
      allocationHistory: [
        { date: "2025-07-20T09:00:00Z", action: "allocated", amount: 7234.56, balance: 7234.56 }
      ],
      drawdownHistory: [
        { date: "2025-07-20T00:00:00Z", value: 0.0 },
        { date: "2025-08-05T00:00:00Z", value: -1.8 },
        { date: "2025-08-20T00:00:00Z", value: -3.5 },
        { date: "2025-09-05T00:00:00Z", value: -5.6 },
        { date: "2025-09-20T00:00:00Z", value: -2.9 },
        { date: "2025-10-06T00:00:00Z", value: -0.8 }
      ]
    },
    {
      id: "strat-003",
      name: "Arbitrage Pro",
      description: "Multi-exchange arbitrage capturing price differentials across global crypto markets.",
      riskLevel: "High",
      minimumInvestment: 5000.00,
      returnTotal: 15.2,
      returnAnnualized: 22.8,
      returnSinceInception: 58.4,
      volatility: 0.08,
      sharpeRatio: 2.5,
      maxDrawdown: -3.2,
      allocatedAmount: 0.00,
      allocationHistory: [],
      drawdownHistory: [
        { date: "2025-06-01T00:00:00Z", value: 0.0 },
        { date: "2025-07-01T00:00:00Z", value: -0.9 },
        { date: "2025-08-01T00:00:00Z", value: -1.5 },
        { date: "2025-09-01T00:00:00Z", value: -3.2 },
        { date: "2025-10-01T00:00:00Z", value: -1.1 },
        { date: "2025-10-06T00:00:00Z", value: -0.4 }
      ]
    }
  ],

  // T007: Transaction entities
  transactions: [
    {
      id: "txn-001",
      date: "2025-10-05T14:22:00Z",
      type: "allocation",
      amount: 5000.00,
      status: "completed",
      strategyId: "strat-001",
      reference: null
    },
    {
      id: "txn-002",
      date: "2025-10-04T09:15:00Z",
      type: "allocation",
      amount: 10000.00,
      status: "failed",
      strategyId: "strat-001",
      reference: null
    },
    {
      id: "txn-003",
      date: "2025-10-01T11:30:00Z",
      type: "deposit",
      amount: 10000.00,
      status: "completed",
      strategyId: null,
      reference: "INV20251001-001"
    },
    {
      id: "txn-004",
      date: "2025-09-15T14:30:00Z",
      type: "allocation",
      amount: 3000.00,
      status: "completed",
      strategyId: "strat-001",
      reference: null
    },
    {
      id: "txn-005",
      date: "2025-08-01T10:00:00Z",
      type: "deposit",
      amount: 15000.00,
      status: "completed",
      strategyId: null,
      reference: "INV20250801-001"
    }
  ],

  // T007: BankAccount entities
  bankAccounts: [
    {
      id: "bank-001",
      holderName: "Sarah Chen",
      bsb: "062-000",
      accountNumber: "12345678",
      accountType: "savings",
      verified: true
    },
    {
      id: "bank-002",
      holderName: "Sarah Chen",
      bsb: "084-123",
      accountNumber: "87654321",
      accountType: "checking",
      verified: true
    }
  ]
};

// Helper Functions

// T004: Get current user
export function getCurrentUser() {
  return mockData.users[0];
}

// T005: Get portfolio by user ID
export function getPortfolioByUserId(userId) {
  return mockData.portfolios.find(p => p.userId === userId);
}

// T006: Get strategies by IDs
export function getStrategiesByIds(strategyIds) {
  return mockData.strategies.filter(s => strategyIds.includes(s.id));
}

// T006: Get strategy by ID
export function getStrategyById(strategyId) {
  return mockData.strategies.find(s => s.id === strategyId);
}

// T007: Get transactions by user ID
export function getTransactionsByUserId(userId) {
  // In a real app, would filter by userId
  // For mock, return all transactions
  return mockData.transactions;
}

// T007: Get bank accounts by user ID
export function getBankAccountsByUserId(userId) {
  // In a real app, would filter by userId
  // For mock, return all bank accounts
  return mockData.bankAccounts;
}

// Utility: Format currency
export function formatCurrency(amount) {
  // Validate input
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }
  
  // Convert to number if string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Check if valid number
  if (isNaN(numAmount)) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numAmount);
}

// Utility: Format percentage
export function formatPercentage(value) {
  // Validate input
  if (value === null || value === undefined || isNaN(value)) {
    return '0.0%';
  }
  
  // Convert to number if string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check if valid number
  if (isNaN(numValue) || !isFinite(numValue)) {
    return '0.0%';
  }
  
  const sign = numValue >= 0 ? '+' : '';
  return `${sign}${numValue.toFixed(1)}%`;
}

// Utility: Calculate performance change
export function calculatePerformanceChange(performanceHistory, days) {
  // Validate inputs
  if (!performanceHistory || !Array.isArray(performanceHistory) || performanceHistory.length < 2) {
    return 0;
  }

  const latest = performanceHistory[performanceHistory.length - 1]?.value;
  const earlierIndex = Math.max(0, performanceHistory.length - days - 1);
  const earlier = performanceHistory[earlierIndex]?.value;

  // Validate values exist
  if (latest === undefined || latest === null || earlier === undefined || earlier === null) {
    return 0;
  }

  // Prevent division by zero
  if (earlier === 0) {
    return 0;
  }

  const change = ((latest - earlier) / earlier) * 100;
  
  // Validate result
  if (isNaN(change) || !isFinite(change)) {
    return 0;
  }

  return change;
}

// Utility: Safe number formatter
export function safeNumber(value, defaultValue = 0) {
  if (value === null || value === undefined || isNaN(value) || !isFinite(value)) {
    return defaultValue;
  }
  return typeof value === 'string' ? parseFloat(value) : value;
}

// Utility: Safe string formatter
export function safeString(value, defaultValue = '') {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return String(value);
}

// Utility: Get risk level translation key
export function getRiskLevelKey(riskLevel) {
  if (!riskLevel) return 'strategy.riskMedium';
  
  const normalized = String(riskLevel).toLowerCase();
  if (normalized === 'low') return 'strategy.riskLow';
  if (normalized === 'medium') return 'strategy.riskMedium';
  if (normalized === 'high') return 'strategy.riskHigh';
  
  return 'strategy.riskMedium'; // Default fallback
}
