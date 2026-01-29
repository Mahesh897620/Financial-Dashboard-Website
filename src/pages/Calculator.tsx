import { useState } from 'react';
import { Calculator as CalcIcon, Percent, PiggyBank, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Calculator = () => {
  // Loan EMI Calculator State
  const [loanAmount, setLoanAmount] = useState('100000');
  const [loanRate, setLoanRate] = useState('8.5');
  const [loanTenure, setLoanTenure] = useState('12');

  // Investment Calculator State
  const [investmentAmount, setInvestmentAmount] = useState('10000');
  const [investmentRate, setInvestmentRate] = useState('12');
  const [investmentYears, setInvestmentYears] = useState('5');

  // Savings Goal Calculator State
  const [goalAmount, setGoalAmount] = useState('50000');
  const [goalMonths, setGoalMonths] = useState('24');
  const [currentSavings, setCurrentSavings] = useState('5000');

  // EMI Calculation
  const calculateEMI = () => {
    const P = parseFloat(loanAmount) || 0;
    const r = (parseFloat(loanRate) || 0) / 12 / 100;
    const n = parseFloat(loanTenure) || 1;
    
    if (r === 0) return P / n;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi;
  };

  const emi = calculateEMI();
  const totalPayment = emi * (parseFloat(loanTenure) || 1);
  const totalInterest = totalPayment - (parseFloat(loanAmount) || 0);

  // Investment Returns Calculation
  const calculateReturns = () => {
    const P = parseFloat(investmentAmount) || 0;
    const r = (parseFloat(investmentRate) || 0) / 100;
    const t = parseFloat(investmentYears) || 1;
    
    const futureValue = P * Math.pow(1 + r, t);
    return futureValue;
  };

  const futureValue = calculateReturns();
  const investmentGain = futureValue - (parseFloat(investmentAmount) || 0);

  // Savings Goal Calculation
  const calculateMonthlySavings = () => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const months = parseFloat(goalMonths) || 1;
    
    const remaining = goal - current;
    return remaining / months;
  };

  const monthlySavings = calculateMonthlySavings();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
            <CalcIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Financial Calculator</h1>
            <p className="text-muted-foreground">Calculate loans, investments, and savings goals</p>
          </div>
        </div>

        <Tabs defaultValue="loan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="loan" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Loan EMI
            </TabsTrigger>
            <TabsTrigger value="investment" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Investment
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4" />
              Savings Goal
            </TabsTrigger>
          </TabsList>

          {/* Loan EMI Calculator */}
          <TabsContent value="loan">
            <div className="grid gap-6 md:grid-cols-2">
              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanRate">Interest Rate (% per year)</Label>
                    <Input
                      id="loanRate"
                      type="number"
                      step="0.1"
                      value={loanRate}
                      onChange={(e) => setLoanRate(e.target.value)}
                      placeholder="Enter interest rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTenure">Tenure (months)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(e.target.value)}
                      placeholder="Enter loan tenure"
                    />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="gradient-primary text-white">
                <h3 className="text-lg font-semibold mb-4">EMI Results</h3>
                <div className="space-y-4">
                  <div className="glass-subtle rounded-lg p-4 bg-white/10">
                    <p className="text-sm opacity-80">Monthly EMI</p>
                    <p className="text-3xl font-bold">{formatCurrency(emi)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-subtle rounded-lg p-3 bg-white/10">
                      <p className="text-xs opacity-80">Total Payment</p>
                      <p className="text-lg font-semibold">{formatCurrency(totalPayment)}</p>
                    </div>
                    <div className="glass-subtle rounded-lg p-3 bg-white/10">
                      <p className="text-xs opacity-80">Total Interest</p>
                      <p className="text-lg font-semibold">{formatCurrency(totalInterest)}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </TabsContent>

          {/* Investment Calculator */}
          <TabsContent value="investment">
            <div className="grid gap-6 md:grid-cols-2">
              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="investmentAmount">Initial Investment ($)</Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Enter investment amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentRate">Expected Return (% per year)</Label>
                    <Input
                      id="investmentRate"
                      type="number"
                      step="0.1"
                      value={investmentRate}
                      onChange={(e) => setInvestmentRate(e.target.value)}
                      placeholder="Enter expected return rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentYears">Investment Period (years)</Label>
                    <Input
                      id="investmentYears"
                      type="number"
                      value={investmentYears}
                      onChange={(e) => setInvestmentYears(e.target.value)}
                      placeholder="Enter investment period"
                    />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <h3 className="text-lg font-semibold mb-4">Investment Returns</h3>
                <div className="space-y-4">
                  <div className="glass-subtle rounded-lg p-4 bg-white/10">
                    <p className="text-sm opacity-80">Future Value</p>
                    <p className="text-3xl font-bold">{formatCurrency(futureValue)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-subtle rounded-lg p-3 bg-white/10">
                      <p className="text-xs opacity-80">Initial Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(parseFloat(investmentAmount) || 0)}</p>
                    </div>
                    <div className="glass-subtle rounded-lg p-3 bg-white/10">
                      <p className="text-xs opacity-80">Total Gain</p>
                      <p className="text-lg font-semibold">{formatCurrency(investmentGain)}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </TabsContent>

          {/* Savings Goal Calculator */}
          <TabsContent value="savings">
            <div className="grid gap-6 md:grid-cols-2">
              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Savings Goal</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalAmount">Target Amount ($)</Label>
                    <Input
                      id="goalAmount"
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      placeholder="Enter target amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentSavings">Current Savings ($)</Label>
                    <Input
                      id="currentSavings"
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                      placeholder="Enter current savings"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goalMonths">Time Frame (months)</Label>
                    <Input
                      id="goalMonths"
                      type="number"
                      value={goalMonths}
                      onChange={(e) => setGoalMonths(e.target.value)}
                      placeholder="Enter time frame"
                    />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                <h3 className="text-lg font-semibold mb-4">Savings Plan</h3>
                <div className="space-y-4">
                  <div className="glass-subtle rounded-lg p-4 bg-white/10">
                    <p className="text-sm opacity-80">Monthly Savings Needed</p>
                    <p className="text-3xl font-bold">{formatCurrency(monthlySavings)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-subtle rounded-lg p-3 bg-white/10">
                      <p className="text-xs opacity-80">Remaining</p>
                      <p className="text-lg font-semibold">{formatCurrency((parseFloat(goalAmount) || 0) - (parseFloat(currentSavings) || 0))}</p>
                    </div>
                    <div className="glass-subtle rounded-lg p-3 bg-white/10">
                      <p className="text-xs opacity-80">Progress</p>
                      <p className="text-lg font-semibold">
                        {Math.round(((parseFloat(currentSavings) || 0) / (parseFloat(goalAmount) || 1)) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Calculator;
