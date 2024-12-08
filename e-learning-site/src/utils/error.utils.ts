import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data?.message) {
    console.log('Axios error details:', {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    return error.response.data.message;
  }
  return "Đã có lỗi xảy ra";
};
