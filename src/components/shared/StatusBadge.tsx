import { cn } from '@/lib/utils';
import type { TransactionStatus } from '@/data/mockData';

interface StatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

const statusConfig: Record<TransactionStatus, { label: string; className: string }> = {
  completed: {
    label: 'Completed',
    className: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  },
  failed: {
    label: 'Failed',
    className: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
