import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/favicon.svg";

const HeadShort = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="bg-[#1cb0f6] text-white">
        <div className="grid grid-cols-4 justify-around items-center md:mx-32 px-4 py-2 ">
          <div className="col-span-1">
            <button
              className="flex justify-center items-center space-x-5"
              onClick={() => navigate(-1)}
            >
              <IoClose size={32} />
              <span className="text-xl font-semibold">
                Hello. Nice to meet you!
              </span>
            </button>
          </div>
          <div
            className="col-span-2 flex justify-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="V" width={42} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeadShort;
