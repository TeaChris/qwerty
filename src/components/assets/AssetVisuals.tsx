interface LeaderboardEntry {
      userId: string;
      username: string;
      purchasedAt: string;
      rank?: number;
}

interface AssetVisualsProps {
      imageUrl: string;
      name: string;
      assetId: string;
      isLive: boolean;
      isUpcoming: boolean;
      leaderboardTotal: number;
      leaderboard: LeaderboardEntry[];
}

export function AssetVisuals({
      imageUrl,
      name,
      assetId,
      isLive,
      isUpcoming,
      leaderboardTotal,
      leaderboard
}: AssetVisualsProps) {
      return (
            <div className="space-y-8">
                  <div
                        className={`relative aspect-square bg-(--bg-surface) border-2 overflow-hidden group ${
                              isLive
                                    ? 'border-(--accent-primary) shadow-[0_0_30px_rgba(255,107,0,0.3)] animate-pulse'
                                    : isUpcoming
                                      ? 'border-(--data-warning)'
                                      : 'border-(--border-default)'
                        }`}
                  >
                        <img
                              src={imageUrl}
                              alt={name}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                              <span className="px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 text-xs font-black uppercase tracking-widest">
                                    ID: {assetId.slice(-8).toUpperCase()}
                              </span>
                              {isLive && (
                                    <span className="px-4 py-2 bg-(--accent-primary) text-black text-[10px] font-black uppercase tracking-wider shadow-xl animate-pulse flex items-center gap-2">
                                          <span className="w-2 h-2 bg-black rounded-full animate-ping"></span>
                                          LIVE_SALE
                                    </span>
                              )}
                              {isUpcoming && (
                                    <span className="px-4 py-2 bg-(--data-warning) text-black text-[10px] font-black uppercase tracking-wider shadow-xl">
                                          ⏱ SCHEDULED
                                    </span>
                              )}
                        </div>
                  </div>

                  {/* Real-time Buyer Feed - ONLY for Live Flash Sales */}
                  {isLive && (
                        <div className="border-2 border-(--accent-primary)/30 p-6 space-y-4 bg-(--bg-surface)/50">
                              <div className="flex items-center justify-between border-b border-(--border-default) pb-4">
                                    <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 bg-(--accent-primary) rounded-full animate-pulse"></div>
                                          <h4 className="micro-text font-black uppercase tracking-[0.2em] text-(--accent-primary)">
                                                LIVE_ACQUISITION_FEED
                                          </h4>
                                    </div>
                                    <div className="flex items-center gap-4">
                                          <span className="text-[10px] font-bold text-(--text-muted)">
                                                {leaderboardTotal} TOTAL
                                          </span>
                                          <span className="text-[10px] font-bold text-(--text-muted)">
                                                {leaderboard.length} RECENT
                                          </span>
                                    </div>
                              </div>
                              <div className="space-y-3 h-[200px] overflow-y-auto custom-scrollbar">
                                    {leaderboard.length > 0 ? (
                                          leaderboard.map((entry, idx) => (
                                                <div
                                                      key={`${entry.userId}-${entry.purchasedAt}-${idx}`}
                                                      className="flex items-center justify-between p-3 bg-(--bg-elevated) border border-(--border-default) animate-in fade-in slide-in-from-left-4 duration-500"
                                                      style={{ animationDelay: `${idx * 50}ms` }}
                                                >
                                                      <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-(--accent-primary)/10 border border-(--accent-primary)/20 flex items-center justify-center text-[10px] font-black text-(--accent-primary)">
                                                                  {entry.rank || idx + 1}
                                                            </div>
                                                            <span className="text-xs font-bold uppercase tracking-tight">
                                                                  {entry.username}
                                                            </span>
                                                      </div>
                                                      <span className="micro-text opacity-50">
                                                            {(() => {
                                                                  const seconds = Math.floor(
                                                                        (Date.now() -
                                                                              new Date(
                                                                                    entry.purchasedAt
                                                                              ).getTime()) /
                                                                              1000
                                                                  );
                                                                  if (seconds < 60)
                                                                        return `${seconds}s ago`;
                                                                  const minutes = Math.floor(
                                                                        seconds / 60
                                                                  );
                                                                  if (minutes < 60)
                                                                        return `${minutes}m ago`;
                                                                  const hours = Math.floor(
                                                                        minutes / 60
                                                                  );
                                                                  return `${hours}h ago`;
                                                            })()}
                                                      </span>
                                                </div>
                                          ))
                                    ) : (
                                          <div className="h-full flex flex-col items-center justify-center text-(--text-muted) border-2 border-dashed border-(--border-default)">
                                                <p className="micro-text uppercase">
                                                      WAITING_FOR_FIRST_ACQUISITION
                                                </p>
                                          </div>
                                    )}
                              </div>
                        </div>
                  )}
            </div>
      );
}
