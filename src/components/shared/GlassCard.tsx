import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  glow?: boolean;
  hover?: boolean;
  animate?: boolean;
  delay?: number;
}

export const GlassCard = ({
  children,
  className,
  variant = 'default',
  glow = false,
  hover = true,
  animate = true,
  delay = 0,
}: GlassCardProps) => {
  const variantClasses = {
    default: 'glass',
    strong: 'glass-strong',
    subtle: 'glass-subtle',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6',
        variantClasses[variant],
        glow && 'glass-glow',
        hover && 'card-glow',
        animate && 'animate-fade-in opacity-0',
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
