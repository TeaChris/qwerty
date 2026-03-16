import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '../../lib';
import type { Asset } from '../../types';
import { LoadingScreen } from '../../components';
import { useFlashSale } from '../../hooks/useFlashSale';
import { AssetSaleBanner, AssetVisuals, AssetInfo, AssetAcquisitionPanel } from '../../components/assets';

export const Route = createLazyFileRoute('/assets/$assetId')({
      component: AssetDetailComponent
});

function AssetDetailComponent() {
      const { assetId } = Route.useParams();
      const [asset, setAsset] = useState<Asset | null>(null);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      const {
            status: saleStatus,
            timeRemaining,
            timeUntilStart,
            leaderboard,
            leaderboardTotal,
            purchase: initiateFlashPurchase,
            isPurchasing: isFlashPurchasing
      } = useFlashSale(assetId);

      useEffect(() => {
            const fetchAsset = async () => {
                  try {
                        setIsLoading(true);
                        const { data, error } = await api<{ status: string; data: { asset: Asset } }>(
                              `/assets/${assetId}`
                        );

                        if (error) throw new Error('Communication breakdown: Resource unavailable');
                        if (data) setAsset(data.data.asset);
                  } catch (err: unknown) {
                        const message = err instanceof Error ? err.message : 'Unknown communication breakdown';
                        setError(message);
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchAsset();
      }, [assetId]);

      if (isLoading) return <LoadingScreen message="Linking with asset node..." progress={60} />;

      if (error || !asset) {
            return (
                  <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-(--bg-canvas)">
                        <div className="max-w-md w-full border-2 border-(--data-danger) p-8 bg-(--data-danger)/10 text-center space-y-4">
                              <h2 className="text-3xl font-black uppercase text-(--data-danger)">LINK_ERROR</h2>
                              <p className="text-(--text-secondary) font-bold">{error || 'RESOUCE_NOT_FOUND'}</p>
                              <Link
                                    to="/"
                                    className="inline-block px-6 py-3 bg-(--accent-primary) text-black font-black uppercase tracking-widest hover:bg-white transition-colors"
                              >
                                    Return to Control
                              </Link>
                        </div>
                  </div>
            );
      }

      const { name, description, price, compareAtPrice, images, category, stock } = asset;
      const imageUrl = images[0] || 'https://via.placeholder.com/800x800?text=NO+IMAGE';

      // Flash Sale Logic
      const isLive = saleStatus?.status === 'live';
      const isUpcoming = saleStatus?.status === 'upcoming';
      const salePrice = saleStatus?.priceAmount;
      const stockRemaining = saleStatus?.remainingStock ?? stock;
      const totalStock = saleStatus?.totalStock ?? stock;
      const stockPercentage = totalStock > 0 ? (stockRemaining / totalStock) * 100 : 0;

      const handleAcquisition = async () => {
            if (isLive) {
                  await initiateFlashPurchase();
            } else {
                  toast.success('Standard acquisition protocol initiated', {
                        description: 'Proceeding with standard checkout...'
                  });
            }
      };

      return (
            <div className="min-h-screen bg-(--bg-canvas) text-(--text-primary) selection:bg-(--accent-primary) selection:text-black">
                  {/* Real-time Sale Banner */}
                  <AssetSaleBanner
                        isLive={isLive}
                        isUpcoming={isUpcoming}
                        saleName={saleStatus?.saleName}
                        timeRemaining={timeRemaining}
                        timeUntilStart={timeUntilStart}
                  />

                  {/* Quick Nav */}
                  <div className="border-b border-(--border-default) py-4">
                        <div className="container mx-auto px-4 lg:px-8">
                              <Link
                                    to="/"
                                    className="text-xs font-bold text-(--text-muted) hover:text-(--accent-primary) uppercase tracking-widest flex items-center gap-2"
                              >
                                    ← RETURN_TO_ASSET_GRID
                              </Link>
                        </div>
                  </div>

                  <main className="container mx-auto px-4 lg:px-8 py-12">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                              {/* Visual Assets */}
                              <AssetVisuals
                                    imageUrl={imageUrl}
                                    name={name}
                                    assetId={assetId}
                                    isLive={isLive}
                                    isUpcoming={isUpcoming}
                                    leaderboardTotal={leaderboardTotal}
                                    leaderboard={leaderboard}
                              />

                              {/* Technical Data & Acquisition */}
                              <div className="flex flex-col">
                                    <AssetInfo
                                          isLive={isLive}
                                          isUpcoming={isUpcoming}
                                          saleName={saleStatus?.saleName}
                                          category={category}
                                          name={name}
                                          price={price}
                                          salePrice={salePrice}
                                          compareAtPrice={compareAtPrice}
                                          stock={stock}
                                          stockRemaining={stockRemaining}
                                          totalStock={totalStock}
                                          stockPercentage={stockPercentage}
                                          timeUntilStart={timeUntilStart}
                                          description={description}
                                    />

                                    <AssetAcquisitionPanel
                                          isLive={isLive}
                                          isUpcoming={isUpcoming}
                                          stockRemaining={stockRemaining}
                                          isFlashPurchasing={isFlashPurchasing}
                                          timeUntilStart={timeUntilStart}
                                          onAcquire={handleAcquisition}
                                    />
                              </div>
                        </div>
                  </main>
            </div>
      );
}
