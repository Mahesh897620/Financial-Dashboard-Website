import { Shield, Plane, Car, Home, Plus, Target } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { savingsGoals, type SavingsGoal } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { differenceInDays, parseISO, format } from 'date-fns';

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Plane,
  Car,
  Home,
};

const colorMap: Record<string, { bg: string; text: string; progress: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', progress: 'bg-emerald-500' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', progress: 'bg-cyan-500' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', progress: 'bg-violet-500' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', progress: 'bg-amber-500' },
};

export const SavingsGoals = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Savings Goals</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          <Plus className="h-4 w-4 mr-1" />
          Add Goal
        </Button>
      </div>

      {/* Overall Progress */}
      <div className="glass-subtle rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">Total Progress</p>
          <p className="text-xs font-medium">{overallProgress.toFixed(1)}%</p>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-1000"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-sm font-semibold mt-2">
          {formatCurrency(totalSaved)} <span className="text-muted-foreground font-normal">of {formatCurrency(totalTarget)}</span>
        </p>
      </div>

      <ScrollArea className="h-[260px] -mx-2 px-2">
        <div className="space-y-3">
          {savingsGoals.map((goal) => {
            const Icon = iconMap[goal.icon] || Target;
            const colors = colorMap[goal.color] || colorMap.emerald;
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysRemaining = differenceInDays(parseISO(goal.deadline), new Date());
            const isComplete = progress >= 100;

            return (
              <div
                key={goal.id}
                className={cn(
                  'p-3 rounded-lg transition-all',
                  isComplete ? 'glass-subtle border border-emerald-500/30' : 'glass-subtle'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', colors.bg)}>
                    <Icon className={cn('h-5 w-5', colors.text)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{goal.name}</p>
                      {isComplete && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          Complete!
                        </span>
                      )}
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                        </span>
                        <span className="font-medium">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all duration-1000', colors.progress)}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Deadline passed'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </GlassCard>
  );
};

export default SavingsGoals;
