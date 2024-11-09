export default interface UserLoginDto {
  email: string;
  password: string;
}
export interface UserInfoDto {
  userId: string;
  email: string;
}

export interface ChangePassDto {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPassDto {
  email: string;
}

export interface ResetPassDto {
  id: string;
  token: string;
  newPassword: string;
}
