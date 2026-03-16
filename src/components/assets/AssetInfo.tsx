interface AssetInfoProps {
      isLive: boolean;
      isUpcoming: boolean;
      saleName?: string;
      category: string;
      name: string;
      price: number;
      salePrice?: number;
      compareAtPrice?: number;
      stock: number;
      stockRemaining: number;
      totalStock: number;
      stockPercentage: number;
      timeUntilStart: { days: number; hours: number; minutes: number; seconds: number };
      description: string;
}

export function AssetInfo({
      isLive,
      isUpcoming,
      saleName,
      category,
      name,
      price,
      salePrice,
      compareAtPrice,
      stock,
      stockRemaining,
      totalStock,
      stockPercentage,
      timeUntilStart,
      description
}: AssetInfoProps) {
      return (
            <div className="flex flex-col">
                  <div className="mb-8 border-b-2 border-(--border-default) pb-8 relative">
                        {/* Flash Sale Name (if applicable) */}
                        {(isLive || isUpcoming) && saleName && (
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
                                          {saleName}
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
                                                      ? `${timeUntilStart.days}d ${String(
                                                              timeUntilStart.hours
                                                        ).padStart(2, '0')}h`
                                                      : `${String(timeUntilStart.hours).padStart(
                                                              2,
                                                              '0'
                                                        )}:${String(
                                                              timeUntilStart.minutes
                                                        ).padStart(2, '0')}:${String(
                                                              timeUntilStart.seconds
                                                        ).padStart(2, '0')}`}
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
            </div>
      );
}
