import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.store';
import { getDashboardStats, type DashboardStats } from '../../lib/admin.api';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/admin/dashboard')({
      component: AdminDashboard
});

function AdminDashboard() {
      const { user, isLoading } = useAuthStore();
      const [stats, setStats] = useState<DashboardStats | null>(null);
      const [loadingStats, setLoadingStats] = useState(true);

      // Fetch dashboard stats
      useEffect(() => {
            const fetchStats = async () => {
                  setLoadingStats(true);
                  const { data, error } = await getDashboardStats();

                  if (error) {
                        toast.error('Failed to load dashboard stats');
                        console.error(error);
                  } else if (data) {
                        setStats(data.data.stats);
                  }

                  setLoadingStats(false);
            };

            if (user?.role === 'ADMIN') {
                  fetchStats();
            }
      }, [user]);

      // Redirect non-admin users
      if (!isLoading && (!user || user.role !== 'ADMIN')) {
            return <Navigate to="/" />;
      }

      if (isLoading || loadingStats) {
            return (
                  <div className="min-h-screen flex items-center justify-center bg-(--bg-canvas)">
                        <div className="text-(--text-primary) text-lg">Loading...</div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-(--bg-canvas)] text-(--text-primary)]">
                  {/* Header */}
                  <header className="border-b-2 border-(--border-default) glass sticky top-0 z-50">
                        <div className="container mx-auto px-6 py-4">
                              <div className="flex items-center justify-between">
                                    <div>
                                          <h1 className="text-2xl font-black tracking-tight">ADMIN DASHBOARD</h1>
                                          <p className="micro-text text-(--text-muted) text-xs mt-1">
                                                SYSTEM CONTROL CENTER
                                          </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                          <span className="mono-number text-sm text-(--text-secondary)">
                                                {user?.username}
                                          </span>
                                          <div className="px-3 py-1 bg-(--accent-primary) text-white text-xs font-bold rounded">
                                                ADMIN
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </header>

                  {/* Main Content */}
                  <main className="container mx-auto px-6 py-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                              <StatCard
                                    title="TOTAL USERS"
                                    value={stats?.totalUsers.toString() || '0'}
                                    icon="👥"
                                    color="var(--data-success)"
                              />
                              <StatCard
                                    title="PRODUCTS"
                                    value={stats?.totalProducts.toString() || '0'}
                                    icon="📦"
                                    color="var(--accent-primary)"
                              />
                              <StatCard
                                    title="ACTIVE SALES"
                                    value={stats?.activeFlashSales.toString() || '0'}
                                    icon="⚡"
                                    color="var(--data-warning)"
                              />
                              <StatCard
                                    title="NEW USERS (7D)"
                                    value={stats?.newUsersThisWeek.toString() || '0'}
                                    icon="📈"
                                    color="var(--data-danger)"
                              />
                        </div>

                        {/* Quick Actions */}
                        <div className="glass border-2 border-(--border-default)] p-6 mb-8">
                              <h2 className="text-lg font-black mb-4">QUICK ACTIONS</h2>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <ActionButton label="Create Product" icon="➕" href="/admin/products" />
                                    <ActionButton label="New Flash Sale" icon="⚡" href="/admin/flash-sales" />
                                    <ActionButton label="View Stats" icon="📊" href="/admin/dashboard" />
                              </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="glass border-2 border-(--border-default) p-6">
                              <h2 className="text-lg font-black mb-4">RECENT ACTIVITY</h2>
                              <div className="text-(--text-muted) text-center py-8">No recent activity</div>
                        </div>
                  </main>
            </div>
      );
}

interface StatCardProps {
      title: string;
      value: string;
      icon: string;
      color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
      return (
            <div className="glass border-2 border-(--border-default) p-6 hover:border-(--accent-primary) transition-all">
                  <div className="flex items-start justify-between mb-4">
                        <span className="text-3xl">{icon}</span>
                        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                  </div>
                  <div className="micro-text text-(--text-muted) text-xs mb-1">{title}</div>
                  <div className="text-3xl font-black mono-number" style={{ color }}>
                        {value}
                  </div>
            </div>
      );
}

interface ActionButtonProps {
      label: string;
      icon: string;
      href: string;
}

function ActionButton({ label, icon, href }: ActionButtonProps) {
      return (
            <a
                  href={href}
                  className="glass border-2 border-(--border-default) p-4 hover:border-(--accent-primary) hover:bg-(--bg-hover) transition-all text-left group block"
            >
                  <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                        <span className="font-bold text-sm text-(--text-secondary) group-hover:text-(--accent-primary) transition-colors">
                              {label}
                        </span>
                  </div>
            </a>
      );
}
