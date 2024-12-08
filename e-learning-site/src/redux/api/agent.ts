/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { persistor } from "../store";
import { TokenService } from "./tokenApi";
import { API_CONFIG } from "@/types/feature/Config";

class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;
  private tokenService: TokenService;

  private constructor() {
    this.tokenService = TokenService.getInstance();
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.tokenService.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Successful response handling
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized error
        if (error.response?.status === 401 && !originalRequest._retry) {
          this.handleAuthError();
        }

        // Handle 500 and other server errors
        if (error.response?.status >= 500) {
          console.error("Server error:", error.response);
        }

        return Promise.reject(error);
      }
    );
  }

  private handleAuthError(): void {
    this.tokenService.clearTokens();
    persistor.purge();
    window.location.href = API_CONFIG.loginPath;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error: any) {
      console.error(`GET request failed: ${url}`, error);
      throw error?.response?.data || error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      console.error(`POST request failed: ${url}`, error);
      throw error?.response?.data || error;
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      console.error(`PUT request failed: ${url}`, error);
      throw error?.response?.data || error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error: any) {
      console.error(`DELETE request failed: ${url}`, error);
      throw error?.response?.data || error;
    }
  }
}

const httpClient = HttpClient.getInstance();
export default httpClient;