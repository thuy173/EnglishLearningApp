import Approach from "../../../assets/approach.svg";

const Content = () => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center py-10 mx-10 md:mx-36 lg:mx-60">
        <h2 className="text-[60px] font-bold text-[#1CB0F6] text-center">
          Cách tiếp cận ngôn ngữ thông minh
        </h2>
        <div>
          <p className="text-gray-600 text-center text-lg">
            Đầu tiên, khi học tiếng Anh thì mỗi kỹ năng ngôn ngữ bạn
            sẽ được tiếp cận theo những phương pháp học tập khác nhau. Với 7
            giải pháp thông minh, VOCA giúp bạn dễ dàng chinh phục cả 4 kỹ năng
            Anh ngữ (nghe, nói, đọc, viết). Cụ thể là:
          </p>
        </div>
        <div className="mt-5">
          <img src={Approach} alt="Approach" />
        </div>
      </div>
    </section>
  );
};
export default Content;
