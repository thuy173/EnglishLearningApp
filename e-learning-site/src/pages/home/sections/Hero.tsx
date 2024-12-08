import ImgHero from "../../../assets/home-intro.svg";
import BgrHero from "../../../assets/home-cloud-bg.png";
import TypingComponent from "@/components/typing-text";

const Hero = () => (
  <section>
    <div
      className="text-white mt-16 pb-20 lg:pb-44"
      style={{ background: "linear-gradient(180deg, #1CB0F6, #0272D9)" }}
    >
      <div className="grid justify-items-center p-12 space-y-6">
        <div>
          <img src={ImgHero} alt="Bg" className="object-contain" />
        </div>
        <div className="grid text-center justify-items-center space-y-2">
          <h3 className="text-xl font-semibold">Welcome!</h3>
          <div className="h-20">
            <TypingComponent text="Learn English, Unlock Your Future!" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <img
        src={BgrHero}
        alt="Bg"
        className="object-contain w-full relative top-[-45px] md:top-[-95px] lg:top-[-160px]"
      />
    </div>
  </section>
);

export default Hero;
