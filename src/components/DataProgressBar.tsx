import type { FC } from 'react';

interface DataProgressBarProps {
      current: number;
      total: number;
      label?: string;
      className?: string;
}

export const DataProgressBar: FC<DataProgressBarProps> = ({ current, total, label, className = '' }) => {
      const percentage = Math.min(Math.max((current / total) * 100, 0), 100);
      const isCritical = percentage >= 90;
      const isWarning = percentage >= 70 && percentage < 90;

      const getBarColor = () => {
            if (isCritical) return 'var(--data-danger)';
            if (isWarning) return 'var(--data-warning)';
            return 'var(--accent-primary)';
      };

      return (
            <div className={`space-y-2 ${className}`}>
                  {label && (
                        <div className="flex items-center justify-between">
                              <span className="micro-text text-[var(--text-muted)]">{label}</span>
                              <span className="mono-number text-sm font-bold text-[var(--text-primary)]">
                                    {percentage.toFixed(0)}% CLAIMED
                              </span>
                        </div>
                  )}
                  <div className="relative h-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] overflow-hidden">
                        {/* Background shimmer */}
                        <div
                              className="absolute inset-0 animate-shimmer"
                              style={{ opacity: percentage > 0 ? 0.3 : 0 }}
                        />
                        {/* Progress fill */}
                        <div
                              className="h-full transition-all duration-500 ease-out"
                              style={{
                                    width: `${percentage}%`,
                                    background: `linear-gradient(90deg, ${getBarColor()}, ${getBarColor()}CC)`,
                                    boxShadow: isCritical ? '0 0 10px rgba(255, 71, 87, 0.5)' : 'none'
                              }}
                        />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                        <span className="mono-number text-[var(--text-secondary)]">
                              {current.toLocaleString()} / {total.toLocaleString()}
                        </span>
                        <span className="text-[var(--text-muted)]">{total - current} remaining</span>
                  </div>
            </div>
      );
};
