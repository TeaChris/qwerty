import axios from 'axios';
import { toast } from 'sonner';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { clearAccessToken, isObject } from './utils';
import type { ApiError } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) throw new Error('add VITE_BASE_URL to your env file!!!');

/**
 * Parse a cookie value by name from document.cookie
 */
const getCookie = (name: string): string | undefined => {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? decodeURIComponent(match[2]) : undefined;
};

/**
 * Retry configuration
 */
const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 300;

const isRetryableError = (error: unknown): boolean => {
      if (!axios.isAxiosError(error)) return false;

      // Network errors (no response received)
      if (!error.response) return true;

      // Server errors (5xx)
      const status = error.response.status;
      return status >= 500 && status < 600;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const apiClient: AxiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
            'Content-Type': 'application/json'
      }
});

// Request interceptor - attach CSRF token from cookie
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const csrfToken = getCookie('csrfToken');
      if (csrfToken) {
            config.headers.set('x-csrf-token', csrfToken);
      }
      return config;
});

apiClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      async error => {
            if (error.response?.status === 401) {
                  clearAccessToken();
                  toast.error('Unauthorized');
            }

            return Promise.reject(error);
      }
);

export const api = async <T>(
      endpoint: string,
      data?: Record<string, unknown> | FormData,
      extraMethods?: 'PUT' | 'DELETE' | 'PATCH'
): Promise<{ data?: T; error?: ApiError }> => {
      const method = extraMethods && data ? extraMethods : data && !extraMethods ? 'POST' : 'GET';

      const makeRequest = async (): Promise<AxiosResponse<T>> => {
            return apiClient.request<T>({
                  method,
                  url: endpoint,
                  ...(data && { data }),
                  headers: {
                        'x-referrer': import.meta.env.VITE_FRONTEND_URL ?? '',
                        ...(isObject(data)
                              ? {
                                      'Content-Type': 'application/json',
                                      Accept: 'application/json'
                                }
                              : {
                                      'Content-Type': 'multipart/form-data'
                                })
                  }
            });
      };

      try {
            let lastError: unknown;

            for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
                  try {
                        const response = await makeRequest();
                        return { data: response.data };
                  } catch (error) {
                        lastError = error;

                        // Only retry on network/server errors, and never on the last attempt
                        if (attempt < MAX_RETRIES && isRetryableError(error)) {
                              const backoff = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
                              await delay(backoff);
                              continue;
                        }

                        // Non-retryable error or final attempt — break to error handling
                        break;
                  }
            }

            // Handle the final error
            let apiError: ApiError | undefined;
            const error = lastError;

            if (axios.isAxiosError(error) && error.response) {
                  const { status, data: errorData } = error.response;
                  apiError = (errorData as ApiError) || {
                        message: error.message,
                        status: status
                  };

                  switch (status) {
                        case 401: {
                              const currentPath = window.location.pathname;
                              if (currentPath !== '/login' && currentPath !== '/register') {
                                    toast.error('log in again');
                                    clearAccessToken();
                                    window.location.href = '/login';
                              }
                              break;
                        }
                        case 429:
                              toast.error('Too many requests. Please slow down.');
                              break;
                        case 500:
                              toast.error('Internal server error');
                              break;
                        default:
                              console.error(`API Error ${status}:`, error.message);
                  }
            } else {
                  if (error instanceof Error) {
                        apiError = { message: error.message, status: 'Error' };
                  }
            }
            return { error: apiError };
      } catch (error) {
            // Fallback for unexpected errors
            const apiError: ApiError = {
                  message: error instanceof Error ? error.message : 'An unexpected error occurred',
                  status: 'Error'
            };
            return { error: apiError };
      }
};
