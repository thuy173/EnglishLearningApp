import Avatar from "../../../assets/default.png";
import Camera from "../../../assets/camera.svg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonCustom from "@/components/button-custom";

const Setting = () => (
  <section>
    <div>
      <h2 className="font-bold text-2xl text-gray-500">Thông tin cá nhân</h2>

      <div className="grid justify-center mt-8">
        <div className="flex justify-center ">
          <div className="rounded-full relative flex-col">
            <img
              src={Avatar}
              alt="user"
              className="object-cover h-16 w-1h-16"
            />
            <img
              src={Camera}
              alt="user"
              className="object-cover rounded-full h-5 absolute top-0 right-0"
            />
          </div>
        </div>
        <Button variant="link" className="font-semibold text-lg text-[#1cb0f6]">
          Thay ảnh đại diện
        </Button>
      </div>
    </div>
    <div className="my-10 flex flex-col justify-center items-center space-y-8">
      <div className="grid w-full max-w-xl gap-1.5">
        <Label htmlFor="fullName">Họ và tên</Label>
        <Input type="text" id="fullName" placeholder="Họ và tên" />
      </div>
      <div className="grid w-full max-w-xl gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full max-w-xl gap-1.5">
        <Label htmlFor="phoneNumber">Số điện thoại</Label>
        <Input type="text" id="phoneNumber" placeholder="Số điện thoại" />
      </div>
      <div className="grid w-full max-w-xl gap-1.5">
        <Label htmlFor="job">Nghề nghiệp</Label>
        <Input type="text" id="job" placeholder="Nghề nghiệp" />
      </div>
      <div className="grid w-full max-w-xl justify-items-center">
        <ButtonCustom onClick={() => {}} className="px-24" title="Cập nhật" aria-label="Cập nhật" />
      </div>
    </div>
  </section>
);

export default Setting;
