import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  LineChart,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedNumber } from '@/components/shared/AnimatedNumber';
import { CircularProgress } from '@/components/shared/CircularProgress';
import { Sparkline } from '@/components/shared/Sparkline';
import { cn } from '@/lib/utils';
import {
  statsData,
  balanceHistory,
  incomeHistory,
  expenseHistory,
  investmentHistory,
} from '@/data/mockData';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  format: 'currency' | 'percentage' | 'number';
  sparklineData?: number[];
  showCircularProgress?: boolean;
  progressValue?: number;
  progressMax?: number;
  delay: number;
  variant?: 'default' | 'gauge';
  gaugeLabel?: string;
}

const StatCard = ({
  title,
  value,
  change,
  icon,
  format,
  sparklineData,
  showCircularProgress,
  progressValue,
  progressMax,
  delay,
  variant = 'default',
  gaugeLabel,
}: StatCardProps) => {
  const isPositive = change >= 0;

  if (variant === 'gauge' && showCircularProgress) {
    return (
      <GlassCard delay={delay} className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full mb-4">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium',
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          )}>
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        
        <CircularProgress
          value={progressValue || 0}
          max={progressMax || 100}
          size={100}
          strokeWidth={8}
          colorScheme={progressValue && progressMax && progressValue / progressMax > 0.7 ? 'success' : 'primary'}
          label={gaugeLabel}
        />
      </GlassCard>
    );
  }

  return (
    <GlassCard delay={delay}>
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl bg-primary/10">
          {icon}
        </div>
        <div className={cn(
          'flex items-center gap-1 text-xs font-medium',
          isPositive ? 'text-emerald-400' : 'text-rose-400'
        )}>
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {Math.abs(change)}%
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <AnimatedNumber
            value={value}
            format={format}
            className="text-2xl font-bold"
          />
        </div>
        
        {sparklineData && (
          <Sparkline
            data={sparklineData}
            width={80}
            height={32}
            color={isPositive ? 'success' : 'danger'}
          />
        )}
      </div>

      {showCircularProgress && progressValue !== undefined && (
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Budget Used</span>
            <span className="font-medium">{progressValue.toFixed(1)}%</span>
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000',
                progressValue < 70 ? 'bg-emerald-500' :
                progressValue < 90 ? 'bg-amber-500' : 'bg-rose-500'
              )}
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            />
          </div>
        </div>
      )}
    </GlassCard>
  );
};

// Credit Score Gauge Card
const CreditScoreCard = ({ delay }: { delay: number }) => {
  const score = statsData.creditScore;
  const maxScore = 850;
  const minScore = 300;
  const percentage = ((score - minScore) / (maxScore - minScore)) * 100;

  const getScoreCategory = (score: number) => {
    if (score >= 750) return { label: 'Excellent', color: 'text-emerald-400' };
    if (score >= 700) return { label: 'Good', color: 'text-cyan-400' };
    if (score >= 650) return { label: 'Fair', color: 'text-amber-400' };
    return { label: 'Poor', color: 'text-rose-400' };
  };

  const category = getScoreCategory(score);

  return (
    <GlassCard delay={delay} className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10">
            <Shield className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="text-sm text-muted-foreground">Credit Score</span>
        </div>
        <span className={cn('text-sm font-medium', category.color)}>
          {category.label}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <CircularProgress
            value={percentage}
            max={100}
            size={120}
            strokeWidth={10}
            colorScheme="gradient"
            showValue={false}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatedNumber
              value={score}
              format="number"
              decimals={0}
              className="text-3xl font-bold"
            />
            <span className="text-xs text-muted-foreground mt-1">/ 850</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export const EnhancedStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        title="Total Balance"
        value={statsData.totalBalance}
        change={statsData.balanceChange}
        icon={<Wallet className="h-5 w-5 text-primary" />}
        format="currency"
        sparklineData={balanceHistory}
        delay={0}
      />

      <StatCard
        title="Monthly Income"
        value={statsData.monthlyIncome}
        change={statsData.incomeChange}
        icon={<TrendingUp className="h-5 w-5 text-emerald-400" />}
        format="currency"
        sparklineData={incomeHistory}
        delay={100}
      />

      <StatCard
        title="Monthly Expenses"
        value={statsData.monthlyExpenses}
        change={statsData.expenseChange}
        icon={<TrendingDown className="h-5 w-5 text-rose-400" />}
        format="currency"
        showCircularProgress
        progressValue={statsData.budgetUsed}
        delay={200}
      />

      <StatCard
        title="Savings Rate"
        value={statsData.savingsRate}
        change={2.1}
        icon={<PiggyBank className="h-5 w-5 text-violet-400" />}
        format="percentage"
        variant="gauge"
        showCircularProgress
        progressValue={statsData.savingsRate}
        progressMax={100}
        gaugeLabel="of income"
        delay={300}
      />

      <StatCard
        title="Investments"
        value={statsData.investmentValue}
        change={statsData.investmentChange}
        icon={<LineChart className="h-5 w-5 text-cyan-400" />}
        format="currency"
        sparklineData={investmentHistory}
        delay={400}
      />

      <CreditScoreCard delay={500} />
    </div>
  );
};

export default EnhancedStatsCards;
