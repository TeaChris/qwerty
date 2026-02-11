import type { FC } from 'react';

interface LiveBadgeProps {
      className?: string;
}

export const LiveBadge: FC<LiveBadgeProps> = ({ className = '' }) => {
      return (
            <div className={`inline-flex items-center gap-2 ${className}`}>
                  <div className="relative">
                        <div className="w-2 h-2 bg-(--data-danger) rounded-full animate-pulse-live" />
                        <div className="absolute inset-0 w-2 h-2 bg-(--data-danger) rounded-full animate-ping" />
                  </div>
                  <span className="micro-text text-(--data-danger)">LIVE</span>
            </div>
      );
};
