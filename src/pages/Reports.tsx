import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { IncomeExpenseChart } from '@/components/dashboard/IncomeExpenseChart';
import { ExpenseBreakdownChart } from '@/components/dashboard/ExpenseBreakdownChart';
import { MonthlyTrendsChart } from '@/components/dashboard/MonthlyTrendsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { monthlyChartData, expenseBreakdownData, statsData } from '@/data/mockData';

const Reports = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Analyze your financial performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate PDF
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Income (6 months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(monthlyChartData.reduce((sum, m) => sum + m.income, 0))}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expenses (6 months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(monthlyChartData.reduce((sum, m) => sum + m.expenses, 0))}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Net Savings (6 months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold gradient-text">
                {formatCurrency(
                  monthlyChartData.reduce((sum, m) => sum + m.income - m.expenses, 0)
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IncomeExpenseChart data={monthlyChartData} />
          <ExpenseBreakdownChart data={expenseBreakdownData} />
        </div>

        <MonthlyTrendsChart data={monthlyChartData} />
      </main>

      <Footer />
    </div>
  );
};

export default Reports;
