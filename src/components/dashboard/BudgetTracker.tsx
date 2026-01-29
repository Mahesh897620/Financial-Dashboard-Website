import { UtensilsCrossed, Car, ShoppingBag, Receipt, Film, MoreHorizontal } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { budgetCategories, type BudgetCategory } from '@/data/mockData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  MoreHorizontal,
};

export const BudgetTracker = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return 'bg-rose-500';
    if (percentage > 80) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStatusText = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return 'Over budget';
    if (percentage > 80) return 'Near limit';
    return 'On track';
  };

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Budget Tracker</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}
        </span>
      </div>

      <div className="space-y-4">
        {budgetCategories.map((category) => {
          const Icon = iconMap[category.icon] || MoreHorizontal;
          const percentage = Math.min((category.spent / category.budget) * 100, 100);
          const isOverBudget = category.spent > category.budget;

          return (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: category.color }} />
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'text-sm font-medium',
                    isOverBudget && 'text-rose-400'
                  )}>
                    {formatCurrency(category.spent)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    of {formatCurrency(category.budget)}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-1000',
                      getStatusColor(category.spent, category.budget)
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {isOverBudget && (
                  <div
                    className="absolute top-0 h-2 bg-rose-500/30 rounded-full"
                    style={{
                      left: '100%',
                      width: `${Math.min((category.spent - category.budget) / category.budget * 100, 30)}%`,
                    }}
                  />
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className={cn(
                  getStatusColor(category.spent, category.budget) === 'bg-emerald-500' ? 'text-emerald-400' :
                  getStatusColor(category.spent, category.budget) === 'bg-amber-500' ? 'text-amber-400' :
                  'text-rose-400'
                )}>
                  {getStatusText(category.spent, category.budget)}
                </span>
                <span className="text-muted-foreground">
                  {isOverBudget
                    ? `$${(category.spent - category.budget).toFixed(0)} over`
                    : `$${(category.budget - category.spent).toFixed(0)} left`
                  }
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default BudgetTracker;
