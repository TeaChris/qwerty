import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../hooks';

export const Route = createLazyFileRoute('/login')({
      component: LoginComponent
});

function LoginComponent() {
      const { isAuthenticated, isInitialized } = useAuth();

      // Root component handles loading state, so we're guaranteed to be initialized here
      // Redirect to home if already authenticated
      if (isInitialized && isAuthenticated) {
            return <Navigate to="/" />;
      }

      return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  {/* Decorative background elements */}
                  <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange-600/10 blur-[120px] rounded-full"></div>
                  <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-600/10 blur-[120px] rounded-full"></div>

                  <div className="w-full max-w-md relative z-10 space-y-8">
                        <div className="flex flex-col items-center gap-4 text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-orange-500/20 transform -rotate-3">
                                    F
                              </div>
                              <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase">
                                    Flash<span className="text-orange-500">Rush</span>
                              </h1>
                        </div>

                        <LoginForm />

                        <p className="text-slate-600 text-center text-sm font-medium">
                              Trusted by over 50k+ global shoppers
                        </p>
                  </div>
            </div>
      );
}
