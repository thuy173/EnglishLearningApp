import BannerImg from "../../../assets/personal-header-level-1-bg.svg";
import Avatar from "../../../assets/default.png";
import Camera from "../../../assets/camera.svg";
import { GoClock } from "react-icons/go";
import { FaUserGraduate } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Banner = () => (
  <section>
    <div className="mt-20 mb-10 container px-20 justify-between">
      <div className="grid grid-cols-2 bg-yellow-700 rounded-3xl">
        <div className="grid lg:grid-cols-[auto,1fr] items-center">
          <div className="col-span-1 flex justify-center ml-14 relative">
            <div className="border-2 border-amber-600 rounded-full ">
              <img src={Avatar} alt="user" className="object-cover h-24 w-24" />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-0 right-0 bg-transparent border-none hover:bg-transparent rounded-full h-6"
              >
                <img src={Camera} alt="user" className="object-cover h-6" />
              </Button>
            </div>
          </div>
          <div className="col-span-1 text-white px-5 space-y-3">
            <h2 className="font-bold text-2xl">Tạ Thị Thanh Thủy</h2>
            <p className="text-lg flex items-center gap-1">
              <GoClock className="mb-1"/>
              Đã tham gia 10/2024
            </p>
            <p className="text-lg flex items-center gap-1">
              <FaUserGraduate className="mb-1"/>
              Sinh viên
            </p>
          </div>
        </div>
        <div className="hidden lg:flex justify-end">
          <img src={BannerImg} alt="Banner" className="object-container h-48" />
        </div>
      </div>
    </div>
  </section>
);

export default Banner;
