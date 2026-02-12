import { Link } from '@tanstack/react-router';
import { useAuthStore } from '../../stores/auth.store';
import { UserAvatar } from '../UserAvatar';

interface AdminHeaderProps {
      title: string;
      subtitle: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
      const { user } = useAuthStore();

      return (
            <header className="border-b-2 border-(--border-default) glass sticky top-0 z-50">
                  <div className="container mx-auto px-6 py-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-center gap-6">
                                    <Link
                                          to="/"
                                          className="w-10 h-10 bg-(--bg-elevated) border-2 border-(--border-default) flex items-center justify-center font-black hover:border-(--accent-primary) transition-colors"
                                          title="Back to Mission Control"
                                    >
                                          ⬅️
                                    </Link>
                                    <div>
                                          <h1 className="text-2xl font-black tracking-tight uppercase">{title}</h1>
                                          <p className="micro-text text-(--text-muted) text-xs mt-1 uppercase">
                                                {subtitle}
                                          </p>
                                    </div>
                              </div>

                              {/* Admin Navigation */}
                              <nav className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                                    <AdminNavLink to="/admin/dashboard" label="DASHBOARD" icon="📊" />
                                    <AdminNavLink to="/admin/products" label="PRODUCTS" icon="📦" />
                                    <AdminNavLink to="/admin/flash-sales" label="FLASH SALES" icon="⚡" />
                              </nav>

                              <div className="hidden md:flex items-center gap-4 border-l-2 border-(--border-default) pl-4">
                                    <div className="text-right">
                                          <div className="mono-number text-xs font-bold text-(--text-primary)">
                                                {user?.username}
                                          </div>
                                          <div className="micro-text text-[10px] text-(--accent-primary) font-black">
                                                ADMIN_LEVEL_ACCESS
                                          </div>
                                    </div>
                                    <UserAvatar username={user?.username || 'A'} size="sm" />
                              </div>
                        </div>
                  </div>
            </header>
      );
}

function AdminNavLink({ to, label, icon }: { to: string; label: string; icon: string }) {
      return (
            <Link
                  to={to}
                  activeProps={{
                        className: 'bg-(--accent-primary) text-white border-(--accent-primary)'
                  }}
                  inactiveProps={{
                        className:
                              'bg-(--bg-elevated) text-(--text-secondary) border-(--border-default) hover:border-(--accent-primary)'
                  }}
                  className="px-4 py-2 border-2 font-bold text-xs transition-colors flex items-center gap-2 whitespace-nowrap"
            >
                  <span>{icon}</span>
                  {label}
            </Link>
      );
}
