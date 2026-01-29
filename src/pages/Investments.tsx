import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/shared/GlassCard';
import { InvestmentDashboard } from '@/components/widgets/InvestmentDashboard';
import { AnimatedNumber } from '@/components/shared/AnimatedNumber';
import { Sparkline } from '@/components/shared/Sparkline';
import { Button } from '@/components/ui/button';
import { investments, statsData, investmentHistory } from '@/data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Plus,
  RefreshCw,
  PieChart,
  BarChart3,
  DollarSign,
  Percent,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Investments = () => {
  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const totalChange = investments.reduce((sum, inv) => sum + (inv.value * inv.change24h / 100), 0);
  const percentChange = (totalChange / (totalValue - totalChange)) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Investments</h1>
            <p className="text-muted-foreground">Track and manage your investment portfolio</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="glass-subtle">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button className="gradient-primary text-white border-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Investment
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Portfolio Value</p>
              <Sparkline data={investmentHistory} width={60} height={24} />
            </div>
            <AnimatedNumber
              value={totalValue}
              format="currency"
              decimals={0}
              className="text-2xl font-bold"
            />
          </GlassCard>
          
          <GlassCard>
            <p className="text-sm text-muted-foreground mb-2">24h Change</p>
            <div className="flex items-center gap-2">
              <AnimatedNumber
                value={Math.abs(totalChange)}
                format="currency"
                decimals={0}
                className="text-2xl font-bold"
              />
              <span className={cn(
                'flex items-center text-sm font-medium',
                totalChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
              )}>
                {totalChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(percentChange).toFixed(2)}%
              </span>
            </div>
          </GlassCard>
          
          <GlassCard>
            <p className="text-sm text-muted-foreground mb-2">Total Assets</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{investments.length}</span>
              <span className="text-sm text-muted-foreground">holdings</span>
            </div>
          </GlassCard>
          
          <GlassCard>
            <p className="text-sm text-muted-foreground mb-2">Best Performer</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                {investments.reduce((best, inv) => inv.change24h > best.change24h ? inv : best).symbol}
              </span>
              <span className="text-emerald-400 text-sm font-medium">
                +{investments.reduce((best, inv) => inv.change24h > best.change24h ? inv : best).change24h}%
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Portfolio and Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InvestmentDashboard />
          
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">All Holdings</h3>
              </div>
            </div>
            
            <div className="space-y-3">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 rounded-lg glass-subtle hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: `${investment.color}20`, color: investment.color }}
                    >
                      {investment.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{investment.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {investment.quantity} {investment.symbol}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(investment.value)}</p>
                    <p className={cn(
                      'text-sm font-medium',
                      investment.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    )}>
                      {investment.change24h >= 0 ? '+' : ''}{investment.change24h}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Investments;
