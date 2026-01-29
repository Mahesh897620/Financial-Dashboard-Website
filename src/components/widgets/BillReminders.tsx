import { useState } from 'react';
import { Calendar, Clock, Home, Zap, Wifi, Smartphone, Car, Dumbbell, ToggleLeft, ToggleRight, Plus } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { bills, type Bill } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { differenceInDays, parseISO, format } from 'date-fns';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Zap,
  Wifi,
  Smartphone,
  Car,
  Dumbbell,
};

export const BillReminders = () => {
  const [billList, setBillList] = useState(bills);

  const toggleAutoPay = (id: string) => {
    setBillList(prev =>
      prev.map(bill =>
        bill.id === id ? { ...bill, isAutoPay: !bill.isAutoPay } : bill
      )
    );
  };

  const getDaysUntilDue = (dueDate: string) => {
    const days = differenceInDays(parseISO(dueDate), new Date());
    return days;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const sortedBills = [...billList].sort((a, b) => {
    const daysA = getDaysUntilDue(a.dueDate);
    const daysB = getDaysUntilDue(b.dueDate);
    return daysA - daysB;
  });

  const totalDue = sortedBills
    .filter(bill => getDaysUntilDue(bill.dueDate) <= 30 && getDaysUntilDue(bill.dueDate) >= 0)
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Bill Reminders</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="glass-subtle rounded-lg p-3 mb-4">
        <p className="text-xs text-muted-foreground">Total due this month</p>
        <p className="text-xl font-bold">{formatCurrency(totalDue)}</p>
      </div>

      <ScrollArea className="h-[280px] -mx-2 px-2">
        <div className="space-y-3">
          {sortedBills.map((bill) => {
            const Icon = iconMap[bill.icon] || Calendar;
            const daysUntil = getDaysUntilDue(bill.dueDate);
            const isOverdue = daysUntil < 0;
            const isDueSoon = daysUntil <= 3 && daysUntil >= 0;

            return (
              <div
                key={bill.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg transition-colors',
                  isOverdue ? 'bg-rose-500/10 border border-rose-500/30' :
                  isDueSoon ? 'bg-amber-500/10 border border-amber-500/30' :
                  'glass-subtle'
                )}
              >
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  isOverdue ? 'bg-rose-500/20' :
                  isDueSoon ? 'bg-amber-500/20' :
                  'bg-primary/10'
                )}>
                  <Icon className={cn(
                    'h-5 w-5',
                    isOverdue ? 'text-rose-400' :
                    isDueSoon ? 'text-amber-400' :
                    'text-primary'
                  )} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{bill.name}</p>
                    <p className="font-semibold">{formatCurrency(bill.amount)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {isOverdue ? (
                        <span className="text-rose-400">Overdue by {Math.abs(daysUntil)} days</span>
                      ) : daysUntil === 0 ? (
                        <span className="text-amber-400">Due today</span>
                      ) : (
                        <span>Due in {daysUntil} days</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Auto-pay</span>
                      <Switch
                        checked={bill.isAutoPay}
                        onCheckedChange={() => toggleAutoPay(bill.id)}
                        className="scale-75"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </GlassCard>
  );
};

export default BillReminders;
