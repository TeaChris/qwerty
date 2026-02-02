import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const { login, isLoading } = useAuth();

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!email || !password) return;
            await login(email, password);
      };

      return (
            <div className="w-full max-w-md mx-auto space-y-8 p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="text-center space-y-2">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome back</h1>
                        <p className="text-slate-400 font-medium">Log in to participate in the flash sale</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                              <label
                                    htmlFor="email"
                                    className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1"
                              >
                                    Email Address
                              </label>
                              <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                                    placeholder="you@example.com"
                              />
                        </div>

                        <div className="space-y-2">
                              <label
                                    htmlFor="password"
                                    className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1"
                              >
                                    Password
                              </label>
                              <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                                    placeholder="••••••••"
                              />
                        </div>

                        <button
                              type="submit"
                              disabled={isLoading}
                              className={`
            w-full py-4 px-6 rounded-2xl font-bold text-white tracking-wide
            transition-all duration-300 transform active:scale-[0.98]
            ${
                  isLoading
                        ? 'bg-slate-700 cursor-not-allowed'
                        : 'bg-linear-to-r from-orange-500 to-red-600 hover:shadow-lg hover:shadow-orange-500/20'
            }
          `}
                        >
                              {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle
                                                      className="opacity-25"
                                                      cx="12"
                                                      cy="12"
                                                      r="10"
                                                      stroke="currentColor"
                                                      strokeWidth="4"
                                                      fill="none"
                                                ></circle>
                                                <path
                                                      className="opacity-75"
                                                      fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                          </svg>
                                          Signing in...
                                    </span>
                              ) : (
                                    'Sign In'
                              )}
                        </button>
                  </form>

                  <div className="text-center pt-2">
                        <p className="text-sm text-slate-500">
                              Don't have an account?{' '}
                              <button className="text-orange-500 font-bold hover:underline">Register for free</button>
                        </p>
                  </div>

                  <div className="pt-4 flex items-center gap-4 text-slate-700">
                        <div className="grow h-px bg-slate-800"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                              Secure Login
                        </span>
                        <div className="grow h-px bg-slate-800"></div>
                  </div>
            </div>
      );
}
