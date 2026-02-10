import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';

export const Route = createLazyFileRoute('/register')({
      component: RegisterRoute
});

function RegisterRoute() {
      const { isAuthenticated, isInitialized } = useAuth();

      // Root component handles loading state, so we're guaranteed to be initialized here
      // Redirect to home if already logged in
      if (isInitialized && isAuthenticated) {
            return <Navigate to="/" />;
      }

      return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  {/* Background blobs for premium feel */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse-subtle" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px] animate-pulse-subtle animation-delay-2000" />
                  </div>

                  <div className="w-full max-w-md relative z-10 space-y-8">
                        <div className="flex flex-col items-center gap-4 text-center">
                              <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-orange-500/20 transform -rotate-3">
                                    F
                              </div>
                              <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase">
                                    Flash<span className="text-orange-500">Rush</span>
                              </h1>
                        </div>

                        <RegisterForm />
                  </div>
            </div>
      );
}
