// T030: Internationalization (i18n) Module
// Supports English (en) and Simplified Chinese (zh)

export const translations = {
  en: {
    // Common
    'common.back': 'Back',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',

    // App Navigation
    'app.name': 'Quant Invest Platform',
    'nav.dashboard': 'Dashboard',
    'nav.allocate': 'Allocate Funds',
    'nav.history': 'Transaction History',
    'nav.settings': 'Settings',

    // Authentication
    'auth.appName': 'Quant Invest',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.login': 'Log In',
    'auth.register': 'Create Account',
    'auth.noAccount': "Don't have an account?",
    'auth.forgotPassword': 'Forgot Password?',
    'auth.confirmPassword': 'Confirm Password',
    'auth.termsAccept': 'I accept the Terms of Service',
    'auth.kycTitle': 'Identity Verification',
    'auth.kycPending': 'Your documents are being reviewed',
    'auth.kycApproved': 'Verification complete!',
    'auth.kycRejected': 'Verification failed. Please resubmit.',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.totalPortfolio': 'Total Portfolio Value',
    'dashboard.yourStrategies': 'Your Strategies',
    'dashboard.noStrategies': "You haven't allocated to any strategies yet.",
    'dashboard.allocateFunds': 'Allocate Funds',
    'dashboard.deposit': 'Deposit Funds',
    'dashboard.kycPending': 'Your KYC verification is pending. Banking features are restricted.',
    'dashboard.complianceUpdate': 'New compliance regulations: Please review your account settings.',

    // Strategy Details
    'strategy.totalReturn': 'Total Return',
    'strategy.annualizedReturn': 'Annualized Return',
    'strategy.sinceInception': 'Since Inception',
    'strategy.volatility': 'Volatility',
    'strategy.sharpeRatio': 'Sharpe Ratio',
    'strategy.maxDrawdown': 'Max Drawdown',
    'strategy.riskLevel': 'Risk Level',
    'strategy.minimumInvestment': 'Minimum Investment',
    'strategy.currentAllocation': 'Current Allocation',
    'strategy.riskLow': 'Low',
    'strategy.riskMedium': 'Medium',
    'strategy.riskHigh': 'High',
    'strategy.drawdownChart': 'Historical Drawdown',
    'strategy.allocationHistory': 'Allocation History',
    'strategy.date': 'Date',
    'strategy.action': 'Action',
    'strategy.amount': 'Amount',
    'strategy.balance': 'Balance',
    'strategy.allocated': 'Allocated',
    'strategy.withdrawn': 'Withdrawn',

    // Allocate Funds
    'allocate.selectStrategy': 'Select Strategy',
    'allocate.enterAmount': 'Enter Amount',
    'allocate.confirm': 'Confirm',
    'allocate.selectStrategyTitle': 'Choose a strategy to invest in',
    'allocate.amountLabel': 'How much would you like to allocate?',
    'allocate.available': 'Available',
    'allocate.next': 'Next',
    'allocate.confirmTitle': 'Confirm Your Allocation',
    'allocate.strategy': 'Strategy',
    'allocate.amount': 'Amount',
    'allocate.confirmWarning': 'This action will allocate funds to the selected strategy.',
    'allocate.confirmAllocation': 'Confirm Allocation',
    'allocate.success': 'Allocation successful!',
    'allocate.errorInsufficientFunds': 'Insufficient funds. Please deposit more or enter a smaller amount.',
    'allocate.viewDetails': 'View detailed strategy information',

    // Transaction History
    'history.title': 'Transaction History',
    'history.dateFrom': 'From Date',
    'history.dateTo': 'To Date',
    'history.allTypes': 'All Types',
    'history.deposits': 'Deposits',
    'history.withdrawals': 'Withdrawals',
    'history.allocations': 'Allocations',
    'history.export': 'Export CSV',
    'history.date': 'Date',
    'history.type': 'Type',
    'history.amount': 'Amount',
    'history.status': 'Status',
    'history.pending': 'Pending',
    'history.completed': 'Completed',
    'history.failed': 'Failed',
    'history.noTransactions': 'No transactions to display.',

    // Settings
    'settings.title': 'Account Settings',
    'settings.profile': 'Profile',
    'settings.security': 'Security & 2FA',
    'settings.banks': 'Bank Accounts',
    'settings.name': 'Full Name',
    'settings.email': 'Email Address',
    'settings.phone': 'Phone Number',
    'settings.language': 'Language Preference',
    'settings.twoFactorEnabled': 'Two-Factor Authentication Enabled',
    'settings.enable2FA': 'Enable 2FA',
    'settings.disable2FA': 'Disable 2FA',
    'settings.changePassword': 'Change Password',
    'settings.linkedAccounts': 'Linked Bank Accounts',
    'settings.addBankAccount': 'Add New Account',
    'settings.accountType': 'Account Type',
    'settings.savings': 'Savings',
    'settings.checking': 'Checking',

    // Banking
    'banking.depositTitle': 'Deposit Funds (AUD)',
    'banking.withdrawTitle': 'Withdraw Funds (AUD)',
    'banking.instructions': 'Bank Transfer Instructions',
    'banking.bsb': 'BSB',
    'banking.accountNumber': 'Account Number',
    'banking.reference': 'Reference Code',
    'banking.transferComplete': 'I have completed the transfer',
    'banking.withdrawAmount': 'Amount to Withdraw',
    'banking.selectAccount': 'Select Bank Account',
    'banking.processingTime': 'Estimated processing time: 1-3 business days',
    'banking.confirmDeposit': 'Confirm Deposit',
    'banking.confirmWithdraw': 'Confirm Withdrawal',

    // Gallery
    'gallery.title': 'All Screens Gallery',
    'gallery.subtitle': 'Quant Invest',
    'gallery.screensCount': 'Displaying all 15 wireframe screens | iPhone 14/15 Pro mockups',
    'gallery.singleView': 'Single View',
    'gallery.languageChanged': 'Language changed',
    'banking.depositSuccess': 'Deposit request submitted!',
    'banking.withdrawSuccess': 'Withdrawal request submitted!'
  },
  zh: {
    // Common
    'common.back': '返回',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.save': '保存',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.loading': '加载中...',
    'common.error': '发生错误',

    // App Navigation
    'app.name': '量化投资平台',
    'nav.dashboard': '仪表板',
    'nav.allocate': '分配资金',
    'nav.history': '交易历史',
    'nav.settings': '设置',

    // Authentication
    'auth.appName': '量化投资',
    'auth.email': '电子邮件地址',
    'auth.password': '密码',
    'auth.login': '登录',
    'auth.register': '创建账户',
    'auth.noAccount': '还没有账户?',
    'auth.forgotPassword': '忘记密码?',
    'auth.confirmPassword': '确认密码',
    'auth.termsAccept': '我接受服务条款',
    'auth.kycTitle': '身份验证',
    'auth.kycPending': '您的文件正在审核中',
    'auth.kycApproved': '验证完成!',
    'auth.kycRejected': '验证失败。请重新提交。',

    // Dashboard
    'dashboard.title': '仪表板',
    'dashboard.totalPortfolio': '总投资组合价值',
    'dashboard.yourStrategies': '您的策略',
    'dashboard.noStrategies': '您还没有分配任何策略。',
    'dashboard.allocateFunds': '分配资金',
    'dashboard.deposit': '存入资金',
    'dashboard.kycPending': '您的KYC验证待处理。银行功能受限。',
    'dashboard.complianceUpdate': '新合规法规:请查看您的账户设置。',

    // Strategy Details
    'strategy.totalReturn': '总回报',
    'strategy.annualizedReturn': '年化回报',
    'strategy.sinceInception': '自成立以来',
    'strategy.volatility': '波动率',
    'strategy.sharpeRatio': '夏普比率',
    'strategy.maxDrawdown': '最大回撤',
    'strategy.riskLevel': '风险等级',
    'strategy.minimumInvestment': '最低投资额',
    'strategy.currentAllocation': '当前分配',
    'strategy.riskLow': '低',
    'strategy.riskMedium': '中',
    'strategy.riskHigh': '高',
    'strategy.drawdownChart': '历史回撤',
    'strategy.allocationHistory': '分配历史',
    'strategy.date': '日期',
    'strategy.action': '操作',
    'strategy.amount': '金额',
    'strategy.balance': '余额',
    'strategy.allocated': '已分配',
    'strategy.withdrawn': '已提取',

    // Allocate Funds
    'allocate.selectStrategy': '选择策略',
    'allocate.enterAmount': '输入金额',
    'allocate.confirm': '确认',
    'allocate.selectStrategyTitle': '选择投资策略',
    'allocate.amountLabel': '您想分配多少资金?',
    'allocate.available': '可用',
    'allocate.next': '下一步',
    'allocate.confirmTitle': '确认您的分配',
    'allocate.strategy': '策略',
    'allocate.amount': '金额',
    'allocate.confirmWarning': '此操作将把资金分配给所选策略。',
    'allocate.confirmAllocation': '确认分配',
    'allocate.success': '分配成功!',
    'allocate.errorInsufficientFunds': '资金不足。请存入更多资金或输入较小的金额。',
    'allocate.viewDetails': '查看详细策略信息',

    // Transaction History
    'history.title': '交易历史',
    'history.dateFrom': '起始日期',
    'history.dateTo': '结束日期',
    'history.allTypes': '所有类型',
    'history.deposits': '存款',
    'history.withdrawals': '提款',
    'history.allocations': '分配',
    'history.export': '导出CSV',
    'history.date': '日期',
    'history.type': '类型',
    'history.amount': '金额',
    'history.status': '状态',
    'history.pending': '待处理',
    'history.completed': '已完成',
    'history.failed': '失败',
    'history.noTransactions': '没有可显示的交易。',

    // Settings
    'settings.title': '账户设置',
    'settings.profile': '个人资料',
    'settings.security': '安全与2FA',
    'settings.banks': '银行账户',
    'settings.name': '全名',
    'settings.email': '电子邮件地址',
    'settings.phone': '电话号码',
    'settings.language': '语言偏好',
    'settings.twoFactorEnabled': '已启用双因素认证',
    'settings.enable2FA': '启用2FA',
    'settings.disable2FA': '禁用2FA',
    'settings.changePassword': '更改密码',
    'settings.linkedAccounts': '已关联的银行账户',
    'settings.addBankAccount': '添加新账户',
    'settings.accountType': '账户类型',
    'settings.savings': '储蓄',
    'settings.checking': '支票',

    // Banking
    'banking.depositTitle': '存入资金 (AUD)',
    'banking.withdrawTitle': '提取资金 (AUD)',
    'banking.instructions': '银行转账说明',
    'banking.bsb': 'BSB代码',
    'banking.accountNumber': '账户号码',
    'banking.reference': '参考代码',
    'banking.transferComplete': '我已完成转账',
    'banking.withdrawAmount': '提取金额',
    'banking.selectAccount': '选择银行账户',
    'banking.processingTime': '预计处理时间:1-3个工作日',
    'banking.confirmDeposit': '确认存款',
    'banking.confirmWithdraw': '确认提款',
    'banking.depositSuccess': '存款请求已提交!',
    'banking.withdrawSuccess': '提款请求已提交!',

    // Gallery
    'gallery.title': '全部屏幕画廊',
    'gallery.subtitle': '量化投资',
    'gallery.screensCount': '显示全部15个线框屏幕 | iPhone 14/15 Pro 模型',
    'gallery.singleView': '单屏视图',
    'gallery.languageChanged': '语言已切换'
  }
};

// Get translation function
export function t(key) {
  const lang = localStorage.getItem('lang') || 'en';
  return translations[lang][key] || key;
}

// Set language
export function setLang(lang) {
  localStorage.setItem('lang', lang);
  window.dispatchEvent(new Event('languagechange'));
}

// Get current language
export function getLang() {
  return localStorage.getItem('lang') || 'en';
}
