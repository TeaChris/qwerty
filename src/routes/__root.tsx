import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import '../index.css';

const RootComponent = () => {
      return (
            <div className="grid grid-cols-[8%_92%] max-md:grid-cols-[60px_1fr] h-screen w-full">
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
                                    className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-accent-hover flex items-center justify-center text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    aria-label="User profile menu"
                              >
                                    <span aria-hidden="true">U</span>
                              </button>
                        </div>
                  </aside>

                  {/* Main Content */}
                  <main className="p-8 max-md:p-4 overflow-y-auto h-screen bg-bg-primary" role="main">
                        <Outlet />
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
                  className="p-2 rounded-lg text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  type="button"
            >
                  {isDark ? (
                        <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                              role="img"
                        >
                              <circle cx="12" cy="12" r="5" />
                              <line x1="12" y1="1" x2="12" y2="3" />
                              <line x1="12" y1="21" x2="12" y2="23" />
                              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                              <line x1="1" y1="12" x2="3" y2="12" />
                              <line x1="21" y1="12" x2="23" y2="12" />
                              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                  ) : (
                        <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                              role="img"
                        >
                              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                  )}
            </button>
      );
};

const NavLink = ({ to, children, label }: { to: string; children: React.ReactNode; label: string }) => {
      return (
            <Link
                  to={to}
                  className="flex items-center justify-center p-3 rounded-lg text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  activeProps={{
                        className:
                              'flex items-center justify-center p-4 rounded-lg text-accent-hover bg-accent/10 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
                  }}
                  aria-label={label}
            >
                  {children}
            </Link>
      );
};

export const Route = createRootRoute({
      component: RootComponent
});
