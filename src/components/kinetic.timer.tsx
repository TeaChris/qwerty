import { type FC, useEffect, useState } from 'react';

interface KineticTimerProps {
      endsAt: string;
      className?: string;
      onExpire?: () => void;
}

export const KineticTimer: FC<KineticTimerProps> = ({ endsAt, className = '', onExpire }) => {
      const [timeLeft, setTimeLeft] = useState<{
            hours: number;
            minutes: number;
            seconds: number;
            isUrgent: boolean;
      }>({
            hours: 0,
            minutes: 0,
            seconds: 0,
            isUrgent: false
      });

      useEffect(() => {
            const calculateTimeLeft = () => {
                  const endTime = new Date(endsAt).getTime();
                  const now = new Date().getTime();
                  const difference = endTime - now;

                  if (difference <= 0) {
                        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isUrgent: false });
                        onExpire?.();
                        return;
                  }

                  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                  const minutes = Math.floor((difference / 1000 / 60) % 60);
                  const seconds = Math.floor((difference / 1000) % 60);
                  const isUrgent = difference < 60000; // Less than 1 minute

                  setTimeLeft({ hours, minutes, seconds, isUrgent });
            };

            calculateTimeLeft();
            const timer = setInterval(calculateTimeLeft, 1000);

            return () => clearInterval(timer);
      }, [endsAt, onExpire]);

      const formatNumber = (num: number) => num.toString().padStart(2, '0');

      return (
            <div className={`inline-flex items-center gap-2 ${className}`}>
                  <span className="text-(--text-muted) text-sm">⏱</span>
                  <span
                        className={`
                              mono-number text-xl font-bold
                              ${
                                    timeLeft.isUrgent
                                          ? 'text-(--data-danger) animate-pulse-glow'
                                          : 'text-(--accent-secondary)'
                              }
                        `}
                  >
                        {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
                  </span>
            </div>
      );
};
