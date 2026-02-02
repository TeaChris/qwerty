import { api } from '../lib/use.api';
import { setAccessToken, clearAccessToken } from '../lib/utils';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '../types/sale.types';

// Mock user for development
const MOCK_USER: User = {
      id: 'user_001',
      email: 'demo@flashsale.com',
      username: 'demo_user'
};

const USE_MOCK = true; // Toggle for development

export const authService = {
      async login(credentials: LoginRequest): Promise<{ data?: LoginResponse; error?: unknown }> {
            if (USE_MOCK) {
                  await new Promise(resolve => setTimeout(resolve, 500));
                  // Accept any non-empty credentials for demo
                  if (credentials.email && credentials.password) {
                        const token = `mock_token_${Date.now()}`;
                        setAccessToken(token);
                        return {
                              data: {
                                    token,
                                    user: { ...MOCK_USER, email: credentials.email }
                              }
                        };
                  }
                  return { error: { message: 'Invalid credentials', status: 401 } };
            }

            const result = await api<LoginResponse>('/auth/login', credentials);
            if (result.data?.token) {
                  setAccessToken(result.data.token);
            }
            return result;
      },

      async register(data: RegisterRequest): Promise<{ data?: RegisterResponse; error?: unknown }> {
            if (USE_MOCK) {
                  await new Promise(resolve => setTimeout(resolve, 800));
                  return {
                        data: {
                              status: 'success',
                              message: 'User registered successfully',
                              data: {
                                    user: {
                                          id: `user_${Math.floor(Math.random() * 1000)}`,
                                          email: data.email,
                                          username: data.username
                                    }
                              }
                        }
                  };
            }

            const result = await api<RegisterResponse>('/auth/register', data);
            return result;
      },

      logout(): void {
            clearAccessToken();
      },

      isAuthenticated(): boolean {
            // Check if token exists in session storage
            return !!sessionStorage.getItem('access_token');
      }
};
