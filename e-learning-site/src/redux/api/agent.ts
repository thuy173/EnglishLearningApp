/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { persistor } from "../store";

// Define a base URL for API endpoints
const baseURL = "http://localhost:8083/api";

let refreshTokenPromise: Promise<string | null> | null = null;

// Create a new Axios instance with a custom config
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 90000, // Timeout of 90 seconds
});

// Add a request interceptor to include bearer token with each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const handleTokenExpiry = () => {
//   Cookies.remove("accessToken");
//   window.location.replace("/dang-nhap");
//   persistor.purge();
// };

const refreshToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    const response = await axios.post(
      `${baseURL}/application/refresh-token`,
      refreshToken,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const accessToken = response.data.data;
    console.log("TOKEN NEW", accessToken);
    Cookies.set("accessToken", accessToken, {expires: 2/86400});

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

const handleTokenRefresh = async () => {
  try {
    // If there's already a refresh request in progress, return that promise
    if (refreshTokenPromise) {
      return await refreshTokenPromise;
    }

    // Create new refresh token promise
    refreshTokenPromise = refreshToken();

    // Wait for the result
    const newToken = await refreshTokenPromise;

    // Reset the promise
    refreshTokenPromise = null;

    return newToken;
  } catch (error) {
    refreshTokenPromise = null;
    throw error;
  }
};

// Add a response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if error is due to an expired token
    if (error.response?.status === 500) {
      try {
        const originalRequest = error.config;

        // Prevent infinite loop
        if (originalRequest._retry) {
          throw new Error("Token refresh failed");
        }

        originalRequest._retry = true;

        // Get new token using the handleTokenRefresh function
        const accessToken = await handleTokenRefresh();

        if (accessToken) {
          // Update the request header with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          // Retry the original request
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        persistor.purge();
        // Uncomment these if you want to handle logout
        // Cookies.remove("refreshToken");
        // window.location.replace("/dang-nhap");
      }
    }
    return Promise.reject(error);
  }
);

// Define a generic response type for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Define utility functions for making HTTP requests

// Function to handle GET requests
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw new Error(`GET request to ${url} failed: ${error}`);
  }
};

// Function to handle POST requests
export const post = async <T, D = any>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      url,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(`POST request to ${url} failed: ${error}`);
  }
};

// Function to handle PUT requests
export const put = async <T, D = any>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: ApiResponse<T> = await axiosInstance.put<T>(
      url,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(`PUT request to ${url} failed: ${error}`);
  }
};

// Function to handle DELETE requests
export const remove = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(
      url,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(`DELETE request to ${url} failed: ${error}`);
  }
};

export default axiosInstance;
