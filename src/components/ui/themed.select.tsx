import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
      value: string;
      label: string;
}

interface ThemedSelectProps {
      label?: string;
      value: string;
      options: Option[];
      onChange: (value: string) => void;
      placeholder?: string;
      error?: string;
      className?: string;
}

export const ThemedSelect = ({
      label,
      value,
      options,
      onChange,
      placeholder = 'Select an option...',
      error,
      className = ''
}: ThemedSelectProps) => {
      const [isOpen, setIsOpen] = useState(false);
      const containerRef = useRef<HTMLDivElement>(null);

      const selectedOption = options.find(opt => opt.value === value);

      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                        setIsOpen(false);
                  }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

      return (
            <div className={`w-full space-y-2 relative ${className}`} ref={containerRef}>
                  {label && <label className="block micro-text text-xs text-(--text-muted) mb-2">{label}</label>}

                  <div
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
                    w-full px-4 py-2 bg-(--bg-surface) border-2 cursor-pointer
                    flex justify-between items-center transition-all duration-200
                    ${isOpen ? 'border-(--accent-primary) shadow-lg shadow-(--accent-primary)/10' : 'border-(--border-default)'}
                    ${error ? 'border-(--data-danger)' : 'hover:border-(--border-accent)'}
                `}
                  >
                        <span
                              className={`text-sm ${!selectedOption ? 'text-(--text-muted)' : 'text-(--text-primary)'}`}
                        >
                              {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <ChevronDown
                              className={`w-4 h-4 text-(--text-muted) transition-transform duration-200 ${isOpen ? 'rotate-180 text-(--accent-primary)' : ''}`}
                        />
                  </div>

                  {/* Dropdown Menu */}
                  {isOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 glass border-2 border-(--border-accent) z-100 max-h-60 overflow-y-auto animate-fade-in-down">
                              {options.length === 0 ? (
                                    <div className="p-4 text-center text-sm text-(--text-muted)">
                                          No options available
                                    </div>
                              ) : (
                                    options.map(option => (
                                          <div
                                                key={option.value}
                                                onClick={() => {
                                                      onChange(option.value);
                                                      setIsOpen(false);
                                                }}
                                                className={`
                                    px-4 py-3 text-sm cursor-pointer transition-colors
                                    ${
                                          value === option.value
                                                ? 'bg-(--accent-primary) text-white font-bold'
                                                : 'text-(--text-secondary) hover:bg-(--bg-hover) hover:text-(--text-primary)'
                                    }
                                `}
                                          >
                                                {option.label}
                                          </div>
                                    ))
                              )}
                        </div>
                  )}

                  {error && <p className="text-xs font-bold text-(--data-danger) ml-1 animate-fade-in">{error}</p>}
            </div>
      );
};
