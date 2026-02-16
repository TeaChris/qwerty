import { SaleStatusBadge } from './sale.status.badge';
import { CountdownTimer } from './countdown.timer';
import { StockIndicator } from './stock.indicator';
import { BuyButton } from './buy.button';
import type { SaleStatus } from '../../types/sale.types';
import type { useCountdown } from '../../hooks/useCountdown';

interface ProductCardProps {
      status: SaleStatus;
      timeRemaining: ReturnType<typeof useCountdown>;
      timeUntilStart: ReturnType<typeof useCountdown>;
      isPurchasing: boolean;
      onPurchase: () => void;
}

export function ProductCard({ status, timeRemaining, timeUntilStart, isPurchasing, onPurchase }: ProductCardProps) {
      const isLive = status.status === 'live';
      const isUpcoming = status.status === 'upcoming';
      const isSoldOut = status.status === 'sold_out';

      return (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-orange-500/10 group">
                  {/* Product Image Section */}
                  <div className="relative h-72 md:h-80 overflow-hidden">
                        <img
                              src={status.productImage}
                              alt={`${status.productName} - Flash sale product image`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={e => {
                                    (e.target as HTMLImageElement).src =
                                          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000';
                              }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />

                        {/* Status Badge Overlays */}
                        <div className="absolute top-4 left-4">
                              <SaleStatusBadge status={status.status} />
                        </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="grow overflow-y-auto custom-scrollbar p-6 space-y-3">
                        <div className="space-y-2">
                              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                    {status.productName}
                              </h2>
                              <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-extrabold text-orange-500">
                                          {status.priceCurrency} {status.priceAmount}
                                    </span>
                                    <span className="text-slate-500 line-through text-lg">
                                          {status.priceCurrency} {(status.priceAmount * 1.5).toFixed(2)}
                                    </span>
                              </div>
                        </div>

                        {/* Dynamic Display based on status */}
                        <div className="space-y-6">
                              {isUpcoming && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                          <CountdownTimer {...timeUntilStart} label="Sale Starts In" />
                                    </div>
                              )}

                              {isLive && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                          <CountdownTimer
                                                {...timeRemaining}
                                                isUrgent={timeRemaining.isUrgent}
                                                label="Deals Ends In"
                                          />
                                          <StockIndicator remaining={status.remainingStock} total={status.totalStock} />
                                    </div>
                              )}

                              {isSoldOut && (
                                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center space-y-2">
                                          <p className="text-xl font-bold text-slate-300">Waitlist Open</p>
                                          <p className="text-sm text-slate-500">
                                                This item is currently sold out. Join the waitlist to be notified of
                                                restocks.
                                          </p>
                                          <button className="text-orange-500 font-semibold hover:underline mt-2">
                                                Join Waitlist
                                          </button>
                                    </div>
                              )}
                        </div>

                        {/* Purchase Button */}
                        <div className="pt-4">
                              <BuyButton
                                    onClick={onPurchase}
                                    disabled={!isLive || isSoldOut}
                                    isLoading={isPurchasing}
                                    price={status.priceAmount}
                                    currency={status.priceCurrency}
                              />

                              <p className="text-center text-xs text-slate-500 mt-4">
                                    {isLive
                                          ? 'Limited time offer. Free shipping included.'
                                          : 'Prices subject to change when sale goes live.'}
                              </p>
                        </div>
                  </div>
            </div>
      );
}
