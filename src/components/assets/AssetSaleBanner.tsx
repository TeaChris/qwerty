interface AssetSaleBannerProps {
      isLive: boolean;
      isUpcoming: boolean;
      saleName?: string;
      timeRemaining: { hours: number; minutes: number; seconds: number };
      timeUntilStart: { days: number; hours: number; minutes: number; seconds: number };
}

export function AssetSaleBanner({
      isLive,
      isUpcoming,
      saleName,
      timeRemaining,
      timeUntilStart
}: AssetSaleBannerProps) {
      if (!isLive && !isUpcoming) return null;

      return (
            <div
                  className={`py-2 px-4 overflow-hidden relative group ${
                        isLive ? 'bg-(--accent-primary) text-black' : 'bg-(--data-warning) text-black'
                  }`}
            >
                  <div className="container mx-auto flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                              <span
                                    className={`px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase ${
                                          isLive ? 'animate-pulse' : ''
                                    }`}
                              >
                                    {isLive ? '● LIVE_NOW' : '○ LAUNCHING_SOON'}
                              </span>
                              {saleName && (
                                    <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">
                                          {saleName}
                                    </span>
                              )}
                        </div>
                        <div className="flex items-center gap-2 mono-number font-black">
                              <span className="text-xs uppercase opacity-70">
                                    {isLive ? 'EXPIRES_IN' : 'STARTS_IN'}
                              </span>
                              <span className="text-lg">
                                    {isLive
                                          ? `${String(timeRemaining.hours).padStart(2, '0')}:${String(
                                                  timeRemaining.minutes
                                            ).padStart(2, '0')}:${String(timeRemaining.seconds).padStart(
                                                  2,
                                                  '0'
                                            )}`
                                          : timeUntilStart.days > 0
                                            ? `${timeUntilStart.days}d ${String(
                                                    timeUntilStart.hours
                                              ).padStart(2, '0')}:${String(
                                                    timeUntilStart.minutes
                                              ).padStart(2, '0')}:${String(
                                                    timeUntilStart.seconds
                                              ).padStart(2, '0')}`
                                            : `${String(timeUntilStart.hours).padStart(2, '0')}:${String(
                                                    timeUntilStart.minutes
                                              ).padStart(2, '0')}:${String(
                                                    timeUntilStart.seconds
                                              ).padStart(2, '0')}`}
                              </span>
                        </div>
                  </div>
                  {isLive && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
            </div>
      );
}
