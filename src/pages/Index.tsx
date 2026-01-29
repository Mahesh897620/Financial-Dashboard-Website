import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { EnhancedStatsCards } from '@/components/dashboard/EnhancedStatsCards';
import { FinancialOverview } from '@/components/dashboard/FinancialOverview';
import { ExpenseBreakdownChart } from '@/components/dashboard/ExpenseBreakdownChart';
import { BudgetTracker } from '@/components/dashboard/BudgetTracker';
import { TransactionsTable } from '@/components/dashboard/TransactionsTable';
import { BillReminders } from '@/components/widgets/BillReminders';
import { SavingsGoals } from '@/components/widgets/SavingsGoals';
import { FinancialInsights } from '@/components/widgets/FinancialInsights';
import { RecurringPayments } from '@/components/widgets/RecurringPayments';
import { InvestmentDashboard } from '@/components/widgets/InvestmentDashboard';
import { CurrencyConverter } from '@/components/widgets/CurrencyConverter';
import { FinancialHealthScore } from '@/components/widgets/FinancialHealthScore';
import { transactions, expenseBreakdownData } from '@/data/mockData';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <WelcomeSection userName="John" />

        {/* Enhanced Stats Cards */}
        <EnhancedStatsCards />

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FinancialOverview />
          <ExpenseBreakdownChart data={expenseBreakdownData} />
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <BillReminders />
          <SavingsGoals />
          <FinancialInsights />
          <RecurringPayments />
        </div>

        {/* Secondary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InvestmentDashboard />
          <BudgetTracker />
          <FinancialHealthScore />
        </div>

        {/* Currency Converter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CurrencyConverter />
          <div className="lg:col-span-2">
            <TransactionsTable transactions={transactions} limit={5} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
