import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Link } from '@tanstack/react-router';

const loginSchema = z.object({
      email: z.string().min(1, 'Email is required').email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
      const { login, isLoading } = useAuth();
      const {
            register,
            handleSubmit,
            formState: { errors }
      } = useForm<LoginFormData>({
            resolver: zodResolver(loginSchema),
            defaultValues: {
                  email: '',
                  password: ''
            }
      });

      const onSubmit = async (data: LoginFormData) => {
            await login(data.email, data.password);
      };

      return (
            <div className="w-full max-w-md mx-auto space-y-8 p-8 bg-(--bg-surface) border border-(--border-default) rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="text-center space-y-2">
                        <h1 className="text-3xl font-extrabold text-(--text-primary) tracking-tight">Welcome back</h1>
                        <p className="text-(--text-secondary) font-medium">Log in to participate in the flash sale</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                              <label
                                    htmlFor="email"
                                    className="text-sm font-bold text-(--text-secondary) uppercase tracking-widest ml-1"
                              >
                                    Email Address
                              </label>
                              <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className={`w-full px-5 py-4 bg-(--bg-elevated) border rounded-2xl text-(--text-primary) placeholder-(--text-muted) focus:outline-none focus:ring-2 transition-all ${
                                          errors.email
                                                ? 'border-(--data-danger) focus:ring-(--data-danger)/30'
                                                : 'border-(--border-default) focus:ring-(--accent-primary)/50 focus:border-(--accent-primary)'
                                    }`}
                                    placeholder="you@example.com"
                              />
                              {errors.email && (
                                    <p className="text-xs font-bold text-(--data-danger) ml-1 mt-1">
                                          {errors.email.message}
                                    </p>
                              )}
                        </div>

                        <div className="space-y-2">
                              <label
                                    htmlFor="password"
                                    className="text-sm font-bold text-(--text-secondary) uppercase tracking-widest ml-1"
                              >
                                    Password
                              </label>
                              <input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                    className={`w-full px-5 py-4 bg-(--bg-elevated) border rounded-2xl text-(--text-primary) placeholder-(--text-muted) focus:outline-none focus:ring-2 transition-all ${
                                          errors.password
                                                ? 'border-(--data-danger) focus:ring-(--data-danger)/30'
                                                : 'border-(--border-default) focus:ring-(--accent-primary)/50 focus:border-(--accent-primary)'
                                    }`}
                                    placeholder="••••••••"
                              />
                              {errors.password && (
                                    <p className="text-xs font-bold text-(--data-danger) ml-1 mt-1">
                                          {errors.password.message}
                                    </p>
                              )}
                        </div>

                        <button
                              type="submit"
                              disabled={isLoading}
                              className={`
            w-full py-4 px-6 rounded-2xl font-bold text-white tracking-wide
            transition-all duration-300 transform active:scale-[0.98] cursor-pointer
            ${
                  isLoading
                        ? 'bg-(--bg-hover) cursor-not-allowed'
                        : 'bg-linear-to-r from-(--accent-primary) to-(--accent-tertiary) hover:shadow-lg hover:shadow-(--accent-primary)/20'
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
                        <p className="text-sm text-(--text-muted)">
                              Don't have an account?{' '}
                              <Link to="/register" className="text-(--accent-primary) font-bold hover:underline">
                                    Register for free
                              </Link>
                        </p>
                  </div>

                  <div className="pt-4 flex items-center gap-4 text-(--text-muted)">
                        <div className="grow h-px bg-(--border-default)"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                              Secure Login
                        </span>
                        <div className="grow h-px bg-(--border-default)"></div>
                  </div>
            </div>
      );
}
