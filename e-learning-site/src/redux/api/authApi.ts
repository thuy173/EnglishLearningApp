import UserLoginDto, {
  ChangePassDto,
  ForgotPassDto,
  ResetPassDto,
  UserInfoDto,
} from "@/types/feature/Auth";
import axiosInstance from "./agent";
import Cookies from "js-cookie";

export const login = async (userData: UserLoginDto): Promise<UserInfoDto> => {
  const response = await axiosInstance.post("/auth/login", userData);

  Cookies.set("accessToken", response.data.accessToken, { expires: 1 });

  Cookies.set("refreshToken", response.data.refreshToken, { expires: 7 });

  return response.data.data;
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    throw new Error(`Failed to logout: ${error}`);
  }
};

export const forgotPass = async (data: ForgotPassDto): Promise<void> => {
  try {
    await axiosInstance.post("/auth/forgot-password", data);
  } catch (error) {
    throw new Error(`Failed to forgot password: ${error}`);
  }
};

export const resetPass = async (data: ResetPassDto): Promise<void> => {
  try {
    await axiosInstance.post("/auth/reset-password", data);
  } catch (error) {
    throw new Error(`Failed to reset password: ${error}`);
  }
};

export const changePass = async (userData: ChangePassDto): Promise<void> => {
  try {
    await axiosInstance.post("/auth/change-password", userData);
  } catch (error) {
    throw new Error(`Failed to change pass: ${error}`);
  }
};
