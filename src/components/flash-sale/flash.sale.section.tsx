import { useEffect, useState, type FC } from 'react';

import { FlashSaleCard } from './flash.sale.card';
import { Skeleton } from '../ui';
import type { FlashSale } from '../../types/sales';
import { getFlashSales } from '../../services';

export const FlashSaleSection: FC = () => {
      const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            const fetchFlashSales = async () => {
                  try {
                        setIsLoading(true);

                        // Fetch both active and scheduled flash sales
                        const [activeResponse, scheduledResponse] = await Promise.all([
                              getFlashSales(1, 10, 'active'),
                              getFlashSales(1, 10, 'scheduled')
                        ]);

                        const activeSales = activeResponse.data?.data.flashSales || [];
                        const scheduledSales = scheduledResponse.data?.data.flashSales || [];

                        // Combine and sort: active first, then scheduled by start time
                        const combined = [...activeSales, ...scheduledSales].sort((a, b) => {
                              if (a.status === 'active' && b.status !== 'active') return -1;
                              if (a.status !== 'active' && b.status === 'active') return 1;
                              return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
                        });

                        setFlashSales(combined);
                  } catch (err: unknown) {
                        const message =
                              err instanceof Error
                                    ? err.message
                                    : 'System link failure: Unable to fetch priority missions';
                        setError(message);
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchFlashSales();
      }, []);

      // Don't render section if no flash sales
      if (!isLoading && flashSales.length === 0) return null;

      if (error) {
            return (
                  <section className="py-8 mb-12">
                        <div className="p-6 border-2 border-(--data-danger) bg-(--data-danger)/10 text-(--data-danger) font-bold text-center uppercase tracking-widest">
                              ⚠️ CRITICAL_ERROR: {error}
                        </div>
                  </section>
            );
      }

      return (
            <section className="py-8 mb-12 border-b-2 border-(--border-default)">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-(--accent-primary)/30">
                        <div className="flex items-center gap-4">
                              <div className="w-3 h-8 bg-(--accent-primary)" />
                              <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tighter text-gradient">
                                          PRIORITY_MISSIONS
                                    </h2>
                                    <p className="micro-text text-(--text-muted) uppercase tracking-[0.2em] mt-1">
                                          Limited Time Operations
                                    </p>
                              </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-(--text-muted)">
                              <span className="mono-number">[ {flashSales.length} ]</span>
                              <span className="hidden md:inline">ACTIVE_PROTOCOLS</span>
                              <div className="w-2 h-2 bg-(--accent-primary) rounded-full animate-pulse" />
                        </div>
                  </div>

                  {/* Flash Sale Grid */}
                  <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {isLoading
                              ? // Loading skeletons
                                [1, 2, 3, 4].map(i => (
                                      <div
                                            key={i}
                                            className="break-inside-avoid mb-6 bg-(--bg-elevated) border-2 border-(--border-default) p-6 space-y-4"
                                      >
                                            <Skeleton className="w-full aspect-square" />
                                            <Skeleton className="h-6 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                      </div>
                                ))
                              : flashSales.map(flashSale => {
                                      // Extract populated product from the first product in the array
                                      const firstProduct = flashSale.products[0];
                                      // Backend populates productId with product details
                                      const populatedProduct = firstProduct?.productId as
                                            | { _id: string; name: string; images: string[] }
                                            | string
                                            | undefined;

                                      // Determine if product is populated (object) or just a string ID
                                      const product =
                                            typeof populatedProduct === 'object' && populatedProduct !== null
                                                  ? populatedProduct
                                                  : undefined;

                                      return (
                                            <FlashSaleCard
                                                  key={flashSale._id}
                                                  flashSale={flashSale}
                                                  product={
                                                        product
                                                              ? {
                                                                      _id: product._id,
                                                                      name: product.name,
                                                                      images: product.images
                                                                }
                                                              : undefined
                                                  }
                                            />
                                      );
                                })}
                  </div>
            </section>
      );
};
