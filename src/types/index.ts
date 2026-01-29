export interface ApiError {
      message: string;
      status: string | number;
      error?: unknown;
      headers?: Record<string, unknown>;
}

export interface IUser {
      id: string;
      username: string;
      email: string;
      role: 'ADMIN' | 'USER';
      isVerified: boolean;
      createdAt: string;
      updatedAt: string;
}
