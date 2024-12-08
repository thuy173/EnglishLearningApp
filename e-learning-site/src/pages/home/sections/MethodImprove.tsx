import Image from "../../../assets/improve.svg";
const MethodImprove = () => {
  return (
    <section>
      <div className="bg-[#1cb0f6] text-white mb-14">
        <div className="container grid md:grid-cols-5 gap-1 lg:gap-14 lg:px-10 relative">
          <div className="md:col-span-3 flex flex-col justify-center space-y-3 py-8 lg:py-14 lg:ml-20">
            <h2 className="text-5xl font-bold">Liên tục cải tiến</h2>
            <p className="text-lg">
              Để tìm ra phương pháp học ngôn ngữ tốt nhất, bên cạnh nền tảng sản
              phẩm hiện có, các cập nhật từ kết quả nghiên cứu khoa học, thì
              còn dựa trên những phản hồi, và trải nghiệm thực tế từ bạn
              học trên hệ thống.
            </p>
            <p className="text-lg">
              Bằng cách này, sẽ liên tục nâng cấp, tối ưu phương
              pháp và cho ra mắt các khóa học mới để tiếp tục mang tới chương
              trình giáo dục ngôn ngữ tốt nhất cho tất cả mọi người
            </p>
          </div>
          <div className="hidden md:flex md:col-span-2  justify-center absolute md:-top-6 md:right-5 lg:-top-8 lg:right-24">
            <img src={Image} className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodImprove;
