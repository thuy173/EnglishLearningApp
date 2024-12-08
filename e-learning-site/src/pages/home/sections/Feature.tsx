import MethodItem from "./MethodItem";

const Feature = () => {
  return (
    <section>
      <div className="container mt-10">
        <div className="text-center lg:mx-36 lg:mb-12">
          <h2 className="font-bold text-3xl">
            Giải pháp học tiếng Anh trực tuyến toàn diện nhất
          </h2>
          <h6 className="lg:mt-3 lg:mx-40">
            Mang đến cho học viên Việt Nam giải pháp học ngoại ngữ thông minh,
            giúp bạn học sẵn sàng vượt qua mọi rào cản trong việc chinh phục
            tiếng Anh.
          </h6>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 lg:mx-36 mb-12 lg:mb-20">
          <MethodItem />
        </div>
      </div>
    </section>
  );
};

export default Feature;
