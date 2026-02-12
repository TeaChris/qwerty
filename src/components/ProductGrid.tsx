import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { getProducts, type Product } from '../lib/admin.api';
import { ProductCard } from './ProductCard';
import { Skeleton } from './ui/Skeleton';

export const ProductGrid: FC = () => {
      const [products, setProducts] = useState<Product[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            const fetchProducts = async () => {
                  try {
                        setIsLoading(true);
                        const { data, error } = await getProducts(1, 12, { isActive: true });

                        if (error) throw new Error('System link failure: Unable to fetch assets');
                        if (data) setProducts(data.data.products);
                  } catch (err: unknown) {
                        const message = err instanceof Error ? err.message : 'Unknown link failure';
                        setError(message);
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchProducts();
      }, []);

      if (error) {
            return (
                  <div className="p-8 border-2 border-(--data-danger) bg-(--data-danger)/10 text-(--data-danger) font-bold text-center uppercase tracking-widest">
                        ⚠️ CRITICAL_ERROR: {error}
                  </div>
            );
      }

      return (
            <section className="py-12">
                  <div className="flex items-center justify-between mb-8 border-b-2 border-(--border-default) pb-4">
                        <h2 className="text-2xl font-black uppercase tracking-tighter">AVAILABLE_ASSETS</h2>
                        <div className="flex items-center gap-4 text-xs font-bold text-(--text-muted)">
                              <span className="mono-number">[ {products.length} ]</span>
                              UNITS_ONLINE
                        </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {isLoading ? (
                              Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                          key={i}
                                          className="bg-(--bg-elevated) border-2 border-(--border-default) aspect-4/5 p-6 space-y-4"
                                    >
                                          <Skeleton className="w-full aspect-square" />
                                          <Skeleton className="h-6 w-3/4" />
                                          <Skeleton className="h-4 w-1/2" />
                                    </div>
                              ))
                        ) : products.length > 0 ? (
                              products.map(product => <ProductCard key={product._id} product={product} />)
                        ) : (
                              <div className="col-span-full py-20 text-center border-2 border-dashed border-(--border-default)">
                                    <p className="text-(--text-muted) font-bold uppercase tracking-widest">
                                          NO_ASSETS_IDENTIFIED_IN_SYSTEM
                                    </p>
                              </div>
                        )}
                  </div>
            </section>
      );
};
