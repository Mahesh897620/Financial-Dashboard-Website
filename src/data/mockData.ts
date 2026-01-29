// Extended mock data for premium financial dashboard

export type TransactionCategory = 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Entertainment' | 'Other' | 'Salary' | 'Freelance' | 'Investment';
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'bank' | 'cash' | 'crypto' | 'paypal';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
}

export interface StatsData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  balanceChange: number;
  incomeChange: number;
  expenseChange: number;
  investmentValue: number;
  investmentChange: number;
  creditScore: number;
  budgetUsed: number;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  isAutoPay: boolean;
  category: string;
  isOverdue: boolean;
  icon: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  nextBilling: string;
  icon: string;
  category: string;
  color: string;
}

export interface Investment {
  id: string;
  name: string;
  symbol: string;
  type: 'stock' | 'bond' | 'crypto' | 'real_estate' | 'etf';
  value: number;
  change24h: number;
  quantity: number;
  color: string;
}

export interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'alert';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface FinancialInsight {
  id: string;
  type: 'tip' | 'warning' | 'achievement' | 'alert';
  title: string;
  description: string;
  icon: string;
}

export interface FinancialHealthScore {
  overall: number;
  savingsRate: number;
  debtToIncome: number;
  emergencyFund: number;
  spendingDiscipline: number;
  investmentDiversification: number;
}

export interface BudgetCategory {
  name: string;
  budget: number;
  spent: number;
  color: string;
  icon: string;
}

// Stats data
export const statsData: StatsData = {
  totalBalance: 24563.00,
  monthlyIncome: 8350.00,
  monthlyExpenses: 3280.00,
  savingsRate: 60.7,
  balanceChange: 12.5,
  incomeChange: 8.2,
  expenseChange: -5.3,
  investmentValue: 45230.00,
  investmentChange: 3.8,
  creditScore: 742,
  budgetUsed: 67.3,
};

// Balance history for sparkline (last 7 days)
export const balanceHistory = [22100, 22450, 23100, 22800, 23500, 24100, 24563];
export const incomeHistory = [7800, 8100, 7500, 8000, 8200, 8100, 8350];
export const expenseHistory = [3100, 3400, 3200, 3600, 3100, 3400, 3280];
export const investmentHistory = [42000, 43200, 44100, 43800, 44500, 45000, 45230];

// Transactions
export const transactions: Transaction[] = [
  {
    id: '1',
    date: '2026-01-23',
    description: 'Salary Deposit',
    category: 'Salary',
    amount: 5500.00,
    type: 'income',
    status: 'completed',
    paymentMethod: 'bank',
  },
  {
    id: '2',
    date: '2026-01-22',
    description: 'Grocery Shopping',
    category: 'Food',
    amount: 156.32,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'card',
  },
  {
    id: '3',
    date: '2026-01-21',
    description: 'Uber Ride',
    category: 'Transport',
    amount: 24.50,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'card',
  },
  {
    id: '4',
    date: '2026-01-21',
    description: 'Freelance Project',
    category: 'Freelance',
    amount: 1200.00,
    type: 'income',
    status: 'pending',
    paymentMethod: 'paypal',
  },
  {
    id: '5',
    date: '2026-01-20',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 15.99,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'card',
  },
  {
    id: '6',
    date: '2026-01-20',
    description: 'Electric Bill',
    category: 'Bills',
    amount: 145.00,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'bank',
  },
  {
    id: '7',
    date: '2026-01-19',
    description: 'Amazon Purchase',
    category: 'Shopping',
    amount: 89.99,
    type: 'expense',
    status: 'refunded',
    paymentMethod: 'card',
  },
  {
    id: '8',
    date: '2026-01-18',
    description: 'Restaurant Dinner',
    category: 'Food',
    amount: 67.50,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'card',
  },
  {
    id: '9',
    date: '2026-01-17',
    description: 'Gas Station',
    category: 'Transport',
    amount: 55.00,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'card',
  },
  {
    id: '10',
    date: '2026-01-16',
    description: 'Consulting Fee',
    category: 'Freelance',
    amount: 850.00,
    type: 'income',
    status: 'failed',
    paymentMethod: 'bank',
  },
  {
    id: '11',
    date: '2026-01-15',
    description: 'Internet Bill',
    category: 'Bills',
    amount: 79.99,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'bank',
  },
  {
    id: '12',
    date: '2026-01-14',
    description: 'Coffee Shop',
    category: 'Food',
    amount: 12.50,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'card',
  },
  {
    id: '13',
    date: '2026-01-13',
    description: 'Bitcoin Purchase',
    category: 'Investment',
    amount: 500.00,
    type: 'expense',
    status: 'completed',
    paymentMethod: 'crypto',
  },
  {
    id: '14',
    date: '2026-01-12',
    description: 'Dividend Payment',
    category: 'Investment',
    amount: 125.00,
    type: 'income',
    status: 'completed',
    paymentMethod: 'bank',
  },
];

// Monthly chart data
export const monthlyChartData = [
  { month: 'Aug', income: 7200, expenses: 3100 },
  { month: 'Sep', income: 7800, expenses: 3400 },
  { month: 'Oct', income: 8100, expenses: 3200 },
  { month: 'Nov', income: 7500, expenses: 3600 },
  { month: 'Dec', income: 8900, expenses: 4200 },
  { month: 'Jan', income: 8350, expenses: 3280 },
];

// Expense breakdown
export const expenseBreakdownData = [
  { name: 'Food', value: 580, color: 'hsl(38, 92%, 50%)' },
  { name: 'Transport', value: 320, color: 'hsl(239, 84%, 67%)' },
  { name: 'Shopping', value: 450, color: 'hsl(270, 70%, 60%)' },
  { name: 'Bills', value: 680, color: 'hsl(187, 94%, 43%)' },
  { name: 'Entertainment', value: 280, color: 'hsl(330, 81%, 60%)' },
  { name: 'Other', value: 970, color: 'hsl(215, 20%, 65%)' },
];

// Bills
export const bills: Bill[] = [
  { id: '1', name: 'Rent', amount: 1500, dueDate: '2026-01-31', isAutoPay: true, category: 'Housing', isOverdue: false, icon: 'Home' },
  { id: '2', name: 'Electric Bill', amount: 145, dueDate: '2026-01-27', isAutoPay: false, category: 'Utilities', isOverdue: false, icon: 'Zap' },
  { id: '3', name: 'Internet', amount: 79.99, dueDate: '2026-01-25', isAutoPay: true, category: 'Utilities', isOverdue: false, icon: 'Wifi' },
  { id: '4', name: 'Phone Bill', amount: 85, dueDate: '2026-01-28', isAutoPay: true, category: 'Utilities', isOverdue: false, icon: 'Smartphone' },
  { id: '5', name: 'Car Insurance', amount: 120, dueDate: '2026-01-22', isAutoPay: false, category: 'Insurance', isOverdue: true, icon: 'Car' },
  { id: '6', name: 'Gym Membership', amount: 49.99, dueDate: '2026-02-01', isAutoPay: true, category: 'Health', isOverdue: false, icon: 'Dumbbell' },
];

// Savings Goals
export const savingsGoals: SavingsGoal[] = [
  { id: '1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 7500, deadline: '2026-06-01', icon: 'Shield', color: 'emerald' },
  { id: '2', name: 'Vacation', targetAmount: 5000, currentAmount: 3200, deadline: '2026-08-15', icon: 'Plane', color: 'cyan' },
  { id: '3', name: 'New Car', targetAmount: 25000, currentAmount: 8500, deadline: '2027-01-01', icon: 'Car', color: 'violet' },
  { id: '4', name: 'Home Down Payment', targetAmount: 50000, currentAmount: 12000, deadline: '2028-01-01', icon: 'Home', color: 'amber' },
];

// Subscriptions
export const subscriptions: Subscription[] = [
  { id: '1', name: 'Netflix', amount: 15.99, billingCycle: 'monthly', nextBilling: '2026-02-20', icon: 'Tv', category: 'Entertainment', color: '#E50914' },
  { id: '2', name: 'Spotify', amount: 9.99, billingCycle: 'monthly', nextBilling: '2026-02-15', icon: 'Music', category: 'Entertainment', color: '#1DB954' },
  { id: '3', name: 'Adobe CC', amount: 54.99, billingCycle: 'monthly', nextBilling: '2026-02-10', icon: 'Palette', category: 'Productivity', color: '#FF0000' },
  { id: '4', name: 'iCloud', amount: 2.99, billingCycle: 'monthly', nextBilling: '2026-02-05', icon: 'Cloud', category: 'Storage', color: '#3B82F6' },
  { id: '5', name: 'GitHub Pro', amount: 48, billingCycle: 'yearly', nextBilling: '2026-05-01', icon: 'Code', category: 'Development', color: '#333333' },
  { id: '6', name: 'ChatGPT Plus', amount: 20, billingCycle: 'monthly', nextBilling: '2026-02-18', icon: 'Bot', category: 'AI', color: '#10A37F' },
];

// Investments
export const investments: Investment[] = [
  { id: '1', name: 'Apple Inc', symbol: 'AAPL', type: 'stock', value: 12500, change24h: 2.3, quantity: 50, color: '#A3AAAE' },
  { id: '2', name: 'Bitcoin', symbol: 'BTC', type: 'crypto', value: 8200, change24h: -1.5, quantity: 0.2, color: '#F7931A' },
  { id: '3', name: 'S&P 500 ETF', symbol: 'SPY', type: 'etf', value: 15000, change24h: 0.8, quantity: 30, color: '#3B82F6' },
  { id: '4', name: 'Ethereum', symbol: 'ETH', type: 'crypto', value: 4500, change24h: 3.2, quantity: 2, color: '#627EEA' },
  { id: '5', name: 'Treasury Bonds', symbol: 'TLT', type: 'bond', value: 5030, change24h: -0.2, quantity: 50, color: '#10B981' },
];

// Notifications
export const notifications: Notification[] = [
  { id: '1', type: 'warning', title: 'Budget Alert', message: 'Food budget is 90% used', time: '5m ago', isRead: false },
  { id: '2', type: 'info', title: 'Bill Due Soon', message: 'Electric bill due in 3 days', time: '1h ago', isRead: false },
  { id: '3', type: 'success', title: 'Goal Progress', message: 'Emergency fund is 75% complete!', time: '2h ago', isRead: false },
  { id: '4', type: 'alert', title: 'Large Transaction', message: '$850 withdrawal detected', time: '1d ago', isRead: true },
  { id: '5', type: 'success', title: 'Payment Received', message: 'Salary of $5,500 deposited', time: '1d ago', isRead: true },
  { id: '6', type: 'info', title: 'Investment Update', message: 'AAPL is up 2.3% today', time: '2d ago', isRead: true },
];

// Financial Insights
export const financialInsights: FinancialInsight[] = [
  { id: '1', type: 'warning', title: 'Dining Spending Up', description: 'You spent 23% more on dining out compared to last month. Consider cooking at home more often.', icon: 'TrendingUp' },
  { id: '2', type: 'achievement', title: 'Great Savings!', description: 'Your savings rate of 60.7% is excellent. Keep up the good work!', icon: 'Trophy' },
  { id: '3', type: 'tip', title: 'Switch to Annual', description: 'Switching Netflix to annual billing could save you $24 per year.', icon: 'Lightbulb' },
  { id: '4', type: 'alert', title: 'Unusual Activity', description: 'We detected an unusually large transaction of $850 yesterday.', icon: 'AlertTriangle' },
];

// Financial Health Score
export const financialHealthScore: FinancialHealthScore = {
  overall: 78,
  savingsRate: 18, // out of 20
  debtToIncome: 15, // out of 20
  emergencyFund: 14, // out of 20
  spendingDiscipline: 16, // out of 20
  investmentDiversification: 15, // out of 20
};

// Budget Categories
export const budgetCategories: BudgetCategory[] = [
  { name: 'Food', budget: 600, spent: 580, color: 'hsl(38, 92%, 50%)', icon: 'UtensilsCrossed' },
  { name: 'Transport', budget: 400, spent: 320, color: 'hsl(239, 84%, 67%)', icon: 'Car' },
  { name: 'Shopping', budget: 300, spent: 450, color: 'hsl(270, 70%, 60%)', icon: 'ShoppingBag' },
  { name: 'Bills', budget: 800, spent: 680, color: 'hsl(187, 94%, 43%)', icon: 'Receipt' },
  { name: 'Entertainment', budget: 200, spent: 280, color: 'hsl(330, 81%, 60%)', icon: 'Film' },
  { name: 'Other', budget: 500, spent: 970, color: 'hsl(215, 20%, 65%)', icon: 'MoreHorizontal' },
];

// Currency exchange rates (mock)
export const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 148.50,
  CAD: 1.35,
  AUD: 1.53,
  BTC: 0.000024,
  ETH: 0.00042,
};

// Helper function
export const getCategoryColor = (category: TransactionCategory): string => {
  const colors: Record<TransactionCategory, string> = {
    Food: 'hsl(38, 92%, 50%)',
    Transport: 'hsl(239, 84%, 67%)',
    Shopping: 'hsl(270, 70%, 60%)',
    Bills: 'hsl(187, 94%, 43%)',
    Entertainment: 'hsl(330, 81%, 60%)',
    Other: 'hsl(215, 20%, 65%)',
    Salary: 'hsl(160, 84%, 39%)',
    Freelance: 'hsl(270, 70%, 60%)',
    Investment: 'hsl(239, 84%, 67%)',
  };
  return colors[category];
};
