import type { FlashSale } from '../../types';

export interface AdminFlashSaleCardProps {
      sale: FlashSale;
      onActivate: (id: string) => Promise<void | boolean> | void;
      onDeactivate: (id: string) => Promise<void | boolean> | void;
      onViewLogs: (id: string, title: string) => void;
}

export function AdminFlashSaleCard({ sale, onActivate, onDeactivate, onViewLogs }: AdminFlashSaleCardProps) {
      const statusColors = {
            ended: 'var(--text-muted)',
            active: 'var(--data-success)',
            cancelled: 'var(--data-danger)',
            scheduled: 'var(--data-warning)'
      };

      return (
            <div className="glass border-2 border-(--border-default) p-6 hover:border-(--accent-primary) transition-all">
                  <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                              <h3 className="text-lg font-black mb-1">{sale.title}</h3>
                              <p className="text-sm text-(--text-muted) mb-3">{sale.description}</p>
                              <div className="flex gap-4 text-xs text-(--text-secondary)">
                                    <span>
                                          ⏰ {new Date(sale.startTime).toLocaleString()} -{' '}
                                          {new Date(sale.endTime).toLocaleString()}
                                    </span>
                                    <span>📦 {sale.assets.length} assets</span>
                              </div>
                        </div>
                        <div className="flex items-center gap-3">
                              <span
                                    className="px-3 py-1 text-xs font-bold text-white uppercase"
                                    style={{ backgroundColor: statusColors[sale.status as keyof typeof statusColors] }}
                              >
                                    {sale.status}
                              </span>
                              {sale.status === 'scheduled' && (
                                    <button
                                          onClick={() => onActivate(sale._id)}
                                          className="px-3 py-1 bg-(--data-success) text-white text-xs font-bold hover:opacity-90"
                                    >
                                          ACTIVATE
                                    </button>
                              )}
                              {sale.status === 'active' && (
                                    <button
                                          onClick={() => onDeactivate(sale._id)}
                                          className="px-3 py-1 bg-(--data-danger) text-white text-xs font-bold hover:opacity-90"
                                    >
                                          DEACTIVATE
                                    </button>
                              )}
                              {sale.status === 'ended' && (
                                    <button
                                          onClick={() => onViewLogs(sale._id, sale.title)}
                                          className="px-3 py-1 bg-(--accent-primary) text-black text-xs font-bold hover:bg-white transition-colors"
                                    >
                                          VIEW LOGS
                                    </button>
                              )}
                        </div>
                  </div>
            </div>
      );
}
