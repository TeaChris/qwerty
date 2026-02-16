import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { api } from '../../lib';
import type { Product } from '../../types';
import { LoadingScreen } from '../../components';

export const Route = createLazyFileRoute('/products/$productId')({
      component: ProductDetailComponent
});

function ProductDetailComponent() {
      const { productId } = Route.useParams();
      const [product, setProduct] = useState<Product | null>(null);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

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

      const { name, description, price, compareAtPrice, images, category, stock, tags } = product;
      const imageUrl = images[0] || 'https://via.placeholder.com/800x800?text=NO+IMAGE';

      return (
            <div className="min-h-screen bg-(--bg-canvas) text-(--text-primary)">
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
                              <div className="space-y-6">
                                    <div className="relative aspect-square bg-(--bg-surface) border-2 border-(--border-default) overflow-hidden">
                                          <img
                                                src={imageUrl}
                                                alt={name}
                                                className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                                          />
                                          <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 text-xs font-black uppercase tracking-widest">
                                                      ID: {productId.slice(-8).toUpperCase()}
                                                </span>
                                          </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                          {images.map((img: string, idx: number) => (
                                                <div
                                                      key={idx}
                                                      className="aspect-square bg-(--bg-surface) border border-(--border-default) hover:border-(--accent-primary) transition-colors cursor-pointer overflow-hidden"
                                                >
                                                      <img
                                                            src={img}
                                                            alt={`${name} view ${idx}`}
                                                            className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                                                      />
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              {/* Technical Data & Acquisition */}
                              <div className="flex flex-col">
                                    <div className="mb-8 border-b-2 border-(--border-default) pb-8">
                                          <p className="micro-text text-(--accent-primary) font-black mb-2 tracking-[0.2em]">
                                                {category}
                                          </p>
                                          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                                                {name}
                                          </h1>

                                          <div className="flex items-center gap-4">
                                                <div className="text-4xl font-black mono-number text-gradient">
                                                      ${price.toLocaleString()}
                                                </div>
                                                {compareAtPrice && (
                                                      <div className="text-xl text-(--text-muted) line-through mono-number">
                                                            ${compareAtPrice.toLocaleString()}
                                                      </div>
                                                )}
                                          </div>
                                    </div>

                                    <div className="space-y-8 mb-12">
                                          <div>
                                                <h4 className="micro-text text-(--text-muted) mb-3 uppercase font-bold tracking-widest">
                                                      Specifications
                                                </h4>
                                                <p className="text-(--text-secondary) leading-relaxed">{description}</p>
                                          </div>

                                          <div className="flex flex-wrap gap-2">
                                                {tags.map((tag: string) => (
                                                      <span
                                                            key={tag}
                                                            className="px-3 py-1 bg-(--bg-elevated) border border-(--border-default) text-[10px] font-bold uppercase tracking-tighter text-(--text-muted)"
                                                      >
                                                            #{tag}
                                                      </span>
                                                ))}
                                          </div>

                                          <div className="p-4 bg-(--bg-elevated) border-l-4 border-(--accent-primary) flex items-center justify-between">
                                                <div className="space-y-1">
                                                      <p className="micro-text text-(--text-muted) uppercase">
                                                            Stock Status
                                                      </p>
                                                      <p
                                                            className={`font-black uppercase tracking-widest ${stock > 0 ? 'text-(--data-success)' : 'text-(--data-danger)'}`}
                                                      >
                                                            {stock > 0
                                                                  ? `ONLINE_UNITS: ${stock}`
                                                                  : 'RESOURCE_EXHAUSTED'}
                                                      </p>
                                                </div>
                                                <div className="text-right">
                                                      <p className="micro-text text-(--text-muted) uppercase">
                                                            Estimated Transit
                                                      </p>
                                                      <p className="font-bold uppercase tracking-widest">72_HOURS</p>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="mt-auto space-y-4">
                                          <button
                                                className="w-full py-6 bg-(--accent-primary) hover:bg-white text-black font-black uppercase text-xl tracking-widest transition-all transform hover:-translate-y-1 shadow-2xl active:translate-y-0 disabled:opacity-50 disabled:grayscale"
                                                disabled={stock === 0}
                                          >
                                                INITIATE_ACQUISITION
                                          </button>
                                          <p className="text-center micro-text text-(--text-muted) uppercase tracking-widest">
                                                SECURE_TERMINAL_ENCRYPTION_ACTIVE
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </main>
            </div>
      );
}
