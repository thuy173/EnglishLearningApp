import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import headerConfig from "../header-config";
import Bgr from "../../assets/method-app-bg.svg";

const Footer = () => {
  return (
    <>
      <div>
        <img src={Bgr} alt="Bg" className="h-16 w-full relative top-[1px] object-cover" />
      </div>
      <footer className="bg-layout text-white">
        <div className="container px-24">
          <div className="grid lg:flex justify-center text-center p-7 border-b-2 border-white border-opacity-15">
            <h3 className="mr-1 font-semibold">Seen mail address:</h3>
            <a href="mailto://support@voca.vn" target="_blank" className="font-bold">support@learning.edu.vn</a>
          </div>
        </div>
        <div className="container py-6">
          <div className="mx-auto lg:mx-20">
            <div className="grid grid-cols-1 lg:flex lg:justify-between">
              <div className="lg:p-4 lg:w-4/6">
                <h3 className="text-2xl">Học mọi lúc, mọi nơi</h3>
                <p>
                  Tận dụng hiệu quả từng phút giây để học tập tiếng Anh với ứng
                  dụng dành cho iPhone và Android bạn nhé.
                </p>
              </div>
              <div className="lg:p-4 lg:w-2/6 lg:mt-0 mt-6">
                <h5 className="mb-3">Tải ứng dụng</h5>
                <div className="grid grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 p-8 bg-white text-black rounded-lg"
                    onClick={() =>
                      window.open("https://www.apple.com/app-store/", "_blank")
                    }
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                      alt="Apple Logo"
                      className="w-6 h-6"
                    />
                    <div className="text-left">
                      <p className="text-xs">Tải về từ</p>
                      <p className="text-base font-semibold">App Store</p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 p-8 bg-white text-black rounded-lg"
                    onClick={() =>
                      window.open("https://play.google.com/", "_blank")
                    }
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play Logo"
                      className="w-6 h-6"
                    />
                    <div className="text-left">
                      <p className="text-xs">Tải về từ</p>
                      <p className="text-base font-semibold">Google Play</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <nav className="mt-3 lg:py-4 flex justify-center">
              <NavigationMenu>
                <NavigationMenuList className="flex justify-center space-x-8 text-[#a9e1fc] text-lg font-semibold">
                  {headerConfig.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.path || "#"}
                        className="hover:underline"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
