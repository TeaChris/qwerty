import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { FlashSaleDashboard } from '../components/flash-sale';
import { useAuth } from '../hooks';
import { UserDropdown, LiveBadge, ProductGrid } from '../components';
import { useAuthStore } from '../stores/auth.store';

export const Route = createLazyFileRoute('/')({
      component: IndexComponent
});

function IndexComponent() {
      const { isAuthenticated, isInitialized } = useAuth();
      const { user } = useAuthStore();

      // Root component handles loading state, so we're guaranteed to be initialized here
      // Protect the route - redirect to login if not authenticated
      if (isInitialized && !isAuthenticated) {
            return <Navigate to="/login" />;
      }

      return (
            <div
                  className="min-h-screen text-(--text-primary) selection:bg-(--accent-primary)/20"
                  style={{ background: 'var(--bg-canvas)' }}
            >
                  {/* Command Center Navigation */}
                  <nav className="border-b-2 border-(--border-default) glass sticky top-0 z-50 diagonal-accent">
                        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                              {/* Logo & Branding */}
                              <div className="flex items-center gap-4 animate-fade-in">
                                    <div
                                          className="w-12 h-12 bg-linear-to-br from-(--accent-primary) to-(--accent-secondary) flex items-center justify-center font-black text-white text-2xl shadow-lg glow-orange-sm"
                                          style={{
                                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                                          }}
                                    >
                                          F
                                    </div>
                                    <div>
                                          <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">
                                                FLASH<span className="text-gradient">RUSH</span>
                                          </h1>
                                          <p className="micro-text text-(--text-muted) text-[0.65rem]">
                                                MISSION CONTROL
                                          </p>
                                    </div>
                              </div>

                              {/* Status & User Actions */}
                              <div className="flex items-center gap-6 animate-fade-in stagger-1">
                                    <LiveBadge className="hidden md:flex" />
                                    <div className="hidden lg:flex items-center gap-2 text-sm">
                                          <div className="w-2 h-2 bg-(--data-success) rounded-full animate-pulse" />
                                          <span className="mono-number text-(--text-secondary)">
                                                SYSTEM OPERATIONAL
                                          </span>
                                    </div>
                                    <UserDropdown />
                              </div>
                        </div>
                  </nav>

                  {/* Main Content */}
                  <main className="container mx-auto px-4 lg:px-8 py-8">
                        {/* Personalized Hero Section */}
                        {user && (
                              <div className="mb-12 animate-fade-in-up">
                                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b-2 border-(--border-default)">
                                          <div>
                                                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
                                                      WELCOME BACK,
                                                </h2>
                                                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gradient leading-none">
                                                      {user.username}
                                                </h3>
                                          </div>
                                          <div className="flex flex-col items-start md:items-end gap-2">
                                                <p className="micro-text text-(--text-muted)">OPERATOR ID</p>
                                                <p className="mono-number text-(--text-secondary) text-sm">
                                                      {user.id?.slice(0, 12).toUpperCase() || 'N/A'}
                                                </p>
                                          </div>
                                    </div>
                              </div>
                        )}

                        {/* Flash Sale Dashboard */}
                        <div className="animate-fade-in-up stagger-2 mb-12">
                              <FlashSaleDashboard />
                        </div>

                        {/* Product Grid */}
                        <div className="animate-fade-in-up stagger-3">
                              <ProductGrid />
                        </div>
                  </main>

                  {/* Industrial Footer */}
                  <footer
                        className="mt-20 border-t-2 border-(--border-default) py-12"
                        style={{ background: 'var(--bg-surface)' }}
                  >
                        <div className="container mx-auto px-4 lg:px-8">
                              <div className="grid md:grid-cols-3 gap-8 mb-8">
                                    {/* Branding */}
                                    <div>
                                          <h4 className="text-xl font-black uppercase mb-4">FLASHRUSH</h4>
                                          <p className="text-sm text-(--text-secondary) leading-relaxed">
                                                High-performance real-time flash sale platform. Built for speed.
                                          </p>
                                    </div>

                                    {/* Links */}
                                    <div>
                                          <h5 className="micro-text text-(--text-muted) mb-4">QUICK LINKS</h5>
                                          <ul className="space-y-2">
                                                <li>
                                                      <a
                                                            href="#"
                                                            className="text-sm text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
                                                      >
                                                            Privacy Policy
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="#"
                                                            className="text-sm text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
                                                      >
                                                            Terms of Service
                                                      </a>
                                                </li>
                                                <li>
                                                      <a
                                                            href="#"
                                                            className="text-sm text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
                                                      >
                                                            Support Center
                                                      </a>
                                                </li>
                                          </ul>
                                    </div>

                                    {/* Status */}
                                    <div>
                                          <h5 className="micro-text text-(--text-muted) mb-4">SYSTEM STATUS</h5>
                                          <div className="flex items-center gap-2 text-sm mb-2">
                                                <div className="w-2 h-2 bg-(--data-success) rounded-full animate-pulse" />
                                                <span className="text-(--text-secondary)">All Systems Operational</span>
                                          </div>
                                          <p className="mono-number text-xs text-(--text-muted)">UPTIME: 99.9%</p>
                                    </div>
                              </div>

                              {/* Copyright */}
                              <div className="pt-8 border-t border-(--border-default)">
                                    <p className="text-center text-sm text-(--text-muted)">
                                          &copy; {new Date().getFullYear()} FLASHRUSH. All rights reserved.
                                    </p>
                              </div>
                        </div>
                  </footer>
            </div>
      );
}
