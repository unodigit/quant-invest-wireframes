// T031-T034: Interactions and Event Handlers

import { mockData, getCurrentUser, getPortfolioByUserId, formatCurrency, safeNumber, safeString } from './data.js';

// T031: Navigation and hash routing
export function navigateTo(route) {
  window.location.hash = route;
}

export function getRouteParam(paramName) {
  const hash = window.location.hash;
  const match = hash.match(new RegExp(`${paramName}/([^/]+)`));
  return match ? match[1] : null;
}

// T032: Form handlers (login, register, allocation)
export function handleLogin(event) {
  event.preventDefault();
  const email = event.target.querySelector('[type="email"]').value;
  const password = event.target.querySelector('[type="password"]').value;

  // Mock validation
  if (email && password) {
    navigateTo('#/dashboard');
  } else {
    alert('Please enter email and password');
  }
}

export function handleRegister(event) {
  event.preventDefault();
  const email = event.target.querySelector('[name="email"]').value;
  const password = event.target.querySelector('[name="password"]').value;
  const confirmPassword = event.target.querySelector('[name="confirmPassword"]').value;
  const termsAccepted = event.target.querySelector('[name="terms"]').checked;

  if (!termsAccepted) {
    alert('You must accept the terms of service');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  navigateTo('#/kyc');
}

export function selectStrategy(strategyId) {
  sessionStorage.setItem('selectedStrategy', strategyId);
  navigateTo('#/allocate/amount');
}

export function proceedToConfirm(event) {
  event.preventDefault();
  const amount = parseFloat(event.target.querySelector('[name="amount"]').value);
  const user = getCurrentUser();
  const portfolio = getPortfolioByUserId(user.id);
  const availableBalance = portfolio.totalValueAUD -
    portfolio.strategies.reduce((sum, sid) => {
      const strategy = mockData.strategies.find(s => s.id === sid);
      return sum + (strategy?.allocatedAmount || 0);
    }, 0);

  if (amount > availableBalance) {
    alert(`Insufficient funds. Available: ${formatCurrency(availableBalance)}`);
    return;
  }

  sessionStorage.setItem('allocationAmount', amount.toString());
  navigateTo('#/allocate/confirm');
}

export function submitAllocation() {
  const strategyId = sessionStorage.getItem('selectedStrategy');
  const amount = parseFloat(sessionStorage.getItem('allocationAmount'));

  // Create new transaction
  const newTransaction = {
    id: `txn-${Date.now()}`,
    date: new Date().toISOString(),
    type: 'allocation',
    amount: amount,
    status: 'completed',
    strategyId: strategyId,
    reference: null
  };

  mockData.transactions.unshift(newTransaction);

  // Update strategy allocated amount
  const strategy = mockData.strategies.find(s => s.id === strategyId);
  if (strategy) {
    strategy.allocatedAmount += amount;
    strategy.allocationHistory.push({
      date: new Date().toISOString(),
      action: 'allocated',
      amount: amount,
      balance: strategy.allocatedAmount
    });
  }

  // Clear session storage
  sessionStorage.removeItem('selectedStrategy');
  sessionStorage.removeItem('allocationAmount');

  // Show success and navigate
  alert('Allocation successful!');
  navigateTo('#/dashboard');
}

// T033: Banking and settings handlers
export function confirmDeposit() {
  const newTransaction = {
    id: `txn-${Date.now()}`,
    date: new Date().toISOString(),
    type: 'deposit',
    amount: 0, // Would be entered by user
    status: 'pending',
    strategyId: null,
    reference: `INV${Date.now()}`
  };

  mockData.transactions.unshift(newTransaction);
  alert('Deposit request submitted!');
  navigateTo('#/dashboard');
}

export function confirmWithdrawal(amount, bankAccountId) {
  const user = getCurrentUser();
  const portfolio = getPortfolioByUserId(user.id);

  if (amount > portfolio.totalValueAUD) {
    alert('Insufficient funds');
    return;
  }

  const newTransaction = {
    id: `txn-${Date.now()}`,
    date: new Date().toISOString(),
    type: 'withdrawal',
    amount: amount,
    status: 'pending',
    strategyId: null,
    reference: bankAccountId
  };

  mockData.transactions.unshift(newTransaction);
  alert('Withdrawal request submitted!');
  navigateTo('#/dashboard');
}

export function saveProfile(event) {
  event.preventDefault();
  const user = getCurrentUser();
  const formData = new FormData(event.target);

  user.name = formData.get('name');
  user.email = formData.get('email');
  user.phone = formData.get('phone');
  user.language = formData.get('language');

  alert('Profile updated successfully!');
}

export function toggleTwoFactor() {
  const user = getCurrentUser();
  user.twoFactorEnabled = !user.twoFactorEnabled;
  alert(`2FA ${user.twoFactorEnabled ? 'enabled' : 'disabled'} successfully!`);
  location.reload();
}

export function addBankAccount(bankData) {
  const newAccount = {
    id: `bank-${Date.now()}`,
    ...bankData,
    verified: false
  };
  mockData.bankAccounts.push(newAccount);
  alert('Bank account added! Verification pending.');
  location.reload();
}

// T034: Chart interaction handlers
export function updateChartPeriod(period) {
  // This function would update the Chart.js instance
  // Implementation depends on chart initialization in the screen
  console.log('Update chart period:', period);
}

export function openDetailDrawer(transaction) {
  const drawer = document.getElementById('detail-drawer');
  if (!drawer) return;

  // Populate drawer with transaction details
  drawer.innerHTML = `
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-primary">Transaction Details</h3>
        <button onclick="closeDetailDrawer()" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <dl class="space-y-3">
        <div><dt class="text-sm font-medium text-gray-600">ID</dt><dd class="text-sm text-gray-900">${safeString(transaction.id, 'N/A')}</dd></div>
        <div><dt class="text-sm font-medium text-gray-600">Date</dt><dd class="text-sm text-gray-900">${transaction.date ? new Date(transaction.date).toLocaleString() : 'N/A'}</dd></div>
        <div><dt class="text-sm font-medium text-gray-600">Type</dt><dd class="text-sm text-gray-900">${safeString(transaction.type, 'N/A')}</dd></div>
        <div><dt class="text-sm font-medium text-gray-600">Amount</dt><dd class="text-sm text-gray-900">${formatCurrency(transaction.amount)} AUD</dd></div>
        <div><dt class="text-sm font-medium text-gray-600">Status</dt><dd class="text-sm text-gray-900">${safeString(transaction.status, 'N/A')}</dd></div>
      </dl>
    </div>
  `;

  drawer.classList.remove('translate-x-full');
  drawer.classList.add('translate-x-0');
  drawer.setAttribute('aria-hidden', 'false');
}

export function closeDetailDrawer() {
  const drawer = document.getElementById('detail-drawer');
  if (!drawer) return;

  drawer.classList.remove('translate-x-0');
  drawer.classList.add('translate-x-full');
  drawer.setAttribute('aria-hidden', 'true');
}

// Make functions globally available
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.selectStrategy = selectStrategy;
window.proceedToConfirm = proceedToConfirm;
window.submitAllocation = submitAllocation;
window.confirmDeposit = confirmDeposit;
window.confirmWithdrawal = confirmWithdrawal;
window.saveProfile = saveProfile;
window.toggleTwoFactor = toggleTwoFactor;
window.addBankAccount = addBankAccount;
window.updateChartPeriod = updateChartPeriod;
window.openDetailDrawer = openDetailDrawer;
window.closeDetailDrawer = closeDetailDrawer;
