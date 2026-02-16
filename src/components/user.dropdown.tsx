import { type FC, useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../stores/auth.store';
import { UserAvatar } from './user.avatar';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { authService } from '../services/auth.service';

export const UserDropdown: FC = () => {
      const { user, logout } = useAuthStore();
      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef<HTMLDivElement>(null);
      const navigate = useNavigate();

      // Close dropdown when clicking outside
      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                        setIsOpen(false);
                  }
            };

            if (isOpen) {
                  document.addEventListener('mousedown', handleClickOutside);
            }

            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, [isOpen]);

      const handleLogout = async () => {
            const { error } = await authService.logout();

            if (error) {
                  toast.error(error.message || 'Failed to sign out');
                  console.error('Logout error:', error);
                  return;
            }

            logout();
            toast.success('Signed out successfully');
            navigate({ to: '/login' });
      };

      if (!user) return null;

      return (
            <div className="relative" ref={dropdownRef}>
                  {/* Trigger Button */}
                  <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-3 px-3 py-2 rounded transition-all hover:bg-var(--bg-hover) focus:outline-none focus:ring-2 focus:ring-(--accent-primary)"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                  >
                        <UserAvatar username={user.username} size="sm" />
                        <span className="hidden md:inline text-sm font-medium text-(--text-primary)">
                              {user.username}
                        </span>
                        <svg
                              className={`w-4 h-4 text-(--text-muted) transition-transform ${isOpen ? 'rotate-180' : ''}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                        >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                        <div className="absolute right-0 mt-2 w-72 glass rounded-none border-2 border-(--border-accent) overflow-hidden z-50 animate-fade-in-down">
                              {/* User Info Section */}
                              <div className="p-4 border-b border-(--border-default) bg-(--bg-elevated)">
                                    <div className="flex items-start gap-3">
                                          <UserAvatar username={user.username} size="lg" />
                                          <div className="flex-1 min-w-0">
                                                <h3 className="font-black text-lg text-(--text-primary) truncate">
                                                      {user.username}
                                                </h3>
                                                <p className="text-xs text-(--text-muted) truncate mono-number">
                                                      {user.email}
                                                </p>
                                                <p className="text-xs text-(--text-secondary) mt-1">
                                                      ID: <span className="mono-number">{user.id?.slice(0, 8)}</span>
                                                </p>
                                          </div>
                                    </div>
                              </div>

                              {/* Menu Items */}
                              <div className="p-2">
                                    {user.role === 'ADMIN' && (
                                          <button
                                                onClick={() => {
                                                      setIsOpen(false);
                                                      navigate({ to: '/admin/dashboard' });
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm font-bold text-(--accent-primary) border-b border-(--border-default) hover:bg-(--bg-hover) transition-colors flex items-center gap-2"
                                          >
                                                🛡️ Admin Dashboard
                                          </button>
                                    )}
                                    <button
                                          onClick={() => {
                                                setIsOpen(false);
                                                // Navigate to profile/settings when implemented
                                                toast.info('Profile settings coming soon');
                                          }}
                                          className="w-full text-left px-4 py-3 text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-hover) transition-colors"
                                    >
                                          ⚙️ Account Settings
                                    </button>
                                    <button
                                          onClick={() => {
                                                setIsOpen(false);
                                                toast.info('Purchase history coming soon');
                                          }}
                                          className="w-full text-left px-4 py-3 text-sm font-medium text-(--text-secondary)] hover:text-(--text-primary) hover:bg-(--bg-hover) transition-colors"
                                    >
                                          📦 Purchase History
                                    </button>
                              </div>

                              {/* Logout Section */}
                              <div className="p-2 border-t border-(--border-default) bg-(--bg-surface)]">
                                    <button
                                          onClick={handleLogout}
                                          className="w-full text-left px-4 py-3 text-sm font-bold text-(--data-danger)] hover:bg-(--bg-hover)] transition-colors"
                                    >
                                          🚪 Sign Out
                                    </button>
                              </div>
                        </div>
                  )}
            </div>
      );
};
