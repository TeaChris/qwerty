export interface SkeletonProps {
      className?: string;
      variant?: 'text' | 'circular' | 'rectangular';
      width?: string | number;
      height?: string | number;
}

export function Skeleton({ className = '', variant = 'rectangular', width, height }: SkeletonProps) {
      const baseStyles = 'animate-pulse bg-slate-800';

      const variants = {
            text: 'rounded h-4',
            circular: 'rounded-full',
            rectangular: 'rounded-lg'
      };

      const style = {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height
      };

      return (
            <div
                  className={`${baseStyles} ${variants[variant]} ${className}`}
                  style={style}
                  aria-busy="true"
                  aria-live="polite"
            />
      );
}
