export interface ApiError {
      message: string;
      status: string | number;
      error?: unknown;
      headers?: Record<string, unknown>;
}
