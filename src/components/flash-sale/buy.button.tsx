interface BuyButtonProps {
      onClick: () => void;
      disabled?: boolean;
      isLoading?: boolean;
      price?: number;
      currency?: string;
}

export function BuyButton({ onClick, disabled = false, isLoading = false, price, currency = 'USD' }: BuyButtonProps) {
      const isDisabled = disabled || isLoading;

      const formatPrice = (amount: number, curr: string) => {
            return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: curr
            }).format(amount);
      };

      return (
            <button
                  onClick={onClick}
                  disabled={isDisabled}
                  className={`
        relative w-full py-4 px-8 rounded-xl font-bold text-lg
        transition-all duration-300 transform
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
        ${
              isDisabled
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-linear-to-r from-orange-500 via-red-500 to-pink-500 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] focus:ring-orange-500'
        }
      `}
                  aria-busy={isLoading}
                  aria-disabled={isDisabled}
            >
                  {/* Animated background glow */}
                  {!isDisabled && (
                        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-orange-500 via-red-500 to-pink-500 blur-xl opacity-50 -z-10 animate-pulse-glow" />
                  )}

                  {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                              <svg
                                    className="animate-spin h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                              >
                                    <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                    ></circle>
                                    <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                              </svg>
                              Processing...
                        </span>
                  ) : (
                        <span className="flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                              </svg>
                              {price ? `Buy Now - ${formatPrice(price, currency)}` : 'Buy Now'}
                        </span>
                  )}
            </button>
      );
}
