import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { FlashSaleDashboard } from '../components/flash-sale';
import { useAuth } from '../hooks';

export const Route = createLazyFileRoute('/')({
      component: IndexComponent
});

function IndexComponent() {
      const { isAuthenticated, isInitialized } = useAuth();

      // Root component handles loading state, so we're guaranteed to be initialized here
      // Protect the route - redirect to login if not authenticated
      if (isInitialized && !isAuthenticated) {
            return <Navigate to="/login" />;
      }

      return (
            <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-orange-500/30">
                  <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">
                                          F
                                    </div>
                                    <span className="font-black text-xl tracking-tight text-white uppercase italic">
                                          Flash<span className="text-orange-500">Rush</span>
                                    </span>
                              </div>

                              <div className="flex items-center gap-6">
                                    <span className="hidden md:inline text-xs font-bold text-slate-500 uppercase tracking-widest">
                                          Live Auction Platform v1.0
                                    </span>
                                    <button
                                          onClick={() => {
                                                // In a real app, we'd have a logout handler in the UI
                                                window.location.href = '/login';
                                          }}
                                          className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                                    >
                                          Sign Out
                                    </button>
                              </div>
                        </div>
                  </nav>

                  <main>
                        <FlashSaleDashboard />
                  </main>

                  <footer className="border-t border-slate-900 bg-slate-950 py-12">
                        <div className="container mx-auto px-4 text-center space-y-4">
                              <p className="text-slate-600 text-sm font-medium">
                                    &copy; 2026 FlashRush. All rights reserved. High-performance real-time engine.
                              </p>
                              <div className="flex justify-center gap-8 text-xs font-bold text-slate-700 uppercase tracking-[0.2em]">
                                    <a href="#" className="hover:text-orange-500 transition-colors">
                                          Privacy
                                    </a>
                                    <a href="#" className="hover:text-orange-500 transition-colors">
                                          Terms
                                    </a>
                                    <a href="#" className="hover:text-orange-500 transition-colors">
                                          Support
                                    </a>
                              </div>
                        </div>
                  </footer>
            </div>
      );
}
