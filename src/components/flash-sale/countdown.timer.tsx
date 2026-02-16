interface CountdownTimerProps {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      isUrgent?: boolean;
      label?: string;
}

interface TimeUnitProps {
      value: number;
      label: string;
      isUrgent?: boolean;
}

function TimeUnit({ value, label, isUrgent }: TimeUnitProps) {
      const baseClasses = 'flex flex-col items-center';
      const valueClasses = `text-3xl md:text-4xl font-bold tabular-nums transition-colors duration-300 ${
            isUrgent ? 'text-red-400' : 'text-white'
      }`;

      return (
            <div className={baseClasses}>
                  <div className={`relative ${isUrgent ? 'animate-pulse' : ''}`}>
                        <span className={valueClasses}>{String(value).padStart(2, '0')}</span>
                  </div>
                  <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider mt-1">{label}</span>
            </div>
      );
}

function TimeSeparator() {
      return (
            <div className="flex items-center justify-center px-1 md:px-2">
                  <span className="text-2xl md:text-3xl font-bold text-slate-500">:</span>
            </div>
      );
}

export function CountdownTimer({
      days,
      hours,
      minutes,
      seconds,
      isUrgent = false,
      label = 'Time Remaining'
}: CountdownTimerProps) {
      return (
            <div
                  className="flex flex-col items-center gap-4"
                  role="timer"
                  aria-label={`${label}: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
            >
                  <span className="text-sm text-slate-400 uppercase tracking-wider font-medium">{label}</span>

                  <div className="flex items-center gap-1 md:gap-2 bg-slate-800/50 rounded-xl px-4 md:px-6 py-4 border border-slate-700/50">
                        {days > 0 && (
                              <>
                                    <TimeUnit value={days} label="Days" isUrgent={isUrgent} />
                                    <TimeSeparator />
                              </>
                        )}
                        <TimeUnit value={hours} label="Hours" isUrgent={isUrgent} />
                        <TimeSeparator />
                        <TimeUnit value={minutes} label="Mins" isUrgent={isUrgent} />
                        <TimeSeparator />
                        <TimeUnit value={seconds} label="Secs" isUrgent={isUrgent} />
                  </div>

                  {isUrgent && (
                        <span className="text-red-400 text-sm font-medium animate-pulse">
                              ⚡ Hurry! Sale ending soon!
                        </span>
                  )}
            </div>
      );
}
