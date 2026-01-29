import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  color?: 'primary' | 'success' | 'danger' | 'accent';
  showArea?: boolean;
  animate?: boolean;
}

export const Sparkline = ({
  data,
  width = 100,
  height = 30,
  className,
  color = 'primary',
  showArea = true,
  animate = true,
}: SparklineProps) => {
  const { path, areaPath, trend } = useMemo(() => {
    if (data.length < 2) {
      return { path: '', areaPath: '', trend: 'neutral' as const };
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 2;

    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = padding + (1 - (value - min) / range) * (height - padding * 2);
      return { x, y };
    });

    // Create smooth curve using quadratic bezier
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      pathD += ` Q ${prev.x} ${prev.y} ${cpx} ${(prev.y + curr.y) / 2}`;
    }
    pathD += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;

    // Create area path
    const areaD = pathD + 
      ` L ${points[points.length - 1].x} ${height - padding}` +
      ` L ${points[0].x} ${height - padding} Z`;

    // Determine trend
    const trendValue = data[data.length - 1] >= data[0] ? 'up' : 'down';

    return { path: pathD, areaPath: areaD, trend: trendValue };
  }, [data, width, height]);

  const getColor = () => {
    if (color === 'primary') return 'stroke-primary fill-primary';
    if (color === 'success') return 'stroke-emerald-500 fill-emerald-500';
    if (color === 'danger') return 'stroke-rose-500 fill-rose-500';
    return 'stroke-cyan-500 fill-cyan-500';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'stroke-emerald-500 fill-emerald-500';
    if (trend === 'down') return 'stroke-rose-500 fill-rose-500';
    return getColor();
  };

  if (data.length < 2) {
    return null;
  }

  return (
    <svg
      width={width}
      height={height}
      className={cn('overflow-visible', className)}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={`sparkline-gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className={getTrendColor()} stopOpacity="0.3" />
          <stop offset="100%" className={getTrendColor()} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      {showArea && (
        <path
          d={areaPath}
          fill={`url(#sparkline-gradient-${color})`}
          className={cn(animate && 'animate-fade-in')}
        />
      )}

      {/* Line */}
      <path
        d={path}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          getTrendColor(),
          animate && 'animate-fade-in'
        )}
        style={{
          filter: 'drop-shadow(0 0 3px currentColor)',
        }}
      />

      {/* End dot */}
      <circle
        cx={data.length > 0 ? 2 + ((data.length - 1) / (data.length - 1)) * (width - 4) : 0}
        cy={data.length > 0 ? (() => {
          const min = Math.min(...data);
          const max = Math.max(...data);
          const range = max - min || 1;
          return 2 + (1 - (data[data.length - 1] - min) / range) * (height - 4);
        })() : 0}
        r={3}
        className={cn(getTrendColor(), animate && 'animate-scale-in')}
        style={{
          filter: 'drop-shadow(0 0 4px currentColor)',
        }}
      />
    </svg>
  );
};

export default Sparkline;
