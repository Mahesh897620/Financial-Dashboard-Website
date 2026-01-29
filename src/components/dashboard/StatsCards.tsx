import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { StatsData } from '@/data/mockData';

interface StatsCardsProps {
  data: StatsData;
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  iconBgClass: string;
  delay: number;
}

const StatCard = ({ title, value, change, icon, iconBgClass, delay }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card 
      className="card-hover animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className={cn('p-3 rounded-xl', iconBgClass)}>
            {icon}
          </div>
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          )}>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const StatsCards = ({ data }: StatsCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Balance',
      value: formatCurrency(data.totalBalance),
      change: data.balanceChange,
      icon: <Wallet className="h-6 w-6 text-primary" />,
      iconBgClass: 'bg-primary/10',
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(data.monthlyIncome),
      change: data.incomeChange,
      icon: <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      iconBgClass: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      title: 'Monthly Expenses',
      value: formatCurrency(data.monthlyExpenses),
      change: data.expenseChange,
      icon: <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />,
      iconBgClass: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      title: 'Savings Rate',
      value: `${data.savingsRate}%`,
      change: 2.1,
      icon: <PiggyBank className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
      iconBgClass: 'bg-violet-100 dark:bg-violet-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          {...stat}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default StatsCards;
