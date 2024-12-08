import { useEffect, useState } from "react";
import Banner from "./sections/Banner";
import MyDictionary from "./sections/Dictionary";
import Setting from "./sections/Setting";
import SideBar from "./sections/SideBar";
import UserDetailInfoDto from "@/types/feature/User";
import QuizHistory from "./sections/QuizHistory";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ButtonSlideBar } from "@/types/ui/SlideBarProfile";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(ButtonSlideBar.SETTING);
  const [userInfo, setUserInfo] = useState<UserDetailInfoDto | null>(null);

  const handleUpdateUserInfo = (updatedInfo: UserDetailInfoDto) => {
    setUserInfo(updatedInfo);
  };

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "dictionary":
        setActiveButton(ButtonSlideBar.DICTIONARY);
        break;
      case "history":
        setActiveButton(ButtonSlideBar.HISTORY);
        break;
      case "setting":
      default:
        setActiveButton(ButtonSlideBar.SETTING);
        break;
    }
  }, [location]);

  const handleSetActiveButton = (button: ButtonSlideBar) => {
    setActiveButton(button);
    switch (button) {
      case ButtonSlideBar.DICTIONARY:
        navigate("/profile/dictionary");
        break;
      case ButtonSlideBar.HISTORY:
        navigate("/profile/history");
        break;
      case ButtonSlideBar.SETTING:
      default:
        navigate("/profile/setting");
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>
      <section>
        {userInfo && <Banner userInfo={userInfo} />}
        <div className="container grid grid-cols-1 md:grid-cols-8 px-20 gap-5">
          <div className="md:col-span-2">
            <SideBar
              activeButton={activeButton}
              setActiveButton={handleSetActiveButton}
            />
          </div>
          <div className="md:col-span-6">
            {activeButton === ButtonSlideBar.SETTING && (
              <Setting onUpdateUserInfo={handleUpdateUserInfo} />
            )}
            {activeButton === ButtonSlideBar.DICTIONARY && <MyDictionary />}
            {activeButton === ButtonSlideBar.HISTORY && <QuizHistory />}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
