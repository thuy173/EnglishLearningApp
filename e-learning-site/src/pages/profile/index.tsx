import { useState } from "react";
import Banner from "./sections/Banner";
import MyDictionary from "./sections/Dictionary";
import Setting from "./sections/Setting";
import SideBar from "./sections/SideBar";

const ProfilePage: React.FC = () => {
  const [activeButton, setActiveButton] = useState("Cài đặt");

  return (
    <section>
      <Banner />
      <div className="grid grid-cols-8 px-20 gap-5">
        <div className="col-span-2">
          <SideBar
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
        <div className="col-span-6">
          {activeButton === "Cài đặt" && <Setting />}
          {activeButton === "Từ điển" && <MyDictionary />}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
