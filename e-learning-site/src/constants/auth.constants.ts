export const AUTH_MESSAGES = {
  LOGIN: {
    SUCCESS: "Đăng nhập thành công!",
    ERROR: "Đăng nhập thất bại. Vui lòng thử lại.",
  },
  REGISTER: {
    SUCCESS: "Đăng kí thành công!",
    ERROR: "Đăng kí thất bại. Vui lòng thử lại.",
  },
  LOGOUT: {
    SUCCESS: "Đăng xuất thành công!",
  },
  CHANGE_PASSWORD: {
    SUCCESS: "Đổi mật khẩu thành công!",
    ERROR: "Đổi mật khẩu thất bại.",
  },
  FORGOT_PASSWORD: {
    ERROR: "Địa chỉ email sai. Vui lòng nhập đúng email đăng kí",
  },
  RESET_PASSWORD: {
    SUCCESS: "Đổi mật khẩu thành công!",
    ERROR: "Đã xảy ra lỗi. Vui lòng kiểm tra lại",
  },
} as const;
