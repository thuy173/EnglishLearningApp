import ImgIntro from "../../../assets/home-target1.svg";

const Introduce = () => (
  <section>
    <div className="container">
      <div className="relative top-[-30px] lg:top-[-100px]">
        <h2 className="text-center text-2xl font-semibold">
          Chinh phục mục tiêu của bạn với ứng dụng học tiếng Anh
          <p className="text-3xl font-bold">#1 Việt Nam</p>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center mt-10">
          <div className="ml-0 lg:col-span-1 lg:ml-20">
            <img src={ImgIntro} alt="Bg" className="object-contain" />
          </div>
          <div className="lg:col-span-2 lg:mr-36 lg:mt-0 mt-10 flex items-center">
            <div className="bg-[#1CB0F6] rounded-2xl p-6">
              <h5 className="text-white leading-8">
                Được phát triển từ những năm 2013, VOCA.VN là một trong những
                những thương hiệu Anh ngữ trực tuyến đầu tiên tại Việt Nam với
                hơn 2 triệu học viên, và được TECHFEST (Hệ sinh thái khởi nghiệp
                Đổi mới, sáng tạo Quốc gia, thuộc Bộ khoa học và công nghệ Việt
                Nam) bình chọn là EDTECH học tiếng Anh trực tuyến toàn diện,
                sáng tạo nhất.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-32 border-b-2 border-gray-600 border-opacity-15"></div>
    </div>
  </section>
);

export default Introduce;
