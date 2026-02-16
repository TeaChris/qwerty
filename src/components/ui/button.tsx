import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
      size?: 'sm' | 'md' | 'lg';
      isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
      ({ children, variant = 'primary', size = 'md', isLoading = false, disabled, className = '', ...props }, ref) => {
            const baseStyles =
                  'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

            const variants = {
                  primary: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 focus:ring-orange-500',
                  secondary: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 focus:ring-slate-500',
                  ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white focus:ring-slate-500',
                  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 focus:ring-red-500'
            };

            const sizes = {
                  sm: 'px-4 py-2 text-sm',
                  md: 'px-6 py-3 text-base',
                  lg: 'px-8 py-4 text-lg'
            };

            const isDisabled = disabled || isLoading;

            return (
                  <button
                        ref={ref}
                        disabled={isDisabled}
                        aria-busy={isLoading}
                        aria-disabled={isDisabled}
                        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                        {...props}
                  >
                        {isLoading && (
                              <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                              >
                                    <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                    />
                                    <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                              </svg>
                        )}
                        {children}
                  </button>
            );
      }
);

Button.displayName = 'Button';
