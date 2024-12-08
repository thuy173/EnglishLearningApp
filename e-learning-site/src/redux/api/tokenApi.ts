import { API_CONFIG, TokenResponse } from "@/types/feature/Config";
import axios from "axios";
import Cookies from "js-cookie";

export class TokenService {
  private static instance: TokenService;
  private refreshTokenPromise: Promise<string | null> | null = null;

  private constructor() {}

  static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  getAuthToken(): string | undefined {
    return Cookies.get(API_CONFIG.tokenCookieName);
  }

  getRefreshToken(): string | undefined {
    return Cookies.get(API_CONFIG.refreshTokenCookieName);
  }

  setAuthToken(token: string): void {
    Cookies.set(API_CONFIG.tokenCookieName, token, { expires: 1 });
  }

  setRefreshToken(token: string): void {
    Cookies.set(API_CONFIG.refreshTokenCookieName, token, { expires: 7 });
  }

  clearTokens(): void {
    Cookies.remove(API_CONFIG.tokenCookieName);
    Cookies.remove(API_CONFIG.refreshTokenCookieName);
  }

  async refreshToken(): Promise<string | null> {
    try {
      if (this.refreshTokenPromise) {
        return await this.refreshTokenPromise;
      }

      this.refreshTokenPromise = this.performTokenRefresh();
      const newToken = await this.refreshTokenPromise;
      this.refreshTokenPromise = null;

      return newToken;
    } catch (error) {
      this.refreshTokenPromise = null;
      throw error;
    }
  }

  private async performTokenRefresh(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post<TokenResponse>(
        `${API_CONFIG.baseURL}${API_CONFIG.refreshTokenEndpoint}`,
        refreshToken,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newToken = response.data.data;
      this.setAuthToken(newToken);
      return newToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  }
}
