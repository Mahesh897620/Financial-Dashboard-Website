import { ArrowRightLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CurrencyConverter } from '@/components/widgets/CurrencyConverter';
import { GlassCard } from '@/components/shared/GlassCard';
import { exchangeRates } from '@/data/mockData';

const popularPairs = [
  { from: 'USD', to: 'EUR', fromFlag: '🇺🇸', toFlag: '🇪🇺' },
  { from: 'USD', to: 'GBP', fromFlag: '🇺🇸', toFlag: '🇬🇧' },
  { from: 'EUR', to: 'GBP', fromFlag: '🇪🇺', toFlag: '🇬🇧' },
  { from: 'USD', to: 'JPY', fromFlag: '🇺🇸', toFlag: '🇯🇵' },
  { from: 'USD', to: 'CAD', fromFlag: '🇺🇸', toFlag: '🇨🇦' },
  { from: 'USD', to: 'AUD', fromFlag: '🇺🇸', toFlag: '🇦🇺' },
];

const Converter = () => {
  const getRate = (from: string, to: string) => {
    const fromRate = exchangeRates[from] || 1;
    const toRate = exchangeRates[to] || 1;
    return (1 / fromRate) * toRate;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
            <ArrowRightLeft className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Currency Converter</h1>
            <p className="text-muted-foreground">Convert between currencies and cryptocurrencies</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Main Converter */}
          <div className="lg:row-span-2">
            <CurrencyConverter />
          </div>

          {/* Popular Exchange Rates */}
          <GlassCard>
            <h3 className="font-semibold mb-4">Popular Exchange Rates</h3>
            <div className="space-y-3">
              {popularPairs.map((pair) => (
                <div
                  key={`${pair.from}-${pair.to}`}
                  className="flex items-center justify-between p-3 rounded-lg glass-subtle hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-lg">{pair.fromFlag}</span>
                      <span className="font-medium">{pair.from}</span>
                    </div>
                    <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center gap-1">
                      <span className="text-lg">{pair.toFlag}</span>
                      <span className="font-medium">{pair.to}</span>
                    </div>
                  </div>
                  <span className="font-mono text-sm">
                    {getRate(pair.from, pair.to).toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Crypto Rates */}
          <GlassCard>
            <h3 className="font-semibold mb-4">Cryptocurrency Rates</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg glass-subtle">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🪙</span>
                  <span className="font-medium">Bitcoin (BTC)</span>
                </div>
                <span className="font-mono text-sm text-emerald-500">
                  ${(1 / (exchangeRates['BTC'] || 0.000024)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg glass-subtle">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💎</span>
                  <span className="font-medium">Ethereum (ETH)</span>
                </div>
                <span className="font-mono text-sm text-emerald-500">
                  ${(1 / (exchangeRates['ETH'] || 0.00041)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Rates are for demonstration purposes only
            </p>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Converter;
