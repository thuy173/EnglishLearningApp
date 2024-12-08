import { AuthResponse } from "@/types/feature/Config";
import { TokenService } from "./tokenApi";
import UserLoginDto, {
  ChangePassDto,
  ForgotPassDto,
  ResetPassDto,
  UserRegisterDto,
} from "@/types/feature/Auth";
import httpClient from "./agent";

class AuthService {
  private static instance: AuthService;
  private readonly tokenService: TokenService;

  private readonly endpoints = {
    googleLogin: "/auth/google-login",
    login: "/auth/login",
    register: "/auth/sign-up",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    changePassword: "/auth/change-password",
  };

  private constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleAuthResponse = this.handleAuthResponse.bind(this);

    this.tokenService = TokenService.getInstance();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private handleAuthResponse(response: AuthResponse): void {
    this.tokenService.setAuthToken(response.accessToken);
    this.tokenService.setRefreshToken(response.refreshToken);
  }

  async googleLogin(googleToken: string): Promise<void> {
    try {
      const response = await httpClient.post<AuthResponse>(
        this.endpoints.googleLogin,
        googleToken
      );

      this.handleAuthResponse(response);
    } catch (error) {
      throw new Error(`Google login failed: ${error}`);
    }
  }

  async login(userData: UserLoginDto): Promise<void> {
    try {
      const response = await httpClient.post<AuthResponse>(
        this.endpoints.login,
        userData
      );

      this.handleAuthResponse(response);
    } catch (error) {
      console.log("Auth service error:", error);
      throw new Error(`Login failed: ${error}`);
    }
  }

  async register(userData: UserRegisterDto): Promise<void> {
    try {
      await httpClient.post<void>(this.endpoints.register, userData);
    } catch (error) {
      throw new Error(`Registration failed: ${error}`);
    }
  }

  async logout(): Promise<void> {
    try {
      await httpClient.post<void>(this.endpoints.logout, {});
      this.tokenService.clearTokens();
    } catch (error) {
      // Still clear tokens even if the API call fails
      this.tokenService.clearTokens();
      throw new Error(`Logout failed: ${error}`);
    }
  }

  async forgotPassword(request: ForgotPassDto): Promise<void> {
    try {
      const response = await httpClient.post<string>(this.endpoints.forgotPassword,request);
      
      if (response) {
        const urlParams = new URLSearchParams(response.split("?")[1]);
        const token = urlParams.get("token");
        if (token) {
          this.tokenService.setAuthToken(token);
        } else {
          throw new Error("Token not found in the response URL.");
        }
      } else {
        throw new Error("Reset password URL not found in response.");
      }
    } catch (error) {
      throw new Error(`Forgot password request failed: ${error}`);
    }
  }

  async resetPassword(data: ResetPassDto): Promise<void> {
    try {
      await httpClient.post<void>(this.endpoints.resetPassword, data);
    } catch (error) {
      throw new Error(`Reset password failed: ${error}`);
    }
  }

  async changePassword(userData: ChangePassDto): Promise<void> {
    try {
      await httpClient.post<void>(this.endpoints.changePassword, userData);
    } catch (error) {
      throw new Error(`Change password failed: ${error}`);
    }
  }
}

const authService = AuthService.getInstance();
export default authService;
