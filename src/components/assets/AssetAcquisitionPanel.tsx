interface AssetAcquisitionPanelProps {
      isLive: boolean;
      isUpcoming: boolean;
      stockRemaining: number;
      isFlashPurchasing: boolean;
      timeUntilStart: { days: number; hours: number; minutes: number; seconds: number };
      onAcquire: () => void;
}

export function AssetAcquisitionPanel({
      isLive,
      isUpcoming,
      stockRemaining,
      isFlashPurchasing,
      timeUntilStart,
      onAcquire
}: AssetAcquisitionPanelProps) {
      return (
            <div className="mt-auto space-y-6">
                  <button
                        onClick={onAcquire}
                        className={`w-full py-6 font-black uppercase text-xl tracking-widest transition-all transform hover:-translate-y-1 shadow-2xl active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group ${
                              isLive
                                    ? 'bg-(--accent-primary) hover:bg-white text-black'
                                    : isUpcoming
                                      ? 'bg-(--data-warning)/20 border-2 border-(--data-warning) text-(--data-warning)'
                                      : 'bg-white text-black hover:bg-(--accent-primary)'
                        }`}
                        disabled={stockRemaining === 0 || isFlashPurchasing || isUpcoming}
                  >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                              {isFlashPurchasing ? (
                                    <>
                                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                          PROCESSING...
                                    </>
                              ) : isUpcoming ? (
                                    <>
                                          <span>⏱</span>
                                          SALE_STARTS_
                                          {timeUntilStart.days > 0
                                                ? `IN_${timeUntilStart.days}D`
                                                : 'SOON'}
                                    </>
                              ) : isLive ? (
                                    <>
                                          <span className="w-2 h-2 bg-black rounded-full animate-ping"></span>
                                          SECURE_FLASH_UNIT_NOW
                                    </>
                              ) : stockRemaining === 0 ? (
                                    'OUT_OF_STOCK'
                              ) : (
                                    'INITIATE_ACQUISITION'
                              )}
                        </span>
                        {!isUpcoming && !isFlashPurchasing && stockRemaining > 0 && (
                              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        )}
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                        <div className="border border-(--border-default) p-3 text-center bg-(--bg-surface)">
                              <p className="text-[10px] text-(--text-muted) uppercase font-bold">
                                    Latency
                              </p>
                              <p className="text-xs font-black uppercase">24ms_LINK</p>
                        </div>
                        <div className="border border-(--border-default) p-3 text-center bg-(--bg-surface)">
                              <p className="text-[10px] text-(--text-muted) uppercase font-bold">
                                    Network
                              </p>
                              <p className="text-xs font-black uppercase">GLOBAL_CDN</p>
                        </div>
                  </div>

                  <p className="text-center micro-text text-(--text-muted) uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-(--data-success) animate-ping" />
                        SECURE_TERMINAL_ENCRYPTION_ACTIVE
                  </p>
            </div>
      );
}
