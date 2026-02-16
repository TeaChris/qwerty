import { LeaderboardItem } from './leaderboard.item';
import type { LeaderboardEntry } from '../../types/sale.types';

interface LeaderboardProps {
      entries: LeaderboardEntry[];
      isLoading: boolean;
      total: number;
}

export function Leaderboard({ entries, isLoading, total }: LeaderboardProps) {
      return (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden h-full flex flex-col shadow-2xl">
                  <div className="p-6 md:p-8 border-b border-slate-800 flex items-center justify-between">
                        <div className="space-y-1">
                              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span role="img" aria-label="trophy">
                                          🏆
                                    </span>{' '}
                                    Successful Buyers
                              </h3>
                              <p className="text-sm text-slate-500 font-medium">Join the hall of fame</p>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1">
                              <span className="text-sm font-bold text-orange-500">{total} total</span>
                        </div>
                  </div>

                  <div className="grow overflow-y-auto custom-scrollbar p-6 space-y-3">
                        {entries.length === 0 && !isLoading ? (
                              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                                          <svg
                                                className="w-8 h-8 text-slate-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                          </svg>
                                    </div>
                                    <p className="text-slate-400 font-medium">Waiting for the first purchase...</p>
                              </div>
                        ) : (
                              entries.map(entry => (
                                    <LeaderboardItem key={`${entry.userId}-${entry.purchasedAt}`} entry={entry} />
                              ))
                        )}

                        {isLoading && entries.length > 0 && (
                              <div className="py-4 text-center">
                                    <div className="inline-block w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                        )}
                  </div>

                  <div className="p-4 bg-slate-950/50 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              Real-time updates enabled
                        </div>
                  </div>
            </div>
      );
}
