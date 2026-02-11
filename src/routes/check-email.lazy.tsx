import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Mail, ArrowLeft, RefreshCcw } from 'lucide-react';

export const Route = createLazyFileRoute('/check-email')({
      component: CheckEmailPage
});

function CheckEmailPage() {
      return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  {/* Background blobs for premium feel */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse-subtle" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px] animate-pulse-subtle animation-delay-2000" />
                  </div>

                  <div className="w-full max-w-md relative z-10 space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="flex flex-col items-center gap-4 text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-orange-500/20 transform -rotate-3">
                                    F
                              </div>
                              <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase">
                                    Flash<span className="text-orange-500">Rush</span>
                              </h1>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden group">
                              {/* Glowing effect in center */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                              <div className="flex flex-col items-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                          <Mail className="w-10 h-10 text-orange-500 animate-pulse-subtle" />
                                    </div>

                                    <div className="space-y-2">
                                          <h2 className="text-3xl font-extrabold text-white tracking-tight">
                                                Check your email
                                          </h2>
                                          <p className="text-slate-400 font-medium leading-relaxed">
                                                We've sent a verification link to your email address. It may take a
                                                minute to arrive.
                                          </p>
                                    </div>

                                    <div className="w-full h-px bg-slate-800" />

                                    <div className="space-y-4 w-full">
                                          <button
                                                onClick={() => {
                                                      /* TODO: Implement resend logic */
                                                      alert('Resend link feature coming soon!');
                                                }}
                                                className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2 group/btn"
                                          >
                                                <RefreshCcw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                                                Resend Email
                                          </button>

                                          <Link
                                                to="/login"
                                                className="w-full py-4 px-6 rounded-2xl font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
                                          >
                                                <ArrowLeft className="w-4 h-4" />
                                                Back to Login
                                          </Link>
                                    </div>
                              </div>
                        </div>

                        <div className="text-center text-xs font-bold text-slate-600 uppercase tracking-[0.2em] animate-pulse-subtle">
                              Secure Verification Engine
                        </div>
                  </div>
            </div>
      );
}
