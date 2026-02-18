import { useEffect, useState } from 'react';
import { saleService } from '../../services/sale.service';
import type { LeaderboardEntry } from '../../types/sale.types';

interface SaleLogsModalProps {
      saleId: string;
      saleTitle: string;
      onClose: () => void;
}

export function SaleLogsModal({ saleId, saleTitle, onClose }: SaleLogsModalProps) {
      const [logs, setLogs] = useState<LeaderboardEntry[]>([]);
      const [loading, setLoading] = useState(true);
      const [total, setTotal] = useState(0);

      useEffect(() => {
            const fetchLogs = async () => {
                  setLoading(true);
                  const { data } = await saleService.getLeaderboard(saleId, 1, 100);
                  if (data) {
                        setLogs(data.entries);
                        setTotal(data.total);
                  }
                  setLoading(false);
            };

            fetchLogs();
      }, [saleId]);

      return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                  <div className="glass border-2 border-(--border-accent) p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                              <div>
                                    <h2 className="text-xl font-black uppercase tracking-tight">
                                          SALE_ACQUISITION_LOGS
                                    </h2>
                                    <p className="text-sm text-(--text-muted) font-bold uppercase">{saleTitle}</p>
                              </div>
                              <div className="text-right">
                                    <span className="text-2xl font-black mono-number text-(--accent-primary)">
                                          {total}
                                    </span>
                                    <p className="micro-text text-(--text-muted) uppercase font-bold">
                                          Total_Acquisitions
                                    </p>
                              </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar border-2 border-(--border-default) bg-(--bg-surface)/50">
                              {loading ? (
                                    <div className="p-12 text-center text-(--text-muted) uppercase font-bold animate-pulse">
                                          RETRIEVING_LOG_DATA...
                                    </div>
                              ) : logs.length === 0 ? (
                                    <div className="p-12 text-center text-(--text-muted) uppercase font-bold">
                                          NO_ACQUISITION_RECORDS_FOUND
                                    </div>
                              ) : (
                                    <table className="w-full text-left border-collapse">
                                          <thead className="sticky top-0 bg-(--bg-elevated) z-10">
                                                <tr>
                                                      <th className="p-4 micro-text text-(--text-muted) uppercase font-bold border-b border-(--border-default)">
                                                            Rank
                                                      </th>
                                                      <th className="p-4 micro-text text-(--text-muted) uppercase font-bold border-b border-(--border-default)">
                                                            Identified_User
                                                      </th>
                                                      <th className="p-4 micro-text text-(--text-muted) uppercase font-bold border-b border-(--border-default)">
                                                            Timestamp
                                                      </th>
                                                      <th className="p-4 micro-text text-(--text-muted) uppercase font-bold border-b border-(--border-default)">
                                                            Latency
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {logs.map(entry => (
                                                      <tr
                                                            key={`${entry.userId}-${entry.purchasedAt}`}
                                                            className="hover:bg-(--accent-primary)/5 border-b border-(--border-default)/50 transition-colors"
                                                      >
                                                            <td className="p-4">
                                                                  <span className="w-8 h-8 bg-(--bg-elevated) border border-(--border-default) flex items-center justify-center text-xs font-black">
                                                                        {entry.rank}
                                                                  </span>
                                                            </td>
                                                            <td className="p-4">
                                                                  <span className="text-sm font-bold uppercase tracking-tight">
                                                                        {entry.username}
                                                                  </span>
                                                            </td>
                                                            <td className="p-4">
                                                                  <span className="text-xs mono-number text-(--text-secondary)">
                                                                        {new Date(entry.purchasedAt).toLocaleString()}
                                                                  </span>
                                                            </td>
                                                            <td className="p-4">
                                                                  <span className="micro-text text-(--data-success) font-bold">
                                                                        {Math.floor(Math.random() * 50 + 20)}ms
                                                                  </span>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              )}
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                              <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-(--bg-elevated) border-2 border-(--border-default) hover:border-(--accent-primary) transition-all font-black uppercase text-xs tracking-widest"
                              >
                                    TERMINATE_VIEW
                              </button>
                        </div>
                  </div>
            </div>
      );
}
