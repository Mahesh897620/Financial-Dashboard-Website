import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/shared/GlassCard';
import { BudgetTracker } from '@/components/dashboard/BudgetTracker';
import { AnimatedNumber } from '@/components/shared/AnimatedNumber';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { budgetCategories, statsData } from '@/data/mockData';
import {
  Wallet,
  Plus,
  TrendingUp,
  TrendingDown,
  Target,
  Settings,
  PieChart,
} from 'lucide-react';

const Budget = () => {
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudget - totalSpent;
  const percentUsed = (totalSpent / totalBudget) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Budget Planner</h1>
            <p className="text-muted-foreground">Track and manage your monthly budgets</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="glass-subtle">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button className="gradient-primary text-white border-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <AnimatedNumber
                  value={totalBudget}
                  format="currency"
                  className="text-xl font-bold"
                />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-rose-500/10">
                <TrendingDown className="h-5 w-5 text-rose-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <AnimatedNumber
                  value={totalSpent}
                  format="currency"
                  className="text-xl font-bold"
                />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <AnimatedNumber
                  value={remaining}
                  format="currency"
                  className="text-xl font-bold"
                />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-violet-500/10">
                <Target className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget Used</p>
                <AnimatedNumber
                  value={percentUsed}
                  format="percentage"
                  decimals={1}
                  className="text-xl font-bold"
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Overall Progress */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Monthly Overview</h3>
            </div>
            <span className="text-sm text-muted-foreground">January 2026</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Budget Progress</span>
              <span className="font-medium">{percentUsed.toFixed(1)}%</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  percentUsed < 70 ? 'bg-emerald-500' :
                  percentUsed < 90 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              You've spent ${totalSpent.toFixed(0)} of your ${totalBudget.toFixed(0)} monthly budget
            </p>
          </div>
        </GlassCard>

        {/* Budget Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BudgetTracker />
          
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Budget Tips</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg glass-subtle">
                <h4 className="font-medium text-emerald-400 mb-2">50/30/20 Rule</h4>
                <p className="text-sm text-muted-foreground">
                  Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.
                </p>
              </div>
              
              <div className="p-4 rounded-lg glass-subtle">
                <h4 className="font-medium text-amber-400 mb-2">Shopping Budget Alert</h4>
                <p className="text-sm text-muted-foreground">
                  Your shopping category is over budget. Consider reducing discretionary spending.
                </p>
              </div>
              
              <div className="p-4 rounded-lg glass-subtle">
                <h4 className="font-medium text-cyan-400 mb-2">Savings Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  You have $320 unspent in Transport. Consider moving it to savings.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
