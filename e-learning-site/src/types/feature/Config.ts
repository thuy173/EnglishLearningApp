export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface TokenResponse {
  data: string;
}

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 90_000, // 90 seconds
  tokenCookieName: "oceduauth",
  refreshTokenCookieName: "refreshToken",
  refreshTokenEndpoint: "/application/refresh-token",
  loginPath: "/login",
} as const;

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}
