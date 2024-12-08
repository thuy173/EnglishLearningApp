import ButtonCustom from "@/components/button-custom";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { resetPassword } from "@/redux/apps/auth/authSlice";
import { ResetPassDto } from "@/types/feature/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPass] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("userId");
  const token = queryParams.get("token");

  const handleResetPass = async () => {
    if (!newPassword || !email || !token) {
      return;
    }

    const values: ResetPassDto = { email, token, newPassword };
    try {
      const resultAction = await dispatch(resetPassword(values));
      if (resetPassword.fulfilled.match(resultAction)) {
        navigate("/login");
      } else {
        console.error("Reset Password failed");
      }
    } catch (error) {
      console.error("Reset Password error details:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Đặt lại mật khẩu
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Nhập mật khẩu mới để hoàn tất quá trình đặt lại mật khẩu của bạn.
        </p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPass(e.target.value)}
              className="mt-1"
            />
          </div>
          <ButtonCustom
            type="button"
            title="Xác nhận"
            onClick={handleResetPass}
            icon={<GiConfirmed />}
            className="w-full"
          />
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
