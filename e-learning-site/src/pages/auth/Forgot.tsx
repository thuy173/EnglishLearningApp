import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { forgotPassword } from "@/redux/apps/auth/authSlice";
import { ForgotPassDto } from "@/types/feature/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ForgotPassProps {
  onClose: (confirmed: boolean) => void;
  open: boolean;
}

const ForgotPassword: React.FC<ForgotPassProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleForgotPass = async () => {
    if (!email) {
      return;
    }

    const values: ForgotPassDto = { email };
    try {
      const resultAction = await dispatch(forgotPassword(values));
      if (forgotPassword.fulfilled.match(resultAction)) {
        navigate("/check-mail");
      } else {
        console.error("Forgot failed");
      }
    } catch (error) {
      console.error("Forgot error details:", error);
    }
  };
  return (
    <section>
      <Dialog open={open} onOpenChange={() => onClose(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn quên mật khẩu rồi saoooo?</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Input
            type="email"
            placeholder="Nhập email đã đăng kí để lấy lại mật khẩu nhéee"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DialogFooter>
            <Button type="button" onClick={handleForgotPass}>
              Xác nhận email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ForgotPassword;
