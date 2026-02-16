export interface ApiError {
      message: string;
      status: string | number;
      error?: unknown;
      headers?: Record<string, unknown>;
}

export * from './sales';
export * from './admin';
export * from './products';
export * from './sale.types';
