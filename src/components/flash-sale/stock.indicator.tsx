interface StockIndicatorProps {
      remaining: number;
      total: number;
}

export function StockIndicator({ remaining, total }: StockIndicatorProps) {
      const percentage = (remaining / total) * 100;

      // Determine urgency level based on stock percentage
      const getUrgencyConfig = () => {
            if (percentage <= 10) {
                  return {
                        gradient: 'from-red-500 to-red-600',
                        textColor: 'text-red-400',
                        bgColor: 'bg-red-500/10',
                        message: '🔥 Almost gone!',
                        animate: true
                  };
            } else if (percentage <= 30) {
                  return {
                        gradient: 'from-orange-500 to-amber-500',
                        textColor: 'text-orange-400',
                        bgColor: 'bg-orange-500/10',
                        message: '⚡ Selling fast!',
                        animate: true
                  };
            } else if (percentage <= 50) {
                  return {
                        gradient: 'from-yellow-500 to-lime-500',
                        textColor: 'text-yellow-400',
                        bgColor: 'bg-yellow-500/10',
                        message: null,
                        animate: false
                  };
            }
            return {
                  gradient: 'from-emerald-500 to-teal-500',
                  textColor: 'text-emerald-400',
                  bgColor: 'bg-emerald-500/10',
                  message: null,
                  animate: false
            };
      };

      const config = getUrgencyConfig();

      return (
            <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Stock Available</span>
                        <span className={`font-semibold ${config.textColor}`}>
                              {remaining.toLocaleString()} / {total.toLocaleString()}
                        </span>
                  </div>

                  {/* Progress bar */}
                  <div
                        className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={remaining}
                        aria-valuemin={0}
                        aria-valuemax={total}
                        aria-label={`${remaining} out of ${total} items remaining`}
                  >
                        <div
                              className={`absolute inset-y-0 left-0 bg-linear-to-r ${config.gradient} rounded-full transition-all duration-500 ${
                                    config.animate ? 'animate-pulse-subtle' : ''
                              }`}
                              style={{ width: `${percentage}%` }}
                        />

                        {/* Shine effect */}
                        <div
                              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                              style={{
                                    transform: 'translateX(-100%)',
                                    animation: 'shimmer 2s infinite'
                              }}
                        />
                  </div>

                  {/* Urgency message */}
                  {config.message && (
                        <div
                              className={`flex items-center justify-center gap-1 text-sm font-medium ${config.textColor} ${config.animate ? 'animate-pulse' : ''}`}
                        >
                              {config.message}
                        </div>
                  )}
            </div>
      );
}
