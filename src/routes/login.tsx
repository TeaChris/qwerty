import { createFileRoute, Link, useNavigate, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { api } from '../lib';
import { useAuth } from '../store/auth';

const loginSchema = z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Route = createFileRoute('/login')({
      validateSearch: z.object({
            redirect: z.string().optional()
      }),
      beforeLoad: ({ search }) => {
            const { isAuthenticated } = useAuth.getState();
            if (isAuthenticated) {
                  throw redirect({
                        to: search.redirect || '/'
                  });
            }
      },
      component: LoginPage
});

function LoginPage() {
      const navigate = useNavigate();
      const [isLoading, setIsLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const { login } = useAuth();
      const search = Route.useSearch();

      const {
            register,
            handleSubmit,
            formState: { errors }
      } = useForm<LoginFormValues>({
            resolver: zodResolver(loginSchema)
      });

      const onSubmit = async (data: LoginFormValues) => {
            setIsLoading(true);
            try {
                  const { error } = await login(data);
                  if (error) {
                        toast.error(error.message || 'Login failed');
                  } else {
                        toast.success('Welcome back!');
                        navigate({ to: search.redirect || '/' });
                  }
            } catch (err) {
                  toast.error('An unexpected error occurred');
            } finally {
                  setIsLoading(false);
            }
      };

      return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05),transparent_40%)]">
                  <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Logo/Brand */}
                        <div className="flex flex-col items-center mb-10">
                              <div className="w-16 h-16 bg-accent rounded-[2rem] flex items-center justify-center shadow-2xl shadow-accent/40 mb-6 group hover:rotate-6 transition-transform">
                                    <svg
                                          className="w-8 h-8 text-white"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth="2.5"
                                    >
                                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                              </div>
                              <h1 className="text-4xl font-black text-text-primary tracking-tighter mb-2">
                                    Welcome <span className="text-accent">Back</span>
                              </h1>
                              <p className="text-text-secondary font-medium tracking-tight">
                                    Sign in to your performance dashboard
                              </p>
                        </div>

                        {/* Form Card */}
                        <div className="bg-bg-secondary/50 backdrop-blur-xl border border-border p-10 rounded-[2.5rem] shadow-2xl shadow-accent/5">
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4">
                                                Email Address
                                          </label>
                                          <div className="relative group">
                                                <input
                                                      {...register('email')}
                                                      type="email"
                                                      placeholder="name@company.com"
                                                      className="w-full bg-bg-primary border border-border rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-accent/50 transition-all placeholder:text-text-muted/50 group-hover:border-border-light"
                                                />
                                          </div>
                                          {errors.email && (
                                                <p className="text-[10px] font-black text-danger ml-4 uppercase tracking-widest">
                                                      {errors.email.message}
                                                </p>
                                          )}
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4">
                                                Password
                                          </label>
                                          <div className="relative group">
                                                <input
                                                      {...register('password')}
                                                      type={showPassword ? 'text' : 'password'}
                                                      placeholder="••••••••"
                                                      className="w-full bg-bg-primary border border-border rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-accent/50 transition-all placeholder:text-text-muted/50 group-hover:border-border-light"
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => setShowPassword(!showPassword)}
                                                      className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                                                >
                                                      {showPassword ? (
                                                            <svg
                                                                  className="w-5 h-5"
                                                                  fill="none"
                                                                  viewBox="0 0 24 24"
                                                                  stroke="currentColor"
                                                            >
                                                                  <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.258 0 2.443.238 3.535.669M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 3.32a.45.45 0 01-.15.3l-2.43 2.43a.45.45 0 01-.63 0l-2.43-2.43a.45.45 0 01-.15-.3V15.1c0-.12.04-.23.13-.31l1.5-1.5c.08-.09.19-.13.31-.13h1.07c.12 0 .23.04.31.13l1.5 1.5c.09.08.13.19.13.31v.22z" />
                                                            </svg>
                                                      ) : (
                                                            <svg
                                                                  className="w-5 h-5"
                                                                  fill="none"
                                                                  viewBox="0 0 24 24"
                                                                  stroke="currentColor"
                                                            >
                                                                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                      )}
                                                </button>
                                          </div>
                                          {errors.password && (
                                                <p className="text-[10px] font-black text-danger ml-4 uppercase tracking-widest">
                                                      {errors.password.message}
                                                </p>
                                          )}
                                    </div>

                                    <div className="flex justify-end pr-4">
                                          <button
                                                type="button"
                                                className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-accent-hover transition-colors"
                                          >
                                                Forgot Password?
                                          </button>
                                    </div>

                                    <button
                                          type="submit"
                                          disabled={isLoading}
                                          className="w-full bg-accent text-white rounded-2xl py-4 text-sm font-black uppercase tracking-widest hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                          {isLoading ? 'Authenticating...' : 'Sign In'}
                                    </button>
                              </form>

                              <div className="mt-10 text-center">
                                    <p className="text-sm text-text-secondary font-medium">
                                          Don't have an account?{' '}
                                          <Link
                                                to="/register"
                                                className="text-accent hover:underline font-black uppercase tracking-widest text-[10px] ml-2"
                                          >
                                                Create One
                                          </Link>
                                    </p>
                              </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-12 text-center text-text-muted">
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                                    &copy; 2025 Performance Analytics. All rights reserved.
                              </p>
                        </div>
                  </div>
            </div>
      );
}
