import Camera from "../../../assets/camera.svg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonCustom from "@/components/button-custom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectUserInformation } from "@/redux/apps/user/UserSelectors";
import { useEffect, useRef, useState } from "react";
import { fetchUserInfo, updateUser } from "@/redux/apps/user/UserSlice";
import ButtonSquare from "@/components/button-square";
import { IoFemaleSharp, IoMale, IoMaleFemale } from "react-icons/io5";
import UserDetailInfoDto, { Gender } from "@/types/feature/User";
import Avatar from "../../../assets/default.png";
import { BsClipboardCheckFill } from "react-icons/bs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { showNotification } from "@/redux/apps/message/MessageSlice";
import { LuLoader2 } from "react-icons/lu";

interface SettingProps {
  onUpdateUserInfo: (userInfo: UserDetailInfoDto) => void;
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Họ và tên không được để trống")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .required("Số điện thoại không được để trống"),
});
const Setting: React.FC<SettingProps> = ({ onUpdateUserInfo }) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInformation);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(Avatar);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleGenderClick = (gender: Gender) => {
    formik.setFieldValue("gender", gender);
  };

  const GenderKeyMap = Object.fromEntries(
    Object.entries(Gender).map(([key, value]) => [value, key])
  );

  const mapGenderFromApi = (apiGender: string) => {
    switch (apiGender) {
      case "MALE":
        return Gender.MALE;
      case "FEMALE":
        return Gender.FEMALE;
      case "OTHER":
        return Gender.OTHER;
      default:
        return "";
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("avatar", file);

      const fileUrl = URL.createObjectURL(file);
      setAvatarPreview(fileUrl);
    }
  };

  useEffect(() => {
    if (userInfo) {
      onUpdateUserInfo(userInfo);
      setAvatarPreview(userInfo.avatar || Avatar);
    }
  }, [userInfo, onUpdateUserInfo]);

  const formik = useFormik({
    initialValues: {
      fullName: userInfo?.fullName || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
      gender: mapGenderFromApi(userInfo?.gender || ""),
      avatar: null as File | null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phone);
        formData.append("gender", GenderKeyMap[values.gender]);
        formData.append("dob", "2000-01-02");

        if (values.avatar instanceof File) {
          formData.append("avatar", values.avatar);
        }

       const onLoad = await dispatch(
          updateUser({
            user: formData,
          })
        ).unwrap();

        onUpdateUserInfo(onLoad);

        dispatch(
          showNotification({
            message: "Cập nhật thông tin thành công!",
            type: "success",
          })
        );
      } catch (error) {
        console.log(error);
        dispatch(
          showNotification({
            message: "Cập nhật thông tin thất bại!",
            type: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <section>
        <div>
          <h2 className="font-bold text-2xl text-gray-500">
            Thông tin cá nhân
          </h2>

          <div className="grid justify-center mt-4">
            <div className="flex justify-center ">
              <div className="rounded-full relative flex-col">
                <img
                  src={avatarPreview}
                  alt={formik.values.fullName}
                  className="object-cover h-16 w-16 rounded-full"
                />
                <img
                  src={Camera}
                  onClick={handleFileButtonClick}
                  className="object-cover rounded-full h-5 absolute top-0 right-0"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="link"
              className="font-semibold text-lg text-[#1cb0f6]"
              onClick={handleFileButtonClick}
            >
              Thay ảnh đại diện
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="mt-5 mb-14 flex flex-col justify-center items-center space-y-8">
          <div className="grid w-full max-w-xl gap-1.5">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              type="text"
              id="fullName"
              placeholder="Nhập họ và tên"
              {...formik.getFieldProps("fullName")}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm">
                {formik.errors.fullName}
              </div>
            )}
          </div>
          <div className="grid w-full max-w-xl gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Nhập email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div className="grid w-full max-w-xl gap-1.5">
            <Label htmlFor="phoneNumber">Số điện thoại</Label>
            <Input
              type="text"
              id="phoneNumber"
              placeholder="Nhập số điện thoại"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.values(Gender).map((gender, index) => {
              const icons = [IoMale, IoFemaleSharp, IoMaleFemale];
              const isActive = formik.values.gender === gender;

              return (
                <ButtonSquare
                  key={index}
                  type="button"
                  title={gender}
                  Icon={icons[index]}
                  isActive={isActive}
                  onClick={() => handleGenderClick(gender)}
                />
              );
            })}
          </div>

          <div className="grid w-full max-w-xl justify-items-center">
            {loading ? (
              <Button disabled>
                <LuLoader2 className="animate-spin" />
                Đang cập nhật
              </Button>
            ) : (
              <ButtonCustom
                type="submit"
                className="px-24"
                title="Cập nhật"
                aria-label="Cập nhật"
                icon={<BsClipboardCheckFill />}
              />
            )}
          </div>
        </div>
      </section>
    </form>
  );
};

export default Setting;
