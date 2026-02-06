import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from '@tanstack/react-router';

const registerSchema = z
      .object({
            username: z
                  .string()
                  .min(3, 'Username must be at least 3 characters long')
                  .max(15, 'Username must be at most 15 characters long')
                  .regex(/^[a-zA-Z0-9_]+$/, {
                        message: 'Username must contain only letters, numbers and underscores'
                  }),
            email: z.string().min(1, 'Email is required').email('Invalid email address'),
            password: z
                  .string()
                  .min(8, 'Password must be at least 8 characters long')
                  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                  }),
            confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters long'),
            isTermsAndConditionAccepted: z
                  .boolean()
                  .refine(val => val === true, 'You must accept the terms to continue')
      })
      .refine(data => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ['confirmPassword']
      });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
      const { register: signup, isLoading } = useAuth();
      const navigate = useNavigate();
      const {
            register,
            handleSubmit,
            formState: { errors }
      } = useForm<RegisterFormData>({
            resolver: zodResolver(registerSchema),
            defaultValues: {
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  isTermsAndConditionAccepted: false
            }
      });

      const onSubmit = async (data: RegisterFormData) => {
            const success = await signup(data);
            if (success) {
                  navigate({ to: '/check-email' });
            }
      };

      return (
            <div className="w-full max-w-md mx-auto space-y-8 p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="text-center space-y-2">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h1>
                        <p className="text-slate-400 font-medium tracking-tight">Sign up to join the next flash sale</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                              <label
                                    htmlFor="username"
                                    className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1"
                              >
                                    Username
                              </label>
                              <input
                                    id="username"
                                    type="text"
                                    {...register('username')}
                                    className={`w-full px-5 py-4 bg-slate-800 border rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                          errors.username
                                                ? 'border-red-500/50 focus:ring-red-500/30'
                                                : 'border-slate-700 focus:ring-orange-500/50 focus:border-orange-500'
                                    }`}
                                    placeholder="Username"
                              />
                              {errors.username && (
                                    <p className="text-xs font-bold text-red-400 ml-1 mt-1">
                                          {errors.username.message}
                                    </p>
                              )}
                        </div>

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
                                    {...register('email')}
                                    className={`w-full px-5 py-4 bg-slate-800 border rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                          errors.email
                                                ? 'border-red-500/50 focus:ring-red-500/30'
                                                : 'border-slate-700 focus:ring-orange-500/50 focus:border-orange-500'
                                    }`}
                                    placeholder="you@example.com"
                              />
                              {errors.email && (
                                    <p className="text-xs font-bold text-red-400 ml-1 mt-1">{errors.email.message}</p>
                              )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                          {...register('password')}
                                          className={`w-full px-5 py-4 bg-slate-800 border rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                                errors.password
                                                      ? 'border-red-500/50 focus:ring-red-500/30'
                                                      : 'border-slate-700 focus:ring-orange-500/50 focus:border-orange-500'
                                          }`}
                                          placeholder="••••••••"
                                    />
                                    {errors.password && (
                                          <p className="text-xs font-bold text-red-400 ml-1 mt-1 leading-tight">
                                                {errors.password.message}
                                          </p>
                                    )}
                              </div>

                              <div className="space-y-2">
                                    <label
                                          htmlFor="confirmPassword"
                                          className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1"
                                    >
                                          Confirm
                                    </label>
                                    <input
                                          id="confirmPassword"
                                          type="password"
                                          {...register('confirmPassword')}
                                          className={`w-full px-5 py-4 bg-slate-800 border rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                                errors.confirmPassword
                                                      ? 'border-red-500/50 focus:ring-red-500/30'
                                                      : 'border-slate-700 focus:ring-orange-500/50 focus:border-orange-500'
                                          }`}
                                          placeholder="••••••••"
                                    />
                              </div>
                        </div>
                        {errors.confirmPassword && (
                              <p className="text-xs font-bold text-red-400 ml-1 -mt-4">
                                    {errors.confirmPassword.message}
                              </p>
                        )}

                        <div className="space-y-2 group">
                              <label
                                    className={`flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-slate-800/50 border transition-all hover:bg-slate-800 ${
                                          errors.isTermsAndConditionAccepted
                                                ? 'border-red-500/30 bg-red-500/5'
                                                : 'border-slate-700'
                                    }`}
                              >
                                    <div className="relative flex items-center mt-0.5">
                                          <input
                                                id="isTermsAndConditionAccepted"
                                                type="checkbox"
                                                {...register('isTermsAndConditionAccepted')}
                                                className="peer shrink-0 appearance-none w-5 h-5 border-2 border-slate-600 rounded-lg bg-transparent checked:bg-orange-500 checked:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all cursor-pointer"
                                          />
                                          <svg
                                                className="absolute w-3.5 h-3.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                          >
                                                <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                    </div>
                                    <div className="space-y-1">
                                          <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                                                I accept the Terms and Conditions
                                          </span>
                                          <p className="text-[11px] font-medium text-slate-500 leading-normal">
                                                By ticking this box, you agree to our Terms of Service and Privacy
                                                Policy.
                                          </p>
                                    </div>
                              </label>
                              {errors.isTermsAndConditionAccepted && (
                                    <p className="text-xs font-bold text-red-400 ml-1 mt-1">
                                          {errors.isTermsAndConditionAccepted.message}
                                    </p>
                              )}
                        </div>

                        <button
                              type="submit"
                              disabled={isLoading}
                              className={`
            w-full py-4 px-6 rounded-2xl font-bold text-white tracking-wide
            transition-all duration-300 transform active:scale-[0.98]
            ${
                  isLoading
                        ? 'bg-slate-700 cursor-not-allowed shadow-none'
                        : 'bg-linear-to-r from-orange-500 to-red-600 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5'
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
                                          Creating account...
                                    </span>
                              ) : (
                                    'Sign Up'
                              )}
                        </button>
                  </form>

                  <div className="text-center pt-2">
                        <p className="text-sm text-slate-500">
                              Already have an account?{' '}
                              <Link
                                    to="/login"
                                    className="text-orange-500 font-bold hover:underline transition-all active:opacity-70"
                              >
                                    Log in here
                              </Link>
                        </p>
                  </div>

                  <div className="pt-4 flex items-center gap-4 text-slate-800">
                        <div className="grow h-px bg-slate-800"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap opacity-50">
                              Secure Registration
                        </span>
                        <div className="grow h-px bg-slate-800"></div>
                  </div>
            </div>
      );
}
