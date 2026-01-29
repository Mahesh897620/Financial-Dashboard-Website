import { Tv, Music, Palette, Cloud, Code, Bot, CreditCard, MoreVertical } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { subscriptions, type Subscription } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format, parseISO, differenceInDays } from 'date-fns';

const iconMap: Record<string, React.ElementType> = {
  Tv,
  Music,
  Palette,
  Cloud,
  Code,
  Bot,
};

export const RecurringPayments = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const monthlyTotal = subscriptions.reduce((sum, sub) => {
    return sum + (sub.billingCycle === 'monthly' ? sub.amount : sub.amount / 12);
  }, 0);

  const yearlyTotal = monthlyTotal * 12;

  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Subscriptions</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {subscriptions.length} active
        </span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass-subtle rounded-lg p-3">
          <p className="text-xs text-muted-foreground">Monthly</p>
          <p className="text-lg font-bold">{formatCurrency(monthlyTotal)}</p>
        </div>
        <div className="glass-subtle rounded-lg p-3">
          <p className="text-xs text-muted-foreground">Yearly</p>
          <p className="text-lg font-bold">{formatCurrency(yearlyTotal)}</p>
        </div>
      </div>

      <ScrollArea className="h-[260px] -mx-2 px-2">
        <div className="space-y-2">
          {subscriptions.map((subscription) => {
            const Icon = iconMap[subscription.icon] || CreditCard;
            const daysUntilBilling = differenceInDays(parseISO(subscription.nextBilling), new Date());

            return (
              <div
                key={subscription.id}
                className="flex items-center gap-3 p-3 rounded-lg glass-subtle hover:bg-muted/50 transition-colors"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${subscription.color}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color: subscription.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{subscription.name}</p>
                    <p className="font-semibold">{formatCurrency(subscription.amount)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {subscription.billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {daysUntilBilling > 0 ? `Renews in ${daysUntilBilling}d` : 'Renews soon'}
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass">
                    <DropdownMenuItem>Manage</DropdownMenuItem>
                    <DropdownMenuItem>Pause</DropdownMenuItem>
                    <DropdownMenuItem className="text-rose-400">Cancel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </GlassCard>
  );
};

export default RecurringPayments;
