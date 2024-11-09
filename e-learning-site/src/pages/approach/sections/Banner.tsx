import MethodImg from "../../../assets/method.svg";
import ButtonCustom from "@/components/button-custom";

const Banner = () => {
  return (
    <section className="bg-[#1CB0F6]">
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-14 gap-2 pt-12 pb-28">
        <div className="col-span-1 space-y-3">
          <h1 className="text-[60px] font-bold text-white leading-tight">
            Phương pháp học tập thú vị, hiệu quả
          </h1>
          <div className="text-white space-y-2">
            <p className="">
              Với sứ mệnh giáo dục là giúp cho bạn học Việt Nam xóa bỏ rào cản
              Anh ngữ. Chính vì thế, trong suốt hành trình 10 năm qua, đội ngũ
              sư phạm VOCA đã không ngừng nghiên cứu và đổi phương pháp học trên
              hệ thống để giúp bạn học tiếp cận tiếng Anh dễ dàng, hiệu quả và
              thú vị hơn.
            </p>
            <p>
              Hãy cùng khám phá xem phương pháp đó cụ thể là những gì, và vì sao
              VOCA có thể giúp bạn cải thiện khả năng tiếng Anh hiệu quả nhất
              nhé.
            </p>
          </div>
          <ButtonCustom onClick={() => {}} className="ml-10 w-1/2" title="Học thử" />
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <img src={MethodImg} alt="Approach" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
