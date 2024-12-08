import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import Logo from "../../assets/favicon.svg";
import BackgroundImage from "../../assets/bgr-auth.jpg";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { googleLoginUser, loginUser } from "@/redux/apps/auth/authSlice";
import { useState } from "react";
import ForgotPassword from "./Forgot";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectUserInformation } from "@/redux/apps/user/UserSelectors";
import { fetchUserInfo } from "@/redux/apps/user/UserSlice";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInformation);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [openForgotDialog, setOpenForgotDialog] = useState(false);

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      try {
        const result = await dispatch(
          googleLoginUser({
            googleToken: response.credential,
          } as unknown as string)
        );
        if (googleLoginUser.fulfilled.match(result)) {
          const redirectTo = location.state?.from || "/";
          navigate(redirectTo);
        }
      } catch (error) {
        console.error("Google login error:", error);
      }
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email là bắt buộc"),
    password: Yup.string().required("Mật khẩu là bắt buộc"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const resultAction = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(resultAction)) {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
        dispatch(fetchUserInfo());
        localStorage.setItem("avt", userInfo?.avatar ?? "");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error details:", error);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleOpenForgotDialog = () => {
    setOpenForgotDialog(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      />
      <div className="absolute inset-0 bg-black/15 z-10" />

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="z-20 w-full max-w-md mx-4">
            <Card className="w-full p-6 backdrop-blur-md bg-white/10 border border-white/30 shadow-xl">
              <CardHeader className="items-center space-y-4">
                <div className="bg-white rounded-full p-2">
                  <img
                    src={Logo}
                    alt="V"
                    className="w-14 object-contain cursor-pointer"
                    onClick={handleHome}
                  />
                </div>
                <CardTitle className="text-xl text-white">Đăng nhập</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      name="email"
                      placeholder="Nhập email"
                      value={values.email}
                      onChange={handleChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/80 focus:bg-white/30"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password" className="text-white">
                        Mật khẩu
                      </Label>
                      <button
                        type="button"
                        onClick={handleOpenForgotDialog}
                        className="text-sm text-white/80 hover:text-white underline"
                        tabIndex={-1}
                      >
                        Quên mật khẩu
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={values.password}
                        onChange={handleChange}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/80 focus:bg-white/30"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400 text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-bold bg-white/20 hover:bg-white/50 text-gray-600 border border-white/30"
                  >
                    Đăng nhập
                  </Button>
                  <div className="flex justify-center">
                    <GoogleOAuthProvider clientId={googleClientId}>
                      <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
                    </GoogleOAuthProvider>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-white/90 hover:text-white"
                    onClick={() => navigate("/register")}
                  >
                    Bạn chưa có tài khoản? Đăng kí ngay nàooo
                  </button>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
      {openForgotDialog && (
        <ForgotPassword
          open={openForgotDialog}
          onClose={() => setOpenForgotDialog(false)}
        />
      )}
    </section>
  );
};

export default Login;
