import { Lightbulb, TrendingUp, Trophy, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { financialInsights, type FinancialInsight } from '@/data/mockData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Trophy,
  Lightbulb,
  AlertTriangle,
};

const typeStyles: Record<FinancialInsight['type'], { bg: string; border: string; iconColor: string }> = {
  tip: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', iconColor: 'text-cyan-400' },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', iconColor: 'text-amber-400' },
  achievement: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', iconColor: 'text-emerald-400' },
  alert: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', iconColor: 'text-rose-400' },
};

export const FinancialInsights = () => {
  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
          <h3 className="font-semibold">AI Insights</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-primary text-xs">
          View All
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <ScrollArea className="h-[320px] -mx-2 px-2">
        <div className="space-y-3">
          {financialInsights.map((insight) => {
            const Icon = iconMap[insight.icon] || Lightbulb;
            const styles = typeStyles[insight.type];

            return (
              <div
                key={insight.id}
                className={cn(
                  'p-4 rounded-lg border transition-all hover:scale-[1.02] cursor-pointer',
                  styles.bg,
                  styles.border
                )}
              >
                <div className="flex gap-3">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0',
                    styles.bg
                  )}>
                    <Icon className={cn('h-5 w-5', styles.iconColor)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm mb-1">{insight.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>

                {insight.type === 'tip' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 p-0 h-auto"
                  >
                    Learn more
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </GlassCard>
  );
};

export default FinancialInsights;
