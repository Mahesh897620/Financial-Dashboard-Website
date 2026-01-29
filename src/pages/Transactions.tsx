import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TransactionsTable } from '@/components/dashboard/TransactionsTable';
import { transactions } from '@/data/mockData';

const Transactions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all your transactions
          </p>
        </div>

        <TransactionsTable transactions={transactions} showFilters={true} />
      </main>

      <Footer />
    </div>
  );
};

export default Transactions;
