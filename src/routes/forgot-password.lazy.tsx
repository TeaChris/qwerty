import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import { authService } from '../services';

export const Route = createLazyFileRoute('/forgot-password')({
      component: ForgotPasswordComponent
});

function ForgotPasswordComponent() {
      const [email, setEmail] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [isSubmitted, setIsSubmitted] = useState(false);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsLoading(true);

            try {
                  const { data, error } = await authService.forgotPassword(email);

                  if (data) {
                        setIsSubmitted(true);
                        toast.success('Reset link dispatched! ⚡');
                  } else {
                        toast.error(error?.message || 'Failed to dispatch reset link');
                  }
            } catch (err) {
                  console.error('Forgot password error:', err);
                  toast.error('Something went wrong. Please try again.');
            } finally {
                  setIsLoading(false);
            }
      };

      if (isSubmitted) {
            return (
                  <div className="min-h-screen flex items-center justify-center bg-(--bg-canvas) px-4">
                        <div className="w-full max-max-w-md space-y-8 glass p-10 border-2 border-(--border-default) relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-2 h-full bg-(--accent-primary)"></div>
                              <div className="text-center space-y-6">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) border-2 border-(--accent-primary)/30 mb-4 animate-pulse">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M3 8l7-8.912a2 2 0 013 0L21 8M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                                                />
                                          </svg>
                                    </div>
                                    <h2 className="text-3xl font-black text-(--text-primary) uppercase tracking-tighter italic">
                                          Link Dispatched
                                    </h2>
                                    <p className="text-(--text-secondary) leading-relaxed">
                                          If <span className="text-(--text-primary) font-bold">{email}</span> is
                                          registered, localized decryption keys will arrive shortly.
                                    </p>
                                    <div className="pt-6">
                                          <Link
                                                to="/"
                                                className="inline-block w-full py-4 px-6 bg-(--bg-canvas) border-2 border-(--border-default) text-(--text-primary) font-black uppercase tracking-widest hover:bg-(--accent-primary) hover:border-(--accent-primary) transition-all duration-300"
                                          >
                                                Back to Home
                                          </Link>
                                    </div>
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
                                          Decrypt Account
                                    </h1>
                                    <p className="text-(--text-secondary) text-sm font-medium">
                                          Lost your access credentials? Enter your identifier.
                                    </p>
                              </div>

                              <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2 group">
                                          <label
                                                htmlFor="email"
                                                className="block text-xs font-black uppercase tracking-widest text-(--text-secondary) group-focus-within:text-(--accent-primary) transition-colors"
                                          >
                                                Network Identifier
                                          </label>
                                          <div className="relative">
                                                <input
                                                      id="email"
                                                      type="email"
                                                      required
                                                      value={email}
                                                      onChange={e => setEmail(e.target.value)}
                                                      className="block w-full px-5 py-4 bg-(--bg-canvas) border-2 border-(--border-default) text-(--text-primary) focus:border-(--accent-primary) outline-none transition-all duration-300 placeholder:text-(--text-muted) font-medium"
                                                      placeholder="IDENTIFIER@DOMAIN.COM"
                                                />
                                                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-(--accent-primary) transition-all duration-300 group-focus-within:w-full"></div>
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
                                                            Processing...
                                                      </>
                                                ) : (
                                                      <>
                                                            Dispatch Reset Link
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                                                                  fill="none"
                                                                  viewBox="0 0 24 24"
                                                                  stroke="currentColor"
                                                            >
                                                                  <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
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
                                          Return to Login Portal
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
