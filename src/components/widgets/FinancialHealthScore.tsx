import { Activity, TrendingUp, ArrowRight, Info } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { CircularProgress } from '@/components/shared/CircularProgress';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { financialHealthScore } from '@/data/mockData';
import { cn } from '@/lib/utils';

const categories = [
  { key: 'savingsRate', label: 'Savings Rate', max: 20, tip: 'Aim for 20%+ of income' },
  { key: 'debtToIncome', label: 'Debt-to-Income', max: 20, tip: 'Keep below 35%' },
  { key: 'emergencyFund', label: 'Emergency Fund', max: 20, tip: '3-6 months expenses' },
  { key: 'spendingDiscipline', label: 'Spending Discipline', max: 20, tip: 'Stay within budget' },
  { key: 'investmentDiversification', label: 'Diversification', max: 20, tip: 'Mix of assets' },
];

export const FinancialHealthScore = () => {
  const score = financialHealthScore.overall;
  
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-emerald-400', colorScheme: 'success' as const };
    if (score >= 60) return { label: 'Good', color: 'text-cyan-400', colorScheme: 'primary' as const };
    if (score >= 40) return { label: 'Fair', color: 'text-amber-400', colorScheme: 'warning' as const };
    return { label: 'Needs Work', color: 'text-rose-400', colorScheme: 'danger' as const };
  };

  const scoreLevel = getScoreLevel(score);

  const getBarColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return 'bg-emerald-500';
    if (percentage >= 60) return 'bg-cyan-500';
    if (percentage >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Financial Health</h3>
        </div>
        <span className={cn('text-sm font-medium', scoreLevel.color)}>
          {scoreLevel.label}
        </span>
      </div>

      {/* Main Score */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <CircularProgress
            value={score}
            max={100}
            size={140}
            strokeWidth={12}
            colorScheme={scoreLevel.colorScheme}
            showValue={false}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{score}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <TooltipProvider>
        <div className="space-y-3">
          {categories.map((category) => {
            const value = financialHealthScore[category.key as keyof typeof financialHealthScore];
            const percentage = (value / category.max) * 100;

            return (
              <div key={category.key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{category.label}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground/50 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="glass-strong">
                        <p className="text-xs">{category.tip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-xs font-medium">{value}/{category.max}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-1000',
                      getBarColor(value, category.max)
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </TooltipProvider>

      {/* Improvement Tip */}
      <div className="mt-4 p-3 rounded-lg glass-subtle">
        <div className="flex items-start gap-2">
          <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium mb-1">Tip to Improve</p>
            <p className="text-xs text-muted-foreground">
              Increase your emergency fund to reach 6 months of expenses for maximum security.
            </p>
          </div>
        </div>
      </div>

      <Button variant="ghost" className="w-full mt-3 text-primary text-sm">
        View Full Report
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </GlassCard>
  );
};

export default FinancialHealthScore;
