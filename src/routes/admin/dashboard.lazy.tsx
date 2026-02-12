import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth.store';
import { getDashboardStats, type DashboardStats } from '../../lib/admin.api';
import { toast } from 'sonner';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { LoadingScreen } from '../../components';

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
            return <LoadingScreen message="Aggregating System Intelligence" progress={stats ? 90 : 40} />;
      }

      return (
            <div className="min-h-screen bg-(--bg-canvas) text-(--text-primary)">
                  <AdminHeader title="Admin Dashboard" subtitle="System Control Center" />

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
