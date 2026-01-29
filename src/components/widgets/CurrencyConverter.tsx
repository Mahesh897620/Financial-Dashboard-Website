import { useState } from 'react';
import { ArrowRightLeft, ChevronDown, Star, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { exchangeRates } from '@/data/mockData';
import { cn } from '@/lib/utils';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '🪙' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', flag: '💎' },
];

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [favorites, setFavorites] = useState<string[]>(['USD-EUR', 'USD-GBP']);

  const convert = (value: number, from: string, to: string) => {
    const fromRate = exchangeRates[from] || 1;
    const toRate = exchangeRates[to] || 1;
    return (value / fromRate) * toRate;
  };

  const convertedAmount = convert(parseFloat(amount) || 0, fromCurrency, toCurrency);
  const rate = convert(1, fromCurrency, toCurrency);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleFavorite = (pair: string) => {
    setFavorites(prev =>
      prev.includes(pair) ? prev.filter(p => p !== pair) : [...prev, pair]
    );
  };

  const currentPair = `${fromCurrency}-${toCurrency}`;
  const isFavorite = favorites.includes(currentPair);

  const getCurrency = (code: string) => currencies.find(c => c.code === code);
  const fromCurrencyData = getCurrency(fromCurrency);
  const toCurrencyData = getCurrency(toCurrency);

  const formatNumber = (num: number, currency: string) => {
    const isCrypto = ['BTC', 'ETH'].includes(currency);
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: isCrypto ? 8 : 2,
      maximumFractionDigits: isCrypto ? 8 : 2,
    }).format(num);
  };

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Currency Converter</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn('h-8 w-8', isFavorite && 'text-amber-400')}
          onClick={() => toggleFavorite(currentPair)}
        >
          <Star className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </Button>
      </div>

      {/* From Currency */}
      <div className="space-y-4">
        <div className="glass-subtle rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">From</span>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-auto h-auto border-0 p-0 bg-transparent">
                <div className="flex items-center gap-2">
                  <span>{fromCurrencyData?.flag}</span>
                  <span className="font-medium">{fromCurrency}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </SelectTrigger>
              <SelectContent className="glass">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-muted-foreground">- {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-2xl font-bold bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
            placeholder="0"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 glass-subtle border-primary/30 hover:bg-primary/10"
            onClick={swapCurrencies}
          >
            <RefreshCw className="h-4 w-4 text-primary" />
          </Button>
        </div>

        {/* To Currency */}
        <div className="glass-subtle rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">To</span>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-auto h-auto border-0 p-0 bg-transparent">
                <div className="flex items-center gap-2">
                  <span>{toCurrencyData?.flag}</span>
                  <span className="font-medium">{toCurrency}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </SelectTrigger>
              <SelectContent className="glass">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-muted-foreground">- {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-2xl font-bold">
            {toCurrencyData?.symbol}{formatNumber(convertedAmount, toCurrency)}
          </p>
        </div>

        {/* Exchange Rate */}
        <div className="text-center text-sm text-muted-foreground">
          1 {fromCurrency} = {formatNumber(rate, toCurrency)} {toCurrency}
        </div>
      </div>
    </GlassCard>
  );
};

export default CurrencyConverter;
