import { useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  Wallet,
  TrendingUp,
  Plus,
  Download,
  Moon,
  Sun,
  Search,
  FileText,
  Calculator,
  ArrowRightLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { transactions } from '@/data/mockData';

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const pages = [
  { name: 'Dashboard', url: '/', icon: LayoutDashboard },
  { name: 'Transactions', url: '/transactions', icon: Receipt },
  { name: 'Reports', url: '/reports', icon: PieChart },
  { name: 'Budget', url: '/budget', icon: Wallet },
  { name: 'Investments', url: '/investments', icon: TrendingUp },
  { name: 'Settings', url: '/settings', icon: Settings },
];

const actions = [
  { name: 'Add Transaction', icon: Plus, action: 'add-transaction' },
  { name: 'Export Data', icon: Download, action: 'export' },
  { name: 'Open Calculator', icon: Calculator, action: 'calculator' },
  { name: 'Currency Converter', icon: ArrowRightLeft, action: 'converter' },
];

export const GlobalSearch = ({ open, onOpenChange }: GlobalSearchProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions
    .filter(t => 
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  const handleSelect = (type: string, value: string) => {
    onOpenChange(false);
    setSearch('');

    if (type === 'page') {
      navigate(value);
    } else if (type === 'transaction') {
      navigate('/transactions');
    } else if (type === 'action') {
      // Handle actions
      switch (value) {
        case 'add-transaction':
          navigate('/transactions');
          break;
        case 'export':
          // Trigger export
          break;
        default:
          break;
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border-0 glass-strong">
        <CommandInput
          placeholder="Search transactions, pages, actions..."
          value={search}
          onValueChange={setSearch}
          className="border-0"
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Quick Actions */}
          <CommandGroup heading="Actions">
            {actions.map((action) => (
              <CommandItem
                key={action.name}
                onSelect={() => handleSelect('action', action.action)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <action.icon className="h-4 w-4 text-primary" />
                </div>
                <span>{action.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Pages */}
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.name}
                onSelect={() => handleSelect('page', page.url)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <page.icon className="h-4 w-4" />
                </div>
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Transactions (if searching) */}
          {search && filteredTransactions.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Transactions">
                {filteredTransactions.map((transaction) => (
                  <CommandItem
                    key={transaction.id}
                    onSelect={() => handleSelect('transaction', transaction.id)}
                    className="flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">{transaction.description}</span>
                        <span className="text-xs text-muted-foreground">{transaction.category}</span>
                      </div>
                    </div>
                    <span className={transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default GlobalSearch;
