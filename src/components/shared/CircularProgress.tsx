import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
  label?: string;
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
  animate?: boolean;
}

export const CircularProgress = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  className,
  showValue = true,
  label,
  colorScheme = 'primary',
  animate = true,
}: CircularProgressProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((animatedValue / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value, animate]);

  const getStrokeColor = () => {
    switch (colorScheme) {
      case 'success':
        return 'stroke-emerald-500';
      case 'warning':
        return 'stroke-amber-500';
      case 'danger':
        return 'stroke-rose-500';
      case 'gradient':
        return 'stroke-[url(#gradient)]';
      default:
        return 'stroke-primary';
    }
  };

  const getGlowColor = () => {
    switch (colorScheme) {
      case 'success':
        return 'drop-shadow-[0_0_10px_hsl(160,84%,39%,0.5)]';
      case 'warning':
        return 'drop-shadow-[0_0_10px_hsl(38,92%,50%,0.5)]';
      case 'danger':
        return 'drop-shadow-[0_0_10px_hsl(0,84%,60%,0.5)]';
      default:
        return 'drop-shadow-[0_0_10px_hsl(239,84%,67%,0.5)]';
    }
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className={cn('transform -rotate-90', getGlowColor())}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn(
            getStrokeColor(),
            'transition-all duration-1000 ease-out'
          )}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: animate ? offset : circumference - (value / max) * circumference,
          }}
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(animatedValue)}</span>
          {label && (
            <span className="text-xs text-muted-foreground mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
