import { createLazyFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { authService } from '../services';

export const Route = createLazyFileRoute('/reset-password')({
      component: ResetPasswordComponent
});

function ResetPasswordComponent() {
      const navigate = useNavigate();
      // Extract token from URL search params
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');

      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            if (!token) {
                  toast.error('Invalid reset session. Missing token.');
                  return;
            }

            if (password !== confirmPassword) {
                  toast.error('Passwords do not match');
                  return;
            }

            if (password.length < 6) {
                  toast.error('Password must be at least 6 characters');
                  return;
            }

            setIsLoading(true);

            try {
                  const { data, error } = await authService.resetPassword(token, password);

                  if (data) {
                        toast.success('Password updated successfully! 🔐');
                        navigate({ to: '/login' });
                  } else {
                        toast.error(error?.message || 'Failed to update password');
                  }
            } catch (err) {
                  console.error('Reset password error:', err);
                  toast.error('Something went wrong. Please try again.');
            } finally {
                  setIsLoading(false);
            }
      };

      if (!token) {
            return (
                  <div className="min-h-screen flex items-center justify-center bg-(--bg-canvas) px-4">
                        <div className="w-full max-w-md space-y-8 glass p-10 border-2 border-(--border-default) relative overflow-hidden text-center">
                              <div className="absolute top-0 left-0 w-2 h-full bg-(--data-danger)"></div>
                              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-(--data-danger)/10 text-(--data-danger) border-2 border-(--data-danger)/30 mb-4 font-black text-4xl">
                                    !
                              </div>
                              <h2 className="text-3xl font-black text-(--text-primary) uppercase tracking-tighter italic">
                                    Invalid Protocol
                              </h2>
                              <p className="text-(--text-secondary) leading-relaxed">
                                    The reset sequence requires a valid authorization token. Please initiate a new
                                    request.
                              </p>
                              <div className="pt-6">
                                    <Link
                                          to="/forgot-password"
                                          className="inline-block w-full py-4 px-6 bg-(--accent-primary) text-black font-black uppercase tracking-widest hover:brightness-110 transition-all duration-300"
                                    >
                                          Request New Link
                                    </Link>
                              </div>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen flex items-center justify-center bg-(--bg-canvas) px-4 font-sans">
                  {/* Background Accents */}
                  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
                        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-(--accent-primary) blur-[150px] rounded-full"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-(--accent-secondary) blur-[120px] rounded-full"></div>
                  </div>

                  <div className="w-full max-w-md relative">
                        {/* Header Branding */}
                        <div className="flex justify-center mb-8">
                              <Link
                                    to="/"
                                    className="text-3xl font-black italic tracking-tighter flex items-center gap-1 group"
                              >
                                    <span className="text-(--accent-primary) group-hover:skew-x-12 transition-transform duration-300">
                                          FLASH
                                    </span>
                                    <span className="text-(--text-primary)">RUSH</span>
                              </Link>
                        </div>

                        <div className="glass p-10 space-y-8 border-2 border-(--border-default) relative z-10">
                              <div className="space-y-2">
                                    <h1 className="text-3xl font-black text-(--text-primary) uppercase tracking-tighter">
                                          Reset Protocol
                                    </h1>
                                    <p className="text-(--text-secondary) text-sm font-medium">
                                          Encryption keys validated. Initialize your new access sequence.
                                    </p>
                              </div>

                              <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2 group">
                                          <label
                                                htmlFor="pass"
                                                className="block text-xs font-black uppercase tracking-widest text-(--text-secondary) group-focus-within:text-(--accent-primary) transition-colors"
                                          >
                                                New Credential
                                          </label>
                                          <div className="relative">
                                                <input
                                                      id="pass"
                                                      type="password"
                                                      required
                                                      value={password}
                                                      onChange={e => setPassword(e.target.value)}
                                                      className="block w-full px-5 py-4 bg-(--bg-canvas) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none transition-all duration-300 placeholder:text-(--text-muted) font-medium"
                                                      placeholder="••••••••"
                                                />
                                          </div>
                                    </div>

                                    <div className="space-y-2 group">
                                          <label
                                                htmlFor="confirm"
                                                className="block text-xs font-black uppercase tracking-widest text-(--text-secondary) group-focus-within:text-(--accent-primary) transition-colors"
                                          >
                                                Confirm Credential
                                          </label>
                                          <div className="relative">
                                                <input
                                                      id="confirm"
                                                      type="password"
                                                      required
                                                      value={confirmPassword}
                                                      onChange={e => setConfirmPassword(e.target.value)}
                                                      className="block w-full px-5 py-4 bg-(--bg-canvas) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none transition-all duration-300 placeholder:text-(--text-muted) font-medium"
                                                      placeholder="••••••••"
                                                />
                                          </div>
                                    </div>

                                    <button
                                          type="submit"
                                          disabled={isLoading}
                                          className="group relative w-full py-5 bg-(--accent-primary) text-(--text-primary) font-black uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                          <span className="relative z-10 flex items-center justify-center gap-2">
                                                {isLoading ? (
                                                      <>
                                                            <div className="w-5 h-5 border-3 border-(--text-primary)/30 border-t-(--text-primary) rounded-full animate-spin"></div>
                                                            Committing...
                                                      </>
                                                ) : (
                                                      <>
                                                            Update Credentials
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  className="h-5 w-5 transform group-hover:-translate-y-1 transition-transform"
                                                                  fill="none"
                                                                  viewBox="0 0 24 24"
                                                                  stroke="currentColor"
                                                            >
                                                                  <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                                  />
                                                            </svg>
                                                      </>
                                                )}
                                          </span>
                                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                              </form>

                              <div className="pt-4 text-center">
                                    <Link
                                          to="/"
                                          className="text-xs font-black uppercase tracking-widest text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
                                    >
                                          Abort and Exit
                                    </Link>
                              </div>
                        </div>

                        {/* Footer Tag */}
                        <div className="text-center mt-10">
                              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-(--text-muted) opacity-50">
                                    Secure Transmission // Protocol RS-2026
                              </span>
                        </div>
                  </div>
            </div>
      );
}
