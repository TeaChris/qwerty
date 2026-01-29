import { createRootRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { useAuth } from '../store/auth';
import '../index.css';

const RootComponent = () => {
      const { pathname } = useLocation();
      const { user, logout } = useAuth();
      const isAuthPage = pathname === '/login' || pathname === '/register';

      if (isAuthPage) {
            return (
                  <main className="min-h-screen bg-bg-primary">
                        <Outlet />
                        <Toaster position="top-right" richColors />
                  </main>
            );
      }

      return (
            <div className="grid grid-cols-[8%_92%] max-md:grid-cols-[60px_1fr] h-screen w-full">
                  <Toaster position="top-right" richColors />
                  {/* Sidebar */}
                  <aside
                        className="flex flex-col h-screen sticky top-0 overflow-y-auto bg-bg-secondary border-r border-border"
                        aria-label="Main navigation"
                  >
                        {/* Logo */}
                        <div className="p-4 flex justify-center border-b border-border">
                              <div
                                    className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center"
                                    aria-label="Q Dashboard logo"
                                    role="img"
                              >
                                    <span className="text-2xl font-extrabold text-white" aria-hidden="true">
                                          Q
                                    </span>
                              </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 flex flex-col items-center gap-4 py-4 px-3" role="navigation">
                              <NavLink to="/" label="Dashboard - Home">
                                    <svg
                                          className="w-5 h-5 shrink-0"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          aria-hidden="true"
                                          role="img"
                                    >
                                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                          <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                              </NavLink>

                              <NavLink to="/chat" label="Messages">
                                    <svg
                                          className="w-5 h-5 shrink-0"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          aria-hidden="true"
                                          role="img"
                                    >
                                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                              </NavLink>

                              <NavLink to="/analytics" label="Analytics">
                                    <svg
                                          className="w-5 h-5 shrink-0"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          aria-hidden="true"
                                          role="img"
                                    >
                                          <line x1="18" y1="20" x2="18" y2="10" />
                                          <line x1="12" y1="20" x2="12" y2="4" />
                                          <line x1="6" y1="20" x2="6" y2="14" />
                                    </svg>
                              </NavLink>

                              <NavLink to="/settings" label="Settings">
                                    <svg
                                          className="w-5 h-5 shrink-0"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          aria-hidden="true"
                                          role="img"
                                    >
                                          <circle cx="12" cy="12" r="3" />
                                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                    </svg>
                              </NavLink>
                        </nav>

                        {/* Footer */}
                        <div className="p-4 mt-auto border-t border-border flex flex-col items-center gap-3">
                              <ThemeToggle />
                              <button
                                    type="button"
                                    onClick={logout}
                                    className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-accent-hover flex items-center justify-center text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    aria-label="Sign out"
                                    title="Sign out"
                              >
                                    <span aria-hidden="true">{user?.username?.[0].toUpperCase() || 'U'}</span>
                              </button>
                        </div>
                  </aside>

                  {/* Main Content */}
                  <main className="flex-1 h-full overflow-y-auto bg-bg-primary custom-scrollbar" role="main">
                        <div className="p-10 max-md:p-6 animate-in fade-in slide-in-from-right-2 duration-500">
                              <Outlet />
                        </div>
                  </main>
            </div>
      );
};

const ThemeToggle = () => {
      const [isDark, setIsDark] = useState(() => {
            if (typeof window !== 'undefined') {
                  return (
                        localStorage.getItem('theme') === 'dark' ||
                        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  );
            }
            return false;
      });

      useEffect(() => {
            if (isDark) {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
            } else {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
            }
      }, [isDark]);

      return (
            <button
                  onClick={() => setIsDark(!isDark)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all cursor-pointer active:scale-90"
                  aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  type="button"
            >
                  {isDark ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                  ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                  )}
            </button>
      );
};

const NavLink = ({ to, children, label }: { to: string; children: React.ReactNode; label: string }) => {
      return (
            <Link
                  to={to}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl text-text-muted hover:text-text-primary hover:bg-bg-hover transition-all active:scale-95 group relative"
                  activeProps={{
                        className:
                              'w-12 h-12 flex items-center justify-center rounded-2xl text-accent bg-accent/10 shadow-[inset_0_0_0_1.5px_rgba(99,102,241,0.2)]'
                  }}
                  aria-label={label}
            >
                  {children}
                  <span className="absolute left-16 bg-bg-secondary text-text-primary text-[10px] font-bold px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border shadow-xl z-50">
                        {label}
                  </span>
            </Link>
      );
};

export const Route = createRootRoute({
      component: RootComponent
});
