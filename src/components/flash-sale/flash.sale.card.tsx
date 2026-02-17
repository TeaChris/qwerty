import { Link } from '@tanstack/react-router';
import type { FC } from 'react';

import type { FlashSale } from '../../types/sales';
import { useCountdown } from '../../hooks';

interface FlashSaleCardProps {
      flashSale: FlashSale;
      // Populated product details from backend
      product?: {
            _id: string;
            name: string;
            images: string[];
      };
}

export const FlashSaleCard: FC<FlashSaleCardProps> = ({ flashSale, product }) => {
      const now = new Date();
      const startTime = new Date(flashSale.startTime);
      const endTime = new Date(flashSale.endTime);

      const isActive = flashSale.status === 'active' && now >= startTime && now <= endTime;
      const isScheduled = flashSale.status === 'scheduled' && now < startTime;

      // Countdown for active sales (time until end)
      const timeRemaining = useCountdown(isActive ? flashSale.endTime : null);

      // Countdown for scheduled sales (time until start)
      const timeUntilStart = useCountdown(isScheduled ? flashSale.startTime : null);

      // Get first product for display (flash sales can have multiple products, but we show the first)
      const firstProduct = flashSale.products[0];

      // productId could be a string ID or a populated product object
      const rawProductId = firstProduct?.productId;
      const productIdString =
            typeof rawProductId === 'string'
                  ? rawProductId
                  : typeof rawProductId === 'object' && rawProductId !== null && '_id' in rawProductId
                    ? (rawProductId as { _id: string })._id
                    : '';

      const productName = product?.name || 'Flash Sale Product';
      const productImage = product?.images?.[0] || 'https://via.placeholder.com/400x400?text=FLASH+SALE';
      const salePrice = firstProduct?.salePrice || 0;
      const stockRemaining = firstProduct?.stockRemaining || 0;
      const stockLimit = firstProduct?.stockLimit || 0;
      const stockPercentage = stockLimit > 0 ? (stockRemaining / stockLimit) * 100 : 0;

      if (!isActive && !isScheduled) return null;

      return (
            <Link
                  to="/products/$productId"
                  params={{ productId: productIdString }}
                  className="group relative inline-block w-full break-inside-avoid mb-6 bg-(--bg-elevated) border-2 border-(--border-default) hover:border-(--accent-primary) transition-all duration-300"
            >
                  {/* Status Badge - Top Corner */}
                  <div className="absolute top-4 right-4 z-10">
                        {isActive ? (
                              <span className="px-3 py-1 bg-(--accent-primary) text-black text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                                    LIVE_OPERATION
                              </span>
                        ) : (
                              <span className="px-3 py-1 bg-(--data-warning) text-black text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    UPCOMING_MISSION
                              </span>
                        )}
                  </div>

                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-black/50 border-b-2 border-(--border-default) group-hover:border-(--accent-primary) transition-colors aspect-square">
                        <img
                              src={productImage}
                              alt={productName}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

                        {/* Title Badge */}
                        <div className="absolute bottom-4 left-4 right-4">
                              <span className="block px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-xs font-black uppercase tracking-tight text-white truncate">
                                    {flashSale.title}
                              </span>
                        </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                        {/* Product Name */}
                        <h3 className="text-lg font-black uppercase tracking-tighter leading-tight group-hover:text-(--accent-primary) transition-colors">
                              {productName}
                        </h3>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                              <span className="text-xl font-black text-(--accent-primary) mono-number">
                                    ${salePrice.toLocaleString()}
                              </span>
                              <span className="text-xs text-(--text-muted) uppercase font-bold">FLASH_PRICE</span>
                        </div>

                        {/* Countdown Timer */}
                        {isActive && (
                              <div className="bg-(--bg-surface) border border-(--border-default) p-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                          <span className="micro-text text-(--text-muted) uppercase font-bold">
                                                EXPIRES_IN
                                          </span>
                                          <div className="flex items-center gap-1 mono-number text-sm font-black">
                                                <span>{String(timeRemaining.hours).padStart(2, '0')}</span>:
                                                <span>{String(timeRemaining.minutes).padStart(2, '0')}</span>:
                                                <span>{String(timeRemaining.seconds).padStart(2, '0')}</span>
                                          </div>
                                    </div>
                                    {timeRemaining.isUrgent && (
                                          <p className="text-[10px] font-black text-(--data-danger) uppercase animate-pulse">
                                                ⚡ CRITICAL_WINDOW
                                          </p>
                                    )}
                              </div>
                        )}

                        {isScheduled && (
                              <div className="bg-(--bg-surface) border border-(--border-default) p-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                          <span className="micro-text text-(--text-muted) uppercase font-bold">
                                                LAUNCHES_IN
                                          </span>
                                          <div className="flex items-center gap-1 mono-number text-sm font-black">
                                                {timeUntilStart.days > 0 && (
                                                      <>
                                                            <span>{String(timeUntilStart.days).padStart(2, '0')}d</span>
                                                            :
                                                      </>
                                                )}
                                                <span>{String(timeUntilStart.hours).padStart(2, '0')}</span>:
                                                <span>{String(timeUntilStart.minutes).padStart(2, '0')}</span>:
                                                <span>{String(timeUntilStart.seconds).padStart(2, '0')}</span>
                                          </div>
                                    </div>
                              </div>
                        )}

                        {/* Stock Indicator */}
                        {isActive && (
                              <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                          <span className="micro-text text-(--text-muted) uppercase font-bold">
                                                UNITS_REMAINING
                                          </span>
                                          <span className="text-xs font-black mono-number">
                                                {stockRemaining} / {stockLimit}
                                          </span>
                                    </div>
                                    <div className="h-2 bg-(--bg-surface) border border-(--border-default) p-0.5 overflow-hidden">
                                          <div
                                                className={`h-full transition-all duration-1000 ${stockPercentage < 20 ? 'bg-(--data-danger)' : 'bg-(--accent-primary)'}`}
                                                style={{ width: `${stockPercentage}%` }}
                                          />
                                    </div>
                              </div>
                        )}

                        {/* CTA Footer */}
                        <div className="pt-4 border-t border-(--border-default) flex items-center justify-between">
                              <span className="micro-text text-[10px] text-(--text-muted) uppercase">
                                    {isActive ? 'Secure Unit Now' : 'View Details'}
                              </span>
                              <div className="w-8 h-8 rounded-full border border-(--border-default) group-hover:bg-(--accent-primary) group-hover:border-(--accent-primary) flex items-center justify-center transition-all duration-300">
                                    <span className="text-xs group-hover:text-black">→</span>
                              </div>
                        </div>
                  </div>

                  {/* Corner Accent */}
                  <div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-(--accent-primary) opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                  />
            </Link>
      );
};
