import ImgHero from "../../../assets/home-intro.svg";
import BgrHero from "../../../assets/home-cloud-bg.png";

const Hero = () => (
  <section>
    <div className="text-white mt-16 pb-20 lg:pb-44" style={{ background: "linear-gradient(180deg, #1CB0F6, #0272D9)" }}>
      <div className="grid justify-items-center p-12 space-y-8">
        <div>
          <img src={ImgHero} alt="Bg" className="object-contain" />
        </div>
        <div className="grid text-center justify-items-center space-y-2">
          <h3 className="text-xl font-semibold">Welcome! Voca.vn</h3>
          <h1 className="text-5xl font-bold">Learning english</h1>
        </div>
      </div>
    </div>
    <div>
      <img src={BgrHero} alt="Bg" className="object-contain w-full relative top-[-45px] lg:top-[-160px]" />
    </div>
  </section>
);

export default Hero;
