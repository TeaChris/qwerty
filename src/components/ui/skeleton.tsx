import type { CSSProperties } from 'react';

export interface SkeletonProps {
      className?: string;
      variant?: 'text' | 'circular' | 'rectangular';
      width?: string | number;
      height?: string | number;
      style?: CSSProperties;
}

export function Skeleton({
      className = '',
      variant = 'rectangular',
      width,
      height,
      style: externalStyle
}: SkeletonProps) {
      const baseStyles = 'animate-pulse bg-slate-800';

      const variants = {
            text: 'rounded h-4',
            circular: 'rounded-full',
            rectangular: 'rounded-lg'
      };

      const combinedStyle = {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            ...externalStyle
      };

      return (
            <div
                  className={`${baseStyles} ${variants[variant]} ${className}`}
                  style={combinedStyle}
                  aria-busy="true"
                  aria-live="polite"
            />
      );
}
