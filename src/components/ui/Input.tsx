import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
      label?: string;
      error?: string;
      helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
      ({ label, error, helperText, className = '', id, ...props }, ref) => {
            const generatedId = useId();
            const inputId = id || generatedId;
            const errorId = error ? `${inputId}-error` : undefined;
            const helperId = helperText ? `${inputId}-helper` : undefined;

            const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

            return (
                  <div className="w-full space-y-2">
                        {label && (
                              <label
                                    htmlFor={inputId}
                                    className="block text-sm font-bold text-slate-400 uppercase tracking-widest ml-1"
                              >
                                    {label}
                              </label>
                        )}

                        <input
                              ref={ref}
                              id={inputId}
                              aria-invalid={!!error}
                              aria-describedby={describedBy}
                              className={`
            w-full px-5 py-4 bg-slate-800 border rounded-2xl text-white 
            placeholder-slate-500 focus:outline-none focus:ring-2 transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
                  error
                        ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500'
                        : 'border-slate-700 focus:ring-orange-500/50 focus:border-orange-500'
            }
            ${className}
          `}
                              {...props}
                        />

                        {error && (
                              <p id={errorId} role="alert" className="text-xs font-bold text-red-400 ml-1">
                                    {error}
                              </p>
                        )}

                        {helperText && !error && (
                              <p id={helperId} className="text-xs text-slate-500 ml-1">
                                    {helperText}
                              </p>
                        )}
                  </div>
            );
      }
);

Input.displayName = 'Input';
