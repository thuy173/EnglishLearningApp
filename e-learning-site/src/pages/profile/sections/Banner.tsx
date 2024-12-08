import BannerImg from "../../../assets/personal-header-level-1-bg.svg";
import Avatar from "../../../assets/default.png";
import Camera from "../../../assets/camera.svg";
import { GoClock } from "react-icons/go";
import { FaUserGraduate } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import UserDetailInfoDto from "@/types/feature/User";
import { fDateFromString } from "@/utils/format/format-time";

interface BannerProps {
  userInfo: UserDetailInfoDto;
}
const Banner: React.FC<BannerProps> = ({ userInfo }) => {
  return (
    <section>
      <div className="mt-20 mb-10 container px-20 justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-yellow-700 rounded-3xl">
          <div className="grid lg:grid-cols-[auto,1fr] items-center">
            <div className="flex justify-center lg:ml-14 relative">
              <div className="border-2 border-amber-600 rounded-full my-3 lg:my-0">
                <img
                  src={userInfo.avatar || Avatar}
                  alt={userInfo.fullName}
                  className="object-cover h-24 w-24 rounded-full"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-3 right-16 md:right-64 lg:top-0 lg:right-0 bg-transparent border-none hover:bg-transparent rounded-full h-6"
                >
                  <img src={Camera} alt="user" className="object-cover h-6" />
                </Button>
              </div>
            </div>
            <div className="text-white px-5 space-y-3">
              <h2 className="font-bold text-2xl">{userInfo.fullName}</h2>
              <p className="text-lg flex items-center gap-1">
                <GoClock className="mb-1" />
                Đã tham gia {fDateFromString(userInfo.createdAt)}
              </p>
              <p className="text-lg pb-5 lg:pb-0 flex items-center gap-1">
                <FaUserGraduate className="mb-1" />
                Sinh viên
              </p>
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <img
              src={BannerImg}
              alt="Banner"
              className="object-container h-48"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
