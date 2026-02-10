import { api } from '../lib/use.api';
import { clearAccessToken } from '../lib/utils';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, MeResponse } from '../types/sale.types';
import type { ApiError } from '../types';

export const authService = {
      async login(credentials: LoginRequest): Promise<{ data?: LoginResponse; error?: ApiError }> {
            const result = await api<LoginResponse>('/auth/login', credentials);
            return result;
      },

      async register(data: RegisterRequest): Promise<{ data?: RegisterResponse; error?: ApiError }> {
            const result = await api<RegisterResponse>('/auth/register', data);
            return result;
      },

      async getMe(): Promise<{ data?: MeResponse; error?: ApiError }> {
            const result = await api<MeResponse>('/auth/me');
            return result;
      },

      async verifyEmail(token: string): Promise<{ data?: { status: string; message: string }; error?: ApiError }> {
            const result = await api<{ status: string; message: string }>(`/auth/verify-email/${token}`);
            return result;
      },

      async logout(): Promise<void> {
            try {
                  await api('/auth/logout', {});
            } catch (error) {
                  console.error('Logout API error:', error);
            } finally {
                  clearAccessToken();
            }
      }
};
