import { toast } from 'sonner';
import { useEffect, useState, useRef } from 'react';
import { Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { createLazyFileRoute, useNavigate, useSearch } from '@tanstack/react-router';

import { authService } from '../services';

export const Route = createLazyFileRoute('/verify-email')({
      component: VerifyEmailComponent
});

function VerifyEmailComponent() {
      const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
      const { token } = useSearch({ from: '/verify-email' }) as { token?: string };
      const [message, setMessage] = useState('Verifying your account...');
      const navigate = useNavigate();

      const hasAttempted = useRef(false);

      useEffect(() => {
            const verify = async () => {
                  if (hasAttempted.current) return;
                  if (!token) {
                        setStatus('error');
                        setMessage('Verification token is missing.');
                        return;
                  }

                  hasAttempted.current = true;

                  try {
                        const { data, error } = await authService.verifyEmail(token);
                        if (data?.status === 'success') {
                              setStatus('success');
                              setMessage(data.message || 'Account verified successfully!');
                              toast.success('Email verified! Redirecting to login...');

                              // Smooth redirect after success
                              setTimeout(() => {
                                    navigate({ to: '/login' });
                              }, 3000);
                        } else {
                              setStatus('error');
                              setMessage(error?.message || 'Verification failed. The link may be expired.');
                        }
                  } catch {
                        setStatus('error');
                        setMessage('An unexpected error occurred. Please try again later.');
                  }
            };

            verify();
      }, [token, navigate]);

      return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  {/* premium background glow */}
                  <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full transition-colors duration-1000 ${
                              status === 'loading'
                                    ? 'bg-orange-500/10'
                                    : status === 'success'
                                      ? 'bg-emerald-500/10'
                                      : 'bg-red-500/10'
                        }`}
                  ></div>

                  <div className="w-full max-w-md relative z-10 text-center space-y-10">
                        <div
                              className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-700 transform ${
                                    status === 'loading'
                                          ? 'bg-slate-800 scale-100'
                                          : status === 'success'
                                            ? 'bg-emerald-500 scale-110 rotate-3'
                                            : 'bg-red-500 scale-110 -rotate-3'
                              }`}
                        >
                              {status === 'loading' && <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />}
                              {status === 'success' && (
                                    <CheckCircle2 className="w-12 h-12 text-white animate-in zoom-in duration-500" />
                              )}
                              {status === 'error' && (
                                    <XCircle className="w-12 h-12 text-white animate-in zoom-in duration-500" />
                              )}
                        </div>

                        <div className="space-y-3">
                              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                                    {status === 'loading'
                                          ? 'Verifying...'
                                          : status === 'success'
                                            ? 'Verified!'
                                            : 'Oops!'}
                              </h1>
                              <p className="text-slate-400 font-medium">{message}</p>
                        </div>

                        {status === 'success' && (
                              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                                    <button
                                          onClick={() => navigate({ to: '/login' })}
                                          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20 group"
                                    >
                                          Go to Login
                                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                              </div>
                        )}

                        {status === 'error' && (
                              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <button
                                          onClick={() => navigate({ to: '/register' })}
                                          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all group"
                                    >
                                          Try Registering Again
                                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                              </div>
                        )}
                  </div>
            </div>
      );
}
