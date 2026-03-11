import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { getAnalytics } from '../../services/admin.service';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

type Period = 'daily' | 'weekly' | 'monthly';

export const SalesAnalytics: React.FC = () => {
      const [period, setPeriod] = useState<Period>('daily');
      const [loading, setLoading] = useState(true);
      const [data, setData] = useState<{
            salesStats: Array<{ _id: string; revenue: number; sales: number }>;
            revenueByAsset: Array<{
                  _id: string;
                  totalRevenue: number;
                  totalSales: number;
                  assetDetails: { name: string; price: number };
            }>;
      } | null>(null);

      useEffect(() => {
            const fetchData = async () => {
                  setLoading(true);
                  try {
                        const response = await getAnalytics(period);
                        if (response.data?.data) {
                              setData(response.data.data);
                        }
                  } catch (error) {
                        console.error('Failed to fetch analytics:', error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchData();
      }, [period]);

      const formatXAxis = (tickItem: string) => {
            try {
                  if (period === 'daily') {
                        return format(parseISO(tickItem), 'MMM dd');
                  } else if (period === 'monthly') {
                        return format(parseISO(`${tickItem}-01`), 'MMM yyyy');
                  }
                  return tickItem; // Weekly format is already YYYY-WW
            } catch {
                  return tickItem;
            }
      };

      if (loading && !data) {
            return (
                  <div className="glass border-2 border-(--border-default) p-8 text-center animate-pulse">
                        <div className="text-(--accent-primary) font-black">CALCULATING METRICS...</div>
                  </div>
            );
      }

      return (
            <div className="space-y-8">
                  {/* Period Selector */}
                  <div className="flex justify-between items-end">
                        <h2 className="text-xl font-black">SALES INTELLIGENCE</h2>
                        <div className="flex gap-2">
                              {(['daily', 'weekly', 'monthly'] as Period[]).map(p => (
                                    <button
                                          key={p}
                                          onClick={() => setPeriod(p)}
                                          className={`px-4 py-1 micro-text border-2 transition-all ${
                                                period === p
                                                      ? 'border-(--accent-primary) bg-(--accent-primary) text-white'
                                                      : 'border-(--border-default) text-(--text-muted) hover:border-(--text-secondary)'
                                          }`}
                                    >
                                          {p}
                                    </button>
                              ))}
                        </div>
                  </div>

                  {/* Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Revenue Chart */}
                        <div className="glass border-2 border-(--border-default) p-6">
                              <h3 className="micro-text text-(--text-muted) mb-6">REVENUE FLOW</h3>
                              <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={data?.salesStats}>
                                                <CartesianGrid
                                                      strokeDasharray="3 3"
                                                      stroke="var(--border-default)"
                                                      vertical={false}
                                                />
                                                <XAxis
                                                      dataKey="_id"
                                                      tickFormatter={formatXAxis}
                                                      stroke="var(--text-muted)"
                                                      fontSize={10}
                                                      tickLine={false}
                                                      axisLine={false}
                                                />
                                                <YAxis
                                                      stroke="var(--text-muted)"
                                                      fontSize={10}
                                                      tickLine={false}
                                                      axisLine={false}
                                                      tickFormatter={value => `$${value}`}
                                                />
                                                <Tooltip
                                                      contentStyle={{
                                                            backgroundColor: 'var(--bg-surface)',
                                                            border: '2px solid var(--border-default)',
                                                            borderRadius: '0'
                                                      }}
                                                      itemStyle={{ color: 'var(--accent-primary)' }}
                                                      cursor={{ fill: 'var(--bg-hover)' }}
                                                />
                                                <Bar
                                                      dataKey="revenue"
                                                      fill="var(--accent-primary)"
                                                      radius={[2, 2, 0, 0]}
                                                />
                                          </BarChart>
                                    </ResponsiveContainer>
                              </div>
                        </div>

                        {/* Sales Volume Chart */}
                        <div className="glass border-2 border-(--border-default) p-6">
                              <h3 className="micro-text text-(--text-muted) mb-6">SALES VOLUME</h3>
                              <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                          <LineChart data={data?.salesStats}>
                                                <CartesianGrid
                                                      strokeDasharray="3 3"
                                                      stroke="var(--border-default)"
                                                      vertical={false}
                                                />
                                                <XAxis
                                                      dataKey="_id"
                                                      tickFormatter={formatXAxis}
                                                      stroke="var(--text-muted)"
                                                      fontSize={10}
                                                      tickLine={false}
                                                      axisLine={false}
                                                />
                                                <YAxis
                                                      stroke="var(--text-muted)"
                                                      fontSize={10}
                                                      tickLine={false}
                                                      axisLine={false}
                                                />
                                                <Tooltip
                                                      contentStyle={{
                                                            backgroundColor: 'var(--bg-surface)',
                                                            border: '2px solid var(--border-default)',
                                                            borderRadius: '0'
                                                      }}
                                                      itemStyle={{ color: 'var(--data-success)' }}
                                                />
                                                <Line
                                                      type="monotone"
                                                      dataKey="sales"
                                                      stroke="var(--data-success)"
                                                      strokeWidth={3}
                                                      dot={{ r: 4, fill: 'var(--data-success)', strokeWidth: 0 }}
                                                      activeDot={{ r: 6, strokeWidth: 0 }}
                                                />
                                          </LineChart>
                                    </ResponsiveContainer>
                              </div>
                        </div>
                  </div>

                  {/* Revenue by Asset */}
                  <div className="glass border-2 border-(--border-default) overflow-hidden">
                        <div className="p-6 border-b-2 border-(--border-default) flex justify-between items-center bg-(--bg-hover)">
                              <h3 className="micro-text text-(--text-muted)">ASSET PERFORMANCE</h3>
                              <span className="micro-text text-(--accent-primary)">BY REVENUE</span>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                    <thead>
                                          <tr className="border-b-2 border-(--border-default) micro-text bg-(--bg-canvas)">
                                                <th className="px-6 py-4 font-black">ASSET</th>
                                                <th className="px-6 py-4 font-black">UNIT PRICE</th>
                                                <th className="px-6 py-4 font-black">TOTAL SALES</th>
                                                <th className="px-6 py-4 font-black">TOTAL REVENUE</th>
                                          </tr>
                                    </thead>
                                    <tbody className="divide-y-2 divide-(--border-default)">
                                          {data?.revenueByAsset.map(asset => (
                                                <tr key={asset._id} className="hover:bg-(--bg-hover) transition-colors">
                                                      <td className="px-6 py-4 font-black text-sm">
                                                            {asset.assetDetails.name}
                                                      </td>
                                                      <td className="px-6 py-4 mono-number text-sm text-(--text-secondary)">
                                                            ${asset.assetDetails.price.toLocaleString()}
                                                      </td>
                                                      <td className="px-6 py-4 mono-number text-sm text-(--data-success)">
                                                            {asset.totalSales}
                                                      </td>
                                                      <td className="px-6 py-4 mono-number text-sm font-black text-(--accent-primary)">
                                                            ${asset.totalRevenue.toLocaleString()}
                                                      </td>
                                                </tr>
                                          ))}
                                          {(!data || data.revenueByAsset.length === 0) && (
                                                <tr>
                                                      <td
                                                            colSpan={4}
                                                            className="px-6 py-8 text-center text-(--text-muted) micro-text"
                                                      >
                                                            NO PERFORMANCE DATA AVAILABLE
                                                      </td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
};
