import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedNumber } from '@/components/shared/AnimatedNumber';
import { investments, statsData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export const InvestmentDashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Group investments by type for pie chart
  const portfolioData = investments.reduce((acc, inv) => {
    const existing = acc.find(item => item.type === inv.type);
    if (existing) {
      existing.value += inv.value;
    } else {
      acc.push({ type: inv.type, value: inv.value, color: inv.color });
    }
    return acc;
  }, [] as { type: string; value: number; color: string }[]);

  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);

  const typeLabels: Record<string, string> = {
    stock: 'Stocks',
    crypto: 'Crypto',
    etf: 'ETFs',
    bond: 'Bonds',
    real_estate: 'Real Estate',
  };

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Investment Portfolio</h3>
        </div>
        <div className={cn(
          'flex items-center gap-1 text-sm font-medium',
          statsData.investmentChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
        )}>
          {statsData.investmentChange >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {Math.abs(statsData.investmentChange)}%
        </div>
      </div>

      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground">Total Portfolio Value</p>
        <AnimatedNumber
          value={totalValue}
          format="currency"
          decimals={0}
          className="text-2xl font-bold"
        />
      </div>

      {/* Pie Chart */}
      <div className="h-40 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const percentage = ((data.value / totalValue) * 100).toFixed(1);
                  return (
                    <div className="glass-strong rounded-lg p-3 shadow-lg">
                      <p className="font-medium">{typeLabels[data.type] || data.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(data.value)} ({percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Holdings */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground mb-2">Top Holdings</p>
        {investments.slice(0, 4).map((investment) => (
          <div
            key={investment.id}
            className="flex items-center justify-between p-2 rounded-lg glass-subtle"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: investment.color }}
              />
              <div>
                <p className="text-sm font-medium">{investment.symbol}</p>
                <p className="text-xs text-muted-foreground">{investment.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{formatCurrency(investment.value)}</p>
              <p className={cn(
                'text-xs',
                investment.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
              )}>
                {investment.change24h >= 0 ? '+' : ''}{investment.change24h}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default InvestmentDashboard;
