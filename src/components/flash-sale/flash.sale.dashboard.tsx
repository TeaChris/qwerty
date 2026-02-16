import { useFlashSale, useLeaderboard } from '../../hooks';
import { ProductCard } from './product.card';
import { Leaderboard } from './leaderboard';

export function FlashSaleDashboard() {
      const {
            status,
            timeRemaining,
            timeUntilStart,
            isPurchasing,
            purchase,
            isLoading: isSaleLoading
      } = useFlashSale();

      const { leaderboard, isLoading: isLeaderboardLoading, total: leaderboardTotal } = useLeaderboard();

      if (!status && isSaleLoading) {
            return (
                  <div className="min-h-screen flex items-center justify-center bg-slate-950">
                        <div className="flex flex-col items-center gap-4">
                              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                              <p className="text-slate-500 font-medium animate-pulse">Initializing Flash Sale...</p>
                        </div>
                  </div>
            );
      }

      if (!status) {
            return (
                  <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
                        <div className="text-center space-y-4">
                              <h2 className="text-2xl font-bold text-white">No active sale found</h2>
                              <p className="text-slate-400">Please check back later for upcoming events.</p>
                        </div>
                  </div>
            );
      }

      return (
            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl animate-in fade-in duration-700">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Main Product Section */}
                        <div className="lg:col-span-7 xl:col-span-8">
                              <ProductCard
                                    status={status}
                                    timeRemaining={timeRemaining}
                                    timeUntilStart={timeUntilStart}
                                    isPurchasing={isPurchasing}
                                    onPurchase={purchase}
                              />
                        </div>

                        {/* Sidebar / Leaderboard Section */}
                        <div className="lg:col-span-5 xl:col-span-4 h-full lg:sticky lg:top-8 self-stretch">
                              <Leaderboard
                                    entries={leaderboard}
                                    isLoading={isLeaderboardLoading}
                                    total={leaderboardTotal}
                              />
                        </div>
                  </div>
            </div>
      );
}
