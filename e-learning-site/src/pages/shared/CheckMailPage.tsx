import { useNavigate } from "react-router-dom";
import Mail from "../../assets/sendMail.gif";
import ButtonCustom from "@/components/button-custom";
import { IoHomeOutline } from "react-icons/io5";

const CheckMailSuccessPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center max-h-screen">
      <div>
        <div className="flex items-center justify-center">
          <img src={Mail} alt="V" className="object-cover w-96 mt-5" />
        </div>
        <div className="-mt-2">
          <p className="text-center mb-4">
            Vui lòng kiểm tra email của bạn để xác nhận tài khoản thiết lập mật khẩu mới
          </p>
          <p className="text-center mb-6">
            Nếu bạn không nhận được email, hãy kiểm tra thư mục spam hoặc liên
            hệ trực tiếp với chúng tôi.
          </p>
        </div>
        <div className="flex justify-center">
          <ButtonCustom
            type="button"
            onClick={handleHome}
            icon={<IoHomeOutline />}
            title="Trang chủ"
            className="w-48"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckMailSuccessPage;
