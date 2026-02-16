import type { FC } from 'react';
import { Link } from '@tanstack/react-router';

import type { Product } from '../types';

interface ProductCardProps {
      product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
      const { _id, name, price, compareAtPrice, images, category, stock } = product;
      const imageUrl = images[0] || 'https://via.placeholder.com/400x400?text=NO+IMAGE';

      return (
            <Link
                  to="/products/$productId"
                  params={{ productId: _id }}
                  className="group relative inline-block w-full break-inside-avoid mb-6 bg-(--bg-elevated) border-2 border-(--border-default) hover:border-(--accent-primary) transition-all duration-300"
            >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-black/50 border-b-2 border-(--border-default) group-hover:border-(--accent-primary) transition-colors">
                        <img
                              src={imageUrl}
                              alt={name}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                    {category}
                              </span>
                        </div>

                        {/* Stock Status */}
                        <div className="absolute bottom-4 left-4">
                              <p
                                    className={`text-[10px] font-bold uppercase tracking-tighter ${stock > 0 ? 'text-(--data-success)' : 'text-(--data-danger)'}`}
                              >
                                    {stock > 0 ? `INSTOCK_UNIT_COUNT: ${stock}` : 'RESOURCE_EXHAUSTED'}
                              </p>
                        </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 grow flex flex-col justify-between">
                        <div>
                              <h3 className="text-lg font-black uppercase tracking-tighter leading-tight group-hover:text-(--accent-primary) transition-colors mb-2">
                                    {name}
                              </h3>

                              <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-xl font-black text-white mono-number">
                                          ${price.toLocaleString()}
                                    </span>
                                    {compareAtPrice && (
                                          <span className="text-xs text-(--text-muted) line-through mono-number">
                                                ${compareAtPrice.toLocaleString()}
                                          </span>
                                    )}
                              </div>
                        </div>

                        <div className="pt-4 border-t border-(--border-default) flex items-center justify-between">
                              <span className="micro-text text-[10px] text-(--text-muted) uppercase">View Details</span>
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
