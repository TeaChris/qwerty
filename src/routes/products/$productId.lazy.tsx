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
            leaderboardTotal,
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
                        <div
                              className={`py-2 px-4 overflow-hidden relative group ${isLive ? 'bg-(--accent-primary) text-black' : 'bg-(--data-warning) text-black'}`}
                        >
                              <div className="container mx-auto flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                          <span
                                                className={`px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase ${isLive ? 'animate-pulse' : ''}`}
                                          >
                                                {isLive ? '● LIVE_NOW' : '○ LAUNCHING_SOON'}
                                          </span>
                                          {saleStatus?.saleName && (
                                                <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">
                                                      {saleStatus.saleName}
                                                </span>
                                          )}
                                    </div>
                                    <div className="flex items-center gap-2 mono-number font-black">
                                          <span className="text-xs uppercase opacity-70">
                                                {isLive ? 'EXPIRES_IN' : 'STARTS_IN'}
                                          </span>
                                          <span className="text-lg">
                                                {isLive
                                                      ? `${String(timeRemaining.hours).padStart(2, '0')}:${String(timeRemaining.minutes).padStart(2, '0')}:${String(timeRemaining.seconds).padStart(2, '0')}`
                                                      : timeUntilStart.days > 0
                                                        ? `${timeUntilStart.days}d ${String(timeUntilStart.hours).padStart(2, '0')}:${String(timeUntilStart.minutes).padStart(2, '0')}:${String(timeUntilStart.seconds).padStart(2, '0')}`
                                                        : `${String(timeUntilStart.hours).padStart(2, '0')}:${String(timeUntilStart.minutes).padStart(2, '0')}:${String(timeUntilStart.seconds).padStart(2, '0')}`}
                                          </span>
                                    </div>
                              </div>
                              {isLive && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
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
                                                      ID: {productId.slice(-8).toUpperCase()}
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

                              {/* Technical Data & Acquisition */}
                              <div className="flex flex-col">
                                    <div className="mb-8 border-b-2 border-(--border-default) pb-8 relative">
                                          {/* Flash Sale Name (if applicable) */}
                                          {(isLive || isUpcoming) && saleStatus?.saleName && (
                                                <div
                                                      className={`mb-4 px-4 py-3 border-l-4 ${
                                                            isLive
                                                                  ? 'border-(--accent-primary) bg-(--accent-primary)/5'
                                                                  : 'border-(--data-warning) bg-(--data-warning)/5'
                                                      }`}
                                                >
                                                      <p className="micro-text text-(--text-muted) uppercase font-bold tracking-widest mb-1">
                                                            {isLive ? 'ACTIVE_FLASH_SALE' : 'SCHEDULED_FLASH_SALE'}
                                                      </p>
                                                      <h2 className="text-2xl font-black uppercase tracking-tight">
                                                            {saleStatus.saleName}
                                                      </h2>
                                                </div>
                                          )}

                                          <p className="micro-text text-(--accent-primary) font-black mb-2 tracking-[0.2em]">
                                                {category}
                                          </p>
                                          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                                                {name}
                                          </h1>

                                          <div className="flex items-center gap-4">
                                                <div
                                                      className={`text-4xl font-black mono-number ${
                                                            isLive || isUpcoming
                                                                  ? 'text-gradient'
                                                                  : 'text-(--text-primary)'
                                                      }`}
                                                >
                                                      ${(isLive || isUpcoming ? salePrice : price)?.toLocaleString()}
                                                </div>
                                                {(isLive || isUpcoming) &&
                                                      price &&
                                                      salePrice &&
                                                      price !== salePrice && (
                                                            <>
                                                                  <div className="text-xl text-(--text-muted) line-through mono-number">
                                                                        ${price.toLocaleString()}
                                                                  </div>
                                                                  <span className="px-3 py-1 bg-(--data-danger)/10 border border-(--data-danger)/20 text-(--data-danger) text-[10px] font-black uppercase">
                                                                        -{Math.round((1 - salePrice! / price) * 100)}
                                                                        %_OFF
                                                                  </span>
                                                            </>
                                                      )}
                                                {!isLive && !isUpcoming && compareAtPrice && (
                                                      <div className="text-xl text-(--text-muted) line-through mono-number">
                                                            ${compareAtPrice.toLocaleString()}
                                                      </div>
                                                )}
                                          </div>
                                    </div>

                                    <div className="space-y-8 mb-12">
                                          {/* Stock Progress Bar */}
                                          {(isLive || isUpcoming) && (
                                                <div
                                                      className={`space-y-3 p-4 border-2 ${
                                                            isLive
                                                                  ? 'border-(--accent-primary)/30 bg-(--accent-primary)/5'
                                                                  : 'border-(--data-warning)/30 bg-(--data-warning)/5'
                                                      }`}
                                                >
                                                      <div className="flex justify-between items-end">
                                                            <h4 className="micro-text text-(--text-muted) uppercase font-bold tracking-widest">
                                                                  {isLive ? 'UNITS_REMAINING' : 'STOCK_ALLOCATED'}
                                                            </h4>
                                                            <span className="text-xs font-black mono-number">
                                                                  {stockRemaining} / {totalStock}
                                                            </span>
                                                      </div>
                                                      <div className="h-5 bg-(--bg-elevated) border border-(--border-default) p-0.5 relative overflow-hidden">
                                                            <div
                                                                  className={`h-full transition-all duration-1000 ease-out ${
                                                                        stockRemaining < totalStock * 0.2
                                                                              ? 'bg-(--data-danger) animate-pulse'
                                                                              : stockRemaining < totalStock * 0.5
                                                                                ? 'bg-(--data-warning)'
                                                                                : 'bg-(--accent-primary)'
                                                                  }`}
                                                                  style={{ width: `${stockPercentage}%` }}
                                                            />
                                                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                                                      </div>
                                                      {isLive && stockRemaining < 10 && (
                                                            <p className="text-[10px] font-black text-(--data-danger) uppercase animate-pulse flex items-center gap-2">
                                                                  <span>⚠️</span>
                                                                  CRITICAL_STOCK: {stockRemaining} LEFT
                                                            </p>
                                                      )}
                                                      {isUpcoming && (
                                                            <p className="text-[10px] font-black text-(--data-warning) uppercase flex items-center gap-2">
                                                                  <span>⏱</span>
                                                                  SALE_BEGINS_IN:{' '}
                                                                  {timeUntilStart.days > 0
                                                                        ? `${timeUntilStart.days}d ${String(timeUntilStart.hours).padStart(2, '0')}h`
                                                                        : `${String(timeUntilStart.hours).padStart(2, '0')}:${String(timeUntilStart.minutes).padStart(2, '0')}:${String(timeUntilStart.seconds).padStart(2, '0')}`}
                                                            </p>
                                                      )}
                                                </div>
                                          )}

                                          {/* Regular stock indicator for non-flash sale products */}
                                          {!isLive && !isUpcoming && (
                                                <div className="space-y-3">
                                                      <div className="flex justify-between items-end">
                                                            <h4 className="micro-text text-(--text-muted) uppercase font-bold tracking-widest">
                                                                  Available_Units
                                                            </h4>
                                                            <span className="text-xs font-black mono-number">
                                                                  {stock} IN_STOCK
                                                            </span>
                                                      </div>
                                                      <div className="h-4 bg-(--bg-elevated) border border-(--border-default) p-0.5 relative overflow-hidden">
                                                            <div
                                                                  className="h-full bg-(--border-default) transition-all duration-1000 ease-out"
                                                                  style={{
                                                                        width: `${Math.min((stock / 100) * 100, 100)}%`
                                                                  }}
                                                            />
                                                      </div>
                                                </div>
                                          )}

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
                              </div>
                        </div>
                  </main>
            </div>
      );
}
