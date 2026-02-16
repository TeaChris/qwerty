import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '../../lib';
import type { Product } from '../../types';
import { LoadingScreen } from '../../components';
import { useFlashSale } from '../../hooks/useFlashSale';

export const Route = createLazyFileRoute('/products/$productId')({
      component: ProductDetailComponent
});

function ProductDetailComponent() {
      const { productId } = Route.useParams();
      const [product, setProduct] = useState<Product | null>(null);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      const {
            status: saleStatus,
            timeRemaining,
            timeUntilStart,
            leaderboard,
            purchase: initiateFlashPurchase,
            isPurchasing: isFlashPurchasing
      } = useFlashSale(productId);

      useEffect(() => {
            const fetchProduct = async () => {
                  try {
                        setIsLoading(true);
                        const { data, error } = await api<{ status: string; data: { product: Product } }>(
                              `/products/${productId}`
                        );

                        if (error) throw new Error('Communication breakdown: Resource unavailable');
                        if (data) setProduct(data.data.product);
                  } catch (err: unknown) {
                        const message = err instanceof Error ? err.message : 'Unknown communication breakdown';
                        setError(message);
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchProduct();
      }, [productId]);

      if (isLoading) return <LoadingScreen message="Linking with product node..." progress={60} />;

      if (error || !product) {
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

      const { name, description, price, compareAtPrice, images, category, stock } = product;
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
                  {(isLive || isUpcoming) && (
                        <div className="bg-(--accent-primary) text-black py-2 px-4 overflow-hidden relative group">
                              <div className="container mx-auto flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                          <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase animate-pulse">
                                                {isLive ? 'LIVE_ACQUISITION_WINDOW' : 'UPCOMING_ACQUISITION'}
                                          </span>
                                          <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">
                                                FLASH_SALE_PROTOCOL_0{saleStatus?._id?.slice(-2).toUpperCase() || 'X'}
                                          </span>
                                    </div>
                                    <div className="flex items-center gap-2 mono-number font-black">
                                          <span className="text-xs uppercase opacity-70">
                                                {isLive ? 'EXPIRES_IN' : 'INITIALIZING_IN'}
                                          </span>
                                          <span className="text-lg">
                                                {isLive
                                                      ? `${timeRemaining.minutes}:${timeRemaining.seconds}`
                                                      : `${timeUntilStart.minutes}:${timeUntilStart.seconds}`}
                                          </span>
                                    </div>
                              </div>
                              {isLive && (
                                    <div
                                          className="absolute inset-0 bg-white/20 origin-left transition-transform duration-1000 ease-linear"
                                          style={{
                                                transform: `scaleX(${timeRemaining.totalSeconds / (saleStatus?.totalStock || 3600)})`
                                          }}
                                    />
                              )}
                        </div>
                  )}

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
                              <div className="space-y-8">
                                    <div className="relative aspect-square bg-(--bg-surface) border-2 border-(--border-default) overflow-hidden group">
                                          <img
                                                src={imageUrl}
                                                alt={name}
                                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                          />
                                          <div className="absolute top-6 left-6 flex flex-col gap-2">
                                                <span className="px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 text-xs font-black uppercase tracking-widest">
                                                      ID: {productId.slice(-8).toUpperCase()}
                                                </span>
                                                {isLive && (
                                                      <span className="px-4 py-2 bg-(--accent-primary) text-black text-[10px] font-black uppercase tracking-wider shadow-xl">
                                                            PRIORITY_ASSET
                                                      </span>
                                                )}
                                          </div>
                                    </div>

                                    {/* Real-time Buyer Feed */}
                                    <div className="border-2 border-(--border-default) p-6 space-y-4 bg-(--bg-surface)/50">
                                          <div className="flex items-center justify-between border-b border-(--border-default) pb-4">
                                                <h4 className="micro-text font-black uppercase tracking-[0.2em] text-(--accent-primary)">
                                                      LIVE_ACQUISITION_FEED
                                                </h4>
                                                <span className="text-[10px] font-bold text-(--text-muted)">
                                                      {leaderboard.length} RECENT_LINKS
                                                </span>
                                          </div>
                                          <div className="space-y-3 h-[200px] overflow-y-auto custom-scrollbar">
                                                {leaderboard.length > 0 ? (
                                                      leaderboard.map((entry, idx) => (
                                                            <div
                                                                  key={idx}
                                                                  className="flex items-center justify-between p-3 bg-(--bg-elevated) border border-(--border-default) animate-in fade-in slide-in-from-left-4 duration-500"
                                                                  style={{ animationDelay: `${idx * 100}ms` }}
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
                                                                        {new Date(
                                                                              entry.purchasedAt
                                                                        ).toLocaleTimeString()}
                                                                  </span>
                                                            </div>
                                                      ))
                                                ) : (
                                                      <div className="h-full flex flex-col items-center justify-center text-(--text-muted) border-2 border-dashed border-(--border-default)">
                                                            <p className="micro-text uppercase">WAITING_FOR_UPLINK</p>
                                                      </div>
                                                )}
                                          </div>
                                    </div>
                              </div>

                              {/* Technical Data & Acquisition */}
                              <div className="flex flex-col">
                                    <div className="mb-8 border-b-2 border-(--border-default) pb-8 relative">
                                          <p className="micro-text text-(--accent-primary) font-black mb-2 tracking-[0.2em]">
                                                {category}
                                          </p>
                                          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                                                {name}
                                          </h1>

                                          <div className="flex items-center gap-4">
                                                <div className="text-4xl font-black mono-number text-gradient">
                                                      ${(isLive ? salePrice : price)?.toLocaleString()}
                                                </div>
                                                {(compareAtPrice || (isLive && price)) && (
                                                      <div className="text-xl text-(--text-muted) line-through mono-number">
                                                            ${(isLive ? price : compareAtPrice)?.toLocaleString()}
                                                      </div>
                                                )}
                                                {isLive && price && (
                                                      <span className="px-3 py-1 bg-(--data-danger)/10 border border-(--data-danger)/20 text-(--data-danger) text-[10px] font-black uppercase">
                                                            -{Math.round((1 - salePrice! / price) * 100)}%_REDUCTION
                                                      </span>
                                                )}
                                          </div>
                                    </div>

                                    <div className="space-y-8 mb-12">
                                          {/* Stock Progress Bar */}
                                          <div className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                      <h4 className="micro-text text-(--text-muted) uppercase font-bold tracking-widest">
                                                            Available_Units
                                                      </h4>
                                                      <span className="text-xs font-black mono-number">
                                                            {stockRemaining} / {totalStock}
                                                      </span>
                                                </div>
                                                <div className="h-4 bg-(--bg-elevated) border border-(--border-default) p-0.5 relative overflow-hidden">
                                                      <div
                                                            className={`h-full transition-all duration-1000 ease-out ${stockRemaining < totalStock * 0.2 ? 'bg-(--data-danger)' : 'bg-(--accent-primary)'}`}
                                                            style={{ width: `${stockPercentage}%` }}
                                                      />
                                                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                                                </div>
                                                {isLive && stockRemaining < 10 && (
                                                      <p className="text-[10px] font-black text-(--data-danger) uppercase animate-pulse">
                                                            CRITICAL_STOCK_LEVEL: SECURE_UNIT_IMMEDIATELY
                                                      </p>
                                                )}
                                          </div>

                                          <div>
                                                <h4 className="micro-text text-(--text-muted) mb-3 uppercase font-bold tracking-widest">
                                                      Specifications
                                                </h4>
                                                <p className="text-(--text-secondary) leading-relaxed">{description}</p>
                                          </div>

                                          <div className="flex items-center gap-4 p-4 bg-(--bg-elevated) border-l-4 border-(--accent-primary)">
                                                <div className="w-12 h-12 rounded-full bg-(--accent-primary)/10 flex items-center justify-center">
                                                      <div className="w-6 h-6 border-2 border-(--accent-primary) border-t-transparent animate-spin rounded-full" />
                                                </div>
                                                <div>
                                                      <p className="micro-text text-(--text-muted) uppercase font-bold">
                                                            Encryption_Status
                                                      </p>
                                                      <p className="text-xs font-black uppercase text-(--data-success)">
                                                            ACTIVE_SECURE_NODE_LINKED
                                                      </p>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="mt-auto space-y-6">
                                          <button
                                                onClick={handleAcquisition}
                                                className={`w-full py-6 font-black uppercase text-xl tracking-widest transition-all transform hover:-translate-y-1 shadow-2xl active:translate-y-0 disabled:opacity-50 disabled:grayscale relative overflow-hidden group ${isLive ? 'bg-(--accent-primary) hover:bg-white text-black' : 'bg-white text-black'}`}
                                                disabled={stockRemaining === 0 || isFlashPurchasing || isUpcoming}
                                          >
                                                <span className="relative z-10">
                                                      {isFlashPurchasing
                                                            ? 'PROCESSING_ACQUISITION...'
                                                            : isUpcoming
                                                              ? 'INITIALIZING_WINDOW...'
                                                              : isLive
                                                                ? 'SECURE_FLASH_UNIT'
                                                                : 'INITIATE_ACQUISITION'}
                                                </span>
                                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
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
                              </div>
                        </div>
                  </main>
            </div>
      );
}
