/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteTokenCookie, getTokenFromCookie } from "../utils/cookieUtils";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

// Define a base URL for API endpoints
const baseURL = `${import.meta.env.VITE_API_KEY}/admin`

// Create a new Axios instance with a custom config
const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: 300000, // Timeout of 5 minutes
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true
})

// Add a request interceptor to include bearer token with each request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getTokenFromCookie()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Define a custom error class
class CustomError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = ''; // Remove Error: before the message
        this.status = status;

        // This line is necessary for TypeScript to correctly set up the prototype chain
        Object.setPrototypeOf(this, CustomError.prototype);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        // Custom behavior to remove "Error: " prefix from the stack trace
        if (this.stack) {
            const stackLines = this.stack.split('\n');
            stackLines[0] = this.message;
            this.stack = stackLines.join('\n');
        }
    }
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!axios.isAxiosError(error)) {
            console.error(`Unexpected error: ${error.message}`);
            return Promise.reject(error);
        }

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            deleteTokenCookie();
            window.location.replace('/login');
        }
        return Promise.reject(new CustomError(error.response?.data?.message || 'An error occurred', error.response?.status));
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
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.get<T>(url, config);
        return response.data;
    } catch (error) {
        throw new Error(`GET request to ${url} failed: ${error}`)
    }
}

// Function to handle POST requests
export const post = async <T, D = any>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.post<T>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error(`POST request to ${url} failed: ${error}`);
    }
};

// Function to handle PUT requests
export const put = async <T, D = any>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response: ApiResponse<T> = await axiosInstance.put<T>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error(`PUT request to ${url} failed: ${error}`);
    }
}

// Function to handle DELETE requests
export const remove = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.delete<T>(url, config);
        return response.data;
    } catch (error) {
        throw new Error(`DELETE request to ${url} failed: ${error}`);
    }
};

export default axiosInstance;