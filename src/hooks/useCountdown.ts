import { useState, useEffect, useCallback, useRef } from 'react';

interface CountdownResult {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      totalSeconds: number;
      isExpired: boolean;
      isUrgent: boolean; // Less than 1 minute remaining
}

export function useCountdown(targetDate: string | Date | null): CountdownResult {
      const calculateTimeLeft = useCallback((): CountdownResult => {
            if (!targetDate) {
                  return {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                        totalSeconds: 0,
                        isExpired: true,
                        isUrgent: false
                  };
            }

            const target = new Date(targetDate).getTime();
            const now = Date.now();
            const difference = target - now;

            if (difference <= 0) {
                  return {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                        totalSeconds: 0,
                        isExpired: true,
                        isUrgent: false
                  };
            }

            const totalSeconds = Math.floor(difference / 1000);
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            const isUrgent = totalSeconds <= 60;

            return { days, hours, minutes, seconds, totalSeconds, isExpired: false, isUrgent };
      }, [targetDate]);

      const [timeLeft, setTimeLeft] = useState<CountdownResult>(calculateTimeLeft);
      const intervalRef = useRef<number | null>(null);

      useEffect(() => {
            // Initial calculation is already done by useState(calculateTimeLeft)

            // Update every second
            intervalRef.current = window.setInterval(() => {
                  const newTimeLeft = calculateTimeLeft();
                  setTimeLeft(newTimeLeft);

                  // Clear interval if expired
                  if (newTimeLeft.isExpired && intervalRef.current) {
                        clearInterval(intervalRef.current);
                  }
            }, 1000);

            return () => {
                  if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                  }
            };
      }, [calculateTimeLeft]);

      return timeLeft;
}
