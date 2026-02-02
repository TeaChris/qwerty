import axios from 'axios';
import { toast } from 'sonner';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { clearAccessToken, getAccessToken, isObject } from './utils';
import type { ApiError } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) throw new Error('add VITE_BASE_URL to your env file!!!');

const apiClient: AxiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
            'Content-Type': 'application/json'
      }
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
});

apiClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      async error => {
            if (error.response?.status === '401') {
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
      const cancelTokenSource = axios.CancelToken.source();

      try {
            const response: AxiosResponse<T> = await apiClient.request<T>({
                  method: extraMethods && data ? extraMethods : data && !extraMethods ? 'POST' : 'GET',
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
                  },
                  cancelToken: cancelTokenSource.token
            });

            return { data: response.data };
      } catch (error) {
            let apiError: ApiError | undefined;

            if (axios.isCancel(error)) {
                  console.error('Previous request was canceled');
            }

            if (axios.isAxiosError(error) && error.response) {
                  const { status, data: errorData } = error.response;
                  apiError = (errorData as ApiError) || {
                        message: error.message,
                        status: status
                  };

                  switch (status) {
                        case 401:
                              toast.error('log in again');
                              clearAccessToken();
                              window.location.href = '/login';
                              break;
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
      }
};
